// "Learn Saudi Arabic in English" — for English speakers from anywhere (Philippines, India, UK, USA, ...)
// English only, ElevenLabs narrator "Sarah – Warm & Conversational". 9:16 / 4:5 / 16:9.
import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {ArText, Background, Check, GradText, Logo, Speaker, useLayout} from '../parts';
import {Habit, Life, Outro, OUTRO_AUDIO_AT, OUTRO_SLAM_AT, Quiz} from '../scenes';
import {C, EASE_IO, FBN, GRAD, ease, exitOf, lin, mulberry32, pop} from '../theme';
import {GLOBAL as t} from './GlobalCopy';

const F = (sec: number) => Math.ceil(sec * 30);

// Narrator clips; lengths measured with ffprobe
export const G_VO = {
  hook: {src: 'audio/global/l1-hook.mp3', sec: 3.97},
  cities: {src: 'audio/global/l2-cities.mp3', sec: 8.36},
  real: {src: 'audio/global/l3-real.mp3', sec: 6.35},
  listen: {src: 'audio/global/l4-listen.mp3', sec: 3.87},
  means: {src: 'audio/global/l5-means.mp3', sec: 4.28},
  lessons: {src: 'audio/global/l6-lessons.mp3', sec: 5.33},
  habit: {src: 'audio/global/l7-habit.mp3', sec: 5.33},
  devices: {src: 'audio/global/l8-devices.mp3', sec: 6.03},
};

// Scene-local timing
const VO_IN = 6; // narrator starts this many frames into a scene
const Q_AUDIO = VO_IN + F(G_VO.listen.sec) + 4; // Saudi "kam as-si'r" plays
const Q_TAP = Q_AUDIO + 40;
const Q_MEANS = Q_TAP + 10;
const L_AUDIO = 20 + F(G_VO.lessons.sec) + 6; // "kef halak" after the narrator line

export const G_SHOTS = (() => {
  const d = {
    hook: VO_IN + F(G_VO.hook.sec) + 14,
    cities: VO_IN + F(G_VO.cities.sec) + 22,
    real: VO_IN + F(G_VO.real.sec) + 16,
    quiz: Q_MEANS + F(G_VO.means.sec) + 18,
    life: L_AUDIO + 60,
    habit: VO_IN + F(G_VO.habit.sec) + 18,
    devices: VO_IN + F(G_VO.devices.sec) + 16,
    outro: 180,
  };
  let at = 0;
  const out = {} as Record<keyof typeof d, {from: number; dur: number}>;
  (Object.keys(d) as (keyof typeof d)[]).forEach((k) => {
    out[k] = {from: at, dur: d[k]};
    at += d[k];
  });
  return {...out, total: at};
})();

