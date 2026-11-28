import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Lang} from '../copy';
import {Outro, useL} from '../daily/Daily';
import {ArText, Background, Check, Logo} from '../parts';
import {C, EASE_IO, FBN, GRAD, GRAD_CARD, ease, lin, num, pop} from '../theme';
import {Mic, Person} from './Dialogue';
import {SKITS, SLine, SUI, Skit as SkitT} from './skits';

const F = (sec: number) => Math.ceil(sec * 30);
const abs: React.CSSProperties = {position: 'absolute'};
const RED = '#dc2626';

// ───────────── timing (computed from clip lengths, 30fps) ─────────────
const lineTimes = (lines: SLine[], lead: number, gap: number) => {
  let x = lead;
  return lines.map((l) => {
    const at = x;
    x += F(l.sec) + gap;
    return {at, len: F(l.sec)};
  });
};

export const skitTimeline = (k: SkitT, lang: Lang) => {
  const u = SUI[lang];
  let t = 0;
  const at = <X extends {dur: number}>(x: X) => {
    const r = {...x, from: t};
    t += x.dur;
    return r;
  };
  const hook = at({dur: 10 + F(k.hookSec[lang]) + 8, vo: 10});
  const wl = lineTimes(k.wrong, 16, 10);
  const wrong = at({dur: wl[wl.length - 1].at + wl[wl.length - 1].len + 40, lines: wl});
  const oops = at({dur: 18 + F(k.explainSec[lang]) + 22, vo: 18, row2: 18 + Math.round(F(k.explainSec[lang]) * k.explainSplit)});
  const rl = lineTimes(k.right, 12, 8);
  const right = at({dur: rl[rl.length - 1].at + rl[rl.length - 1].len + 30, lines: rl});
  const turnAr = 4 + F(u.turnSec) + 6;
  const turn = at({dur: turnAr + F(k.practice.sec) + 30, vo: 4, ar: turnAr});
  const outro = at({dur: 10 + F(u.outroSec) + 14, vo: 10});
  return {hook, wrong, oops, right, turn, outro, total: t};
};
type TL = ReturnType<typeof skitTimeline>;

export type SkitProps = {id: number; lang: Lang; bgm: boolean};

