import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Lang} from '../copy';
import {Outro, useL} from '../daily/Daily';
import {BN_OUTRO, BN_YOUR_TURN, EN_OUTRO, EN_YOUR_TURN} from '../daily/phrases';
import {ArText, Background, Logo} from '../parts';
import {C, EASE_IO, FBN, GRAD, GRAD_CARD, ease, lin, num, pop} from '../theme';
import {DIALOGS, DUI, Dialog} from './dialogs';

const F = (sec: number) => Math.ceil(sec * 30);
const abs: React.CSSProperties = {position: 'absolute'};

// ───────────── timing (computed from clip lengths, 30fps) ─────────────
// A round plays every line. Round 3: "you" lines are silent pauses (the viewer speaks).
type Ev = {line: number; at: number; dur: number; silent: boolean};
export const dlgTimeline = (d: Dialog, lang: Lang) => {
  const turn = lang === 'bn' ? BN_YOUR_TURN : EN_YOUR_TURN;
  const outroVo = lang === 'bn' ? BN_OUTRO : EN_OUTRO;
  const hook = {from: 0, dur: 10 + F(d.hookSec[lang]) + 6, vo: 10};
  let t = hook.dur;
  const rounds = [0, 1, 2].map((r) => {
    const from = t;
    const lead = r === 2 ? 6 + F(turn.sec) + 2 : 12;
    const gap = r === 0 ? 6 : 9;
    let x = lead;
    const evs: Ev[] = d.lines.map((l, i) => {
      const silent = r === 2 && l.who === 'you';
      const dur = F(l.sec) + (silent ? 16 : 0);
      const e = {line: i, at: x, dur, silent};
      x += dur + gap;
      return e;
    });
    const dur = x + (r === 1 ? 14 : 8);
    t += dur;
    return {from, dur, evs};
  });
  const outro = {from: t, dur: 10 + F(outroVo.sec) + 14, vo: 10};
  t += outro.dur;
  return {hook, rounds, outro, total: t, turn, outroVo};
};
type TL = ReturnType<typeof dlgTimeline>;

export type DialogueProps = {id: number; lang: Lang; bgm: boolean};

