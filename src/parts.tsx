import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FAR, FBN, GRAD, GRAD_CARD, ease, lin} from './theme';

export const useLayout = () => {
  const {width: W, height: H} = useVideoConfig();
  const V = H > W;
  const s = V ? W / 1080 : H / 1080; // base unit
  return {W, H, V, s};
};

export const Background: React.FC = () => {
  const f = useCurrentFrame();
  const {W, H} = useLayout();
  const t = f / 30;
  const b1x = W * (0.15 + 0.05 * Math.sin(t * 0.4));
  const b1y = H * (0.2 + 0.04 * Math.cos(t * 0.35));
  const b2x = W * (0.85 + 0.04 * Math.cos(t * 0.3));
  const b2y = H * (0.8 + 0.05 * Math.sin(t * 0.33));
  const R = Math.max(W, H) * 0.55;
  return (
    <div style={{position: 'absolute', inset: 0, background: C.bg, overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle ${R}px at ${b1x}px ${b1y}px, rgba(5,150,105,0.13), transparent 70%),
             radial-gradient(circle ${R}px at ${b2x}px ${b2y}px, rgba(20,184,166,0.12), transparent 70%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(15,23,42,0.07) 1.5px, transparent 1.5px)',
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />
    </div>
  );
};

export const GradText: React.FC<{children: React.ReactNode}> = ({children}) => (
  <span style={{backgroundImage: GRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'}}>
    {children}
  </span>
);

// Logo with sound waves that "draw" (wave = 0..1)
export const Logo: React.FC<{size: number; wave?: number}> = ({size, wave = 1}) => {
  const w1 = Math.min(1, wave * 1.6);
  const w2 = Math.max(0, Math.min(1, wave * 1.6 - 0.6));
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{display: 'block'}}>
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#009A44" />
          <stop offset="1" stopColor="#006C35" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="46" fill="url(#lg)" />
      <rect x="9" y="9" width="182" height="182" rx="38" fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="2" />
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M96 40 V112 C96 138 81 150 63 150 C48 150 40 141 40 128" stroke="#fff" strokeWidth="22" />
        <path d="M126 68 Q141 86 126 104" stroke={C.mint} strokeWidth="9" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - w1} opacity={w1 > 0 ? 1 : 0} />
        <path d="M144 52 Q170 86 144 120" stroke={C.mint} strokeWidth="9" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - w2} opacity={w2 > 0 ? 1 : 0} />
      </g>
    </svg>
  );
};

// Speaker icon
export const Speaker: React.FC<{size: number; color: string}> = ({size, color}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 5 6 9H2v6h4l5 4V5z" fill={color} />
    <path d="M15.5 8.5a5 5 0 0 1 0 7" />
    <path d="M19 5a10 10 0 0 1 0 14" />
  </svg>
);

// Live waveform bars while audio plays (active 0..1)
export const Wave: React.FC<{active: number; color: string; h: number; bars?: number; seed?: number}> = ({active, color, h, bars = 9, seed = 1}) => {
  const f = useCurrentFrame();
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: h * 0.12, height: h}}>
      {new Array(bars).fill(0).map((_, i) => {
        const v = 0.35 + 0.65 * Math.abs(Math.sin(f * 0.45 + i * 1.7 + seed));
        const hh = h * (0.18 + 0.82 * v * active);
        return <div key={i} style={{width: h * 0.13, height: hh, borderRadius: h, background: color}} />;
      })}
    </div>
  );
};