export const Skit: React.FC<SkitProps> = ({id, lang, bgm}) => {
  const k = SKITS.find((x) => x.id === id)!;
  const u = SUI[lang];
  const T = skitTimeline(k, lang);

  const voice: {from: number; src: string; len: number}[] = [
    {from: T.hook.vo, src: `audio/${lang}/skit${id}-hook.mp3`, len: F(k.hookSec[lang])},
    ...k.wrong.map((l, i) => ({from: T.wrong.from + T.wrong.lines[i].at, src: l.audio, len: F(l.sec)})),
    {from: T.oops.from + T.oops.vo, src: `audio/${lang}/skit${id}-explain.mp3`, len: F(k.explainSec[lang])},
    ...k.right.map((l, i) => ({from: T.right.from + T.right.lines[i].at, src: l.audio, len: F(l.sec)})),
    {from: T.turn.from + T.turn.vo, src: u.turnSrc, len: F(u.turnSec)},
    {from: T.turn.from + T.turn.ar, src: k.practice.audio, len: F(k.practice.sec)},
    {from: T.outro.from + T.outro.vo, src: u.outroSrc, len: F(u.outroSec)},
  ];

  const conf = T.wrong.from + T.wrong.lines[1].at + T.wrong.lines[1].len;
  const sfx: {from: number; src: string; volume: number; dur?: number}[] = [
    {from: 4, src: 'sfx/pop.mp3', volume: 0.3},
    {from: 12, src: 'sfx/air-woosh-quick.mp3', volume: 0.3},
    {from: T.wrong.from - 4, src: 'sfx/swoosh-quick.mp3', volume: 0.28},
    ...T.wrong.lines.map((l) => ({from: T.wrong.from + l.at - 2, src: 'sfx/pop.mp3', volume: 0.18})),
    ...[0, 6, 12].map((d) => ({from: conf + 2 + d, src: 'sfx/pop.mp3', volume: 0.14})),
    {from: T.oops.from, src: 'sfx/bass-hit-short.mp3', volume: 0.55},
    {from: T.oops.from + 2, src: 'sfx/typewriter-hit-soft.mp3', volume: 0.4},
    {from: T.oops.from + 14, src: 'sfx/paper-slide.mp3', volume: 0.32, dur: 20},
    {from: T.oops.from + T.oops.vo + 2, src: 'sfx/pop.mp3', volume: 0.2},
    {from: T.oops.from + T.oops.row2, src: 'sfx/pop.mp3', volume: 0.2},
    {from: T.right.from - 4, src: 'sfx/swoosh-quick.mp3', volume: 0.28},
    ...T.right.lines.map((l) => ({from: T.right.from + l.at - 2, src: 'sfx/pop.mp3', volume: 0.18})),
    {from: T.right.from + T.right.lines[1].at + T.right.lines[1].len + 2, src: 'sfx/shimmer-sparkle-sweep.mp3', volume: 0.28, dur: 45},
    {from: T.turn.from, src: 'sfx/swoosh-quick.mp3', volume: 0.28},
    {from: T.turn.from + T.turn.ar - 3, src: 'sfx/switch-tap.mp3', volume: 0.35},
    {from: T.outro.from + 8, src: 'sfx/impact-cine-big.mp3', volume: 0.42, dur: 60},
    {from: T.outro.from + 14, src: 'sfx/shimmer-sparkle-sweep.mp3', volume: 0.25, dur: 45},
  ];

  const duck = (f: number) => {
    let d = 1;
    for (const v of voice) {
      d = Math.min(
        d,
        interpolate(f, [v.from - 6, v.from, v.from + v.len, v.from + v.len + 10], [1, 0.3, 0.3, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
      );
    }
    return d;
  };

  return (
    <AbsoluteFill style={{fontFamily: FBN}}>
      <Background />
      <Stage k={k} lang={lang} T={T} />
      {voice.map((v, i) => (
        <Sequence key={`v${i}`} from={v.from} durationInFrames={v.len + 15}>
          <Audio src={staticFile(v.src)} />
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
          volume={(f) => 0.22 * duck(f) * interpolate(f, [0, 10, T.total - 40, T.total], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
        />
      ) : null}
    </AbsoluteFill>
  );
};

// ───────────── layout ─────────────
const useLay = () => {
  const {W, H, mode, s} = useL();
  const L = {
    tall: {wmY: 0.055, chipY: 0.15, avY: 0.7, av: 370, avX: [0.27, 0.73], b1: 0.36, b2: 0.555, bw: 0.88, hookY: 0.42, badgeY: 0.27, card: 1.12, bs: 1.18},
    feed: {wmY: 0.04, chipY: 0.145, avY: 0.72, av: 290, avX: [0.27, 0.73], b1: 0.34, b2: 0.54, bw: 0.84, hookY: 0.45, badgeY: 0.27, card: 0.95, bs: 1},
    wide: {wmY: 0.045, chipY: 0.175, avY: 0.72, av: 250, avX: [0.27, 0.73], b1: 0.37, b2: 0.55, bw: 0.42, hookY: 0.52, badgeY: 0.3, card: 0.9, bs: 0.92},
  }[mode];
  return {W, H, mode, s, L};
};

// ───────────── stage ─────────────
const Stage: React.FC<{k: SkitT; lang: Lang; T: TL}> = ({k, lang, T}) => {
  const f = useCurrentFrame();
  const {W, H, mode, s, L} = useLay();
  const u = SUI[lang];
  const wide = mode === 'wide';
  const wm = ease(f, 6, 20) * (1 - ease(f, T.outro.from - 6, T.outro.from + 4));

  const hookEnd = T.hook.dur;
  const hookOut = 1 - ease(f, hookEnd - 10, hookEnd, EASE_IO);
  const hookSize = (wide ? 84 : 88) * s;

  return (
    <AbsoluteFill>
      <div style={{...abs, top: L.wmY * H, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: wm}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14 * s, background: 'rgba(255,255,255,0.85)', border: `1px solid ${C.line}`, borderRadius: 40 * s, padding: `${8 * s}px ${22 * s}px ${8 * s}px ${10 * s}px`}}>
          <Logo size={52 * s} />
          <span style={{fontSize: 36 * s, fontWeight: 700, color: C.ink}}>Lahjio</span>
          <span style={{fontSize: 30 * s, fontWeight: 600, color: C.muted}}>· {u.series}</span>
        </div>
      </div>

      {/* hook */}
      {f < hookEnd + 2 ? (
        <AbsoluteFill style={{opacity: hookOut, transform: `scale(${0.95 + 0.05 * hookOut})`}}>
          <div style={{...abs, top: L.badgeY * H, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
            <div style={{transform: `translateY(-50%) scale(${pop(f, 2, 18)}) rotate(-3deg)`, background: '#fef3c7', color: '#92400e', border: `${3 * s}px solid #fcd34d`, borderRadius: 40 * s, padding: `${10 * s}px ${34 * s}px`, fontSize: 48 * s, fontWeight: 700}}>
              {u.badge(num(k.id, lang))}
            </div>
          </div>
          <div style={{...abs, top: L.hookY * H, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: 0.26 * hookSize, maxWidth: (wide ? 0.6 : 0.86) * W, fontSize: hookSize, fontWeight: 700, color: C.ink, lineHeight: 1.3, textAlign: 'center'}}>
              {k.hook[lang].split(' ').map((w, i) => {
                const q = pop(f, 12 + i * 4, 18);
                return (
                  <span key={i} style={{display: 'inline-block', opacity: Math.min(1, q * 1.6), transform: `translateY(${(1 - q) * 50 * s}px)`}}>
                    {w}
                  </span>
                );
              })}
            </div>
          </div>
          <div style={{...abs, top: (L.hookY + (wide ? 0.25 : 0.2)) * H, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 40 * s}}>
            {['?', '!', '?'].map((c, i) => {
              const q = pop(f, 30 + i * 5, 16);
              return (
                <span key={i} style={{fontSize: 110 * s, fontWeight: 800, color: i === 1 ? RED : C.amber, transform: `scale(${Math.max(0, q)}) rotate(${(i - 1) * 14 + Math.sin(f / 6 + i) * 6}deg)`, display: 'inline-block'}}>
                  {c}
                </span>
              );
            })}
          </div>
        </AbsoluteFill>
      ) : null}

      {/* skit: the mistake */}
      {f >= T.wrong.from - 2 && f < T.wrong.from + T.wrong.dur + 14 ? (
        <Scene k={k} lang={lang} lines={k.wrong} times={T.wrong.lines} lf={f - T.wrong.from} dur={T.wrong.dur} mode="wrong" />
      ) : null}

      {/* oops + explanation */}
      {f >= T.oops.from - 2 && f < T.oops.from + T.oops.dur ? <Explain k={k} lang={lang} lf={f - T.oops.from} dur={T.oops.dur} row2={T.oops.row2} vo={T.oops.vo} /> : null}

      {/* skit: done right */}
      {f >= T.right.from - 2 && f < T.right.from + T.right.dur ? (
        <Scene k={k} lang={lang} lines={k.right} times={T.right.lines} lf={f - T.right.from} dur={T.right.dur} mode="right" />
      ) : null}

      {/* your turn */}
      {f >= T.turn.from - 2 && f < T.turn.from + T.turn.dur ? <Turn k={k} lang={lang} lf={f - T.turn.from} dur={T.turn.dur} ar={T.turn.ar} /> : null}

      {f >= T.outro.from ? <Outro lang={lang} local={f - T.outro.from} /> : null}
    </AbsoluteFill>
  );
};

// one skit run: two people + comic speech bubbles
const Scene: React.FC<{k: SkitT; lang: Lang; lines: SLine[]; times: {at: number; len: number}[]; lf: number; dur: number; mode: 'wrong' | 'right'}> = ({k, lang, lines, times, lf, dur, mode}) => {
  const {W, H, s, L, mode: fm} = useLay();
  const wide = fm === 'wide';
  const out = mode === 'wrong' ? 1 - ease(lf, dur - 4, dur + 10, EASE_IO) : 1 - ease(lf, dur - 10, dur, EASE_IO);
  const zoomPunch = mode === 'wrong' ? 1 + 0.06 * ease(lf, dur - 26, dur) : 1;
  const last = times[times.length - 1];
  const afterThem = lf - (last.at + last.len); // frames since the Saudi finished
  const talk = (who: 'you' | 'them') => {
    let t = 0;
    lines.forEach((l, i) => {
      if (l.who !== who) return;
      const a = times[i].at;
      t = Math.max(t, lin(lf, a - 2, a + 3) * (1 - lin(lf, a + times[i].len, a + times[i].len + 6)));
    });
    return t;
  };
  const chipIn = pop(lf, 2, 16);
  const people = [
    {kind: 'shop' as const, name: k.you[lang], x: L.avX[0] * W, talk: talk('you'), who: 'you'},
    {kind: 'saudi' as const, name: k.them[lang], x: L.avX[1] * W, talk: talk('them'), who: 'them'},
  ];
  const av = L.av * s;
  const bz = s * L.bs;
  const confused = mode === 'wrong' ? lin(lf, times[1].at, times[1].at + 6) : 0;
  const happy = mode === 'right' ? pop(afterThem, 0, 18) : 0;

  return (
    <AbsoluteFill style={{opacity: out, transform: `scale(${zoomPunch})`}}>
      {/* place chip */}
      <div style={{...abs, top: L.chipY * H, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
        <div style={{transform: `translateY(-50%) scale(${chipIn})`, display: 'flex', alignItems: 'center', gap: 14 * s, background: mode === 'wrong' ? C.ink : C.green, color: '#fff', borderRadius: 36 * s, padding: `${8 * s}px ${28 * s}px`, fontSize: 40 * s, fontWeight: 700, whiteSpace: 'nowrap'}}>
          {k.place[lang]}
          {mode === 'right' ? <Check size={44 * s} bg="rgba(255,255,255,0.25)" /> : null}
        </div>
      </div>

      {/* people */}
      {people.map((p, i) => {
        const q = pop(lf, 2 + i * 5, 18);
        const look = p.who === 'them' && confused > 0 ? Math.sin((lf - times[1].at) / 5) : 0; // looking around
        const flip = p.who === 'them' && confused > 0.5 && Math.sin((lf - times[1].at) / 9) < 0 ? -1 : 1;
        const bob = 1 + 0.035 * p.talk * Math.sin(lf * 0.5);
        return (
          <div key={i} style={{...abs, left: p.x + look * 14 * s, top: L.avY * H, transform: `translate(-50%,-50%) scale(${Math.max(0, q) * bob})`, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{position: 'relative', transform: `scaleX(${flip}) rotate(${look * 6}deg)`, borderRadius: '50%', boxShadow: `0 ${16 * s}px ${34 * s}px rgba(15,23,42,0.15), 0 0 0 ${(5 + 10 * p.talk) * s}px ${i === 0 ? 'rgba(5,150,105,0.35)' : 'rgba(245,158,11,0.4)'}`}}>
              <Person kind={p.kind} size={av} talk={p.talk} f={lf} uid={`${mode}${i}`} />
            </div>
            {/* reactions */}
            {p.who === 'them' && mode === 'wrong'
              ? [0, 1, 2].map((j) => {
                  const r = pop(lf, times[1].at + 4 + j * 6, 14);
                  const ang = -60 + j * 60;
                  return (
                    <div key={j} style={{...abs, left: av / 2 + Math.sin((ang * Math.PI) / 180) * av * 0.62, top: av / 2 - Math.cos((ang * Math.PI) / 180) * av * 0.62 + Math.sin(lf / 7 + j) * 6 * s, transform: `translate(-50%,-50%) scale(${Math.max(0, r)}) rotate(${ang / 3}deg)`, fontSize: 84 * s, fontWeight: 800, color: C.amber, textShadow: '0 4px 10px rgba(0,0,0,0.12)'}}>
                      ?
                    </div>
                  );
                })
              : null}
            {p.who === 'you' && mode === 'wrong' && afterThem > 0 ? (
              <div style={{...abs, left: av * 0.85, top: av * 0.05, transform: `scale(${Math.max(0, pop(afterThem, 4, 14))})`, fontSize: 70 * s, fontWeight: 800, color: C.muted}}>?</div>
            ) : null}
            {p.who === 'them' && mode === 'right' ? (
              <div style={{...abs, right: -av * 0.04, top: av * 0.68, transform: `scale(${Math.max(0, happy)})`}}>
                <Check size={av * 0.3} />
              </div>
            ) : null}
            <div style={{marginTop: 14 * s, fontSize: 34 * s, fontWeight: 700, color: i === 0 ? C.green7 : '#92400e', background: i === 0 ? C.g50 : '#fef3c7', borderRadius: 24 * s, padding: `${2 * s}px ${18 * s}px`, whiteSpace: 'nowrap'}}>{p.name}</div>
          </div>
        );
      })}

      {/* speech bubbles */}
      {lines.map((l, i) => {
        const t = times[i];
        if (lf < t.at - 3) return null;
        const q = pop(lf, t.at - 3, 16);
        const me = l.who === 'you';
        const bottom = (i === 0 ? L.b1 : L.b2) * H;
        const bad = mode === 'wrong' && me;
        const bw = L.bw * W;
        const side = wide ? (me ? {left: 0.06 * W} : {right: 0.06 * W}) : me ? {left: 0.05 * W} : {right: 0.05 * W};
        const shake = bad && lf > times[1].at + 6 ? Math.sin(lf * 1.3) * 4 * bz * (1 - lin(lf, times[1].at + 6, times[1].at + 24)) : 0;
        return (
          <div key={i} style={{...abs, ...side, top: bottom, transform: `translateY(-100%) translateX(${shake}px)`, maxWidth: bw, display: 'flex', justifyContent: me ? 'flex-start' : 'flex-end', width: bw}}>
            <div
              style={{
                position: 'relative',
                transform: `scale(${Math.max(0, q)})`,
                transformOrigin: me ? '15% 100%' : '85% 100%',
                background: me ? (bad ? '#fff' : GRAD_CARD) : '#fff',
                color: me && !bad ? '#fff' : C.ink,
                border: bad ? `${4 * bz}px solid ${RED}` : me ? 'none' : `${3 * bz}px solid #fde68a`,
                borderRadius: 40 * bz,
                padding: `${14 * bz}px ${36 * bz}px ${18 * bz}px`,
                boxShadow: me && !bad ? `0 ${14 * bz}px ${30 * bz}px rgba(5,150,105,0.28)` : `0 ${12 * bz}px ${28 * bz}px rgba(15,23,42,0.1)`,
                textAlign: me ? 'left' : 'right',
              }}
            >
              <div style={{direction: 'rtl', whiteSpace: 'nowrap', textAlign: me ? 'right' : 'left'}}>
                <ArText size={(wide ? 76 : 84) * s} color={bad ? RED : me ? '#fff' : C.ink}>
                  {l.ar}
                </ArText>
              </div>
              <div style={{fontSize: 40 * bz, fontWeight: 600, color: me && !bad ? 'rgba(255,255,255,0.88)' : C.muted, lineHeight: 1.2, marginTop: -4 * bz}}>{l.tr[lang]}</div>
              {l.mean ? <div style={{fontSize: 48 * bz, fontWeight: 700, lineHeight: 1.25, marginTop: 6 * bz}}>{l.mean[lang]}</div> : null}
              {/* tail */}
              <div style={{...abs, bottom: -18 * bz, [me ? 'left' : 'right']: 70 * bz, width: 36 * bz, height: 36 * bz, background: me ? (bad ? '#fff' : C.teal) : '#fff', transform: 'rotate(45deg)', borderRight: bad ? `${4 * bz}px solid ${RED}` : me ? 'none' : `${3 * bz}px solid #fde68a`, borderBottom: bad ? `${4 * bz}px solid ${RED}` : me ? 'none' : `${3 * bz}px solid #fde68a`}} />
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// OOPS stamp → explanation card (wrong vs right)
const Explain: React.FC<{k: SkitT; lang: Lang; lf: number; dur: number; row2: number; vo: number}> = ({k, lang, lf, dur, row2, vo}) => {
  const {W, H, s, L, mode} = useLay();
  const u = SUI[lang];
  const wide = mode === 'wide';
  const z = s * L.card;
  const stampIn = interpolate(lf, [0, 8], [2.2, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const stampOut = 1 - ease(lf, 14, 24, EASE_IO);
  const cardIn = ease(lf, 14, 30);
  const out = 1 - ease(lf, dur - 10, dur, EASE_IO);
  const row = (q: number, good: boolean) => {
    const w = good ? k.good : k.bad;
    const col = good ? C.green : RED;
    return (
      <div style={{transform: `scale(${Math.max(0, q)})`, opacity: Math.min(1, q * 2), display: 'flex', alignItems: 'center', gap: 26 * z, background: good ? C.g50 : '#fef2f2', border: `${3 * z}px solid ${good ? '#a7f3d0' : '#fecaca'}`, borderRadius: 34 * z, padding: `${14 * z}px ${30 * z}px`, width: '100%'}}>
        <div style={{width: 76 * z, height: 76 * z, borderRadius: '50%', background: col, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
          <svg width={40 * z} height={40 * z} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round">
            {good ? <path d="M5 12.5l4.5 4.5L19 7.5" /> : <path d="M6 6l12 12M18 6L6 18" />}
          </svg>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0}}>
          <div style={{fontSize: 32 * z, fontWeight: 700, color: col, lineHeight: 1}}>{good ? u.right : u.wrong}</div>
          <ArText size={96 * z} color={col}>
            {w.ar}
          </ArText>
          <div style={{fontSize: 38 * z, fontWeight: 600, color: C.muted, marginTop: -10 * z}}>{w.tr[lang]}</div>
        </div>
        <div style={{marginLeft: 'auto', textAlign: 'right', fontSize: 60 * z, fontWeight: 800, color: C.ink, lineHeight: 1.15, whiteSpace: 'nowrap'}}>= {w.mean[lang]}</div>
      </div>
    );
  };
  return (
    <AbsoluteFill style={{opacity: out}}>
      {/* OOPS stamp */}
      {stampOut > 0.001 ? (
        <AbsoluteFill style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: `rgba(248,250,252,${0.6 * stampOut})`}}>
          <div style={{transform: `scale(${stampIn}) rotate(-8deg)`, opacity: stampOut, background: RED, color: '#fff', fontSize: 160 * s, fontWeight: 800, borderRadius: 40 * s, padding: `${6 * s}px ${60 * s}px`, boxShadow: `0 ${20 * s}px ${50 * s}px rgba(220,38,38,0.35)`, border: `${8 * s}px solid #fff`}}>
            {u.oops}
          </div>
        </AbsoluteFill>
      ) : null}
      {/* card */}
      {cardIn > 0.001 ? (
        <AbsoluteFill style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{width: (wide ? 0.6 : 0.9) * W, opacity: cardIn, transform: `translateY(${(1 - cardIn) * 60 * s}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26 * z, marginTop: (wide ? 0.04 : 0.02) * H}}>
            <div style={{fontSize: 70 * z, fontWeight: 800, color: C.ink}}>{k.title[lang]}</div>
            {row(pop(lf, vo + 2, 18), false)}
            {row(pop(lf, row2, 18), true)}
            <div style={{display: 'flex', gap: 22 * z, marginTop: 8 * z, opacity: lin(lf, row2 + 14, row2 + 26)}}>
              {k.tips.map((t, i) => (
                <div key={i} style={{display: 'flex', alignItems: 'center', gap: 14 * z, background: '#fff', border: `1px solid ${C.line}`, borderRadius: 30 * z, padding: `${4 * z}px ${26 * z}px`, boxShadow: '0 8px 20px rgba(15,23,42,0.06)'}}>
                  <ArText size={60 * z} color={i === 0 ? RED : C.green}>
                    {t.ar}
                  </ArText>
                  <span style={{fontSize: 46 * z, fontWeight: 700, color: C.ink}}>= {t.mean[lang]}</span>
                </div>
              ))}
            </div>
          </div>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};

// your turn: say the right phrase
const Turn: React.FC<{k: SkitT; lang: Lang; lf: number; dur: number; ar: number}> = ({k, lang, lf, dur, ar}) => {
  const {s, mode} = useLay();
  const u = SUI[lang];
  const wide = mode === 'wide';
  const inn = ease(lf, 2, 18) * (1 - ease(lf, dur - 8, dur, EASE_IO));
  const len = F(k.practice.sec);
  const playing = lin(lf, ar - 2, ar + 3) * (1 - lin(lf, ar + len, ar + len + 8));
  const p = k.practice;
  return (
    <AbsoluteFill style={{opacity: inn, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
      <div style={{fontSize: (wide ? 84 : 96) * s, fontWeight: 700, color: C.ink, transform: `scale(${0.9 + 0.1 * inn})`}}>{u.yourTurn}</div>
      <div style={{marginTop: 34 * s, borderRadius: 52 * s, background: GRAD_CARD, padding: `${18 * s}px ${70 * s}px ${26 * s}px`, boxShadow: `0 ${30 * s}px ${60 * s}px rgba(5,150,105,0.32)`, transform: `scale(${pop(lf, 6, 20) * (1 + 0.04 * playing * Math.sin(lf * 0.6))})`}}>
        <ArText size={(wide ? 130 : 140) * s} color="#fff">
          {p.ar}
        </ArText>
        <div style={{fontSize: 52 * s, fontWeight: 600, color: 'rgba(255,255,255,0.92)', marginTop: -8 * s}}>{p.tr[lang]}</div>
        <div style={{fontSize: 50 * s, fontWeight: 700, color: '#fff', marginTop: 4 * s}}>{p.mean[lang]}</div>
      </div>
      <div style={{position: 'relative', width: 200 * s, height: 200 * s, marginTop: 40 * s, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {[0, 1].map((j) => {
          const ph = ((lf + j * 20) % 40) / 40;
          return <div key={j} style={{...abs, inset: 0, borderRadius: '50%', border: `${4 * s}px solid ${C.teal}`, transform: `scale(${0.7 + 0.6 * ph})`, opacity: (1 - ph) * 0.6}} />;
        })}
        <div style={{width: 150 * s, height: 150 * s, borderRadius: '50%', background: GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 16px 36px rgba(5,150,105,0.35)'}}>
          <Mic size={80 * s} color="#fff" />
        </div>
      </div>
      <div style={{marginTop: 18 * s, fontSize: 42 * s, fontWeight: 600, color: C.muted}}>{u.listen}</div>
    </AbsoluteFill>
  );
};
