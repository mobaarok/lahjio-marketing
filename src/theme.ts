import {Easing, interpolate} from 'remotion';
import {FBN, FAR} from './fonts';

// Design tokens pulled from lahjio.com computed styles
export const C = {
  bg: '#f8fafc', // slate-50 page bg
  ink: '#0f172a', // h1 colour
  body: '#334155',
  muted: '#64748b',
  line: '#e2e8f0',
  green: '#059669', // primary button
  green7: '#047857',
  teal: '#14b8a6', // gradient end
  mint: '#bbf7d0', // logo sound waves
  g50: '#ecfdf5',
  amber: '#f59e0b',
  white: '#ffffff',
};
export const GRAD = `linear-gradient(90deg, ${C.green} 0%, ${C.teal} 100%)`;
export const GRAD_CARD = `linear-gradient(135deg, ${C.green} 0%, ${C.teal} 100%)`;

export {FBN, FAR};

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// "Playful-friendly" motion tokens (consumer edu app): main ~24f, overshoot ~1.08
export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_POP = Easing.bezier(0.34, 1.56, 0.64, 1);
export const EASE_IO = Easing.bezier(0.45, 0, 0.55, 1);

export const ease = (f: number, a: number, b: number, e = EASE_OUT) =>
  interpolate(f, [a, b], [0, 1], {...clamp, easing: e});
export const pop = (f: number, a: number, d = 18) =>
  interpolate(f, [a, a + d], [0, 1], {...clamp, easing: EASE_POP});
export const lin = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], clamp);

// scene exit: 1 -> 0 over the last n frames
export const exitOf = (f: number, dur: number, n = 12) => 1 - ease(f, dur - n, dur, EASE_IO);

const BN_DIGITS = '০১২৩৪৫৬৭৮৯';
export const num = (n: number, lang: 'bn' | 'en') => {
  const s = Math.round(n).toLocaleString('en-US');
  return lang === 'bn' ? s.replace(/\d/g, (d) => BN_DIGITS[Number(d)]) : s;
};

// deterministic pseudo random
export const mulberry32 = (a: number) => () => {
  a |= 0;
  a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
