import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Copy, Lang} from './copy';
import {ArText, Check, GradText, Logo, PhoneQuiz, Speaker, Wave, useLayout} from './parts';
import {C, EASE_IO, FBN, GRAD, ease, exitOf, lin, mulberry32, num, pop} from './theme';

type P = {t: Copy; lang: Lang; dur: number};

const center: React.CSSProperties = {position: 'absolute', left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'};

// ───────────────────────── 1. HOOK ─────────────────────────
export const Hook: React.FC<P> = ({t, dur}) => {
  const f = useCurrentFrame();
  const {W, H, V, s} = useLayout();
  const out = exitOf(f, dur);
  const words = t.hook1.split(' ');
  const l2 = ease(f, 44, 66);
  const head = (V ? 108 : 112) * s;
  // situation chips with Arabic speech bubbles
  const chipPos = V
    ? [
        {x: 250, y: 330, r: -6},
        {x: 800, y: 470, r: 5},
        {x: 540, y: 1520, r: -3},
      ]
    : [
        {x: 330, y: 230, r: -6},
        {x: 1600, y: 300, r: 5},
        {x: 1450, y: 850, r: -4},
      ];
  return (
    <AbsoluteFill style={{opacity: out, transform: `scale(${0.96 + 0.04 * out})`}}>
      {t.chips.map((c, i) => {
        const p = pop(f, 18 + i * 8, 22);
        const from = mulberry32(i + 3)();
        const pos = chipPos[i];
        const bob = Math.sin((f + i * 20) / 16) * 8 * s;
        const dx = (pos.x * s - (V ? W / 2 : W / 2)) * 0.6 * (1 - p);
        const dy = 300 * s * (1 - p);
        const q = pop(f, 34 + i * 8, 16);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: pos.x * (V ? s : W / 1920),
              top: pos.y * (V ? H / 1920 : s),
              transform: `translate(-50%,-50%) translate(${dx}px, ${dy + bob}px) rotate(${pos.r + (1 - p) * (from * 40 - 20)}deg) scale(${Math.max(0, p) * (V ? 1.25 : 1)})`,
              opacity: Math.min(1, p * 2),
            }}
          >
            {/* bubble */}
            <div
              style={{
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                marginBottom: 14 * s,
                transform: `translateX(-50%) scale(${Math.max(0, q)})`,
                transformOrigin: 'bottom center',
                background: C.ink,
                color: '#fff',
                borderRadius: 22 * s,
                padding: `${6 * s}px ${22 * s}px`,
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: 12 * s,
              }}
            >
              <ArText size={40 * s} color="#fff" weight={600}>
                {c.ar}
              </ArText>
              <span style={{fontFamily: FBN, fontSize: 40 * s, fontWeight: 700, color: '#fca5a5'}}>?</span>
            </div>
            <div
              style={{
                background: '#fff',
                borderRadius: 28 * s,
                padding: `${16 * s}px ${28 * s}px`,
                display: 'flex',
                alignItems: 'center',
                gap: 14 * s,
                boxShadow: '0 18px 40px rgba(15,23,42,0.12)',
                border: `1px solid ${C.line}`,
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{fontSize: 52 * s}}>{c.emoji}</span>
              <span style={{fontFamily: FBN, fontSize: 38 * s, fontWeight: 700, color: C.ink}}>{c.label}</span>
            </div>
          </div>
        );
      })}
      <div style={{...center, top: V ? 760 * (H / 1920) : 380 * s, fontFamily: FBN}}>
        <div style={{display: 'flex', gap: 0.28 * head, fontSize: head, fontWeight: 700, color: C.ink, lineHeight: 1.25, flexWrap: 'wrap', justifyContent: 'center', padding: `0 ${60 * s}px`}}>
          {words.map((w, i) => {
            const p = pop(f, 4 + i * 6, 20);
            return (
              <span key={i} style={{display: 'inline-block', transform: `translateY(${(1 - p) * 70 * s}px) scale(${0.8 + 0.2 * p})`, opacity: Math.min(1, p * 1.5)}}>
                {w}
              </span>
            );
          })}
        </div>
        <div
          style={{
            marginTop: 18 * s,
            fontSize: head * 0.82,
            fontWeight: 700,
            color: C.body,
            lineHeight: 1.3,
            opacity: l2,
            transform: `translateY(${(1 - l2) * 40 * s}px)`,
            padding: `0 ${60 * s}px`,
          }}
        >
          <GradText>{t.hook2a}</GradText>
          {t.hook2b}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ───────────────────────── 2. BRAND ─────────────────────────
export const Brand: React.FC<P> = ({t, dur}) => {
  const f = useCurrentFrame();
  const {V, s, H} = useLayout();
  const out = exitOf(f, dur, 10);
  const stamp = ease(f, 0, 14, EASE_IO);
  const logoScale = interpolate(stamp, [0, 1], [1.7, 1]) * (1 + 0.04 * Math.sin(Math.PI * lin(f, 14, 22)) * -1);
  const word = ease(f, 14, 34);
  const tag = ease(f, 30, 50);
  const logo = (V ? 300 : 230) * s;
  return (
    <AbsoluteFill style={{opacity: out}}>
      <div style={{...center, top: 0, bottom: 0, justifyContent: 'center', fontFamily: FBN, transform: `scale(${1 + 0.06 * (1 - out)})`}}>
        <div style={{transform: `scale(${logoScale})`, opacity: stamp, filter: `drop-shadow(0 ${24 * s}px ${40 * s}px rgba(5,150,105,0.35))`}}>
          <Logo size={logo} wave={lin(f, 14, 34)} />
        </div>
        <div
          style={{
            marginTop: 34 * s,
            fontSize: (V ? 150 : 130) * s,
            fontWeight: 700,
            color: C.ink,
            letterSpacing: `${interpolate(word, [0, 1], [0.4, -0.02])}em`,
            opacity: word,
            lineHeight: 1,
          }}
        >
          Lahjio
        </div>
        <div
          style={{
            marginTop: 30 * s,
            fontSize: (V ? 64 : 56) * s,
            fontWeight: 600,
            color: C.body,
            opacity: tag,
            transform: `translateY(${(1 - tag) * 30 * s}px)`,
            padding: `0 ${70 * s}px`,
            lineHeight: 1.35,
            maxWidth: V ? 1000 * s : 1500 * s,
          }}
        >
          {t.tagA}
          <GradText>{t.tagB}</GradText>
          {t.tagC}
        </div>
      </div>
      {/* hidden: H referenced for lint */}
      <div style={{display: 'none'}}>{H}</div>
    </AbsoluteFill>
  );
};

// ───────────────────────── 3. QUIZ (hero) ─────────────────────────
export const QUIZ_AUDIO_AT = 50;
export const QUIZ_TAP_AT = 118;
export const Quiz: React.FC<P & {audioAt?: number; tapAt?: number}> = ({t, lang, dur, audioAt = QUIZ_AUDIO_AT, tapAt = QUIZ_TAP_AT}) => {
  const f = useCurrentFrame();
  const {W, H, V, s} = useLayout();
  const out = exitOf(f, dur);
  const e = ease(f, 0, 40);
  const zoom = V ? 1.5 * s : 1.06 * s;
  const phoneW = 420 * zoom;
  const phoneH = 860 * zoom;
  const px = V ? W / 2 - phoneW / 2 : W * 0.66 - phoneW / 2;
  const py = V ? H - phoneH - 120 * (H / 1920) : H / 2 - phoneH / 2;
  const float = Math.sin(f / 22) * 6 * s * e;
  // finger tap
  const fingerIn = ease(f, tapAt - 22, tapAt - 4);
  const fingerOut = 1 - ease(f, tapAt + 14, tapAt + 26);
  const tapDown = tapAt <= f && f < tapAt + 6 ? 0.85 : 1;
  const ripple = lin(f, tapAt, tapAt + 16);
  // option 1 centre in phone coords: x 210, y ~ 12+... ≈ 508
  const optX = px + 210 * zoom;
  const optY = py + float + 464 * zoom;
  // XP chip
  const xp = ease(f, tapAt + 6, tapAt + 30);
  const xpFade = 1 - lin(f, tapAt + 50, tapAt + 62);
  // captions
  const c1 = ease(f, 10, 30) * (1 - ease(f, tapAt - 14, tapAt - 4));
  const c2 = ease(f, tapAt + 4, tapAt + 24);
  const capBox: React.CSSProperties = V
    ? {position: 'absolute', left: 0, right: 0, top: 150 * (H / 1920), textAlign: 'center'}
    : {position: 'absolute', left: 150 * s, top: H / 2 - 160 * s, width: 820 * s, textAlign: 'left'};
  const capT = (V ? 76 : 70) * s;
  const capS = (V ? 104 : 96) * s;
  const Cap = ({a, b, o, icon}: {a: string; b: string; o: number; icon: React.ReactNode}) => (
    <div style={{...capBox, opacity: o, transform: `translateY(${(1 - o) * 30 * s}px)`, fontFamily: FBN}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 18 * s, justifyContent: V ? 'center' : 'flex-start', fontSize: capT, fontWeight: 600, color: C.body}}>
        {icon}
        {a}
      </div>
      <div style={{fontSize: capS, fontWeight: 700, lineHeight: 1.2, marginTop: 6 * s}}>
        <GradText>{b}</GradText>
      </div>
    </div>
  );
  return (
    <AbsoluteFill style={{opacity: out}}>
      <Cap
        a={t.cap1Title}
        b={t.cap1Sub}
        o={c1}
        icon={
          <span style={{width: capT * 1.1, height: capT * 1.1, borderRadius: 99, background: C.g50, display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>
            <Speaker size={capT * 0.66} color={C.green} />
          </span>
        }
      />
      <Cap a={t.cap2Title} b={t.cap2Sub} o={c2} icon={<Check size={capT * 1.1} />} />
      <div style={{position: 'absolute', left: px, top: py, perspective: 2200 * s}}>
        <div
          style={{
            transform: `translateY(${(1 - e) * 700 * s + float}px) rotateY(${(1 - e) * -32}deg) rotateX(${(1 - e) * 14}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <div style={{zoom}}>
            <PhoneQuiz lang={lang} label={t.quizLabel} translit={t.translit} options={t.options} next={t.next} local={f} audioAt={audioAt} tapAt={tapAt} />
          </div>
        </div>
      </div>
      {/* finger */}
      <div
        style={{
          position: 'absolute',
          left: optX + 90 * zoom,
          top: optY + 4 * zoom,
          opacity: fingerIn * fingerOut,
          transform: `translate(-50%,-50%) translate(${(1 - fingerIn) * 160 * s}px, ${(1 - fingerIn) * 220 * s}px) scale(${tapDown})`,
        }}
      >
        <div style={{position: 'absolute', left: '50%', top: '50%', width: 150 * s, height: 150 * s, marginLeft: -75 * s, marginTop: -75 * s, borderRadius: 999, border: `${4 * s}px solid ${C.green}`, opacity: (1 - ripple) * (ripple > 0 ? 1 : 0), transform: `scale(${0.3 + ripple})`}} />
        <div style={{width: 70 * s, height: 70 * s, borderRadius: 999, background: 'rgba(15,23,42,0.28)', border: `${4 * s}px solid rgba(255,255,255,0.9)`, boxShadow: '0 8px 20px rgba(15,23,42,0.25)'}} />
      </div>
      {/* +10 XP */}
      <div
        style={{
          position: 'absolute',
          left: px + phoneW + (V ? -60 : 10) * s,
          top: optY - 40 * s - xp * 160 * s,
          opacity: xp * xpFade,
          transform: `translate(-50%,-50%) scale(${pop(f, tapAt + 6, 16)})`,
          background: GRAD,
          color: '#fff',
          fontFamily: FBN,
          fontWeight: 700,
          fontSize: 48 * s,
          padding: `${8 * s}px ${26 * s}px`,
          borderRadius: 999,
          boxShadow: '0 14px 30px rgba(5,150,105,0.35)',
          whiteSpace: 'nowrap',
        }}
      >
        +{num(10, lang)} XP
      </div>
    </AbsoluteFill>
  );
};

// ───────────────────────── 4. REAL LIFE CARDS ─────────────────────────
export const LIFE_AUDIO_AT = 92;
export const LIFE_DEAL_AT = 22;
export const LIFE_STAGGER = 8;
export const Life: React.FC<P & {audioAt?: number}> = ({t, dur, audioAt: LA = LIFE_AUDIO_AT}) => {
  const f = useCurrentFrame();
  const {W, H, V, s} = useLayout();
  const out = exitOf(f, dur);
  const title = ease(f, 0, 20);
  const cw = (V ? 450 : 390) * s;
  const ch = (V ? 470 : 440) * s;
  const gap = (V ? 40 : 36) * s;
  const slots = V
    ? [0, 1, 2, 3].map((i) => ({x: W / 2 + (i % 2 === 0 ? -1 : 1) * (cw / 2 + gap / 2), y: 1130 * (H / 1920) + (i < 2 ? -1 : 1) * (ch / 2 + gap / 2)}))
    : [0, 1, 2, 3].map((i) => ({x: W / 2 + (i - 1.5) * (cw + gap), y: H * 0.6}));
  const focus = ease(f, LA - 10, LA + 4) * (1 - ease(f, LA + 50, LA + 64));
  const playing = lin(f, LA, LA + 6) * (1 - lin(f, LA + 36, LA + 46));
  return (
    <AbsoluteFill style={{opacity: out}}>
      <div style={{...center, top: V ? 170 * (H / 1920) : 90 * s, fontFamily: FBN, opacity: title, transform: `translateY(${(1 - title) * 30 * s}px)`}}>
        <div style={{fontSize: (V ? 96 : 84) * s, fontWeight: 700, color: C.ink, lineHeight: 1.2}}>
          {t.lifeTitle} {V ? <br /> : null}
          <GradText>{t.lifeSub}</GradText>
        </div>
      </div>
      {t.cards.map((c, i) => {
        const st = LIFE_DEAL_AT + i * LIFE_STAGGER;
        const p = ease(f, st, st + 22, EASE_IO);
        const land = pop(f, st + 16, 12);
        const rnd = mulberry32(i * 7 + 11);
        const r0 = rnd() * 50 - 25;
        const slot = slots[i];
        const sx = W / 2;
        const sy = H + ch;
        const x = sx + (slot.x - sx) * p;
        const y = sy + (slot.y - sy) * p - Math.sin(Math.PI * p) * 160 * s;
        const isFocus = i === 3;
        const sc = (0.9 + 0.1 * land) * (isFocus ? 1 + 0.07 * focus : 1);
        const dim = isFocus ? 1 : 1 - 0.45 * focus;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x - cw / 2,
              top: y - ch / 2,
              width: cw,
              height: ch,
              opacity: (f >= st ? 1 : 0) * dim,
              transform: `rotate(${r0 * (1 - p)}deg) scale(${sc})`,
              background: '#fff',
              borderRadius: 36 * s,
              border: `${3 * s}px solid ${isFocus && focus > 0 ? `rgba(5,150,105,${focus})` : C.line}`,
              boxShadow: `0 ${20 * s}px ${50 * s}px rgba(15,23,42,${0.1 + 0.1 * (isFocus ? focus : 0)})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: FBN,
              zIndex: isFocus ? 2 : 1,
            }}
          >
            <div style={{width: 110 * s, height: 110 * s, borderRadius: 99, background: C.g50, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 60 * s}}>{c.emoji}</div>
            <div style={{fontSize: 34 * s, color: C.muted, fontWeight: 600, marginTop: 16 * s}}>{c.label}</div>
            <ArText size={(V ? 80 : 74) * s} color={C.green7}>
              {c.ar}
            </ArText>
            <div style={{fontSize: 42 * s, fontWeight: 700, color: C.ink, marginTop: -4 * s}}>{c.meaning}</div>
            <div
              style={{
                position: 'absolute',
                top: 22 * s,
                right: 22 * s,
                width: 58 * s,
                height: 58 * s,
                borderRadius: 99,
                background: isFocus && playing > 0 ? C.green : C.g50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `scale(${isFocus && playing > 0 ? 1 + 0.1 * Math.sin(f * 0.5) : 1})`,
              }}
            >
              <Speaker size={30 * s} color={isFocus && playing > 0 ? '#fff' : C.green} />
            </div>
            {isFocus ? (
              <div style={{position: 'absolute', bottom: 22 * s, opacity: playing}}>
                <Wave active={playing} color={C.green} h={34 * s} bars={9} seed={3} />
              </div>
            ) : null}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ───────────────────────── 5. HABIT ─────────────────────────
export const HABIT_COUNT_AT = 28;
export const Habit: React.FC<P> = ({t, lang, dur}) => {
  const f = useCurrentFrame();
  const {W, H, V, s} = useLayout();
  const out = exitOf(f, dur);
  const title = pop(f, 0, 20);
  const cnt = ease(f, HABIT_COUNT_AT, HABIT_COUNT_AT + 50, EASE_IO);
  const ww = (V ? 310 : 400) * s;
  const wh = (V ? 380 : 400) * s;
  const gap = (V ? 30 : 50) * s;
  const goal = cnt;
  const R = 70 * s;
  const circ = 2 * Math.PI * R;
  const widgets = [
    {
      big: (
        <div style={{display: 'flex', alignItems: 'center', gap: 8 * s}}>
          <span style={{fontSize: 80 * s, transform: `scale(${1 + 0.06 * Math.sin(f / 5)})`, display: 'inline-block'}}>🔥</span>
          <span style={{fontSize: 96 * s, fontWeight: 700, color: '#ea580c', fontVariantNumeric: 'tabular-nums'}}>{num(1 + 29 * cnt, lang)}</span>
        </div>
      ),
      label: t.streak,
    },
    {
      big: (
        <div style={{display: 'flex', alignItems: 'center', gap: 8 * s}}>
          <span style={{fontSize: (V ? 54 : 70) * s}}>⚡</span>
          <span style={{fontSize: (V ? 62 : 84) * s, fontWeight: 700, color: C.green7, fontVariantNumeric: 'tabular-nums'}}>{num(1250 * cnt, lang)}</span>
        </div>
      ),
      label: t.xp,
    },
    {
      big: (
        <div style={{position: 'relative', width: R * 2 + 24 * s, height: R * 2 + 24 * s}}>
          <svg width={R * 2 + 24 * s} height={R * 2 + 24 * s} style={{transform: 'rotate(-90deg)'}}>
            <circle cx={R + 12 * s} cy={R + 12 * s} r={R} stroke={C.line} strokeWidth={18 * s} fill="none" />
            <circle cx={R + 12 * s} cy={R + 12 * s} r={R} stroke="url(#gg)" strokeWidth={18 * s} fill="none" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - goal)} />
            <defs>
              <linearGradient id="gg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor={C.green} />
                <stop offset="1" stopColor={C.teal} />
              </linearGradient>
            </defs>
          </svg>
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {goal >= 0.999 ? (
              <div style={{transform: `scale(${pop(f, HABIT_COUNT_AT + 50, 14)})`}}>
                <Check size={74 * s} />
              </div>
            ) : (
              <span style={{fontSize: 44 * s, fontWeight: 700, color: C.ink}}>{num(goal * 100, lang)}%</span>
            )}
          </div>
        </div>
      ),
      label: t.goal,
    },
  ];
  const rowY = V ? 980 * (H / 1920) : H * 0.5;
  return (
    <AbsoluteFill style={{opacity: out, fontFamily: FBN}}>
      <div style={{...center, top: V ? 470 * (H / 1920) : 110 * s, transform: `scale(${0.85 + 0.15 * title})`, opacity: Math.min(1, title * 1.5)}}>
        <div style={{fontSize: (V ? 116 : 100) * s, fontWeight: 700, color: C.ink, lineHeight: 1.2, padding: `0 ${50 * s}px`}}>
          {t.habitA}
          <GradText>{t.habitB}</GradText>
        </div>
      </div>
      {widgets.map((w, i) => {
        const p = pop(f, 12 + i * 6, 20);
        const x = W / 2 + (i - 1) * (ww + gap);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x - ww / 2,
              top: rowY - wh / 2,
              width: ww,
              height: wh,
              background: '#fff',
              borderRadius: 36 * s,
              border: `1px solid ${C.line}`,
              boxShadow: `0 ${20 * s}px ${50 * s}px rgba(15,23,42,0.1)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 18 * s,
              opacity: Math.min(1, p * 2),
              transform: `translateY(${(1 - p) * 140 * s}px)`,
            }}
          >
            {w.big}
            <div style={{fontSize: 36 * s, fontWeight: 600, color: C.muted}}>{w.label}</div>
          </div>
        );
      })}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: rowY + wh / 2 + (V ? 90 : 60) * s,
          display: 'flex',
          flexDirection: V ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: (V ? 26 : 30) * s,
        }}
      >
        {t.pills.map((p, i) => {
          const q = pop(f, 70 + i * 7, 18);
          return (
            <div
              key={i}
              style={{
                transform: `scale(${Math.max(0, q)})`,
                background: C.g50,
                color: C.green7,
                border: `${2 * s}px solid rgba(5,150,105,0.25)`,
                borderRadius: 999,
                padding: `${12 * s}px ${36 * s}px`,
                fontSize: (V ? 50 : 42) * s,
                fontWeight: 700,
                whiteSpace: 'nowrap',
              }}
            >
              ✓ {p}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ───────────────────────── 6. OUTRO ─────────────────────────
export const OUTRO_SLAM_AT = 26;
export const OUTRO_AUDIO_AT = 44;
export const Outro: React.FC<P> = ({t, lang}) => {
  const f = useCurrentFrame();
  const {W, H, V, s} = useLayout();
  const slam = ease(f, OUTRO_SLAM_AT - 12, OUTRO_SLAM_AT, EASE_IO);
  const logoSc = interpolate(slam, [0, 1], [0.4, 1]) * (1 + 0.06 * Math.sin(Math.PI * lin(f, OUTRO_SLAM_AT, OUTRO_SLAM_AT + 10)) * -1);
  const txt = ease(f, OUTRO_SLAM_AT + 6, OUTRO_SLAM_AT + 26);
  const cta = pop(f, OUTRO_SLAM_AT + 18, 20);
  const breathe = f > OUTRO_SLAM_AT + 50 ? 1 + 0.03 * Math.sin((f - OUTRO_SLAM_AT - 50) / 7) : 1;
  const yalla = pop(f, OUTRO_AUDIO_AT - 4, 16);
  const yH = H / 1920;
  const xW = W / 1920;
  // group-photo chips flying in from four sides
  const chips: {node: React.ReactNode; x: number; y: number; fx: number; fy: number; r: number}[] = [
    {node: <ArText size={52 * s} color="#fff">كم السعر</ArText>, x: V ? 240 * s : 300 * xW, y: V ? 300 * yH : 230 * s, fx: -1, fy: -1, r: -8},
    {node: <span style={{fontSize: 54 * s, fontWeight: 700, color: '#ea580c'}}>🔥 {num(30, lang)}</span>, x: V ? 840 * s : 1640 * xW, y: V ? 330 * yH : 260 * s, fx: 1, fy: -1, r: 7},
    {node: <span style={{fontSize: 50 * s, fontWeight: 700, color: '#fff'}}>+{num(10, lang)} XP</span>, x: V ? 170 * s : 240 * xW, y: V ? 1560 * yH : 640 * s, fx: -1, fy: 1, r: 6},
    {node: <span style={{fontSize: 64 * s}}>🛒</span>, x: V ? 880 * s : 1700 * xW, y: V ? 1560 * yH : 600 * s, fx: 1, fy: 1, r: -6},
    {node: <span style={{fontSize: 64 * s}}>🚕</span>, x: V ? 380 * s : 480 * xW, y: V ? 1760 * yH : 900 * s, fx: -1, fy: 1, r: -10},
    {node: <ArText size={52 * s} color={C.green7}>شكراً</ArText>, x: V ? 760 * s : 1460 * xW, y: V ? 1780 * yH : 900 * s, fx: 1, fy: 1, r: 8},
  ];
  const chipBg = ['green', 'white', 'grad', 'white', 'white', 'white'];
  return (
    <AbsoluteFill style={{fontFamily: FBN}}>
      {chips.map((c, i) => {
        const p = ease(f, 2 + i * 3, 26 + i * 2);
        const bob = Math.sin((f + i * 13) / 18) * 7 * s * p;
        const bg = chipBg[i] === 'green' ? C.green : chipBg[i] === 'grad' ? GRAD : '#fff';
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: c.x,
              top: c.y,
              transform: `translate(-50%,-50%) translate(${c.fx * (1 - p) * 700 * s}px, ${c.fy * (1 - p) * 500 * s + bob}px) rotate(${c.r + (1 - p) * c.fx * 40}deg)`,
              background: bg,
              borderRadius: 30 * s,
              padding: `${14 * s}px ${30 * s}px`,
              boxShadow: '0 18px 40px rgba(15,23,42,0.14)',
              border: chipBg[i] === 'white' ? `1px solid ${C.line}` : 'none',
              whiteSpace: 'nowrap',
              opacity: Math.min(1, p * 3),
            }}
          >
            {c.node}
          </div>
        );
      })}
      <div style={{...center, top: 0, bottom: 0, justifyContent: 'center'}}>
        <div
          style={{
            transform: `scale(${Math.max(0, yalla)})`,
            opacity: Math.min(1, yalla * 2),
            background: C.ink,
            borderRadius: 28 * s,
            padding: `${4 * s}px ${30 * s}px`,
            marginBottom: 30 * s,
            display: 'flex',
            alignItems: 'center',
            gap: 14 * s,
          }}
        >
          <Speaker size={34 * s} color={C.mint} />
          <ArText size={50 * s} color="#fff">
            يلا نبدأ
          </ArText>
        </div>
        <div style={{transform: `scale(${logoSc})`, opacity: slam, filter: `drop-shadow(0 ${20 * s}px ${36 * s}px rgba(5,150,105,0.35))`}}>
          <Logo size={(V ? 220 : 180) * s} wave={lin(f, OUTRO_SLAM_AT, OUTRO_SLAM_AT + 18)} />
        </div>
        <div style={{fontSize: (V ? 110 : 96) * s, fontWeight: 700, color: C.ink, marginTop: 18 * s, opacity: slam, lineHeight: 1}}>Lahjio</div>
        <div
          style={{
            fontSize: (V ? 70 : 62) * s,
            fontWeight: 700,
            color: C.body,
            marginTop: 26 * s,
            opacity: txt,
            transform: `translateY(${(1 - txt) * 26 * s}px)`,
            padding: `0 ${60 * s}px`,
            lineHeight: 1.3,
          }}
        >
          {t.outroTitle}
        </div>
        <div
          style={{
            marginTop: 40 * s,
            transform: `scale(${Math.max(0, cta) * breathe})`,
            background: C.green,
            color: '#fff',
            fontSize: (V ? 64 : 56) * s,
            fontWeight: 700,
            borderRadius: 26 * s,
            padding: `${18 * s}px ${64 * s}px`,
            boxShadow: `0 ${10 * s}px 0 ${C.green7}, 0 ${24 * s}px ${50 * s}px rgba(5,150,105,0.35)`,
          }}
        >
          {t.cta} →
        </div>
        <div style={{marginTop: 34 * s, fontSize: (V ? 56 : 48) * s, fontWeight: 700, color: C.green7, opacity: txt, letterSpacing: '0.01em'}}>lahjio.com</div>
        <div style={{marginTop: 8 * s, fontSize: (V ? 36 : 32) * s, fontWeight: 500, color: C.muted, opacity: txt}}>{t.free}</div>
      </div>
    </AbsoluteFill>
  );
};
