// Shared building blocks for the Instagram still images (1080 x 1350, 4:5 feed).
// Keep key content inside the centre ~1000px: the profile grid shows posts cropped to 3:4.
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FAR, FBN, GRAD} from '../theme';
import {Logo} from '../parts';

export type V = 'light' | 'green';

// Language of the image set. Bangla account = @lahjiobn, English account = @lahjioapp.
export type Lang = 'bn' | 'en';
const LangCtx = React.createContext<Lang>('bn');
export const LangProvider = LangCtx.Provider;
export const useLang = () => React.useContext(LangCtx);
// t('বাংলা', 'English') picks the text for the current set
export const useT = () => {
  const l = useLang();
  return <T,>(bn: T, en: T): T => (l === 'bn' ? bn : en);
};
export const HANDLE: Record<Lang, string> = {bn: '@lahjiobn', en: '@lahjioapp'};
const BN_D = '০১২৩৪৫৬৭৮৯';
export const useNum = () => {
  const l = useLang();
  return (n: number | string) => (l === 'bn' ? String(n).replace(/\d/g, (d) => BN_D[Number(d)]) : String(n));
};
export const PAD = 76;

export const GREEN_BG = 'linear-gradient(150deg, #047857 0%, #059669 48%, #14b8a6 100%)';

export const Bg: React.FC<{v: V}> = ({v}) =>
  v === 'light' ? (
    <AbsoluteFill style={{background: C.bg}}>
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(circle 720px at 8% 6%, rgba(5,150,105,0.15), transparent 70%), radial-gradient(circle 760px at 96% 96%, rgba(20,184,166,0.15), transparent 70%)',
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: 'radial-gradient(rgba(15,23,42,0.075) 2px, transparent 2px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
        }}
      />
    </AbsoluteFill>
  ) : (
    <AbsoluteFill style={{background: GREEN_BG, overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(circle 560px at 92% 6%, rgba(255,255,255,0.17), transparent 70%), radial-gradient(circle 640px at 0% 100%, rgba(4,47,46,0.25), transparent 70%)',
        }}
      />
      {/* big faint sound waves, the logo's motif */}
      <svg width={900} height={900} viewBox="0 0 200 200" style={{position: 'absolute', right: -360, bottom: -250, opacity: 0.1}}>
        <g fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="9">
          <path d="M60 68 Q75 100 60 132" />
          <path d="M84 48 Q112 100 84 152" />
          <path d="M108 28 Q150 100 108 172" />
        </g>
      </svg>
    </AbsoluteFill>
  );

export const ink = (v: V) => (v === 'light' ? C.ink : '#fff');
export const sub = (v: V) => (v === 'light' ? C.body : 'rgba(255,255,255,0.88)');

