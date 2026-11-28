import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Lang} from '../copy';
import {ArText, Background, Logo, Speaker, Wave} from '../parts';
import {C, EASE_IO, FBN, GRAD, GRAD_CARD, ease, lin, num, pop} from '../theme';
import {PHRASES, Phrase, UI, narration} from './phrases';

const F = (sec: number) => Math.ceil(sec * 30);

// ───────────── timing (computed from clip lengths, 30fps) ─────────────
export const timeline = (p: Phrase, lang: Lang) => {
  const n = narration(p, lang);
  const hook = {dur: Math.max(80, 8 + F(n.hook) + 10), vo: 8};
  const reveal = {dur: Math.max(80, 16 + F(p.arSec) + 36), ar: 16};
  const mean = {dur: Math.max(110, 8 + F(n.mean) + 14), vo: 8};
  const turnAr = 4 + F(n.turn.sec) + 4;
  const turn = {dur: turnAr + F(p.arSec) + 34, vo: 4, ar: turnAr};
  const outro = {dur: Math.max(100, 10 + F(n.outro.sec) + 24), vo: 10};
  let t = 0;
  const at = <X extends {dur: number}>(x: X) => {
    const r = {...x, from: t};
    t += x.dur;
    return r;
  };
  const T = {hook: at(hook), reveal: at(reveal), mean: at(mean), turn: at(turn), outro: at(outro)};
  return {...T, total: t};
};

export type DailyProps = {day: number; lang: Lang; bgm: boolean};

export const useL = () => {
  const {width: W, height: H} = useVideoConfig();
  const r = W / H;
  const mode = r < 0.7 ? 'tall' : r < 1.2 ? 'feed' : 'wide';
  const s = mode === 'tall' ? W / 1080 : mode === 'feed' ? H / 1600 : H / 1080;
  return {W, H, mode, s} as const;
};

const abs: React.CSSProperties = {position: 'absolute'};