export const Check: React.FC<{size: number; color?: string; bg?: string}> = ({size, color = '#fff', bg = C.green}) => (
  <div style={{width: size, height: size, borderRadius: size, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  </div>
);

// Phone mock replicating lahjio.com's hero quiz UI. Base size 420 x 860 (scaled with CSS zoom by parent).
export const PhoneQuiz: React.FC<{
  lang: 'bn' | 'en';
  label: string;
  translit: string;
  options: string[];
  next: string;
  local: number; // frame inside quiz scene
  audioAt: number;
  tapAt: number;
}> = ({label, translit, options, next, local: f, audioAt, tapAt, lang}) => {
  const playing = f >= audioAt && f < audioAt + 44 ? Math.min(1, lin(f, audioAt, audioAt + 6) * (1 - lin(f, audioAt + 34, audioAt + 44))) : 0;
  const pulse = playing > 0 ? 1 + 0.08 * Math.sin((f - audioAt) * 0.5) : 1;
  const answered = f >= tapAt + 2;
  const prog = 0.42 + 0.2 * ease(f, tapAt + 4, tapAt + 24);
  const okPop = ease(f, tapAt + 2, tapAt + 16);
  const streakN = answered ? (lang === 'bn' ? '৮' : '8') : lang === 'bn' ? '৭' : '7';
  const streakBump = 1 + 0.25 * Math.sin(Math.PI * lin(f, tapAt + 6, tapAt + 18));
  return (
    <div
      style={{
        width: 420,
        height: 860,
        borderRadius: 60,
        background: '#0f172a',
        padding: 12,
        boxSizing: 'border-box',
        boxShadow: '0 40px 80px rgba(15,23,42,0.25), 0 12px 24px rgba(15,23,42,0.15)',
      }}
    >
      <div style={{width: '100%', height: '100%', borderRadius: 48, background: '#fff', overflow: 'hidden', position: 'relative', fontFamily: FBN}}>
        {/* status bar */}
        <div style={{display: 'flex', justifyContent: 'space-between', padding: '18px 30px 0', fontSize: 17, fontWeight: 600, color: C.ink}}>
          <span>9:41</span>
          <span style={{display: 'flex', gap: 6, alignItems: 'center'}}>
            <span style={{width: 18, height: 10, borderRadius: 3, background: C.ink}} />
            <span style={{width: 24, height: 12, borderRadius: 4, border: `2px solid ${C.ink}`}} />
          </span>
        </div>
        <div style={{position: 'absolute', top: 10, left: '50%', marginLeft: -60, width: 120, height: 32, borderRadius: 20, background: '#0f172a'}} />
        {/* progress row */}
        <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '30px 26px 0'}}>
          <span style={{fontSize: 26, color: C.muted, lineHeight: 1}}>×</span>
          <div style={{flex: 1, height: 14, borderRadius: 10, background: C.line, overflow: 'hidden'}}>
            <div style={{width: `${prog * 100}%`, height: '100%', borderRadius: 10, background: GRAD}} />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              padding: '4px 10px',
              borderRadius: 12,
              background: '#fff7ed',
              color: '#c2410c',
              fontWeight: 700,
              fontSize: 18,
              transform: `scale(${streakBump})`,
            }}
          >
            🔥 {streakN}
          </div>
        </div>
        {/* label */}
        <div style={{padding: '28px 28px 0', fontSize: 20, fontWeight: 600, color: C.muted}}>{label}</div>
        {/* word card */}
        <div
          style={{
            margin: '14px 24px 0',
            height: 210,
            borderRadius: 26,
            background: GRAD_CARD,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 12px 24px rgba(5,150,105,0.3)',
          }}
        >
          <div style={{fontFamily: FAR, fontWeight: 700, fontSize: 64, color: '#fff', direction: 'rtl', lineHeight: 1.3}}>كم السعر</div>
          <div style={{fontSize: 21, color: 'rgba(255,255,255,0.85)', marginTop: 2, fontWeight: 500}}>{translit}</div>
          <div
            style={{
              position: 'absolute',
              top: 14,
              right: 14,
              width: 48,
              height: 48,
              borderRadius: 48,
              background: playing > 0 ? '#fff' : 'rgba(255,255,255,0.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${pulse})`,
              boxShadow: playing > 0 ? `0 0 0 ${10 * playing}px rgba(255,255,255,0.25)` : 'none',
            }}
          >
            <Speaker size={24} color={playing > 0 ? C.green : '#fff'} />
          </div>
          <div style={{position: 'absolute', bottom: 14, left: 18, opacity: playing}}>
            <Wave active={playing} color="rgba(255,255,255,0.9)" h={26} bars={7} />
          </div>
        </div>
        {/* options */}
        <div style={{display: 'flex', flexDirection: 'column', gap: 14, padding: '22px 24px 0'}}>
          {options.map((o, i) => {
            const correct = i === 0 && answered;
            const dim = answered && i !== 0 ? 0.55 : 1;
            return (
              <div
                key={i}
                style={{
                  height: 66,
                  borderRadius: 18,
                  border: `2.5px solid ${correct ? C.green : C.line}`,
                  background: correct ? C.g50 : '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 20px',
                  gap: 12,
                  fontSize: 23,
                  fontWeight: 600,
                  color: correct ? C.green7 : C.body,
                  opacity: dim,
                  transform: correct ? `scale(${1 + 0.04 * Math.sin(Math.PI * okPop)})` : undefined,
                  boxShadow: correct ? '0 6px 16px rgba(5,150,105,0.18)' : '0 2px 0 rgba(15,23,42,0.04)',
                }}
              >
                {correct ? (
                  <div style={{transform: `scale(${okPop})`}}>
                    <Check size={30} />
                  </div>
                ) : null}
                {o}
              </div>
            );
          })}
        </div>
        {/* next button */}
        <div
          style={{
            position: 'absolute',
            left: 24,
            right: 24,
            bottom: 36,
            height: 62,
            borderRadius: 18,
            background: answered ? C.green : C.line,
            color: answered ? '#fff' : C.muted,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            fontWeight: 700,
            boxShadow: answered ? '0 6px 0 #047857' : 'none',
          }}
        >
          {next}
        </div>
      </div>
    </div>
  );
};

export const ArText: React.FC<{size: number; color?: string; weight?: number; children: React.ReactNode}> = ({size, color = C.ink, weight = 700, children}) => (
  <span style={{fontFamily: FAR, fontSize: size, fontWeight: weight, color, direction: 'rtl', lineHeight: 1.35, display: 'inline-block'}}>{children}</span>
);
