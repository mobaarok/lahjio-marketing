// "More posts" series: 41 feed posts (singles + 5-slide carousels) in posting order, plus follower-milestone posts.
// Post k gets green when k is odd and light when k is even, so the grid stays a checkerboard after day 9 (light).
// No dates or day numbers on the images. Posting guide: out/instagram/{bangla,english}/MORE-POSTS-PLAN.md
import React from 'react';
import {V} from './kit';
import {
  BlankTop,
  ChatSlide,
  ConfusePost,
  Cover,
  CulturePost,
  EndSlide,
  FeaturePost,
  GI,
  GridPost,
  IconsTop,
  Line,
  ListPost,
  MilestonePost,
  MythPost,
  P,
  Ph,
  PhraseSlide,
  QuizPost,
  Side,
  SpotlightPost,
  T,
  Tx,
  Use,
  VersusPost,
  WordTop,
  useX,
} from './tpl';

type Make = (v: V) => React.FC | React.FC[];
// ───────────── 1 · Situation guides (carousel: cover + 3 phrases + end) ─────────────
type SitPh = Ph & {tip: Tx; tipAr?: string};
const situation =
  (icon: string, a: Tx, b: Tx, items: SitPh[]): Make =>
  (v) => [
    () => <Cover v={v} tag={T('সেভ করো', 'Save this')} icon={icon} kicker={T('৩টি দরকারি বাক্য', '3 useful phrases')} a={a} b={b} ars={items.map((p) => p.ar)} />,
    ...items.map((p, i) => () => <PhraseSlide i={i + 1} of={3} p={p} tip={p.tip} tipAr={p.tipAr} />),
    () => <EndSlide a={T('দরকারের দিন', 'Keep it for')} b={T('কাজে লাগবে', 'the day you need it')} note={T('সেভ করে রাখো, আর যে বন্ধুর কাজে লাগবে তাকে পাঠাও', 'Save it, and send it to a friend who needs it')} />,
  ];
const sp = (p: Ph, tip: Tx, tipAr?: string): SitPh => ({...p, tip, tipAr});

const DOCTOR = situation('thermo', T('ডাক্তারের কাছে', 'What to say'), T('যা বলবে', 'at the doctor'), [
  sp(P('أحس بألم هنا', 'আহিস বি-আলাম হিনা', 'ahis b-alam hina', 'এখানে ব্যথা করছে', 'It hurts here'), T('বলার সময় আঙুল দিয়ে জায়গাটা দেখাও', 'Point to the spot as you say it')),
  sp(P('عندي حرارة', 'ইন্দি হারারা', "'indi harara", 'আমার জ্বর', 'I have a fever'), T('কাশি হলে বলো: ইন্দি কাহহা', "Cough? Say: 'indi kahha"), 'عندي كحة'),
  sp(P('كم مرة آخذ الدوا؟', 'কাম মাররা আখুয আদ-দাওয়া?', 'kam marra akhudh ad-dawa?', 'ওষুধ কতবার খাবো?', 'How often do I take it?'), T('উত্তর হতে পারে: মাররাতেইন = দুবার', 'The answer may be marratain = twice'), 'مرتين'),
]);
const BARBER = situation('scissors', T('সেলুনে গিয়ে', 'What to say'), T('যা বলবে', 'at the barber'), [
  sp(P('خفّف من الجوانب', 'খাফফিফ মিন আল-জাওয়ানিব', 'khaffif min al-jawanib', 'পাশ থেকে ছোট করো', 'Shorter on the sides'), T('অল্প একটু হলে: শুওয়াই বাস', 'Just a little: shway bas'), 'شوي بس'),
  sp(P('لا تقصّر كثير', 'লা তগাসসির কাসির', 'la tgassir katheer', 'বেশি ছোট কোরো না', "Don't cut it too short"), T('ঠিক হলে বলো: কিদা যেইন', "When it's right: kidha zain"), 'كذا زين'),
  sp(P('خفّف الدقن', 'খাফফিফ আদ-দাগন', 'khaffif ad-dagn', 'দাড়ি ছোট করো', 'Trim my beard'), T('দাম জানতে: বিকাম আল-হিলাগা?', 'The price? bikam al-hilaaga?'), 'بكم الحلاقة؟'),
]);
const MOBILE = situation('phone', T('মোবাইলের দোকানে', 'What to say'), T('যা বলবে', 'at the mobile shop'), [
  sp(P('أبغى شريحة', 'আবগা শারিহা', 'abgha shariha', 'একটা সিম চাই', 'I want a SIM card'), T('সাথে ইকামা নিয়ে যেও', 'Take your iqama with you'), 'الإقامة'),
  sp(P('أبغى أشحن رصيد', 'আবগা আশহান রাসিদ', 'abgha ashhan raseed', 'রিচার্জ করতে চাই', 'I want to top up'), T('পরিমাণ বলো, যেমন ২০ রিয়াল: বি-ইশরিন', "Say the amount, e.g. 20 riyals: b-'ishreen"), 'بعشرين'),
  sp(P('الجوال خربان', 'আল-জাওয়াল খারবান', 'al-jawwal kharban', 'ফোনটা নষ্ট', 'My phone is broken'), T('স্ক্রিন ভাঙলে: আশ-শাশা খারবানা', 'Broken screen: ash-shasha kharbana'), 'الشاشة خربانة'),
]);