const center: React.CSSProperties = {position: 'absolute', left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'};

// ───────── flags (SVG, since flag emoji don't render on Windows) ─────────
const Flag: React.FC<{code: 'in' | 'ph' | 'gb' | 'us'; w: number}> = ({code, w}) => {
  const h = (w * 2) / 3;
  const box = (k: React.ReactNode) => (
    <svg width={w} height={h} viewBox="0 0 60 40" style={{display: 'block', borderRadius: w * 0.06, boxShadow: '0 4px 12px rgba(15,23,42,0.18)'}}>
      {k}
    </svg>
  );
  if (code === 'in')
    return box(
      <>
        <rect width="60" height="13.34" fill="#FF9933" />
        <rect y="13.33" width="60" height="13.34" fill="#fff" />
        <rect y="26.66" width="60" height="13.34" fill="#138808" />
        <circle cx="30" cy="20" r="5" fill="none" stroke="#000080" strokeWidth="1" />
        {Array.from({length: 12}).map((_, i) => {
          const a = (i * Math.PI) / 12;
          return <line key={i} x1={30 - 5 * Math.cos(a)} y1={20 - 5 * Math.sin(a)} x2={30 + 5 * Math.cos(a)} y2={20 + 5 * Math.sin(a)} stroke="#000080" strokeWidth="0.5" />;
        })}
      </>,
    );
  if (code === 'ph')
    return box(
      <>
        <rect width="60" height="20" fill="#0038A8" />
        <rect y="20" width="60" height="20" fill="#CE1126" />
        <polygon points="0,0 34.6,20 0,40" fill="#fff" />
        <circle cx="11.5" cy="20" r="4" fill="#FCD116" />
        {Array.from({length: 8}).map((_, i) => {
          const a = (i * Math.PI) / 4;
          return <line key={i} x1={11.5 + 4.5 * Math.cos(a)} y1={20 + 4.5 * Math.sin(a)} x2={11.5 + 7 * Math.cos(a)} y2={20 + 7 * Math.sin(a)} stroke="#FCD116" strokeWidth="1.4" />;
        })}
        <circle cx="3.6" cy="4" r="1.5" fill="#FCD116" />
        <circle cx="3.6" cy="36" r="1.5" fill="#FCD116" />
        <circle cx="29" cy="20" r="1.5" fill="#FCD116" />
      </>,
    );
  if (code === 'gb')
    return box(
      <>
        <rect width="60" height="40" fill="#012169" />
        <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8" />
        <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="2.6" />
        <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="12" />
        <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="7" />
      </>,
    );
  return box(
    <>
      {Array.from({length: 13}).map((_, i) => (
        <rect key={i} y={(i * 40) / 13} width="60" height={40 / 13 + 0.05} fill={i % 2 ? '#fff' : '#B22234'} />
      ))}
      <rect width="26" height={(7 * 40) / 13} fill="#3C3B6E" />
      {Array.from({length: 20}).map((_, i) => (
        <circle key={i} cx={2.6 + (i % 5) * 5.2 + (Math.floor(i / 5) % 2) * 2.6} cy={2.6 + Math.floor(i / 5) * 5.2} r="0.95" fill="#fff" />
      ))}
    </>,
  );
};

// ───────── 1. HOOK: moving to Saudi? ─────────
const Hook: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const {W, H, V, s} = useLayout();
  const out = exitOf(f, dur);
  const big = (V ? 124 : 118) * s;
  const l3 = ease(f, VO_IN + 58, VO_IN + 78);
  // plane on a dotted arc
  const pp = ease(f, 0, 70, EASE_IO);
  const arc = (p: number) => {
    const x = interpolate(p, [0, 1], [-0.1 * W, 1.1 * W]);
    const y = (V ? 0.3 : 0.2) * H - Math.sin(Math.PI * p) * (V ? 0.12 : 0.12) * H + (V ? 0.05 : 0.1) * H;
    return {x, y};
  };
  const dots = Array.from({length: 26}).map((_, i) => i / 25).filter((p) => p < pp);
  const pl = arc(pp);
  const pl2 = arc(Math.min(1, pp + 0.01));
  const ang = (Math.atan2(pl2.y - pl.y, pl2.x - pl.x) * 180) / Math.PI;
  const pinY = V ? 1440 * (H / 1920) : 820 * s;
  return (
    <AbsoluteFill style={{opacity: out, transform: `scale(${0.96 + 0.04 * out})`, fontFamily: FBN}}>
      {dots.map((p, i) => {
        const q = arc(p);
        return <div key={i} style={{position: 'absolute', left: q.x, top: q.y, width: 12 * s, height: 12 * s, marginLeft: -6 * s, borderRadius: 99, background: C.green, opacity: 0.35}} />;
      })}
      <div style={{position: 'absolute', left: pl.x, top: pl.y, transform: `translate(-50%,-50%) rotate(${ang + 45}deg)`, fontSize: 96 * s, opacity: pp < 1 ? 1 : 0}}>✈️</div>
      <div style={{...center, top: V ? 640 * (H / 1920) : 300 * s}}>
        <div style={{fontSize: big * 0.62, fontWeight: 600, color: C.body, opacity: ease(f, 4, 20), transform: `translateY(${(1 - ease(f, 4, 20)) * 30 * s}px)`}}>{t.hookA}</div>
        <div style={{fontSize: big, fontWeight: 700, lineHeight: 1.15, transform: `scale(${Math.max(0, pop(f, 14, 22))})`, padding: `0 ${40 * s}px`}}>
          <GradText>{t.hookB}</GradText>
        </div>
        <div style={{marginTop: 30 * s, fontSize: big * 0.56, fontWeight: 700, color: C.ink, opacity: l3, transform: `translateY(${(1 - l3) * 30 * s}px)`}}>{t.hookC}</div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: pinY, display: 'flex', justifyContent: 'center', gap: 26 * s, flexWrap: 'wrap', padding: `0 ${40 * s}px`}}>
        {t.places.map((p, i) => {
          const q = pop(f, VO_IN + 70 + i * 7, 18);
          return (
            <div key={p} style={{transform: `scale(${Math.max(0, q)}) translateY(${Math.sin((f + i * 17) / 15) * 5 * s}px)`, background: '#fff', border: `1px solid ${C.line}`, borderRadius: 999, padding: `${12 * s}px ${32 * s}px`, fontSize: 44 * s, fontWeight: 700, color: C.ink, boxShadow: '0 14px 30px rgba(15,23,42,0.1)', whiteSpace: 'nowrap'}}>
              📍 {p}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ───────── 2. CITIES: wherever you're from, if you speak English ─────────
const CITY_AT = [VO_IN + 26, VO_IN + 46, VO_IN + 68, VO_IN + 94];
const SPEAK_AT = VO_IN + 140;
const LEARN_AT = VO_IN + 178;
const Cities: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const {W, H, V, s} = useLayout();
  const out = exitOf(f, dur);
  const cw = (V ? 440 : 380) * s;
  const ch = (V ? 330 : 300) * s;
  const gap = 34 * s;
  // cards move up and shrink a bit once "Speak English?" arrives
  const lift = ease(f, SPEAK_AT - 8, SPEAK_AT + 14, EASE_IO);
  const gridY = V ? interpolate(lift, [0, 1], [800, 620]) * (H / 1920) : interpolate(lift, [0, 1], [H * 0.47, H * 0.33]);
  const slots = V
    ? [0, 1, 2, 3].map((i) => ({x: W / 2 + (i % 2 ? 1 : -1) * (cw / 2 + gap / 2), y: gridY + (i < 2 ? -1 : 1) * (ch / 2 + gap / 2)}))
    : [0, 1, 2, 3].map((i) => ({x: W / 2 + (i - 1.5) * (cw + gap), y: gridY}));
  const sc = interpolate(lift, [0, 1], [1, V ? 0.86 : 0.8]);
  const sp = pop(f, SPEAK_AT, 20);
  const le = ease(f, LEARN_AT, LEARN_AT + 22);
  const logo = pop(f, LEARN_AT + 34, 20);
  const textY = V ? 1290 * (H / 1920) : H * 0.6;
  return (
    <AbsoluteFill style={{opacity: out, fontFamily: FBN}}>
      {t.cities.map((c, i) => {
        const p = pop(f, CITY_AT[i], 20);
        const r = mulberry32(i + 21)() * 10 - 5;
        const sl = slots[i];
        return (
          <div
            key={c.city}
            style={{
              position: 'absolute',
              left: sl.x - cw / 2,
              top: sl.y - ch / 2,
              width: cw,
              height: ch,
              transform: `translateY(${(1 - p) * 160 * s}px) rotate(${r * (1 - p) * 3 + r * 0.3}deg) scale(${Math.max(0, p) * sc})`,
              opacity: Math.min(1, p * 2),
              background: '#fff',
              borderRadius: 34 * s,
              border: `1px solid ${C.line}`,
              boxShadow: '0 20px 46px rgba(15,23,42,0.12)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 14 * s,
            }}
          >
            <Flag code={c.flag} w={(V ? 150 : 140) * s} />
            <div style={{fontSize: (V ? 56 : 50) * s, fontWeight: 700, color: C.ink, lineHeight: 1.1}}>{c.city}</div>
            <div style={{fontSize: 32 * s, fontWeight: 600, color: C.muted, lineHeight: 1}}>{c.country}</div>
          </div>
        );
      })}
      <div style={{...center, top: textY}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18 * s, fontSize: (V ? 84 : 76) * s, fontWeight: 700, color: C.ink, transform: `scale(${Math.max(0, sp)})`, opacity: Math.min(1, sp * 2)}}>
          <span style={{background: C.ink, color: '#fff', borderRadius: 18 * s, padding: `${0 * s}px ${18 * s}px`, fontSize: (V ? 52 : 46) * s, lineHeight: 1.5}}>EN</span>
          {t.speak}
        </div>
        <div style={{marginTop: 22 * s, display: 'flex', alignItems: 'center', gap: 26 * s, opacity: le, transform: `translateY(${(1 - le) * 30 * s}px)`, flexWrap: 'wrap', justifyContent: 'center'}}>
          <span style={{fontSize: (V ? 104 : 96) * s, fontWeight: 700, color: C.ink, lineHeight: 1.2}}>
            {t.learnA}
            <GradText>{t.learnB}</GradText>
          </span>
        </div>
        <div style={{marginTop: 26 * s, display: 'flex', alignItems: 'center', gap: 18 * s, transform: `scale(${Math.max(0, logo)})`, opacity: Math.min(1, logo * 2)}}>
          <span style={{fontSize: (V ? 50 : 44) * s, fontWeight: 600, color: C.muted}}>with</span>
          <Logo size={(V ? 84 : 76) * s} wave={lin(f, LEARN_AT + 40, LEARN_AT + 60)} />
          <span style={{fontSize: (V ? 76 : 68) * s, fontWeight: 700, color: C.ink}}>Lahjio</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ───────── 3. REAL ARABIC (not textbook) ─────────
const BOOK_X = VO_IN + 34;
const CHIP_AT = [VO_IN + 92, VO_IN + 120, VO_IN + 150];
const Real: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const {W, H, V, s} = useLayout();
  const out = exitOf(f, dur);
  const book = pop(f, 0, 20);
  const strike = ease(f, BOOK_X, BOOK_X + 12);
  const shrink = ease(f, BOOK_X + 20, BOOK_X + 40, EASE_IO);
  const title = ease(f, VO_IN + 62, VO_IN + 82);
  const bx = V ? W / 2 : interpolate(shrink, [0, 1], [W / 2, W * 0.22]);
  const by = V ? interpolate(shrink, [0, 1], [H * 0.42, 330 * (H / 1920)]) : H / 2;
  const bsc = interpolate(shrink, [0, 1], [1.25, V ? 0.8 : 0.9]);
  const colX = V ? W / 2 : W * 0.63;
  const chipY = (i: number) => (V ? (1120 + i * 250) * (H / 1920) : (H / 2 - 30 * s) + (i - 0.5) * 190 * s + 40 * s);
  return (
    <AbsoluteFill style={{opacity: out, fontFamily: FBN}}>
      {/* textbook card */}
      <div style={{position: 'absolute', left: bx, top: by, transform: `translate(-50%,-50%) scale(${Math.max(0, book) * bsc}) rotate(${-4 + 6 * strike}deg)`, opacity: 1 - 0.45 * shrink}}>
        <div style={{background: '#fff', border: `1px solid ${C.line}`, borderRadius: 30 * s, padding: `${26 * s}px ${40 * s}px`, display: 'flex', alignItems: 'center', gap: 22 * s, boxShadow: '0 18px 40px rgba(15,23,42,0.12)', whiteSpace: 'nowrap', position: 'relative'}}>
          <span style={{fontSize: 70 * s}}>📕</span>
          <div style={{textAlign: 'left'}}>
            <div style={{fontSize: 52 * s, fontWeight: 700, color: C.ink, lineHeight: 1.1}}>{t.textbook}</div>
            <ArText size={38 * s} color={C.muted} weight={400}>
              كم ثمن هذا؟
            </ArText>
          </div>
          <div style={{position: 'absolute', left: 20 * s, right: 20 * s, top: '50%', height: 9 * s, borderRadius: 9, background: '#ef4444', transformOrigin: 'left center', transform: `scaleX(${strike}) rotate(-4deg)`}} />
          <div style={{position: 'absolute', right: -26 * s, top: -26 * s, width: 70 * s, height: 70 * s, borderRadius: 99, background: '#ef4444', color: '#fff', fontSize: 46 * s, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${Math.max(0, pop(f, BOOK_X + 8, 14))})`}}>✕</div>
        </div>
      </div>
      {/* title */}
      <div style={{position: 'absolute', left: colX, top: V ? 640 * (H / 1920) : 170 * s, transform: `translate(-50%,0) translateY(${(1 - title) * 30 * s}px)`, opacity: title, textAlign: 'center', width: V ? W : W * 0.62}}>
        <div style={{fontSize: (V ? 96 : 84) * s, fontWeight: 700, color: C.ink, lineHeight: 1.15}}>{t.realA}</div>
        <div style={{fontSize: (V ? 78 : 66) * s, fontWeight: 700, lineHeight: 1.25}}>
          <GradText>{t.realB}</GradText>
        </div>
      </div>
      {/* situation chips with the Saudi phrase */}
      {t.chips.map((c, i) => {
        const p = pop(f, CHIP_AT[i], 20);
        return (
          <div key={c.label} style={{position: 'absolute', left: colX, top: chipY(i), transform: `translate(-50%,-50%) translateX(${(1 - p) * (i % 2 ? 1 : -1) * 300 * s}px) scale(${Math.max(0, p)})`, opacity: Math.min(1, p * 2)}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 22 * s, background: '#fff', border: `1px solid ${C.line}`, borderRadius: 30 * s, padding: `${14 * s}px ${20 * s}px ${14 * s}px ${30 * s}px`, boxShadow: '0 18px 40px rgba(15,23,42,0.12)', whiteSpace: 'nowrap'}}>
              <span style={{fontSize: 60 * s}}>{c.emoji}</span>
              <span style={{fontSize: 46 * s, fontWeight: 700, color: C.ink, minWidth: 250 * s, textAlign: 'left'}}>{c.label}</span>
              <span style={{background: GRAD, borderRadius: 22 * s, padding: `${2 * s}px ${24 * s}px`, display: 'flex', alignItems: 'center', gap: 10 * s}}>
                <ArText size={48 * s} color="#fff">
                  {c.ar}
                </ArText>
              </span>
              <Check size={54 * s} />
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ───────── 7. DEVICES: website or phone ─────────
const LAPTOP_AT = 8;
const PHONE_AT = 52;
const Devices: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const {W, H, V, s} = useLayout();
  const out = exitOf(f, dur);
  const title = pop(f, 0, 20);
  const lp = ease(f, LAPTOP_AT, LAPTOP_AT + 26);
  const ph = ease(f, PHONE_AT, PHONE_AT + 24);
  const lw = (V ? 860 : 900) * s;
  const lh = lw * 0.6;
  const lx = V ? W / 2 - lw / 2 - 40 * s : W * 0.42 - lw / 2;
  const ly = V ? 700 * (H / 1920) : H * 0.3;
  const pw = (V ? 300 : 280) * s;
  const phH = pw * 2;
  const pxx = V ? W / 2 + 120 * s : W * 0.42 + lw / 2 - 40 * s;
  const pyy = V ? ly + lh * 0.3 : ly - lh * 0.1;
  const iconPop = pop(f, PHONE_AT + 26, 18);
  const tap = PHONE_AT + 56;
  const pills = [t.devWeb, t.devApp];
  return (
    <AbsoluteFill style={{opacity: out, fontFamily: FBN}}>
      <div style={{...center, top: V ? 250 * (H / 1920) : 70 * s, transform: `scale(${0.85 + 0.15 * title})`, opacity: Math.min(1, title * 1.5)}}>
        <div style={{fontSize: (V ? 100 : 90) * s, fontWeight: 700, color: C.ink, lineHeight: 1.2}}>
          {t.devA}
          {V ? <br /> : null}
          <GradText>{t.devB}</GradText>
        </div>
      </div>
      {/* laptop */}
      <div style={{position: 'absolute', left: lx, top: ly, width: lw, transform: `translateY(${(1 - lp) * 500 * s}px)`, opacity: lp}}>
        <div style={{width: lw, height: lh, background: '#1e293b', borderRadius: 26 * s, padding: 16 * s, boxSizing: 'border-box'}}>
          <div style={{width: '100%', height: '100%', background: C.bg, borderRadius: 12 * s, overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
            <div style={{height: 54 * s, background: '#fff', borderBottom: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', gap: 10 * s, padding: `0 ${18 * s}px`}}>
              {['#f87171', '#fbbf24', '#34d399'].map((c) => (
                <span key={c} style={{width: 14 * s, height: 14 * s, borderRadius: 99, background: c}} />
              ))}
              <div style={{marginLeft: 16 * s, flex: 1, height: 32 * s, borderRadius: 99, background: C.bg, border: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', padding: `0 ${16 * s}px`, fontSize: 22 * s, color: C.body, fontWeight: 600}}>🔒 {t.devWeb.slice(0, Math.round(lin(f, LAPTOP_AT + 14, LAPTOP_AT + 34) * t.devWeb.length))}</div>
            </div>
            <div style={{flex: 1, display: 'flex', alignItems: 'center', padding: `0 ${44 * s}px`, gap: 30 * s}}>
              <div style={{flex: 1, textAlign: 'left'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 12 * s, marginBottom: 16 * s}}>
                  <Logo size={40 * s} />
                  <span style={{fontSize: 28 * s, fontWeight: 700, color: C.ink}}>Lahjio</span>
                </div>
                <div style={{fontSize: 44 * s, fontWeight: 700, color: C.ink, lineHeight: 1.1}}>{t.heroA}</div>
                <div style={{fontSize: 44 * s, fontWeight: 700, lineHeight: 1.2}}>
                  <GradText>{t.heroB}</GradText>
                </div>
                <div style={{display: 'inline-block', marginTop: 18 * s, background: C.green, color: '#fff', fontSize: 24 * s, fontWeight: 700, borderRadius: 12 * s, padding: `${10 * s}px ${22 * s}px`}}>{t.cta} →</div>
              </div>
              <div style={{width: lw * 0.28, background: '#fff', borderRadius: 18 * s, border: `1px solid ${C.line}`, padding: 16 * s, textAlign: 'center'}}>
                <ArText size={40 * s} color={C.green7}>
                  كم السعر
                </ArText>
                <div style={{fontSize: 20 * s, color: C.muted, fontWeight: 600}}>How much is it?</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{width: lw * 1.12, marginLeft: -lw * 0.06, height: 26 * s, background: '#cbd5e1', borderRadius: `0 0 ${26 * s}px ${26 * s}px`}} />
      </div>
      {/* phone home screen with app icon */}
      <div style={{position: 'absolute', left: pxx, top: pyy, width: pw, height: phH, transform: `translateY(${(1 - ph) * 600 * s}px) rotate(${(1 - ph) * 12 + 4}deg)`, opacity: ph}}>
        <div style={{width: '100%', height: '100%', background: '#0f172a', borderRadius: 46 * s, padding: 10 * s, boxSizing: 'border-box', boxShadow: '0 30px 60px rgba(15,23,42,0.3)'}}>
          <div style={{width: '100%', height: '100%', borderRadius: 38 * s, background: 'linear-gradient(160deg,#a7f3d0,#5eead4 60%,#99f6e4)', position: 'relative', overflow: 'hidden'}}>
            <div style={{position: 'absolute', top: 14 * s, left: '50%', transform: 'translateX(-50%)', width: 90 * s, height: 22 * s, borderRadius: 99, background: '#0f172a'}} />
            <div style={{position: 'absolute', top: 90 * s, left: 0, right: 0, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', rowGap: 26 * s, justifyItems: 'center'}}>
              {Array.from({length: 6}).map((_, i) =>
                i === 4 ? (
                  <div key={i} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 * s, transform: `scale(${Math.max(0, iconPop) * (tap <= f && f < tap + 6 ? 0.88 : 1)})`}}>
                    <div style={{filter: 'drop-shadow(0 6px 10px rgba(5,150,105,0.4))'}}>
                      <Logo size={64 * s} wave={lin(f, PHONE_AT + 30, PHONE_AT + 50)} />
                    </div>
                    <span style={{fontSize: 16 * s, fontWeight: 700, color: C.ink}}>Lahjio</span>
                  </div>
                ) : (
                  <div key={i} style={{width: 64 * s, height: 64 * s, borderRadius: 16 * s, background: 'rgba(255,255,255,0.55)'}} />
                ),
              )}
            </div>
            <div style={{position: 'absolute', left: '50%', top: 90 * s + 64 * s + 26 * s + 30 * s, width: 90 * s, height: 90 * s, marginLeft: -45 * s, borderRadius: 99, border: `${4 * s}px solid #fff`, opacity: (1 - lin(f, tap, tap + 16)) * (f >= tap ? 1 : 0), transform: `scale(${0.4 + lin(f, tap, tap + 16)})`}} />
          </div>
        </div>
      </div>
      {/* pills */}
      <div style={{position: 'absolute', left: 0, right: 0, top: V ? 1590 * (H / 1920) : H * 0.84, display: 'flex', flexDirection: V ? 'column' : 'row', alignItems: 'center', justifyContent: 'center', gap: 24 * s}}>
        {pills.map((p, i) => {
          const q = pop(f, (i ? PHONE_AT + 30 : LAPTOP_AT + 36), 18);
          return (
            <div key={p} style={{transform: `scale(${Math.max(0, q)})`, background: i ? GRAD : '#fff', color: i ? '#fff' : C.green7, border: i ? 'none' : `${2 * s}px solid rgba(5,150,105,0.3)`, borderRadius: 999, padding: `${12 * s}px ${36 * s}px`, fontSize: (V ? 50 : 44) * s, fontWeight: 700, whiteSpace: 'nowrap', boxShadow: '0 12px 28px rgba(15,23,42,0.1)'}}>
              {i ? '📱 ' : '💻 '}
              {p}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ───────── main ─────────
const S = G_SHOTS;
const VOICE: {from: number; src: string; sec: number; vol?: number}[] = [
  {from: S.hook.from + VO_IN, ...G_VO.hook},
  {from: S.cities.from + VO_IN, ...G_VO.cities},
  {from: S.real.from + VO_IN, ...G_VO.real},
  {from: S.quiz.from + VO_IN, ...G_VO.listen},
  {from: S.quiz.from + Q_AUDIO, src: 'audio/kam-assir.mp3', sec: 1.0},
  {from: S.quiz.from + Q_MEANS, ...G_VO.means},
  {from: S.life.from + 20, ...G_VO.lessons},
  {from: S.life.from + L_AUDIO, src: 'audio/kef-halak.mp3', sec: 1.2},
  {from: S.habit.from + VO_IN, ...G_VO.habit},
  {from: S.devices.from + VO_IN, ...G_VO.devices},
  {from: S.outro.from + OUTRO_AUDIO_AT, src: 'audio/yalla.mp3', sec: 1.0},
];

const SFX: {from: number; src: string; volume: number; dur?: number}[] = [
  {from: 2, src: 'sfx/whoosh-big.mp3', volume: 0.3},
  {from: S.hook.from + 14, src: 'sfx/pop.mp3', volume: 0.3},
  ...[0, 1, 2].map((i) => ({from: S.hook.from + VO_IN + 70 + i * 7, src: 'sfx/pop.mp3', volume: 0.22})),
  ...CITY_AT.map((a, i) => ({from: S.cities.from + a, src: i % 2 ? 'sfx/paper-move-quick.mp3' : 'sfx/paper-slide.mp3', volume: 0.4, dur: 20})),
  {from: S.cities.from + SPEAK_AT, src: 'sfx/swoosh-quick.mp3', volume: 0.3},
  {from: S.cities.from + LEARN_AT + 34, src: 'sfx/sparkle.mp3', volume: 0.3},
  {from: S.real.from + 2, src: 'sfx/air-woosh-quick.mp3', volume: 0.3},
  {from: S.real.from + BOOK_X, src: 'sfx/typewriter-hit-soft.mp3', volume: 0.4},
  ...CHIP_AT.map((a) => ({from: S.real.from + a, src: 'sfx/swoosh-quick.mp3', volume: 0.25})),
  {from: S.quiz.from + 2, src: 'sfx/whoosh-big.mp3', volume: 0.35},
  {from: S.quiz.from + Q_AUDIO - 2, src: 'sfx/switch-tap.mp3', volume: 0.35},
  {from: S.quiz.from + Q_TAP, src: 'sfx/switch-tap.mp3', volume: 0.5},
  {from: S.quiz.from + Q_TAP + 4, src: 'sfx/shimmer-sparkle-sweep.mp3', volume: 0.3, dur: 40},
  {from: S.quiz.from + Q_TAP + 8, src: 'sfx/pop.mp3', volume: 0.3},
  ...[0, 1, 2, 3].map((i) => ({from: S.life.from + 22 + i * 8 + 2, src: i % 2 ? 'sfx/paper-move-quick.mp3' : 'sfx/paper-slide.mp3', volume: 0.4 - i * 0.05, dur: 20})),
  {from: S.life.from + L_AUDIO - 2, src: 'sfx/switch-tap.mp3', volume: 0.35},
  {from: S.habit.from, src: 'sfx/swoosh-quick.mp3', volume: 0.3},
  {from: S.habit.from + 28, src: 'sfx/clock-knob-spin.mp3', volume: 0.3, dur: 50},
  {from: S.habit.from + 78, src: 'sfx/sparkle.mp3', volume: 0.28},
  {from: S.devices.from + LAPTOP_AT, src: 'sfx/whoosh-big.mp3', volume: 0.3},
  {from: S.devices.from + PHONE_AT, src: 'sfx/air-woosh-quick.mp3', volume: 0.3},
  {from: S.devices.from + PHONE_AT + 56, src: 'sfx/switch-tap.mp3', volume: 0.45},
  {from: S.outro.from, src: 'sfx/riser-cine.mp3', volume: 0.35, dur: OUTRO_SLAM_AT},
  {from: S.outro.from + OUTRO_SLAM_AT, src: 'sfx/impact-cine-big.mp3', volume: 0.55, dur: 80},
  {from: S.outro.from + OUTRO_SLAM_AT + 6, src: 'sfx/shimmer-sparkle-sweep.mp3', volume: 0.28, dur: 45},
];

const duck = (f: number) => {
  let d = 1;
  for (const v of VOICE) {
    const e = v.from + F(v.sec);
    const k = interpolate(f, [v.from - 8, v.from, e, e + 14], [1, 0.32, 0.32, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    d = Math.min(d, k);
  }
  return d;
};

export type GlobalProps = {bgm: boolean};

export const Global: React.FC<GlobalProps> = ({bgm}) => {
  return (
    <AbsoluteFill>
      <Background />
      <Sequence from={S.hook.from} durationInFrames={S.hook.dur}>
        <Hook dur={S.hook.dur} />
      </Sequence>
      <Sequence from={S.cities.from} durationInFrames={S.cities.dur}>
        <Cities dur={S.cities.dur} />
      </Sequence>
      <Sequence from={S.real.from} durationInFrames={S.real.dur}>
        <Real dur={S.real.dur} />
      </Sequence>
      <Sequence from={S.quiz.from} durationInFrames={S.quiz.dur}>
        <Quiz t={t} lang="en" dur={S.quiz.dur} audioAt={Q_AUDIO} tapAt={Q_TAP} />
      </Sequence>
      <Sequence from={S.life.from} durationInFrames={S.life.dur}>
        <Life t={t} lang="en" dur={S.life.dur} audioAt={L_AUDIO} />
      </Sequence>
      <Sequence from={S.habit.from} durationInFrames={S.habit.dur}>
        <Habit t={t} lang="en" dur={S.habit.dur} />
      </Sequence>
      <Sequence from={S.devices.from} durationInFrames={S.devices.dur}>
        <Devices dur={S.devices.dur} />
      </Sequence>
      <Sequence from={S.outro.from} durationInFrames={S.outro.dur}>
        <Outro t={t} lang="en" dur={S.outro.dur} />
      </Sequence>

      {VOICE.map((v, i) => (
        <Sequence key={`v${i}`} from={v.from} durationInFrames={F(v.sec) + 10}>
          <Audio src={staticFile(v.src)} volume={1} />
        </Sequence>
      ))}
      {SFX.map((x, i) => (
        <Sequence key={`s${i}`} from={Math.max(0, x.from)} durationInFrames={x.dur ?? 45}>
          <Audio src={staticFile(x.src)} volume={x.volume} />
        </Sequence>
      ))}
      {bgm ? (
        <Audio
          src={staticFile('bgm/house-vibez.mp3')}
          loop
          volume={(f) => 0.3 * duck(f) * interpolate(f, [0, 12, S.total - 45, S.total], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
        />
      ) : null}
    </AbsoluteFill>
  );
};
