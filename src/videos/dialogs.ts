// "Mini dialogue" series: a short real-life chat between a Saudi and "you" (the Bangladeshi worker).
// The dialogue plays 3 times: 1) just listen, 2) with transliteration + meaning, 3) you say your lines (pause, no audio).
// Audio: "them" = ElevenLabs "Abdulrahman" (KfYUTAF49N2CPU3iKuMi), "you" = "Fahad - Saudi" (YCN2uLvOoKxKJtRmeub3), eleven_v4.
// Hook narration: bn = "Shadhin Bangla", en = "Leo" (public/audio/{bn,en}/dlg{N}-hook.mp3).
// *sec values are clip lengths measured with ffprobe; timing in Dialogue.tsx is computed from them.

type T2 = {bn: string; en: string};
export type Line = {who: 'them' | 'you'; ar: string; tr: T2; mean: T2; audio: string; sec: number};
export type Dialog = {
  id: number;
  slug: string;
  them: T2; // who the Saudi is
  you: T2; // who the viewer plays
  themKind: 'saudi';
  youKind: 'shop';
  hook: T2;
  hookSec: {bn: number; en: number};
  lines: Line[];
};

export const DIALOGS: Dialog[] = [
  {
    id: 1,
    slug: 'shop-water',
    them: {bn: 'সৌদি কাস্টমার', en: 'Saudi customer'},
    you: {bn: 'তুমি · দোকানদার', en: 'You · shopkeeper'},
    themKind: 'saudi',
    youKind: 'shop',
    hook: {bn: 'দোকানে সৌদি কাস্টমার এলে কী বলবে?', en: 'A Saudi customer walks into your shop. What do you say?'},
    hookSec: {bn: 2.56, en: 3.36},
    lines: [
      {
        who: 'them',
        ar: 'السلام عليكم، عندك موية؟',
        tr: {bn: 'আস-সালামু আলাইকুম, ইন্দাক মোইয়া?', en: "as-salamu 'alaykum, 'indak moya?"},
        mean: {bn: 'আসসালামু আলাইকুম, পানি আছে?', en: 'Hello, do you have water?'},
        audio: 'audio/dialog/d1-l1.mp3',
        sec: 2.24,
      },
      {
        who: 'you',
        ar: 'وعليكم السلام، إيه موجود',
        tr: {bn: 'ওয়া আলাইকুম আস-সালাম, ঈহ মাওজুদ', en: "wa 'alaykum as-salam, eeh mawjood"},
        mean: {bn: 'ওয়ালাইকুম আসসালাম, হ্যাঁ আছে', en: 'Wa alaykum salam, yes, we have it'},
        audio: 'audio/dialog/d1-l2.mp3',
        sec: 2.56,
      },
      {
        who: 'them',
        ar: 'بكم؟',
        tr: {bn: 'বিকাম?', en: 'bikam?'},
        mean: {bn: 'কত দাম?', en: 'How much?'},
        audio: 'audio/dialog/d1-l3.mp3',
        sec: 0.88,
      },
      {
        who: 'you',
        ar: 'بريالين',
        tr: {bn: 'বি-রিয়ালেইন', en: 'b-riyalein'},
        mean: {bn: 'দুই রিয়াল', en: 'Two riyals'},
        audio: 'audio/dialog/d1-l4.mp3',
        sec: 1.04,
      },
    ],
  },
];

export const DUI = {
  bn: {
    series: 'মিনি ডায়লগ',
    badge: (n: string) => `মিনি ডায়লগ ${n}`,
    round: 'রাউন্ড',
    rounds: ['শুধু শোনো', 'মানেসহ শোনো', 'এবার তুমি বলো!'],
    youSay: 'তুমি বলো',
  },
  en: {
    series: 'Mini dialogue',
    badge: (n: string) => `Mini dialogue #${n}`,
    round: 'Round',
    rounds: ['Just listen', 'Listen with meaning', 'Now you say it!'],
    youSay: 'You say',
  },
};
