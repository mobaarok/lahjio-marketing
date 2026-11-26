export type Lang = 'bn' | 'en';

export type Copy = {
  hook1: string;
  hook2a: string; // gradient part
  hook2b: string;
  chips: {emoji: string; label: string; ar: string}[];
  tagA: string;
  tagB: string; // gradient part
  tagC: string;
  quizLabel: string;
  translit: string;
  options: string[];
  next: string;
  cap1Title: string;
  cap1Sub: string;
  cap2Title: string;
  cap2Sub: string;
  lifeTitle: string;
  lifeSub: string;
  cards: {emoji: string; label: string; ar: string; meaning: string}[];
  habitA: string;
  habitB: string; // gradient part
  streak: string;
  xp: string;
  goal: string;
  pills: string[];
  outroTitle: string;
  cta: string;
  free: string;
};

export const COPY: Record<Lang, Copy> = {
  bn: {
    hook1: 'সৌদিতে থাকো?',
    hook2a: 'আরবি',
    hook2b: ' বুঝতে কষ্ট হয়?',
    chips: [
      {emoji: '🛒', label: 'দোকানে', ar: 'كم السعر'},
      {emoji: '🚕', label: 'ট্যাক্সিতে', ar: 'وين'},
      {emoji: '🧰', label: 'কাজে', ar: 'أبغى…'},
    ],
    tagA: 'বাংলায় শেখো ',
    tagB: 'আসল সৌদি আরবি',
    tagC: '',
    quizLabel: 'এর অর্থ কী?',
    translit: "কাম আস-সি'র",
    options: ['দাম কত?', 'কোথায়?', 'ধন্যবাদ'],
    next: 'পরের প্রশ্ন',
    cap1Title: 'প্রতিটি শব্দের',
    cap1Sub: 'আসল সৌদি উচ্চারণ',
    cap2Title: 'খেলার মতো',
    cap2Sub: 'ছোট ছোট কুইজ',
    lifeTitle: 'আজই কাজে লাগবে',
    lifeSub: 'এমন আরবি',
    cards: [
      {emoji: '🛒', label: 'দোকানে', ar: 'كم السعر', meaning: 'দাম কত?'},
      {emoji: '🚕', label: 'ট্যাক্সিতে', ar: 'وين', meaning: 'কোথায়?'},
      {emoji: '🧰', label: 'কাজে', ar: 'أبغى', meaning: 'আমি চাই'},
      {emoji: '🤝', label: 'বন্ধুদের সাথে', ar: 'كيف حالك', meaning: 'কেমন আছেন?'},
    ],
    habitA: 'দিনে মাত্র ',
    habitB: '৫ মিনিট',
    streak: 'দিনের স্ট্রিক',
    xp: 'XP অর্জন',
    goal: 'দৈনিক লক্ষ্য',
    pills: ['৭৭৩+ শব্দ ও বাক্য', '৭২টি লেসন', 'স্মার্ট রিভিউ'],
    outroTitle: 'আজই আরবি বলা শুরু করো',
    cta: 'ফ্রি শুরু করো',
    free: 'শুরু করা ফ্রি · সাইন আপ ১ মিনিটে',
  },
  en: {
    hook1: 'Living in Saudi?',
    hook2a: 'Arabic',
    hook2b: ' feels hard?',
    chips: [
      {emoji: '🛒', label: 'At the shop', ar: 'كم السعر'},
      {emoji: '🚕', label: 'In a taxi', ar: 'وين'},
      {emoji: '🧰', label: 'At work', ar: 'أبغى…'},
    ],
    tagA: 'Learn ',
    tagB: 'real Saudi Arabic',
    tagC: ' — explained in Bengali',
    quizLabel: 'What does it mean?',
    translit: "kam as-si'r",
    options: ['How much?', 'Where?', 'Thank you'],
    next: 'Next question',
    cap1Title: 'Every word with',
    cap1Sub: 'native Saudi audio',
    cap2Title: 'Practise with',
    cap2Sub: 'bite-size quizzes',
    lifeTitle: "Arabic you'll use",
    lifeSub: 'today',
    cards: [
      {emoji: '🛒', label: 'At the shop', ar: 'كم السعر', meaning: 'How much?'},
      {emoji: '🚕', label: 'In a taxi', ar: 'وين', meaning: 'Where?'},
      {emoji: '🧰', label: 'At work', ar: 'أبغى', meaning: 'I want'},
      {emoji: '🤝', label: 'With friends', ar: 'كيف حالك', meaning: 'How are you?'},
    ],
    habitA: 'Just ',
    habitB: '5 minutes a day',
    streak: 'day streak',
    xp: 'XP earned',
    goal: 'daily goal',
    pills: ['773+ words & phrases', '72 lessons', 'Smart review'],
    outroTitle: 'Start speaking Arabic today',
    cta: 'Start free',
    free: 'Free to start · Sign up in 1 minute',
  },
};