export const Daily: React.FC<DailyProps> = ({day, lang, bgm}) => {
  const p = PHRASES.find((x) => x.day === day)!;
  const T = timeline(p, lang);
  const n = narration(p, lang);

  const voice: {from: number; src: string; len: number}[] = [
    {from: T.hook.from + T.hook.vo, src: `audio/${lang}/d${day}-hook.mp3`, len: F(n.hook)},
    {from: T.reveal.from + T.reveal.ar, src: p.arAudio, len: F(p.arSec)},
    {from: T.mean.from + T.mean.vo, src: `audio/${lang}/d${day}-mean.mp3`, len: F(n.mean)},
    {from: T.turn.from + T.turn.vo, src: n.turn.src, len: F(n.turn.sec)},
    {from: T.turn.from + T.turn.ar, src: p.arAudio, len: F(p.arSec)},
    {from: T.outro.from + T.outro.vo, src: n.outro.src, len: F(n.outro.sec)},
  ];

  const sfx: {from: number; src: string; volume: number; dur?: number}[] = [
    {from: 4, src: 'sfx/pop.mp3', volume: 0.3},
    {from: 10, src: 'sfx/air-woosh-quick.mp3', volume: 0.3},
    {from: T.reveal.from - 6, src: 'sfx/whoosh-big.mp3', volume: 0.32},
    {from: T.reveal.from + T.reveal.ar - 3, src: 'sfx/switch-tap.mp3', volume: 0.35},
    {from: T.mean.from, src: 'sfx/paper-slide.mp3', volume: 0.35, dur: 20},
    ...p.parts.map((_, i) => ({from: T.mean.from + 22 + i * 8, src: 'sfx/pop.mp3', volume: 0.22})),
    {from: T.turn.from, src: 'sfx/swoosh-quick.mp3', volume: 0.28},
    {from: T.turn.from + T.turn.ar - 3, src: 'sfx/switch-tap.mp3', volume: 0.35},
    {from: T.outro.from + 8, src: 'sfx/impact-cine-big.mp3', volume: 0.42, dur: 60},
    {from: T.outro.from + 14, src: 'sfx/shimmer-sparkle-sweep.mp3', volume: 0.25, dur: 45},
  ];

  const duck = (f: number) => {
    let d = 1;
    for (const v of voice) {
      const k = interpolate(f, [v.from - 6, v.from, v.from + v.len, v.from + v.len + 10], [1, 0.3, 0.3, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      d = Math.min(d, k);
    }
    return d;
  };

  return (
    <AbsoluteFill style={{fontFamily: FBN}}>
      <Background />
      <Stage p={p} lang={lang} T={T} />
      {voice.map((v, i) => (
        <Sequence key={`v${i}`} from={v.from} durationInFrames={v.len + 15}>
          <Audio src={staticFile(v.src)} volume={1} />
        </Sequence>
      ))}
      {sfx.map((x, i) => (
        <Sequence key={`s${i}`} from={Math.max(0, x.from)} durationInFrames={x.dur ?? 40}>
          <Audio src={staticFile(x.src)} volume={x.volume} />
        </Sequence>
      ))}
      {bgm ? (
        <Audio
          src={staticFile('bgm/house-vibez.mp3')}
          volume={(f) =>
            0.24 * duck(f) * interpolate(f, [0, 10, T.total - 40, T.total], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
          }
        />
      ) : null}
    </AbsoluteFill>
  );
};

type TL = ReturnType<typeof timeline>;

const Stage: React.FC<{p: Phrase; lang: Lang; T: TL}> = ({p, lang, T}) => {
  const f = useCurrentFrame();
  const {W, H, mode, s} = useL();
  const u = UI[lang];
  const wide = mode === 'wide';
  const tall = mode === 'tall';

  // ── layout anchors ──
  const L = {
    tall: {badge: 0.27, emoji: 0.4, text: 0.5, cardY: 0.46, dockX: 0.5, dockY: 0.3, dockS: 0.78, content: 0.46},
    feed: {badge: 0.15, emoji: 0.33, text: 0.47, cardY: 0.5, dockX: 0.5, dockY: 0.27, dockS: 0.7, content: 0.47},
    wide: {badge: 0.21, emoji: 0.44, text: 0.64, cardY: 0.5, dockX: 0.29, dockY: 0.52, dockS: 0.85, content: 0.5},
  }[mode];

  const hookEnd = T.hook.from + T.hook.dur;
  const hookOut = 1 - ease(f, hookEnd - 10, hookEnd, EASE_IO);

  // ── card ──
  const cardIn = pop(f, T.reveal.from - 4, 22);
  const dock = ease(f, T.mean.from - 4, T.mean.from + 16);
  const cardOut = 1 - ease(f, T.outro.from, T.outro.from + 12, EASE_IO);
  const cx = interpolate(dock, [0, 1], [0.5, L.dockX]) * W;
  const cy = interpolate(dock, [0, 1], [L.cardY, L.dockY]) * H;
  const cs = interpolate(dock, [0, 1], [1, L.dockS]) * (0.6 + 0.4 * cardIn) * (0.85 + 0.15 * cardOut);
  const plays = [T.reveal.from + T.reveal.ar, T.turn.from + T.turn.ar];
  const len = F(p.arSec);
  let playing = 0;
  for (const a of plays) playing = Math.max(playing, lin(f, a - 2, a + 3) * (1 - lin(f, a + len, a + len + 8)));
  const pulse = 1 + 0.08 * playing * Math.sin(f * 0.6);

  // ── content panels ──
  const meanIn = ease(f, T.mean.from + 4, T.mean.from + 22) * (1 - ease(f, T.turn.from - 8, T.turn.from, EASE_IO));
  const turnIn = ease(f, T.turn.from + 2, T.turn.from + 18) * (1 - ease(f, T.outro.from - 8, T.outro.from, EASE_IO));
  const contentStyle: React.CSSProperties = wide
    ? {...abs, left: 0.53 * W, width: 0.42 * W, top: L.content * H, transform: 'translateY(-50%)'}
    : {...abs, left: 60 * s, right: 60 * s, top: L.content * H};

  const wm = ease(f, 6, 20) * (1 - ease(f, T.outro.from - 6, T.outro.from + 4));
  const words = p.hook[lang].split(' ');
  const hookSize = (wide ? 80 : tall ? 86 : 78) * s;

  return (
    <AbsoluteFill>
      {/* watermark */}
      <div style={{...abs, top: (tall ? 0.085 : 0.045) * H, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: wm}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14 * s, background: 'rgba(255,255,255,0.8)', border: `1px solid ${C.line}`, borderRadius: 40 * s, padding: `${8 * s}px ${22 * s}px ${8 * s}px ${10 * s}px`}}>
          <Logo size={52 * s} />
          <span style={{fontSize: 36 * s, fontWeight: 700, color: C.ink}}>Lahjio</span>
          <span style={{fontSize: 30 * s, fontWeight: 600, color: C.muted}}>· {u.series}</span>
        </div>
      </div>

      {/* ── HOOK ── */}
      {f < hookEnd + 2 ? (
        <AbsoluteFill style={{opacity: hookOut, transform: `scale(${0.95 + 0.05 * hookOut})`}}>
          <div style={{...abs, top: L.badge * H, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
            <div
              style={{
                transform: `translateY(-50%) scale(${pop(f, 2, 18)})`,
                background: GRAD,
                color: '#fff',
                borderRadius: 40 * s,
                padding: `${10 * s}px ${34 * s}px`,
                fontSize: 46 * s,
                fontWeight: 700,
                boxShadow: '0 12px 28px rgba(5,150,105,0.3)',
              }}
            >
              {u.day(num(p.day, lang))}
            </div>
          </div>
          <div style={{...abs, top: L.emoji * H, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div
              style={{
                transform: `translateY(-50%) scale(${pop(f, 8, 22)}) rotate(${Math.sin(f / 9) * 4}deg)`,
                width: 240 * s,
                height: 240 * s,
                borderRadius: 240 * s,
                background: '#fff',
                boxShadow: '0 24px 50px rgba(15,23,42,0.12)',
                border: `1px solid ${C.line}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 140 * s,
                position: 'relative',
              }}
            >
              {p.emoji}
              <div
                style={{
                  ...abs,
                  bottom: -26 * s,
                  left: '50%',
                  transform: `translateX(-50%) scale(${pop(f, 16, 16)})`,
                  background: C.ink,
                  color: '#fff',
                  borderRadius: 30 * s,
                  padding: `${4 * s}px ${22 * s}px`,
                  fontSize: 34 * s,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}
              >
                {p.place[lang]}
              </div>
            </div>
          </div>
          <div style={{...abs, top: L.text * H, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                columnGap: 0.26 * hookSize,
                maxWidth: (wide ? 0.6 : 0.88) * W,
                fontSize: hookSize,
                fontWeight: 700,
                color: C.ink,
                lineHeight: 1.3,
                textAlign: 'center',
              }}
            >
              {words.map((w, i) => {
                const q = pop(f, 14 + i * 4, 18);
                return (
                  <span key={i} style={{display: 'inline-block', opacity: Math.min(1, q * 1.6), transform: `translateY(${(1 - q) * 50 * s}px)`}}>
                    {w}
                  </span>
                );
              })}
            </div>
          </div>
        </AbsoluteFill>
      ) : null}

      {/* ── PHRASE CARD ── */}
      {f >= T.reveal.from - 4 && f < T.outro.from + 14 ? (
        <div
          style={{
            ...abs,
            left: cx,
            top: cy,
            width: 820 * s,
            height: 400 * s,
            transform: `translate(-50%,-50%) scale(${cs})`,
            opacity: Math.min(1, cardIn * 2) * cardOut,
            borderRadius: 52 * s,
            background: GRAD_CARD,
            boxShadow: `0 ${30 * s}px ${60 * s}px rgba(5,150,105,0.32)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArText size={150 * s} color="#fff">
            {p.ar}
          </ArText>
          <div style={{fontSize: 52 * s, fontWeight: 600, color: 'rgba(255,255,255,0.92)', marginTop: -6 * s}}>{p.tr[lang]}</div>
          <div
            style={{
              ...abs,
              top: 24 * s,
              right: 24 * s,
              width: 86 * s,
              height: 86 * s,
              borderRadius: 86 * s,
              background: playing > 0.05 ? '#fff' : 'rgba(255,255,255,0.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${pulse})`,
              boxShadow: `0 0 0 ${16 * s * playing}px rgba(255,255,255,0.25)`,
            }}
          >
            <Speaker size={44 * s} color={playing > 0.05 ? C.green : '#fff'} />
          </div>
          <div style={{...abs, bottom: 26 * s, left: 34 * s, opacity: playing}}>
            <Wave active={playing} color="rgba(255,255,255,0.9)" h={44 * s} bars={7} />
          </div>
        </div>
      ) : null}

      {/* ── MEANING ── */}
      {meanIn > 0.001 ? (
        <div style={{...contentStyle, opacity: meanIn, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
          <div style={{fontSize: 38 * s, fontWeight: 700, color: C.green7, background: C.g50, borderRadius: 30 * s, padding: `${4 * s}px ${24 * s}px`}}>
            {u.meaningLabel}
          </div>
          <div
            style={{
              fontSize: (wide ? 88 : 100) * s,
              fontWeight: 700,
              color: C.ink,
              lineHeight: 1.25,
              marginTop: 14 * s,
              transform: `translateY(${(1 - meanIn) * 30 * s}px)`,
            }}
          >
            {p.meaning[lang]}
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 18 * s, marginTop: 34 * s, width: '100%', alignItems: 'center'}}>
            {p.parts.map((pt, i) => {
              const q = pop(f, T.mean.from + 22 + i * 8, 18);
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 24 * s,
                    background: '#fff',
                    border: `1px solid ${C.line}`,
                    borderRadius: 30 * s,
                    padding: `${6 * s}px ${36 * s}px`,
                    boxShadow: '0 10px 24px rgba(15,23,42,0.07)',
                    transform: `scale(${Math.max(0, q)})`,
                  }}
                >
                  <ArText size={64 * s} color={C.green7}>
                    {pt.ar}
                  </ArText>
                  <span style={{fontSize: 48 * s, fontWeight: 700, color: C.muted}}>=</span>
                  <span style={{fontSize: 50 * s, fontWeight: 700, color: C.ink}}>{pt[lang]}</span>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* ── YOUR TURN ── */}
      {turnIn > 0.001 ? (
        <div style={{...contentStyle, opacity: turnIn, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
          <div style={{fontSize: (wide ? 84 : 96) * s, fontWeight: 700, color: C.ink, lineHeight: 1.25, transform: `scale(${0.9 + 0.1 * turnIn})`}}>
            {u.yourTurn}
          </div>
          <div style={{position: 'relative', width: 220 * s, height: 220 * s, marginTop: 40 * s, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {[0, 1].map((k) => {
              const ph = ((f + k * 20) % 40) / 40;
              return (
                <div
                  key={k}
                  style={{...abs, inset: 0, borderRadius: '50%', border: `${4 * s}px solid ${C.teal}`, transform: `scale(${0.7 + 0.6 * ph})`, opacity: (1 - ph) * 0.6}}
                />
              );
            })}
            <div
              style={{
                width: 170 * s,
                height: 170 * s,
                borderRadius: '50%',
                background: GRAD,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 90 * s,
                boxShadow: '0 16px 36px rgba(5,150,105,0.35)',
              }}
            >
              🎙️
            </div>
          </div>
          <div style={{marginTop: 24 * s, fontSize: 42 * s, fontWeight: 600, color: C.muted}}>{u.listen}</div>
        </div>
      ) : null}

      {/* ── OUTRO ── */}
      {f >= T.outro.from ? <Outro lang={lang} local={f - T.outro.from} /> : null}
    </AbsoluteFill>
  );
};

export const Outro: React.FC<{lang: Lang; local: number}> = ({lang, local: f}) => {
  const {mode, s} = useL();
  const u = UI[lang];
  const lg = pop(f, 6, 20);
  const t1 = ease(f, 14, 32);
  const cta = pop(f, 24, 20);
  const breathe = f > 50 ? 1 + 0.03 * Math.sin((f - 50) / 7) : 1;
  const wide = mode === 'wide';
  return (
    <AbsoluteFill style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
      <div style={{transform: `scale(${Math.max(0, lg)})`, filter: `drop-shadow(0 ${20 * s}px ${36 * s}px rgba(5,150,105,0.35))`}}>
        <Logo size={(wide ? 170 : 200) * s} wave={lin(f, 10, 28)} />
      </div>
      <div style={{fontSize: (wide ? 90 : 104) * s, fontWeight: 700, color: C.ink, marginTop: 14 * s, opacity: Math.min(1, lg * 2), lineHeight: 1}}>Lahjio</div>
      <div style={{marginTop: 28 * s, opacity: t1, transform: `translateY(${(1 - t1) * 24 * s}px)`, padding: `0 ${60 * s}px`}}>
        <div style={{fontSize: (wide ? 60 : 66) * s, fontWeight: 700, color: C.body, lineHeight: 1.3}}>{u.follow}</div>
        <div style={{fontSize: (wide ? 54 : 60) * s, fontWeight: 700, color: C.green7, marginTop: 6 * s}}>{u.followB}</div>
      </div>
      <div
        style={{
          marginTop: 40 * s,
          transform: `scale(${Math.max(0, cta) * breathe})`,
          background: C.green,
          color: '#fff',
          borderRadius: 28 * s,
          padding: `${18 * s}px ${48 * s}px`,
          fontSize: 50 * s,
          fontWeight: 700,
          boxShadow: `0 ${8 * s}px 0 ${C.green7}, 0 ${20 * s}px ${40 * s}px rgba(5,150,105,0.3)`,
        }}
      >
        {u.cta} · lahjio.com
      </div>
    </AbsoluteFill>
  );
};