// ───────────── 2 · Workplace Arabic (single lists) ─────────────
const WORK_TAG = T('কাজের আরবি', 'Work Arabic');
const work =
  (a: Tx, b: Tx, note: Tx, items: Ph[]): Make =>
  (v) =>
  () => {
    const x = useX();
    return <ListPost v={v} tag={x(WORK_TAG)} icon="briefcase" a={a} b={b} note={note} items={items} foot={T('সেভ করো, কাজে লাগবে', "Save it, you'll need it")} />;
  };
const BOSS = work(T('বস যা বলে,', 'What your boss says,'), T('তার মানে', 'and what it means'), T('কাজে প্রতিদিন শুনবে এগুলো', "You'll hear these every day at work"), [
  P('يلا', 'ইয়াল্লা', 'yalla', 'চলো, তাড়াতাড়ি', "Come on, let's go"),
  P('بسرعة', 'বিসুরআ', "bsur'a", 'জলদি', 'Quickly'),
  P('خلّصها اليوم', 'খাল্লিসহা আল-ইয়োম', 'khallisha al-yom', 'আজকেই শেষ করো', 'Finish it today'),
  P('تعال هنا', 'তাআল হিনা', "ta'al hina", 'এখানে আসো', 'Come here'),
  P('وين كنت؟', 'ওয়েন কুনত?', 'wein kunt?', 'কোথায় ছিলে?', 'Where were you?'),
]);
const REPLIES = work(T('বসকে যেভাবে', 'How to answer'), T('উত্তর দেবে', 'your boss'), T('ছোট উত্তর, কিন্তু খুব কাজের', 'Short answers that go a long way'), [
  P('حاضر', 'হাযির', 'hadir', 'জি, এখনই করছি', 'Right away'),
  P('إن شاء الله', 'ইনশাআল্লাহ', 'inshallah', 'ইনশাআল্লাহ, করব', 'God willing, I will'),
  P('خلاص، خلّصت', 'খালাস, খাল্লাসত', 'khalas, khallast', 'হয়ে গেছে, শেষ করেছি', "Done, I've finished"),
  P('دقيقة', 'দাগিগা', 'dagiga', 'এক মিনিট', 'One minute'),
  P('ما في مشكلة', 'মা ফি মুশকিলা', 'ma fi mushkila', 'কোনো সমস্যা নেই', 'No problem'),
]);
const ASKING = work(T('কাজে যা', 'Questions to'), T('জিজ্ঞেস করবে', 'ask at work'), T('জিজ্ঞেস করতে লজ্জা নেই', "Don't be shy to ask"), [
  P('وش أسوي؟', 'ওয়েশ আসাওয়ি?', 'wesh asawwi?', 'আমি কী করব?', 'What should I do?'),
  P('ممكن تساعدني؟', 'মুমকিন তসাইদনি?', "mumkin tsa'idni?", 'একটু সাহায্য করবে?', 'Can you help me?'),
  P('متى نخلّص؟', 'মাতা নখাল্লিস?', 'mata nkhallis?', 'কখন ছুটি হবে?', 'When do we finish?'),
  P('أبغى إجازة', 'আবগা ইজাযা', 'abgha ijaza', 'আমি ছুটি চাই', 'I want some leave'),
  P('أنا تعبان', 'আনা তাবান', "ana ta'ban", 'আমার শরীর খারাপ', "I'm not feeling well"),
]);

// ───────────── 3 · Don't confuse these ─────────────
const confuse =
  (p1: Ph, p2: Ph, tip: Tx): Make =>
  (v) =>
  () => {
    const x = useX();
    return <ConfusePost v={v} tag={x(T('সাবধান!', 'Careful!'))} a={T('এই দুটো', "Don't mix")} b={T('গুলিয়ে ফেলো না', 'these up')} p1={p1} p2={p2} tip={tip} />;
  };
const BUKRA = confuse(
  P('بكرة', 'বুকরা', 'bukra', 'আগামীকাল', 'Tomorrow'),
  P('بدري', 'বাদরি', 'badri', 'সকাল সকাল', 'Early'),
  T('বস যদি বলে "তাআল বাদরি", মানে সকাল সকাল আসো, কাল না!', 'If your boss says "ta\'al badri", he means come early, not tomorrow!'),
);
const QALB = confuse(
  P('قلب', 'গালব', 'galb', 'হৃদয়', 'Heart'),
  P('كلب', 'কালব', 'kalb', 'কুকুর', 'Dog'),
  T('সৌদিতে ق প্রায়ই "গ" এর মতো শোনায়, আর ك হলো "ক"। ভুল বললে মানে পুরো পাল্টে যায়!', 'In Saudi, ق often sounds like "g" and ك is "k". Mix them up and the meaning changes!'),
);
const KHALAS = confuse(
  P('خلاص', 'খালাস', 'khalas', 'হয়ে গেছে', "It's done"),
  P('خلّص', 'খাল্লিস', 'khallis', 'শেষ করো!', 'Finish it!'),
  T('খালাস = কাজ শেষ। খাল্লিস = তুমি শেষ করো, এটা আদেশ।', 'khalas = it is finished. khallis = you finish it, an order.'),
);

