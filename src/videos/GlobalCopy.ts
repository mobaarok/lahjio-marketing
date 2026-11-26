import {Copy} from '../copy';

// "Learn Saudi Arabic in English" — for English speakers anywhere (India, Philippines, UK, USA, ...)
// Reused scenes (Quiz, Life, Habit, Outro) read these fields.
export const GLOBAL: Copy & {
  hookA: string;
  hookB: string;
  hookC: string;
  places: string[];
  cities: {city: string; country: string; flag: 'in' | 'ph' | 'gb' | 'us'}[];
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
} = {
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