export const Dialogue: React.FC<DialogueProps> = ({id, lang, bgm}) => {
  const d = DIALOGS.find((x) => x.id === id)!;
  const T = dlgTimeline(d, lang);

  const voice: {from: number; src: string; len: number}[] = [
    {from: T.hook.vo, src: `audio/${lang}/dlg${id}-hook.mp3`, len: F(d.hookSec[lang])},
    {from: T.rounds[2].from + 6, src: T.turn.src, len: F(T.turn.sec)},
    ...T.rounds.flatMap((r) =>
      r.evs.filter((e) => !e.silent).map((e) => ({from: r.from + e.at, src: d.lines[e.line].audio, len: e.dur})),
    ),
    {from: T.outro.from + T.outro.vo, src: T.outroVo.src, len: F(T.outroVo.sec)},
  ];

  const sfx: {from: number; src: string; volume: number; dur?: number}[] = [
    {from: 4, src: 'sfx/pop.mp3', volume: 0.3},
    {from: 12, src: 'sfx/air-woosh-quick.mp3', volume: 0.3},
    ...T.rounds.flatMap((r) => [
      {from: r.from - 4, src: 'sfx/swoosh-quick.mp3', volume: 0.28},
      {from: r.from + 6, src: 'sfx/switch-tap.mp3', volume: 0.32},
      ...r.evs.map((e) => ({from: r.from + e.at - 2, src: 'sfx/pop.mp3', volume: 0.16})),
    ]),
    {from: T.outro.from + 8, src: 'sfx/impact-cine-big.mp3', volume: 0.42, dur: 60},
    {from: T.outro.from + 14, src: 'sfx/shimmer-sparkle-sweep.mp3', volume: 0.25, dur: 45},
  ];

  const duck = (f: number) => {
    let k = 1;
    for (const v of voice) {
      k = Math.min(
        k,
        interpolate(f, [v.from - 6, v.from, v.from + v.len, v.from + v.len + 10], [1, 0.3, 0.3, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
      );
    }
    return k;
  };

  return (
    <AbsoluteFill style={{fontFamily: FBN}}>
      <Background />
      <Stage d={d} lang={lang} T={T} />
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
          volume={(f) =>
            0.22 * duck(f) * interpolate(f, [0, 10, T.total - 40, T.total], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
          }
        />
      ) : null}
    </AbsoluteFill>
  );
};

// ───────────── avatars (flat SVG) ─────────────
const Person: React.FC<{kind: 'saudi' | 'shop'; size: number; talk: number; f: number; uid: string}> = ({kind, size, talk, f, uid}) => {
  const mouth = 2 + 7 * talk * (0.45 + 0.55 * Math.abs(Math.sin(f * 0.85)));
  const pid = `gh-${uid}`;
  const cid = `cl-${uid}`;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <defs>
        <pattern id={pid} width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="12" height="12" fill="#fff" />
          <path d="M0 0h6v6H0zM6 6h6v6H6z" fill="#dc2626" />
        </pattern>
        <clipPath id={cid}>
          <circle cx="100" cy="100" r="100" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${cid})`}>
        <circle cx="100" cy="100" r="100" fill={kind === 'saudi' ? '#fef3c7' : '#d1fae5'} />
        {kind === 'saudi' ? (
          <>
            <path d="M44 92 Q40 150 22 200 L178 200 Q160 150 156 92 Z" fill={`url(#${pid})`} />
            <path d="M34 200 Q36 160 100 154 Q164 160 166 200Z" fill="#fff" stroke="#e2e8f0" strokeWidth="2" />
            <ellipse cx="100" cy="104" rx="37" ry="43" fill="#d9a066" />
            <path d="M64 108 Q68 150 100 153 Q132 150 136 108 Q128 132 100 134 Q72 132 64 108Z" fill="#3b2617" />
            <path d="M54 98 Q56 46 100 44 Q144 46 146 98 Q124 72 100 72 Q76 72 54 98Z" fill={`url(#${pid})`} />
            <ellipse cx="100" cy="60" rx="42" ry="11" fill="none" stroke="#111827" strokeWidth="6" />
            <ellipse cx="100" cy="54" rx="38" ry="9" fill="none" stroke="#111827" strokeWidth="5" />
            <path d="M78 90 h14 M108 90 h14" stroke="#3b2617" strokeWidth="4" strokeLinecap="round" />
            <circle cx="86" cy="101" r="4.5" fill="#1f2937" />
            <circle cx="114" cy="101" r="4.5" fill="#1f2937" />
            <ellipse cx="100" cy="124" rx="9" ry={mouth} fill="#7f1d1d" />
          </>
        ) : (
          <>
            <path d="M30 200 Q34 158 100 152 Q166 158 170 200Z" fill={C.green} />
            <path d="M82 154 L100 176 L118 154 Z" fill="#fff" />
            <ellipse cx="100" cy="104" rx="36" ry="42" fill="#a86b3c" />
            <path d="M64 92 Q62 66 100 64 Q138 66 136 92 Q120 80 100 80 Q80 80 64 92Z" fill="#111827" />
            <path d="M60 82 Q62 44 100 42 Q138 44 140 82Z" fill="#0f766e" />
            <path d="M56 84 Q100 74 156 84 Q158 94 144 92 Q100 84 60 92Z" fill="#115e59" />
            <circle cx="100" cy="62" r="9" fill="#fff" />
            <text x="100" y="67" fontSize="13" fontWeight="800" textAnchor="middle" fill="#0f766e" fontFamily="Arial">
              J
            </text>
            <path d="M80 94 h12 M108 94 h12" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
            <circle cx="86" cy="104" r="4.5" fill="#1f2937" />
            <circle cx="114" cy="104" r="4.5" fill="#1f2937" />
            <path d="M86 117 Q100 110 114 117 Q100 121 86 117Z" fill="#1f1308" />
            <ellipse cx="100" cy="128" rx="8" ry={mouth} fill="#7f1d1d" />
          </>
        )}
      </g>
    </svg>
  );
};

const Mic: React.FC<{size: number; color: string}> = ({size, color}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="2" width="6" height="12" rx="3" fill={color} />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v4M8 22h8" />
  </svg>
);