// ───────────── 4 · Cheat sheets (8-cell grid) ─────────────
const sheet =
  (a: Tx, b: Tx, note: Tx, items: GI[]): Make =>
  (v) =>
  () => {
    const x = useX();
    return <GridPost v={v} tag={x(T('চিট শিট', 'Cheat sheet'))} a={a} b={b} note={note} items={items} />;
  };
const DAYS = sheet(T('সপ্তাহের', 'Days of'), T('দিনগুলো', 'the week'), T('সৌদিতে ছুটির দিন শুক্র আর শনিবার', 'The Saudi weekend is Friday and Saturday'), [
  P('الأحد', 'আল-আহাদ', 'al-ahad', 'রবিবার', 'Sunday'),
  P('الاثنين', 'আল-ইসনেইন', 'al-ithnayn', 'সোমবার', 'Monday'),
  P('الثلاثاء', 'আস-সুলাসা', 'ath-thulatha', 'মঙ্গলবার', 'Tuesday'),
  P('الأربعاء', 'আল-আরবাআ', "al-arba'a", 'বুধবার', 'Wednesday'),
  P('الخميس', 'আল-খামিস', 'al-khamees', 'বৃহস্পতিবার', 'Thursday'),
  P('الجمعة', 'আল-জুমআ', "al-jum'a", 'শুক্রবার', 'Friday'),
  P('السبت', 'আস-সাবত', 'as-sabt', 'শনিবার', 'Saturday'),
  P('اليوم', 'আল-ইয়োম', 'al-yom', 'আজ', 'Today'),
]);
const sw = (p: Ph, c: string): GI => ({...p, sw: c});
const COLOURS = sheet(T('আরবিতে', 'Colours'), T('রঙের নাম', 'in Arabic'), T('দোকানে কাপড় বা জিনিস কিনতে কাজে লাগবে', 'Handy when you shop for clothes or anything else'), [
  sw(P('أحمر', 'আহমার', 'ahmar', 'লাল', 'Red'), '#ef4444'),
  sw(P('أزرق', 'আযরাগ', 'azrag', 'নীল', 'Blue'), '#3b82f6'),
  sw(P('أخضر', 'আখদার', 'akhdar', 'সবুজ', 'Green'), '#16a34a'),
  sw(P('أصفر', 'আসফার', 'asfar', 'হলুদ', 'Yellow'), '#facc15'),
  sw(P('أبيض', 'আবইয়াদ', 'abyad', 'সাদা', 'White'), '#ffffff'),
  sw(P('أسود', 'আসওয়াদ', 'aswad', 'কালো', 'Black'), '#111827'),
  sw(P('بني', 'বুন্নি', 'bunni', 'বাদামি', 'Brown'), '#92400e'),
  sw(P('رمادي', 'রামাদি', 'ramadi', 'ধূসর', 'Grey'), '#9ca3af'),
]);
const FAMILY = sheet(T('পরিবারের', 'Family'), T('সবাই', 'words'), T('বাড়ির খবর বলতে কাজে লাগবে', 'Talk about the people back home'), [
  P('أبوي', 'আবুয়ি', 'abuy', 'আমার বাবা', 'My father'),
  P('أمي', 'উম্মি', 'ummi', 'আমার মা', 'My mother'),
  P('أخوي', 'আখুয়ি', 'akhuy', 'আমার ভাই', 'My brother'),
  P('أختي', 'উখতি', 'ukhti', 'আমার বোন', 'My sister'),
  P('ولدي', 'ওয়ালাদি', 'waladi', 'আমার ছেলে', 'My son'),
  P('بنتي', 'বিনতি', 'binti', 'আমার মেয়ে', 'My daughter'),
  P('زوجتي', 'যাওজাতি', 'zawjati', 'আমার স্ত্রী', 'My wife'),
  P('أهلي', 'আহলি', 'ahli', 'আমার পরিবার', 'My family'),
]);

// ───────────── 5 · Fill in the blank ─────────────
const ao = (ar: string, bn: string, en: string) => ({ar, tr: T(bn, en)});
const blank =
  (parts: (string | null)[], hint: Tx, opts: {ar: string; tr: Tx}[]): Make =>
  (v) =>
  () => {
    const x = useX();
    return <QuizPost v={v} tag={x(T('খালি ঘর', 'Fill the blank'))} a={T('খালি ঘরে', 'What goes in')} b={T('কী বসবে?', 'the blank?')} top={<BlankTop parts={parts} />} hint={hint} opts={opts} />;
  };
const BLANK_KEF = blank(['كيف', null, '؟'], T('মানে: কেমন আছো?', 'Meaning: How are you?'), [ao('اسمك', 'ইসমাক', 'ismak'), ao('حالك', 'হালাক', 'halak'), ao('وين', 'ওয়েন', 'wein')]);
const BLANK_WESH = blank(['وش', null, '؟'], T('মানে: তোমার নাম কী?', "Meaning: What's your name?"), [ao('حالك', 'হালাক', 'halak'), ao('كم', 'কাম', 'kam'), ao('اسمك', 'ইসমাক', 'ismak')]);
const BLANK_KAM = blank([null, 'السعر؟'], T('মানে: দাম কত?', 'Meaning: How much is it?'), [ao('كم', 'কাম', 'kam'), ao('وين', 'ওয়েন', 'wein'), ao('إيش', 'ইশ', 'esh')]);