// Post frame: header (logo + name + tag) and footer (site + handle)
export const Post: React.FC<{v: V; tag?: string; children: React.ReactNode; footer?: boolean}> = ({v, tag, children, footer = true}) => {
  const lang = useLang();
  return (
  <AbsoluteFill style={{fontFamily: FBN, color: ink(v)}}>
    <Bg v={v} />
    <div style={{position: 'absolute', top: 62, left: PAD, right: PAD, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
        <div style={{borderRadius: 18, boxShadow: v === 'green' ? '0 0 0 3px rgba(255,255,255,0.55)' : 'none'}}>
          <Logo size={64} />
        </div>
        <span style={{fontSize: 40, fontWeight: 700, letterSpacing: -0.5}}>Lahjio</span>
      </div>
      {tag ? <Pill v={v}>{tag}</Pill> : null}
    </div>
    <div style={{position: 'absolute', top: 160, bottom: footer ? 130 : 60, left: PAD, right: PAD, display: 'flex', flexDirection: 'column'}}>{children}</div>
    {footer ? (
      <div
        style={{
          position: 'absolute',
          bottom: 56,
          left: PAD,
          right: PAD,
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 30,
          fontWeight: 600,
          color: v === 'light' ? C.muted : 'rgba(255,255,255,0.85)',
        }}
      >
        <span>lahjio.com</span>
        <span>{HANDLE[lang]}</span>
      </div>
    ) : null}
  </AbsoluteFill>
  );
};

export const Pill: React.FC<{v: V; children: React.ReactNode; size?: number}> = ({v, children, size = 30}) => (
  <span
    style={{
      fontSize: size,
      fontWeight: 600,
      padding: `${size * 0.3}px ${size * 0.8}px`,
      borderRadius: 999,
      background: v === 'light' ? C.g50 : 'rgba(255,255,255,0.18)',
      color: v === 'light' ? C.green7 : '#fff',
      border: v === 'light' ? `2px solid ${C.mint}` : '2px solid rgba(255,255,255,0.35)',
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </span>
);

export const Grad: React.FC<{children: React.ReactNode}> = ({children}) => (
  <span style={{backgroundImage: GRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'}}>{children}</span>
);

export const Ar: React.FC<{size: number; color?: string; weight?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({
  size,
  color,
  weight = 700,
  children,
  style,
}) => (
  <span style={{fontFamily: FAR, fontSize: size, fontWeight: weight, color, direction: 'rtl', lineHeight: 1.45, display: 'inline-block', ...style}}>
    {children}
  </span>
);

// White rounded card
export const Card: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div
    style={{
      background: '#fff',
      borderRadius: 36,
      border: `2px solid ${C.line}`,
      boxShadow: '0 18px 40px rgba(15,23,42,0.08)',
      ...style,
    }}
  >
    {children}
  </div>
);

export const Button: React.FC<{children: React.ReactNode; dark?: boolean; size?: number}> = ({children, dark, size = 46}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 18,
      fontSize: size,
      fontWeight: 700,
      padding: `${size * 0.48}px ${size * 1.1}px`,
      borderRadius: 999,
      background: dark ? '#fff' : C.green,
      color: dark ? C.green7 : '#fff',
      boxShadow: dark ? '0 16px 40px rgba(4,47,46,0.3)' : '0 16px 36px rgba(5,150,105,0.35)',
    }}
  >
    {children}
    <Icon name="arrowR" size={size * 0.95} color={dark ? C.green7 : '#fff'} stroke={2.6} />
  </div>
);

// Simple line icons (24x24 grid)
const ICONS: Record<string, React.ReactNode> = {
  headphones: (
    <>
      <path d="M3 15v-3a9 9 0 0 1 18 0v3" />
      <path d="M3 15h3v6H4.5A1.5 1.5 0 0 1 3 19.5z" />
      <path d="M21 15h-3v6h1.5a1.5 1.5 0 0 0 1.5-1.5z" />
    </>
  ),
  cards: (
    <>
      <rect x="3" y="7" width="13" height="14" rx="2" />
      <path d="M8 3h11a2 2 0 0 1 2 2v12" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 12a8 8 0 1 1-2.5-5.8L20 8.5" />
      <path d="M20 3.5v5h-5" />
    </>
  ),
  flame: <path d="M12 2.5c1 4 6 5.5 6 11.5a6 6 0 0 1-12 0c0-3 1.6-5 3-6.2 0 2 .8 3.4 2 3.7 0-3.3-.6-6.2 1-9z" />,
  bag: (
    <>
      <path d="M5 8h14l-1.2 13H6.2z" />
      <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
    </>
  ),
  car: (
    <>
      <path d="M3 17v-4.5L5.2 7h13.6l2.2 5.5V17z" />
      <path d="M3 12.5h18" />
      <circle cx="7.5" cy="17.5" r="1.8" />
      <circle cx="16.5" cy="17.5" r="1.8" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5h6v2" />
      <path d="M3 13h18" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
      <path d="M4 20.5V5.5" />
      <path d="M20 18v3H6.5" />
    </>
  ),
  arrowR: (
    <>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </>
  ),
  arrowL: (
    <>
      <path d="M19 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </>
  ),
  arrowUp: (
    <>
      <path d="M12 20V5" />
      <path d="M6 11l6-6 6 6" />
    </>
  ),
  stop: (
    <>
      <path d="M8.3 3h7.4L21 8.3v7.4L15.7 21H8.3L3 15.7V8.3z" />
      <path d="M8 12h8" />
    </>
  ),
  coin: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9.2c-.6-.8-1.7-1.2-3-1.2-1.8 0-3 .9-3 2s1 1.7 3 2 3 .9 3 2-1.2 2-3 2c-1.3 0-2.4-.4-3-1.2" />
      <path d="M12 6v2M12 16v2" />
    </>
  ),
  question: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.3a2.6 2.6 0 1 1 3.6 2.4c-.7.3-1.1.9-1.1 1.7v.4" />
      <path d="M12 17h.01" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.8 10.6c.6.6.8 1.4.8 2.4h6c0-1 .2-1.8.8-2.4A6 6 0 0 0 12 3z" />
    </>
  ),
  phone: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5h16v11H10l-5 4v-4H4z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </>
  ),
  bolt: <path d="M13 2.5 4.5 14H11l-1 7.5L19.5 10H13z" />,
  sparkle: <path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z" />,
  bookmark: <path d="M6 3h12v18l-6-4.5L6 21z" />,
  hand: (
    <>
      <path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M11 10V4.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M14 10.5V6a1.5 1.5 0 0 1 3 0v7.5c0 4-2.5 7-6.5 7-2.5 0-4-1.2-5.3-3.2L3.6 14.5a1.5 1.5 0 0 1 2.4-1.8L8 15" />
    </>
  ),
};

export const Icon: React.FC<{name: keyof typeof ICONS | string; size: number; color: string; stroke?: number; fill?: string}> = ({
  name,
  size,
  color,
  stroke = 2,
  fill = 'none',
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{display: 'block', flexShrink: 0}}>
    {ICONS[name]}
  </svg>
);

// Rounded square icon badge
export const IconBadge: React.FC<{name: string; size: number; v?: V; solid?: boolean}> = ({name, size, v = 'light', solid}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.3,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: solid ? 'linear-gradient(135deg, #059669, #14b8a6)' : v === 'light' ? C.g50 : 'rgba(255,255,255,0.2)',
      border: solid ? 'none' : v === 'light' ? `2px solid ${C.mint}` : '2px solid rgba(255,255,255,0.3)',
    }}
  >
    <Icon name={name} size={size * 0.56} color={solid || v === 'green' ? '#fff' : C.green} stroke={2.2} />
  </div>
);

export const Speaker: React.FC<{size: number; color?: string; bg?: string}> = ({size, color = '#fff', bg = C.green}) => (
  <div style={{width: size, height: size, borderRadius: size, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
    <svg width={size * 0.52} height={size * 0.52} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5 6 9H2v6h4l5 4V5z" fill={color} />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M19 5a10 10 0 0 1 0 14" />
    </svg>
  </div>
);

// Static sound-wave bars
export const Bars: React.FC<{h: number; color: string; n?: number}> = ({h, color, n = 13}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: h * 0.14, height: h}}>
    {new Array(n).fill(0).map((_, i) => {
      const v = 0.3 + 0.7 * Math.abs(Math.sin(i * 1.9 + 0.6)) * (1 - Math.abs(i - (n - 1) / 2) / n);
      return <div key={i} style={{width: h * 0.12, height: h * v, borderRadius: h, background: color}} />;
    })}
  </div>
);