// ───────────── stage ─────────────
const Stage: React.FC<{d: Dialog; lang: Lang; T: TL}> = ({d, lang, T}) => {
  const f = useCurrentFrame();
  const {W, H, mode, s} = useL();
  const u = DUI[lang];
  const wide = mode === 'wide';
  const tall = mode === 'tall';

  // layout anchors (fractions of W/H) per format
  const L = {
    tall: {wmX: 0.5, wmY: 0.055, hookAvY: 0.38, hookAv: 320, avY: 0.175, av: 210, avDX: 0.2, avX: 0.5, badgeY: 0.2, hookTextY: 0.57, pillY: 0.3, chatL: 0.05, chatR: 0.95, chatT: 0.335, k: 1.06},
    feed: {wmX: 0.5, wmY: 0.04, hookAvY: 0.36, hookAv: 260, avY: 0.165, av: 140, avDX: 0.2, avX: 0.5, badgeY: 0.17, hookTextY: 0.6, pillY: 0.265, chatL: 0.05, chatR: 0.95, chatT: 0.3, k: 0.92},
    wide: {wmX: 0.21, wmY: 0.07, hookAvY: 0.42, hookAv: 260, avY: 0.42, av: 200, avDX: 0.09, avX: 0.21, badgeY: 0.16, hookTextY: 0.72, pillY: 0.66, chatL: 0.42, chatR: 0.95, chatT: 0.045, k: 0.84},
  }[mode];

  const hookEnd = T.hook.dur;
  const hookOut = 1 - ease(f, hookEnd - 10, hookEnd, EASE_IO);
  const toHeader = ease(f, hookEnd - 12, hookEnd + 10);
  const endOut = 1 - ease(f, T.outro.from - 8, T.outro.from + 4, EASE_IO);

  // which round / event is active
  const rIdx = T.rounds.findIndex((r) => f >= r.from && f < r.from + r.dur);
  const round = rIdx >= 0 ? T.rounds[rIdx] : null;
  const lf = round ? f - round.from : 0;

  // who is talking (audio playing) / whose turn (silent pause)
  let talkThem = 0;
  let talkYou = 0;
  let youTurn = 0;
  if (round) {
    for (const e of round.evs) {
      const on = lin(lf, e.at - 2, e.at + 3) * (1 - lin(lf, e.at + e.dur, e.at + e.dur + 6));
      if (e.silent) youTurn = Math.max(youTurn, on);
      else if (d.lines[e.line].who === 'them') talkThem = Math.max(talkThem, on);
      else talkYou = Math.max(talkYou, on);
    }
  }

  // avatar positions: big in the hook, small header during rounds
  const av = interpolate(toHeader, [0, 1], [L.hookAv, L.av]) * s;
  const avY = interpolate(toHeader, [0, 1], [L.hookAvY, L.avY]) * H;
  const avCX = interpolate(toHeader, [0, 1], [0.5, L.avX]) * W;
  const avDX = interpolate(toHeader, [0, 1], [wide ? 0.1 : 0.22, L.avDX]) * W;
  const avIn = (i: number) => pop(f, 4 + i * 6, 20);

  const wm = ease(f, 6, 20) * endOut;
  const hookWords = d.hook[lang].split(' ');
  const hookSize = (wide ? 72 : tall ? 80 : 70) * s;

  const people = [
    {kind: d.themKind, name: d.them[lang], x: avCX - avDX, talk: talkThem, turn: 0},
    {kind: d.youKind, name: d.you[lang], x: avCX + avDX, talk: talkYou, turn: youTurn},
  ];

  return (
    <AbsoluteFill>
      {/* watermark */}
      <div style={{...abs, top: L.wmY * H, left: L.wmX * W, transform: 'translateX(-50%)', opacity: wm}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14 * s, background: 'rgba(255,255,255,0.85)', border: `1px solid ${C.line}`, borderRadius: 40 * s, padding: `${8 * s}px ${22 * s}px ${8 * s}px ${10 * s}px`, whiteSpace: 'nowrap'}}>
          <Logo size={52 * s} />
          <span style={{fontSize: 36 * s, fontWeight: 700, color: C.ink}}>Lahjio</span>
          <span style={{fontSize: 30 * s, fontWeight: 600, color: C.muted}}>· {u.series}</span>
        </div>
      </div>

      {/* hook: badge + question */}
      {f < hookEnd + 2 ? (
        <AbsoluteFill style={{opacity: hookOut}}>
          <div style={{...abs, top: L.badgeY * H, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
            <div style={{transform: `translateY(-50%) scale(${pop(f, 2, 18)})`, background: GRAD, color: '#fff', borderRadius: 40 * s, padding: `${10 * s}px ${34 * s}px`, fontSize: 46 * s, fontWeight: 700, boxShadow: '0 12px 28px rgba(5,150,105,0.3)'}}>
              {u.badge(num(d.id, lang))}
            </div>
          </div>
          <div style={{...abs, top: L.hookTextY * H, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', columnGap: 0.26 * hookSize, maxWidth: (wide ? 0.62 : 0.88) * W, fontSize: hookSize, fontWeight: 700, color: C.ink, lineHeight: 1.3}}>
              {hookWords.map((w, i) => {
                const q = pop(f, 16 + i * 4, 18);
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

      {/* the two people */}
      {people.map((p, i) => {
        const q = avIn(i);
        const bob = 1 + 0.035 * p.talk * Math.sin(f * 0.5);
        const ring = Math.max(p.talk, p.turn);
        return (
          <div key={i} style={{...abs, left: p.x, top: avY, transform: `translate(-50%,-50%) scale(${Math.max(0, q) * bob})`, opacity: endOut, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{position: 'relative', borderRadius: '50%', boxShadow: `0 ${14 * s}px ${30 * s}px rgba(15,23,42,0.14), 0 0 0 ${(4 + 10 * ring) * s}px ${p.turn > 0.05 ? 'rgba(20,184,166,0.45)' : i === 0 ? 'rgba(245,158,11,0.35)' : 'rgba(5,150,105,0.35)'}`}}>
              <Person kind={p.kind} size={av} talk={p.talk} f={f} uid={`p${i}`} />
              {p.turn > 0.01 ? (
                <div style={{...abs, right: -av * 0.06, bottom: -av * 0.02, width: av * 0.36, height: av * 0.36, borderRadius: '50%', background: GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${p.turn * (1 + 0.08 * Math.sin(f * 0.4))})`, boxShadow: '0 8px 18px rgba(5,150,105,0.4)'}}>
                  <Mic size={av * 0.2} color="#fff" />
                </div>
              ) : null}
            </div>
            <div style={{marginTop: 12 * s, opacity: toHeader, fontSize: (wide ? 34 : 32) * s * (tall ? 1 : 0.95), fontWeight: 700, color: i === 0 ? '#92400e' : C.green7, background: i === 0 ? '#fef3c7' : C.g50, borderRadius: 24 * s, padding: `${2 * s}px ${18 * s}px`, whiteSpace: 'nowrap'}}>
              {p.name}
            </div>
          </div>
        );
      })}

      {/* round pill + progress */}
      {round ? <RoundPill idx={rIdx} lf={lf} dur={round.dur} lang={lang} y={L.pillY * H} x={wide ? L.avX * W : W / 2} /> : null}

      {/* chat */}
      {round ? <Chat d={d} lang={lang} r={rIdx} evs={round.evs} lf={lf} dur={round.dur} box={{l: L.chatL * W, r: L.chatR * W, t: L.chatT * H}} k={L.k} /> : null}

      {f >= T.outro.from ? <Outro lang={lang} local={f - T.outro.from} /> : null}
    </AbsoluteFill>
  );
};

const RoundPill: React.FC<{idx: number; lf: number; dur: number; lang: Lang; x: number; y: number}> = ({idx, lf, dur, lang, x, y}) => {
  const {s} = useL();
  const u = DUI[lang];
  const q = pop(lf, 2, 18);
  const out = 1 - ease(lf, dur - 8, dur, EASE_IO);
  return (
    <div style={{...abs, left: x, top: y, transform: `translate(-50%,-50%) scale(${Math.max(0, q)})`, opacity: out, display: 'flex', alignItems: 'center', gap: 16 * s, whiteSpace: 'nowrap'}}>
      <div style={{background: C.ink, color: '#fff', borderRadius: 30 * s, padding: `${6 * s}px ${20 * s}px`, fontSize: 34 * s, fontWeight: 700}}>
        {u.round} {num(idx + 1, lang)}/{num(3, lang)}
      </div>
      <div style={{background: idx === 2 ? GRAD : '#fff', color: idx === 2 ? '#fff' : C.ink, border: idx === 2 ? 'none' : `1px solid ${C.line}`, borderRadius: 30 * s, padding: `${6 * s}px ${24 * s}px`, fontSize: 38 * s, fontWeight: 700, boxShadow: '0 8px 20px rgba(15,23,42,0.08)'}}>
        {u.rounds[idx]}
      </div>
    </div>
  );
};

const Chat: React.FC<{d: Dialog; lang: Lang; r: number; evs: Ev[]; lf: number; dur: number; box: {l: number; r: number; t: number}; k: number}> = ({d, lang, r, evs, lf, dur, box, k}) => {
  const {s, mode} = useL();
  const z = s * k;
  const out = 1 - ease(lf, dur - 10, dur, EASE_IO);
  const sub = r >= 1;
  const u = DUI[lang];
  return (
    <div style={{...abs, left: box.l, width: box.r - box.l, top: box.t, display: 'flex', flexDirection: 'column', gap: 22 * z, opacity: out, transform: `translateY(${(1 - out) * -40 * s}px)`}}>
      {evs.map((e) => {
        if (lf < e.at - 3) return null;
        const l = d.lines[e.line];
        const me = l.who === 'you';
        const q = pop(lf, e.at - 3, 16);
        const playing = lin(lf, e.at - 2, e.at + 3) * (1 - lin(lf, e.at + e.dur, e.at + e.dur + 6));
        const silent = e.silent;
        const left = 1 - lin(lf, e.at, e.at + e.dur); // countdown for the viewer's turn
        const bg = silent ? C.g50 : me ? GRAD_CARD : '#fff';
        const fg = silent ? C.green7 : me ? '#fff' : C.ink;
        const fg2 = silent ? C.green : me ? 'rgba(255,255,255,0.88)' : C.muted;
        return (
          <div
            key={e.line}
            style={{
              alignSelf: me ? 'flex-end' : 'flex-start',
              maxWidth: mode === 'wide' ? '88%' : '92%',
              position: 'relative',
              background: bg,
              color: fg,
              border: silent ? `${4 * z}px dashed ${C.teal}` : me ? 'none' : `${2 * z}px solid #fde68a`,
              borderRadius: 38 * z,
              borderBottomRightRadius: me ? 10 * z : 38 * z,
              borderBottomLeftRadius: me ? 38 * z : 10 * z,
              padding: `${14 * z}px ${34 * z}px ${(sub ? 18 : 14) * z}px`,
              boxShadow: me && !silent ? `0 ${14 * z}px ${30 * z}px rgba(5,150,105,0.28)` : `0 ${10 * z}px ${24 * z}px rgba(15,23,42,0.08)`,
              transform: `scale(${Math.max(0, q)}) scale(${1 + 0.02 * playing})`,
              transformOrigin: me ? '100% 100%' : '0% 100%',
              textAlign: me ? 'right' : 'left',
              overflow: 'hidden',
            }}
          >
            {silent ? (
              <div style={{display: 'flex', alignItems: 'center', gap: 10 * z, justifyContent: 'flex-end', fontSize: 32 * z, fontWeight: 700, color: C.teal}}>
                <Mic size={32 * z} color={C.teal} />
                {u.youSay}
              </div>
            ) : null}
            <div style={{direction: 'rtl', textAlign: me ? 'right' : 'left', whiteSpace: 'nowrap'}}>
              <ArText size={(sub ? 66 : 76) * z} color={fg}>
                {l.ar}
              </ArText>
            </div>
            {sub ? (
              <>
                <div style={{fontSize: 36 * z, fontWeight: 600, color: fg2, lineHeight: 1.25, marginTop: -2 * z}}>{l.tr[lang]}</div>
                <div style={{fontSize: 44 * z, fontWeight: 700, color: fg, lineHeight: 1.25, marginTop: 6 * z}}>{l.mean[lang]}</div>
              </>
            ) : null}
            {silent ? <div style={{...abs, left: 0, bottom: 0, height: 8 * z, width: `${left * 100}%`, background: GRAD}} /> : null}
          </div>
        );
      })}
    </div>
  );
};