// ───────────── 6 · Picture quiz (icons, no emoji) ─────────────
const pic =
  (icons: string[], opts: {ar: string; tr: Tx}[]): Make =>
  (v) =>
  () => {
    const x = useX();
    return <QuizPost v={v} tag={x(T('ছবির ধাঁধা', 'Picture quiz'))} a={T('ছবি দেখে', 'Guess')} b={T('বাক্যটা বলো', 'the phrase')} top={<IconsTop icons={icons} />} opts={opts} />;
  };
const PIC_TAXI = pic(['car', 'stop'], [ao('يمين', 'ইয়ামিন', 'yameen'), ao('وقّف هنا', 'ওয়াগ্গিফ হিনা', 'waggif hina'), ao('سيدا', 'সিদা', 'seeda')]);
const PIC_PRICE = pic(['bag', 'coin'], [ao('كم السعر؟', 'কাম আস-সির?', "kam as-si'r?"), ao('شكراً', 'শুকরান', 'shukran'), ao('مع السلامة', 'মাআ আস-সালামা', "ma'a as-salama")]);
const PIC_WAIT = pic(['clock', 'hand'], [ao('بكرة', 'বুকরা', 'bukra'), ao('يلا', 'ইয়াল্লা', 'yalla'), ao('دقيقة', 'দাগিগা', 'dagiga')]);

// ───────────── 7 · This or that ─────────────
const sd = (icon: string, ar: string, trBn: string, trEn: string, mBn: string, mEn: string): Side => ({icon, ar, tr: T(trBn, trEn), m: T(mBn, mEn)});
const versus =
  (a: Tx, b: Tx, l: Side, r: Side): Make =>
  (v) =>
  () => {
    const x = useX();
    return <VersusPost v={v} tag={x(T('এটা নাকি ওটা?', 'This or that?'))} a={a} b={b} l={l} r={r} foot={T('কমেন্টে আরবিতে উত্তর দাও', 'Answer in Arabic in the comments')} />;
  };
const VS_TEA = versus(T('তুমি কোনটা', 'Which one'), T('বেশি খাও?', 'are you?'), sd('cup', 'شاي', 'শাই', 'shay', 'চা', 'Tea'), sd('cup', 'قهوة', 'গাহওয়া', 'gahwa', 'কফি', 'Coffee'));
const VS_SUN = versus(T('তুমি কোন দলে?', 'Morning person or'), T('সকাল নাকি রাত', 'night person?'), sd('sun', 'صباح الخير', 'সাবাহ আল-খাইর', 'sabah al-khair', 'সুপ্রভাত', 'Good morning'), sd('moon', 'مساء الخير', 'মাসা আল-খাইর', "masa' al-khair", 'শুভ সন্ধ্যা', 'Good evening'));
const VS_SEA = versus(T('ছুটির দিনে', 'Weekend plan:'), T('কোথায় যাবে?', 'where to?'), sd('wave', 'بحر', 'বাহার', 'bahar', 'সমুদ্র', 'The sea'), sd('tent', 'برّ', 'বার', 'barr', 'মরুভূমি', 'The desert'));

// ───────────── 8 · What does it mean? (answer next day) ─────────────
const quiz =
  (ar: string, tr: Tx, opts: Tx[]): Make =>
  (v) =>
  () => {
    const x = useX();
    return <QuizPost v={v} tag={x(T('কুইজ', 'Quiz'))} a={T('এই শব্দের', 'What does this')} b={T('মানে কী?', 'mean?')} top={<WordTop ar={ar} tr={tr} />} opts={opts.map((t) => ({t}))} />;
  };
const Q_MARRA = quiz('مرة', T('মাররা', 'marra'), [T('একবার', 'Once'), T('খুব', 'Very'), T('মহিলা', 'Woman')]);
const Q_ZAHMA = quiz('زحمة', T('যাহমা', 'zahma'), [T('বৃষ্টি', 'Rain'), T('তাড়া', 'Hurry'), T('ট্রাফিক জ্যাম', 'Traffic jam')]);
const Q_TAYYIB = quiz('طيب', T('তাইয়িব', 'tayyib'), [T('ডাক্তার', 'Doctor'), T('ঠিক আছে', 'Okay'), T('লম্বা', 'Tall')]);

// ───────────── 9 · Saudi manners: they say → you reply ─────────────
const manners =
  (icon: string, when: Tx, say: Ph, reply: Ph, tip: Tx, tipAr?: string): Make =>
  (v) =>
  () => {
    const x = useX();
    return <CulturePost v={v} tag={x(T('সৌদি আদব', 'Saudi manners'))} icon={icon} when={when} say={say} reply={reply} tip={tip} tipAr={tipAr} />;
  };
