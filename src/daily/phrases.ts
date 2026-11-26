// "Saudi phrase of the day" series. One entry = one daily video.
// Audio: Arabic = ElevenLabs "Abdulrahman" (Saudi); Bengali VO = ElevenLabs "Shadhin Bangla" (Bangladeshi).
// *Sec values are clip lengths measured with ffprobe; timing in Daily.tsx is computed from them.

export type Part = {ar: string; bn: string; en: string};
export type Phrase = {
  day: number;
  slug: string;
  emoji: string;
  place: {bn: string; en: string};
  hook: {bn: string; en: string};
  ar: string;
  tr: {bn: string; en: string}; // transliteration
  meaning: {bn: string; en: string};
  parts: Part[];
  arAudio: string;
  arSec: number;
  bnHookSec: number;
  bnMeanSec: number;
};

export const PHRASES: Phrase[] = [
  {
    day: 1,
    slug: 'kam-assir',
    emoji: '🛒',
    place: {bn: 'দোকানে', en: 'At the shop'},
    hook: {bn: 'সৌদিতে দোকানে দাম জিজ্ঞেস করবে কীভাবে?', en: 'How do you ask the price in Saudi?'},
    ar: 'كم السعر؟',
    tr: {bn: "কাম আস-সি'র", en: "kam as-si'r"},
    meaning: {bn: 'দাম কত?', en: 'How much is it?'},
    parts: [
      {ar: 'كم', bn: 'কত', en: 'how much'},
      {ar: 'السعر', bn: 'দাম', en: 'the price'},
    ],
    arAudio: 'audio/kam-assir.mp3',
    arSec: 0.99,
    bnHookSec: 2.85,
    bnMeanSec: 4.91,
  },
  {
    day: 2,
    slug: 'wein-alhammam',
    emoji: '🚻',
    place: {bn: 'মার্কেটে / অফিসে', en: 'At the mall'},
    hook: {bn: 'বাথরুম কোথায়, আরবিতে কীভাবে জিজ্ঞেস করবে?', en: 'How do you ask where the bathroom is?'},
    ar: 'وين الحمّام؟',
    tr: {bn: 'ওয়েন আল-হাম্মাম', en: 'wein al-hammam'},
    meaning: {bn: 'বাথরুম কোথায়?', en: "Where's the bathroom?"},
    parts: [
      {ar: 'وين', bn: 'কোথায়', en: 'where'},
      {ar: 'الحمّام', bn: 'বাথরুম', en: 'the bathroom'},
    ],
    arAudio: 'audio/wein-alhammam.mp3',
    arSec: 1.15,
    bnHookSec: 3.71,
    bnMeanSec: 5.88,
  },
  {
    day: 3,
    slug: 'abgha-moya',
    emoji: '🥤',
    place: {bn: 'রেস্টুরেন্টে', en: 'At a restaurant'},
    hook: {bn: 'রেস্টুরেন্টে পানি চাইবে কীভাবে?', en: 'How do you ask for water?'},
    ar: 'أبغى موية',
    tr: {bn: 'আবগা মোইয়া', en: 'abgha moya'},
    meaning: {bn: 'আমি পানি চাই', en: 'I want water'},
    parts: [
      {ar: 'أبغى', bn: 'আমি চাই', en: 'I want'},
      {ar: 'موية', bn: 'পানি', en: 'water'},
    ],
    arAudio: 'audio/abgha-moya.mp3',
    arSec: 1.07,
    bnHookSec: 2.04,
    bnMeanSec: 6.03,
  },
  {
    day: 4,
    slug: 'liff-yameen',
    emoji: '🚕',
    place: {bn: 'ট্যাক্সিতে', en: 'In a taxi'},
    hook: {bn: 'ট্যাক্সিতে ড্রাইভারকে ডানে যেতে বলবে কীভাবে?', en: 'How do you tell the taxi driver to turn right?'},
    ar: 'لِفّ يمين',
    tr: {bn: 'লিফ ইয়ামিন', en: 'liff yameen'},
    meaning: {bn: 'ডানে ঘোরাও', en: 'Turn right'},
    parts: [
      {ar: 'لِفّ', bn: 'ঘোরাও', en: 'turn'},
      {ar: 'يمين', bn: 'ডানে', en: 'right'},
    ],
    arAudio: 'audio/liff-yameen.mp3',
    arSec: 1.23,
    bnHookSec: 2.93,
    bnMeanSec: 5.41,
  },
  {
    day: 5,
    slug: 'shway-shway',
    emoji: '🗣️',
    place: {bn: 'কথা বলার সময়', en: 'In conversation'},
    hook: {bn: 'আরবরা খুব দ্রুত কথা বলে? তাহলে এটা বলো।', en: 'Arabs talk too fast? Say this.'},
    ar: 'شوي شوي',
    tr: {bn: 'শুওয়াই শুওয়াই', en: 'shway shway'},
    meaning: {bn: 'আস্তে আস্তে', en: 'Slowly, slowly'},
    parts: [{ar: 'شوي', bn: 'আস্তে / একটু', en: 'slowly / a little'}],
    arAudio: 'audio/shway-shway.mp3',
    arSec: 1.23,
    bnHookSec: 3.55,
    bnMeanSec: 4.44,
  },
  {
    day: 6,
    slug: 'ma-fihimt',
    emoji: '🤔',
    place: {bn: 'কাজে', en: 'At work'},
    hook: {bn: 'বসের কথা বুঝতে পারোনি? এটা বলো।', en: "Didn't understand your boss? Say this."},
    ar: 'ما فهمت',
    tr: {bn: 'মা ফিহিম্‌ত', en: 'ma fihimt'},
    meaning: {bn: 'আমি বুঝিনি', en: "I didn't understand"},
    parts: [
      {ar: 'ما', bn: 'না', en: 'not'},
      {ar: 'فهمت', bn: 'বুঝেছি', en: 'I understood'},
    ],
    arAudio: 'audio/ma-fihimt.mp3',
    arSec: 1.15,
    bnHookSec: 2.59,
    bnMeanSec: 5.33,
  },
  {
    day: 7,
    slug: 'khalas',
    emoji: '✋',
    place: {bn: 'সব জায়গায়', en: 'Everywhere'},
    hook: {bn: 'সৌদিতে সবচেয়ে বেশি শোনা একটা শব্দ!', en: 'The word you hear everywhere in Saudi!'},
    ar: 'خلاص',
    tr: {bn: 'খালাস', en: 'khalas'},
    meaning: {bn: 'ব্যস, শেষ!', en: "Done! That's enough"},
    parts: [{ar: 'خلاص', bn: 'শেষ / যথেষ্ট', en: 'done / enough'}],
    arAudio: 'audio/khalas.mp3',
    arSec: 0.84,
    bnHookSec: 2.93,
    bnMeanSec: 5.07,
  },
];

