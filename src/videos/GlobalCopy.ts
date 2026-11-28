import {COPY, Copy} from '../copy';

// "Learn Saudi Arabic in English" — for English speakers anywhere (India, Philippines, UK, USA, ...)
// Reused scenes (Quiz, Life, Habit, Outro) read these fields.
export type GlobalCopy = Copy & {
  hookA: string;
  hookB: string;
  hookC: string;
  places: string[];
  cities: {city: string; country: string; flag: 'in' | 'ph' | 'gb' | 'us' | 'bd'}[];
  badge: string;
  withA: string;
  withB: string;
  priceMeaning: string;
  speak: string;
  learnA: string;
  learnB: string;
  textbook: string;
  realA: string;
  realB: string;
  devA: string;
  devB: string;
  devWeb: string;
  devApp: string;
  heroA: string;
  heroB: string;
};

export const GLOBAL: GlobalCopy = {
  // new scenes
  hookA: 'Moving to',
  hookB: 'Saudi Arabia?',
  hookC: 'Or already living there?',
  places: ['Riyadh', 'Jeddah', 'Dammam'],
  cities: [
    {city: 'Manila', country: 'Philippines', flag: 'ph'},
    {city: 'Mumbai', country: 'India', flag: 'in'},
    {city: 'Manchester', country: 'UK', flag: 'gb'},
    {city: 'Miami', country: 'USA', flag: 'us'},
  ],
  badge: 'EN',
  withA: 'with',
  withB: '',
  priceMeaning: 'How much is it?',
  speak: 'Speak English?',
  learnA: 'Learn ',
  learnB: 'Saudi Arabic',
  textbook: 'Textbook Arabic',
  realA: 'The real Arabic',
  realB: 'you hear every day',
  devA: 'Website or ',
  devB: 'phone app',
  devWeb: 'lahjio.com',
  devApp: 'Add to Home screen',
  heroA: 'Speak Saudi Arabic',
  heroB: 'with confidence',
  // reused scenes
  hook1: '',
  hook2a: '',
  hook2b: '',
  chips: [
    {emoji: '🛒', label: 'At the shop', ar: 'كم السعر'},
    {emoji: '🚕', label: 'In a taxi', ar: 'وين'},
    {emoji: '🧰', label: 'At work', ar: 'أبغى'},
  ],
  tagA: '',
  tagB: '',
  tagC: '',
  quizLabel: 'What does this mean?',
  translit: "kam as-si'r",
  options: ['How much is it?', 'Where is it?', 'Thank you'],
  next: 'Next question',
  cap1Title: 'Every word with',
  cap1Sub: 'real Saudi audio',
  cap2Title: 'Explained in',
  cap2Sub: 'simple English',
  lifeTitle: "Phrases you'll use",
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
  cta: 'Start for free',
  free: 'Free to start · Web & phone',
};

// Bangla version: same video, re-targeted at Bengali speakers (Bangladesh + West Bengal).
// Narrator "Shadhin Bangla", clips public/audio/bn/g{1..8}-*.mp3. Reused scenes take COPY.bn text.
export const GLOBAL_BN: GlobalCopy = {
  ...COPY.bn,
  hookA: 'কাজের জন্য যাচ্ছো',
  hookB: 'সৌদি আরব?',
  hookC: 'নাকি এখন সেখানেই থাকো?',
  places: ['রিয়াদ', 'জেদ্দা', 'দাম্মাম'],
  cities: [
    {city: 'ঢাকা', country: 'বাংলাদেশ', flag: 'bd'},
    {city: 'চট্টগ্রাম', country: 'বাংলাদেশ', flag: 'bd'},
    {city: 'সিলেট', country: 'বাংলাদেশ', flag: 'bd'},
    {city: 'কলকাতা', country: 'ভারত', flag: 'in'},
  ],
  badge: 'বাং',
  withA: '',
  withB: 'দিয়ে',
  priceMeaning: 'দাম কত?',
  speak: 'বাংলা জানো?',
  learnA: 'শেখো ',
  learnB: 'সৌদি আরবি',
  textbook: 'বইয়ের আরবি',
  realA: 'প্রতিদিন যে আরবি শোনো',
  realB: 'সেই আসল আরবি',
  devA: 'ওয়েবসাইট অথবা ',
  devB: 'ফোন অ্যাপ',
  devWeb: 'lahjio.com',
  devApp: 'হোম স্ক্রিনে যোগ করো',
  heroA: 'আত্মবিশ্বাসের সাথে বলো',
  heroB: 'সৌদি আরবি',
  cap2Title: 'সব কিছু',
  cap2Sub: 'সহজ বাংলায়',
  free: 'শুরু করা ফ্রি · ওয়েব ও ফোনে',
};