const MABROOK = manners(
  'gift',
  T('কেউ ভালো খবর দিলে', 'Someone shares good news'),
  P('مبروك', 'মাবরুক', 'mabrook', 'অভিনন্দন!', 'Congratulations!'),
  P('الله يبارك فيك', 'আল্লাহ ইবারিক ফিক', 'allah ybarik feek', 'আল্লাহ তোমাকেও বরকত দিন', 'God bless you too'),
  T('নতুন চাকরি, গাড়ি, বিয়ে: সব খুশির খবরে মাবরুক', 'New job, new car, a wedding: mabrook fits all good news'),
);
const SALAMAT = manners(
  'heart',
  T('কেউ অসুস্থ হলে', 'Someone is sick'),
  P('سلامات', 'সালামাত', 'salamat', 'তাড়াতাড়ি সুস্থ হও', 'Get well soon'),
  P('الله يسلمك', 'আল্লাহ ইসাল্লিমাক', 'allah ysallimak', 'আল্লাহ তোমাকে ভালো রাখুন', 'God keep you safe'),
  T('আরও বলতে পারো: মা তশুফ শার', 'You can add: ma tshoof shar'),
  'ما تشوف شر',
);
const TAFADDAL = manners(
  'hand',
  T('কেউ তোমাকে কিছু দিলে', 'Someone offers you something'),
  P('تفضّل', 'তাফাদ্দাল', 'tafaddal', 'নাও, প্লিজ', 'Here you are, please'),
  P('الله يكرمك', 'আল্লাহ ইকরিমাক', 'allah ykrimak', 'ধন্যবাদ, আল্লাহ তোমায় সম্মান দিন', 'Thank you, God honour you'),
  T('মেয়েদের বলা হয়: তাফাদ্দালি', 'To a woman they say: tafaddali'),
  'تفضّلي',
);

// ───────────── 10 · Myth vs fact ─────────────
const myth =
  (m: Tx, f: Tx, ex?: [string, string]): Make =>
  (v) =>
  () => {
    const x = useX();
    return <MythPost v={v} tag={x(T('ভুল ধারণা', 'Myth vs fact'))} myth={m} fact={f} ex={ex} />;
  };
const MYTH_ALPHA = myth(
  T('আগে আরবি বর্ণমালা শিখতেই হবে', 'You must learn the Arabic alphabet first'),
  T('কথা বলা শুরু করতে বর্ণমালা লাগে না। শুনে শুনে শেখো, যেভাবে বাচ্চারা শেখে।', "You can start speaking without it. Learn by listening, the way children do."),
);
const MYTH_AGE = myth(
  T('বড় বয়সে নতুন ভাষা শেখা যায় না', "Adults can't learn a new language"),
  T('যেকোনো বয়সে শেখা যায়। রোজ অল্প অল্প, দিনে ৫ মিনিটই যথেষ্ট।', 'You can learn at any age. A little every day, even 5 minutes, is enough.'),
);
const MYTH_BOOK = myth(
  T('বইয়ের আরবি দিয়েই সৌদিতে চলে যাবে', 'Textbook Arabic is all you need in Saudi'),
  T('সৌদিরা নিজেদের কথ্য ভাষায় কথা বলে।', 'Saudis speak their own spoken dialect.'),
  ['أريد', 'أبغى'],
);

// ───────────── 11 · Real conversation stories (carousel: cover + 3 chats + end) ─────────────
const L = (me: boolean, ar: string, trBn: string, trEn: string, mBn: string, mEn: string): Line => ({me, ar, tr: T(trBn, trEn), m: T(mBn, mEn)});
const story =
  (icon: string, title: Tx, them: Tx, slides: Line[][]): Make =>
  (v) => [
    () => <Cover v={v} tag={T('আসল কথোপকথন', 'Real conversation')} icon={icon} kicker={T('সোয়াইপ করে পড়ো', 'Swipe through a real chat')} a={title} b={T('আরবিতে', 'in Arabic')} />,
    ...slides.map((lines, i) => () => <ChatSlide i={i + 1} of={slides.length} icon={icon} title={title} them={them} lines={lines} />),
    () => <EndSlide a={T('এবার তুমি', 'Now it is')} b={T('চেষ্টা করো!', 'your turn!')} note={T('সেভ করো, পরের বার নিজে বলে দেখো', 'Save it and try it yourself next time')} />,
  ];
