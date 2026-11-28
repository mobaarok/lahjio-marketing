// "Funny mistakes" series: a short skit where a wrong word causes confusion, then the fix.
// Scenes: hook → skit with the mistake (Saudi reacts confused) → "Oops!" + explanation card → skit done right → your turn → outro.
// Audio: "you" (Bangladeshi worker) = ElevenLabs "Fahad - Saudi" (YCN2uLvOoKxKJtRmeub3), Saudi = "Abdulrahman" (KfYUTAF49N2CPU3iKuMi).
// Narration: bn = "Shadhin Bangla"; en = "Sarah" (h1Q2hoJVsQ8dXy9QYQN5): the one clear English narrator from 2026-11-28 on.
// *sec values are clip lengths measured with ffprobe; timing in Skit.tsx is computed from them.

type T2 = {bn: string; en: string};
export type SLine = {who: 'you' | 'them'; ar: string; tr: T2; mean?: T2; audio: string; sec: number};
export type Skit = {
  id: number;
  slug: string;
  place: T2;
  them: T2;
  you: T2;
  hook: T2;
  hookSec: {bn: number; en: number};
  explainSec: {bn: number; en: number};
  explainSplit: number; // 0..1: where in the explanation the "right" row appears
  wrong: SLine[];
  right: SLine[];
  title: T2; // explanation card title
  bad: {ar: string; tr: T2; mean: T2};
  good: {ar: string; tr: T2; mean: T2};
  tips: {ar: string; mean: T2}[];
  practice: {ar: string; tr: T2; mean: T2; audio: string; sec: number};
};

export const SKITS: Skit[] = [
  {
    id: 1,
    slug: 'yabgha-abgha',
    place: {bn: 'রেস্টুরেন্টে', en: 'At a restaurant'},
    them: {bn: 'সৌদি ওয়েটার', en: 'Saudi waiter'},
    you: {bn: 'তুমি', en: 'You'},
    hook: {bn: 'একটা ছোট্ট ভুলে কী হলো, দেখো!', en: 'One tiny mistake. Watch what happens!'},
    hookSec: {bn: 2.48, en: 3.52},
    explainSec: {bn: 6.16, en: 7.04},
    explainSplit: 0.45,
    wrong: [
      {who: 'you', ar: 'يبغى موية', tr: {bn: 'ইয়াবগা মোইয়া', en: 'yabgha moya'}, audio: 'audio/skit/s1-wrong.mp3', sec: 1.2},
      {
        who: 'them',
        ar: 'مين يبغى؟ وينه؟',
        tr: {bn: 'মীন ইয়াবগা? ওয়েনুহ?', en: 'meen yabgha? weinuh?'},
        mean: {bn: 'কে চায়? সে কোথায়?', en: 'Who wants it? Where is he?'},
        audio: 'audio/skit/s1-confused.mp3',
        sec: 1.92,
      },
    ],
    right: [
      {
        who: 'you',
        ar: 'أبغى موية',
        tr: {bn: 'আবগা মোইয়া', en: 'abgha moya'},
        mean: {bn: 'আমি পানি চাই', en: 'I want water'},
        audio: 'audio/skit/s1-right.mp3',
        sec: 1.2,
      },
      {
        who: 'them',
        ar: 'أبشر!',
        tr: {bn: 'আবশির!', en: 'absher!'},
        mean: {bn: 'এখনই দিচ্ছি!', en: 'Right away!'},
        audio: 'audio/skit/s1-absher.mp3',
        sec: 1.12,
      },
    ],
    title: {bn: 'ভুলটা কোথায়?', en: 'What went wrong?'},
    bad: {ar: 'يبغى', tr: {bn: 'ইয়াবগা', en: 'yabgha'}, mean: {bn: 'সে চায়', en: 'he wants'}},
    good: {ar: 'أبغى', tr: {bn: 'আবগা', en: 'abgha'}, mean: {bn: 'আমি চাই', en: 'I want'}},
    tips: [
      {ar: 'يـ', mean: {bn: 'সে', en: 'he'}},
      {ar: 'أ', mean: {bn: 'আমি', en: 'I'}},
    ],
    practice: {ar: 'أبغى موية', tr: {bn: 'আবগা মোইয়া', en: 'abgha moya'}, mean: {bn: 'আমি পানি চাই', en: 'I want water'}, audio: 'audio/skit/s1-right.mp3', sec: 1.2},
  },
];

export const SUI = {
  bn: {
    series: 'মজার ভুল',
    badge: (n: string) => `মজার ভুল ${n}`,
    oops: 'উফ!',
    wrong: 'ভুল',
    right: 'ঠিক',
    yourTurn: 'এবার তুমি বলো!',
    listen: 'শোনো আর বলো',
    turnSrc: 'audio/bn/your-turn.mp3',
    turnSec: 1.31,
    outroSrc: 'audio/bn/outro.mp3',
    outroSec: 3.87,
  },
  en: {
    series: 'Funny mistakes',
    badge: (n: string) => `Funny mistake #${n}`,
    oops: 'OOPS!',
    wrong: 'Wrong',
    right: 'Right',
    yourTurn: 'Your turn: say it!',
    listen: 'Listen and repeat',
    turnSrc: 'audio/en/sarah-your-turn.mp3',
    turnSec: 1.68,
    outroSrc: 'audio/en/sarah-outro.mp3',
    outroSec: 5.6,
  },
};