export const BN_YOUR_TURN = {src: 'audio/bn/your-turn.mp3', sec: 1.31};
export const BN_OUTRO = {src: 'audio/bn/outro.mp3', sec: 3.87};

export const UI = {
  bn: {
    day: (n: string) => `দিন ${n}`,
    series: 'আজকের সৌদি আরবি',
    meaningLabel: 'মানে',
    yourTurn: 'এবার তুমি বলো!',
    listen: 'শোনো আর বলো',
    follow: 'প্রতিদিন নতুন সৌদি আরবি',
    followB: 'ফলো করো 🔔',
    cta: 'ফ্রি শুরু করো',
  },
  en: {
    day: (n: string) => `Day ${n}`,
    series: 'Saudi Arabic daily',
    meaningLabel: 'Meaning',
    yourTurn: 'Your turn: say it!',
    listen: 'Listen and repeat',
    follow: 'A new Saudi phrase every day',
    followB: 'Follow 🔔',
    cta: 'Start free',
  },
};

// English narrator: ElevenLabs "Leo — Clear & Natural Narrator" (YHpqahXF7GW5T7hG65Yd). Clip lengths (s):
export const EN_VO: Record<number, {hook: number; mean: number}> = {
  1: {hook: 2.27, mean: 6.61},
  2: {hook: 2.43, mean: 6.69},
  3: {hook: 1.8, mean: 6.43},
  4: {hook: 2.93, mean: 5.8},
  5: {hook: 2.69, mean: 4.91},
  6: {hook: 2.77, mean: 7.0},
  7: {hook: 2.77, mean: 5.49},
};
export const EN_YOUR_TURN = {src: 'audio/en/your-turn.mp3', sec: 1.65};
export const EN_OUTRO = {src: 'audio/en/outro.mp3', sec: 3.47};

// Narration for a phrase in a language (files: public/audio/{bn,en}/d{N}-hook.mp3, d{N}-mean.mp3)
export const narration = (p: Phrase, lang: 'bn' | 'en') =>
  lang === 'bn'
    ? {hook: p.bnHookSec, mean: p.bnMeanSec, turn: BN_YOUR_TURN, outro: BN_OUTRO}
    : {hook: EN_VO[p.day].hook, mean: EN_VO[p.day].mean, turn: EN_YOUR_TURN, outro: EN_OUTRO};