const SHAWARMA = story('food', T('শাওয়ারমা অর্ডার', 'Ordering shawarma'), T('দোকানদার', 'Shop worker'), [
  [
    L(false, 'هلا، وش تبغى؟', 'হালা, ওয়েশ তাবগা?', 'hala, wesh tabgha?', 'হ্যালো, কী চাই?', 'Hi, what would you like?'),
    L(true, 'أبغى شاورما دجاج', 'আবগা শাওয়ারমা দাজাজ', 'abgha shawarma dajaj', 'একটা চিকেন শাওয়ারমা', 'A chicken shawarma'),
  ],
  [
    L(false, 'سفري ولا هنا؟', 'সাফারি ওয়াল্লা হিনা?', 'safari walla hina?', 'নিয়ে যাবে, না এখানে খাবে?', 'Takeaway or eat here?'),
    L(true, 'سفري', 'সাফারি', 'safari', 'নিয়ে যাব', 'Takeaway'),
    L(false, 'حار ولا عادي؟', 'হার ওয়াল্লা আদি?', "har walla 'aadi?", 'ঝাল, না সাধারণ?', 'Spicy or regular?'),
  ],
  [
    L(true, 'بكم؟', 'বিকাম?', 'bikam?', 'কত হলো?', 'How much?'),
    L(false, 'عشرة ريال', 'আশারা রিয়াল', "'ashara riyal", 'দশ রিয়াল', 'Ten riyals'),
    L(true, 'تفضّل', 'তাফাদ্দাল', 'tafaddal', 'এই নাও', 'Here you go'),
  ],
]);
const TAXI_STORY = story('car', T('ট্যাক্সিতে', 'In a taxi'), T('ড্রাইভার', 'Driver'), [
  [
    L(false, 'وين تبغى تروح؟', 'ওয়েন তাবগা তরুহ?', 'wein tabgha trooh?', 'কোথায় যাবে?', 'Where do you want to go?'),
    L(true, 'البطحاء لو سمحت', 'আল-বাতহা লাও সামাহত', 'al-batha law samaht', 'বাতহা যাব, প্লিজ', 'Al-Batha, please'),
  ],
  [
    L(true, 'بكم المشوار؟', 'বিকাম আল-মিশওয়ার?', 'bikam al-mishwar?', 'ভাড়া কত?', 'How much for the ride?'),
    L(false, 'ثلاثين', 'সালাসিন', 'thalatheen', 'ত্রিশ', 'Thirty'),
    L(true, 'خلّها خمسة وعشرين', 'খাল্লিহা খামসা ও ইশরিন', "khalliha khamsa w 'ishreen", 'পঁচিশ করো', 'Make it twenty-five'),
  ],
  [
    L(true, 'وقّف هنا', 'ওয়াগ্গিফ হিনা', 'waggif hina', 'এখানে থামাও', 'Stop here'),
    L(false, 'الحمد لله على السلامة', 'আলহামদুলিল্লাহ আলা আস-সালামা', "alhamdulillah 'ala as-salama", 'ভালোভাবে পৌঁছেছ, আলহামদুলিল্লাহ', 'Glad you got here safely'),
    L(true, 'الله يسلمك', 'আল্লাহ ইসাল্লিমাক', 'allah ysallimak', 'আল্লাহ তোমাকেও ভালো রাখুন', 'God keep you safe too'),
  ],
]);
const PHARMACY = story('pill', T('ফার্মেসিতে', 'At the pharmacy'), T('ফার্মাসিস্ট', 'Pharmacist'), [
  [
    L(true, 'عندي صداع', 'ইন্দি সুদা', "'indi suda'", 'আমার মাথাব্যথা', 'I have a headache'),
    L(false, 'من متى؟', 'মিন মাতা?', 'min mata?', 'কবে থেকে?', 'Since when?'),
  ],
  [
    L(true, 'من أمس', 'মিন আমস', 'min ams', 'গতকাল থেকে', 'Since yesterday'),
    L(false, 'خذ هذا، حبة كل ثمان ساعات', 'খুয হাযা, হাব্বা কুল সামান সাআত', "khudh hadha, habba kull thaman sa'at", 'এটা নাও, ৮ ঘণ্টা পরপর একটা', 'Take this, one every 8 hours'),
  ],
  [
    L(true, 'بكم؟', 'বিকাম?', 'bikam?', 'দাম কত?', 'How much?'),
    L(false, 'خمسطعش ريال', 'খামাস্তাশ রিয়াল', 'khamastash riyal', 'পনেরো রিয়াল', 'Fifteen riyals'),
    L(true, 'جزاك الله خير', 'জাযাকাল্লাহ খাইর', 'jazak allah khair', 'আল্লাহ তোমাকে উত্তম প্রতিদান দিন', 'May God reward you'),
  ],
]);

// ───────────── 12 · One word, many meanings ─────────────
const U = (lBn: string, lEn: string, ex: string, trBn: string, trEn: string, mBn: string, mEn: string): Use => ({label: T(lBn, lEn), ex, exTr: T(trBn, trEn), exM: T(mBn, mEn)});
const spot =
  (ar: string, tr: Tx, uses: Use[]): Make =>
  (v) =>
  () => {
    const x = useX();
    return <SpotlightPost v={v} tag={x(T('এক শব্দ', 'Word spotlight'))} ar={ar} tr={tr} uses={uses} />;
  };
const SPOT_YALLA = spot('يلا', T('ইয়াল্লা', 'yalla'), [
  U('ডাকতে', 'To invite', 'يلا نروح', 'ইয়াল্লা নরুহ', 'yalla nrooh', 'চলো যাই', "Let's go"),
  U('তাড়া দিতে', 'To hurry', 'يلا بسرعة', 'ইয়াল্লা বিসুরআ', "yalla bsur'a", 'তাড়াতাড়ি করো', 'Hurry up'),
  U('বিদায় নিতে', 'To say bye', 'يلا مع السلامة', 'ইয়াল্লা মাআ আস-সালামা', "yalla ma'a as-salama", 'আচ্ছা, বিদায়', 'OK, bye'),
]);
const SPOT_KHALAS = spot('خلاص', T('খালাস', 'khalas'), [
  U('কাজ শেষ', 'Finished', 'خلاص خلّصت', 'খালাস খাল্লাসত', 'khalas khallast', 'শেষ, করে ফেলেছি', "Done, I've finished"),
  U('থামাতে', 'To stop', 'خلاص، يكفي', 'খালাস, ইকফি', 'khalas, yakfi', 'থামো, যথেষ্ট', "Stop, that's enough"),
  U('রাজি হতে', 'To agree', 'خلاص، اتفقنا', 'খালাস, ইত্তাফাগনা', 'khalas, ittafagna', 'ঠিক আছে, পাকা কথা', "OK, it's a deal"),
]);
const SPOT_WALLAH = spot('والله', T('ওয়াল্লাহ', 'wallah'), [
  U('সত্যি বলতে', 'To be honest', 'والله ما أدري', 'ওয়াল্লাহ মা আদরি', 'wallah ma adri', 'সত্যি জানি না', "Honestly, I don't know"),
  U('অবাক হলে', 'Surprised', 'والله؟', 'ওয়াল্লাহ?', 'wallah?', 'সত্যি?!', 'Really?!'),
  U('জোর দিতে', 'For emphasis', 'زين والله', 'যেইন ওয়াল্লাহ', 'zain wallah', 'সত্যিই ভালো', 'Really good'),
]);

// ───────────── 13 · Save-for-later guides (carousel: cover + 3 lists + end) ─────────────
type Sec = {icon: string; title: Tx; items: Ph[]};
const guide =
  (icon: string, kicker: Tx, a: Tx, b: Tx, secs: Sec[]): Make =>
  (v) => [
    () => <Cover v={v} tag={T('সেভ করো', 'Save this')} icon={icon} kicker={kicker} a={a} b={b} />,
    ...secs.map((s, i) => () => <ListPost v="light" tag={[i + 1, secs.length]} icon={s.icon} a={s.title} items={s.items} />),
    () => <EndSlide a={T('যে বন্ধু সৌদি আসছে,', 'Know someone moving')} b={T('তাকে পাঠাও', 'to Saudi? Send this')} note={T('৯টি বাক্যেই প্রথম সপ্তাহ সহজ হবে', 'These 9 phrases make the first week easier')} />,
  ];
const FIRST_WEEK = guide('globe', T('নতুন এসেছ?', 'Just arrived?'), T('সৌদিতে', 'Your first week'), T('প্রথম সপ্তাহ', 'in Saudi'), [
  {
    icon: 'hand',
    title: T('দেখা হলে', 'Saying hello'),
    items: [
      P('هلا', 'হালা', 'hala', 'হাই', 'Hi'),
      P('صباح الخير', 'সাবাহ আল-খাইর', 'sabah al-khair', 'সুপ্রভাত', 'Good morning'),
      P('مع السلامة', 'মাআ আস-সালামা', "ma'a as-salama", 'বিদায়', 'Goodbye'),
    ],
  },
  {
    icon: 'bag',
    title: T('দোকানে', 'Shopping'),
    items: [
      P('أبغى هذا', 'আবগা হাযা', 'abgha hadha', 'এটা চাই', 'I want this'),
      P('بكم؟', 'বিকাম?', 'bikam?', 'দাম কত?', 'How much?'),
      P('عندك صرف؟', 'ইন্দাক সারফ?', "'indak sarf?", 'ভাংতি আছে?', 'Do you have change?'),
    ],
  },
  {
    icon: 'pin',
    title: T('পথ খুঁজতে', 'Finding your way'),
    items: [
      P('وين المسجد؟', 'ওয়েন আল-মাসজিদ?', 'wein al-masjid?', 'মসজিদ কোথায়?', 'Where is the mosque?'),
      P('قريب', 'গারিব', 'gareeb', 'কাছে', 'Near'),
      P('بعيد', 'বাঈদ', "ba'eed", 'দূরে', 'Far'),
    ],
  },
]);
const FIRST_JOB = guide('briefcase', T('নতুন চাকরি?', 'New job?'), T('কাজের', 'Your first day'), T('প্রথম দিন', 'at work'), [
  {
    icon: 'users',
    title: T('পরিচয়', 'Meeting people'),
    items: [
      P('أنا جديد هنا', 'আনা জাদিদ হিনা', 'ana jadeed hina', 'আমি এখানে নতুন', "I'm new here"),
      P('وش اسمك؟', 'ওয়েশ ইসমাক?', 'wesh ismak?', 'তোমার নাম কী?', "What's your name?"),
      P('تشرفنا', 'তাশাররাফনা', 'tasharrafna', 'পরিচিত হয়ে খুশি হলাম', 'Nice to meet you'),
    ],
  },
  {
    icon: 'book',
    title: T('কাজ শিখতে', 'Learning the job'),
    items: [
      P('ممكن تعلّمني؟', 'মুমকিন তআল্লিমনি?', "mumkin t'allimni?", 'দেখিয়ে দেবে?', 'Can you show me?'),
      P('عيد لو سمحت', 'ঈদ লাও সামাহত', "'eed law samaht", 'আবার বলো, প্লিজ', 'Say it again, please'),
      P('وين أحط هذا؟', 'ওয়েন আহুত্ত হাযা?', 'wein ahutt hadha?', 'এটা কোথায় রাখব?', 'Where do I put this?'),
    ],
  },
  {
    icon: 'clock',
    title: T('দিন শেষে', 'End of the day'),
    items: [
      P('خلّصت', 'খাল্লাসত', 'khallast', 'শেষ করেছি', "I'm done"),
      P('يعطيك العافية', 'ইয়াতিক আল-আফিয়া', "ya'teek al-'afya", 'ধন্যবাদ, ভালো কাজ', 'Thanks for your work'),
      P('أشوفك بكرة', 'আশুফাক বুকরা', 'ashoofak bukra', 'কাল দেখা হবে', 'See you tomorrow'),
    ],
  },
]);

// ───────────── 14 · App features ─────────────
const feature =
  (icon: string, a: Tx, b: Tx, points: Tx[]): Make =>
  (v) =>
  () => <FeaturePost v={v} icon={icon} a={a} b={b} points={points} />;
const F_AUDIO = feature('headphones', T('প্রতিটি শব্দ', 'Every word in a'), T('সৌদি কণ্ঠে', 'native Saudi voice'), [
  T('আসল উচ্চারণ শুনে শেখো', 'Hear the real pronunciation'),
  T('যতবার খুশি আবার শোনো', 'Replay as often as you like'),
  T('৭৭৩+ শব্দ ও বাক্য', '773+ words and phrases'),
]);
const F_REVIEW = feature('refresh', T('ভুলে যাওয়ার আগেই', 'Review just'), T('রিভিউ', 'before you forget'), [
  T('কঠিন শব্দগুলো অ্যাপ মনে রাখে', 'The app tracks your hard words'),
  T('ঠিক সময়ে আবার দেখায়', 'It brings them back at the right time'),
  T('কম সময়ে বেশি মনে থাকে', 'Remember more in less time'),
]);
const F_STREAK = feature('flame', T('রোজ একটু,', 'A little every day,'), T('স্ট্রিক ধরে রাখো', 'keep your streak'), [
  T('নিজের দৈনিক লক্ষ্য ঠিক করো', 'Set your own daily goal'),
  T('প্রতিটি পড়ায় XP পাও', 'Earn XP for every lesson'),
  T('দিনে মাত্র ৫ মিনিট', 'Just 5 minutes a day'),
]);

// ───────────── Posting order (keep in sync with MORE-POSTS-PLAN.md) ─────────────
export const ORDER: {slug: string; make: Make}[] = [
  {slug: 'situation-doctor', make: DOCTOR},
  {slug: 'work-boss-says', make: BOSS},
  {slug: 'quiz-marra', make: Q_MARRA},
  {slug: 'cheat-days', make: DAYS},
  {slug: 'story-shawarma', make: SHAWARMA},
  {slug: 'picture-quiz-taxi', make: PIC_TAXI},
  {slug: 'manners-mabrook', make: MABROOK},
  {slug: 'confuse-bukra-badri', make: BUKRA},
  {slug: 'app-audio', make: F_AUDIO},
  {slug: 'guide-first-week', make: FIRST_WEEK},
  {slug: 'blank-kef', make: BLANK_KEF},
  {slug: 'word-yalla', make: SPOT_YALLA},
  {slug: 'myth-alphabet', make: MYTH_ALPHA},
  {slug: 'this-or-that-tea', make: VS_TEA},
  {slug: 'situation-barber', make: BARBER},
  {slug: 'work-replies', make: REPLIES},
  {slug: 'quiz-zahma', make: Q_ZAHMA},
  {slug: 'cheat-colours', make: COLOURS},
  {slug: 'story-taxi', make: TAXI_STORY},
  {slug: 'picture-quiz-price', make: PIC_PRICE},
  {slug: 'manners-salamat', make: SALAMAT},
  {slug: 'confuse-galb-kalb', make: QALB},
  {slug: 'app-review', make: F_REVIEW},
  {slug: 'guide-first-job', make: FIRST_JOB},
  {slug: 'blank-wesh', make: BLANK_WESH},
  {slug: 'word-khalas', make: SPOT_KHALAS},
  {slug: 'myth-age', make: MYTH_AGE},
  {slug: 'this-or-that-morning', make: VS_SUN},
  {slug: 'situation-mobile-shop', make: MOBILE},
  {slug: 'work-asking', make: ASKING},
  {slug: 'quiz-tayyib', make: Q_TAYYIB},
  {slug: 'cheat-family', make: FAMILY},
  {slug: 'story-pharmacy', make: PHARMACY},
  {slug: 'picture-quiz-wait', make: PIC_WAIT},
  {slug: 'manners-tafaddal', make: TAFADDAL},
  {slug: 'confuse-khalas-khallis', make: KHALAS},
  {slug: 'app-streak', make: F_STREAK},
  {slug: 'blank-kam', make: BLANK_KAM},
  {slug: 'word-wallah', make: SPOT_WALLAH},
  {slug: 'myth-textbook', make: MYTH_BOOK},
  {slug: 'this-or-that-sea', make: VS_SEA},
];

export const MORE: {file: string; C: React.FC}[] = ORDER.flatMap((o, i) => {
  const v: V = i % 2 === 0 ? 'green' : 'light';
  const nn = String(i + 1).padStart(2, '0');
  const r = o.make(v);
  return Array.isArray(r) ? r.map((C, k) => ({file: `${nn}-${o.slug}/slide-${k + 1}`, C})) : [{file: `${nn}-${o.slug}`, C: r}];
});

// Follower milestones: not in the fixed order. Both colours, so you can pick the one that continues the grid.
export const MILESTONES: {file: string; C: React.FC}[] = ['100', '500', '1,000'].flatMap((n) =>
  (['green', 'light'] as V[]).map((v) => ({file: `followers-${n.replace(',', '')}-${v}`, C: () => <MilestonePost v={v} count={n} />})),
);
