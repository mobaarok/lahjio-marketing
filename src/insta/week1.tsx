// Week 1 image posts (one per day, after the 9 launch posts), Bangla and English. They alternate light / green
// so the profile grid stays a checkerboard. Day 1 is a carousel; the other days are single images.
import React from 'react';
import {C} from '../theme';
import {PHRASES} from '../daily/phrases';
import {Ar, Bars, Button, Card, Grad, Icon, IconBadge, Pill, Post, Speaker, V, useLang, useNum, useT} from './kit';

type Tx = {bn: string; en: string};
const useTx = () => {
  const l = useLang();
  return (x: Tx) => x[l];
};

// ───────────── Day 1 · carousel "5 phrases for your first day" ─────────────
const FIRST5: {ar: string; tr: Tx; m: Tx; when: Tx; tipAr: string; tip: Tx}[] = [
  {
    ar: 'السلام عليكم',
    tr: {bn: 'আস-সালামু আলাইকুম', en: 'as-salamu alaykum'},
    m: {bn: 'আসসালামু আলাইকুম', en: 'Peace be upon you'},
    when: {bn: 'দেখা হলে প্রথম কথা', en: 'When you meet someone'},
    tipAr: 'وعليكم السلام',
    tip: {bn: 'উত্তর: ওয়া আলাইকুম আস-সালাম', en: 'Reply: wa alaykum as-salam'},
  },
  {
    ar: 'كيف حالك؟',
    tr: {bn: 'কেফ হালাক?', en: 'kef halak?'},
    m: {bn: 'কেমন আছেন?', en: 'How are you?'},
    when: {bn: 'খোঁজ নিতে', en: 'To ask how someone is'},
    tipAr: 'الحمد لله',
    tip: {bn: 'উত্তর: আলহামদুলিল্লাহ', en: 'Reply: alhamdulillah'},
  },
  {
    ar: 'كم السعر؟',
    tr: {bn: "কাম আস-সি'র?", en: "kam as-si'r?"},
    m: {bn: 'দাম কত?', en: 'How much is it?'},
    when: {bn: 'দোকানে, মার্কেটে', en: 'At the shop or market'},
    tipAr: 'بكم؟',
    tip: {bn: 'ছোট করে বলো: বিকাম?', en: 'Shorter: bikam?'},
  },
  {
    ar: 'ما فهمت',
    tr: {bn: 'মা ফিহিম্‌ত', en: 'ma fihimt'},
    m: {bn: 'আমি বুঝিনি', en: "I didn't understand"},
    when: {bn: 'কাজে, কথা না বুঝলে', en: "At work, when you're lost"},
    tipAr: 'شوي شوي',
    tip: {bn: 'সাথে বলো: শুওয়াই শুওয়াই (আস্তে)', en: 'Add: shway shway (slowly)'},
  },
  {
    ar: 'شكراً',
    tr: {bn: 'শুকরান', en: 'shukran'},
    m: {bn: 'ধন্যবাদ', en: 'Thank you'},
    when: {bn: 'সব জায়গায়', en: 'Everywhere'},
    tipAr: 'العفو',
    tip: {bn: 'উত্তর: আল-আফু (স্বাগতম)', en: "Reply: al-afu (you're welcome)"},
  },
];

export const W1Cover: React.FC = () => {
  const t = useT();
  return (
    <Post v="light" tag={t('দিন ১ · সেভ করো', 'Day 1 · Save this')}>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
        <div style={{fontSize: 58, fontWeight: 600, color: C.body}}>{t('সৌদিতে প্রথম দিনেই লাগবে', 'You need these on day one in Saudi')}</div>
        <div style={{fontSize: 200, fontWeight: 700, lineHeight: 1.3, marginTop: 4}}>
          <Grad>{t('৫টি', '5')}</Grad>
        </div>
        <div style={{fontSize: 104, fontWeight: 700, lineHeight: 1.1}}>{t('আরবি বাক্য', 'Arabic phrases')}</div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, marginTop: 50}}>
          {[FIRST5[0], FIRST5[2], FIRST5[4]].map((p, i) => (
            <Card
              key={p.ar}
              style={{
                width: 560,
                padding: '4px 0',
                textAlign: 'center',
                borderRadius: 30,
                transform: `translateX(${(i - 1) * -50}px) rotate(${(i - 1) * -2.5}deg)`,
                boxShadow: '0 18px 36px rgba(15,23,42,0.11)',
              }}
            >
              <Ar size={60} color={i === 1 ? C.green7 : C.ink}>
                {p.ar}
              </Ar>
            </Card>
          ))}
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 50, fontSize: 40, fontWeight: 700, color: C.green7}}>
          {t('সোয়াইপ করো', 'Swipe')} <Icon name="arrowR" size={46} color={C.green7} stroke={2.6} />
        </div>
      </div>
    </Post>
  );
};

const PhraseSlide: React.FC<{i: number}> = ({i}) => {
  const p = FIRST5[i];
  const x = useTx();
  const n = useNum();
  return (
    <Post v="light" tag={`${n(i + 1)} / ${n(5)}`}>
      <div style={{display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center', marginTop: 10}}>
        <Pill v="light" size={36}>
          {x(p.when)}
        </Pill>
      </div>
      <div style={{flex: 1, display: 'flex', alignItems: 'center'}}>
        <Card style={{width: '100%', padding: '60px 50px', textAlign: 'center', borderRadius: 48}}>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 26}}>
            <Speaker size={90} />
            <Bars h={64} color={C.teal} />
          </div>
          <Ar size={p.ar.length > 9 ? 120 : 150} color={C.ink} style={{marginTop: 24}}>
            {p.ar}
          </Ar>
          <div style={{fontSize: 48, color: C.muted, fontWeight: 600}}>{x(p.tr)}</div>
          <div style={{height: 2, background: C.line, margin: '38px 0'}} />
          <div style={{fontSize: 84, fontWeight: 700, lineHeight: 1.15}}>
            <Grad>{x(p.m)}</Grad>
          </div>
        </Card>
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, background: C.g50, border: `2px solid ${C.mint}`, borderRadius: 30, padding: '18px 30px'}}>
        <Icon name="bulb" size={48} color={C.green} stroke={2.2} />
        <span style={{fontSize: 36, fontWeight: 600, color: C.body}}>{x(p.tip)}</span>
        <Ar size={44} color={C.green7}>
          {p.tipAr}
        </Ar>
      </div>
    </Post>
  );
};
export const W1P1 = () => <PhraseSlide i={0} />;
export const W1P2 = () => <PhraseSlide i={1} />;
export const W1P3 = () => <PhraseSlide i={2} />;
export const W1P4 = () => <PhraseSlide i={3} />;
export const W1P5 = () => <PhraseSlide i={4} />;

export const W1End: React.FC = () => {
  const t = useT();
  return (
    <Post v="green" tag={t('আরও শিখবে?', 'Want more?')}>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
        <Icon name="bookmark" size={130} color="#fff" fill="rgba(255,255,255,0.2)" stroke={2} />
        <div style={{fontSize: 80, fontWeight: 700, lineHeight: 1.15, marginTop: 30}}>
          {t('সেভ করে রাখো,', 'Save it,')}
          <br />
          {t('কাজে লাগবে!', "you'll need it!")}
        </div>
        <div style={{fontSize: 44, fontWeight: 500, marginTop: 36, color: 'rgba(255,255,255,0.9)', lineHeight: 1.4}}>
          {t('আরও ৭৭৩+ শব্দ ও বাক্য,', '773+ more words & phrases,')}
          <br />
          {t('প্রতিটির নেটিভ অডিওসহ', 'each with native audio')}
        </div>
        <div style={{marginTop: 60}}>
          <Button dark size={50}>
            {t('ফ্রি শুরু করো', 'Start free')}
          </Button>
        </div>
        <div style={{fontSize: 50, fontWeight: 700, marginTop: 36}}>lahjio.com</div>
      </div>
    </Post>
  );
};

// ───────────── Day 2 · numbers 1–10 ─────────────
const NUMS: [string, string, Tx][] = [
  ['١', 'واحد', {bn: 'ওয়াহিদ', en: 'wahid'}],
  ['٢', 'اثنين', {bn: 'ইসনেইন', en: 'ithnayn'}],
  ['٣', 'ثلاثة', {bn: 'সালাসা', en: 'thalatha'}],
  ['٤', 'أربعة', {bn: "আরবা'আ", en: "arba'a"}],
  ['٥', 'خمسة', {bn: 'খামসা', en: 'khamsa'}],
  ['٦', 'ستة', {bn: 'সিত্তা', en: 'sitta'}],
  ['٧', 'سبعة', {bn: "সাব'আ", en: "sab'a"}],
  ['٨', 'ثمانية', {bn: 'সামানিয়া', en: 'thamanya'}],
  ['٩', 'تسعة', {bn: "তিস'আ", en: "tis'a"}],
  ['١٠', 'عشرة', {bn: 'আশারা', en: "'ashara"}],
];
export const W2Numbers: React.FC = () => {
  const t = useT();
  const x = useTx();
  const n = useNum();
  return (
    <Post v="green" tag={t('দিন ২ · সংখ্যা', 'Day 2 · Numbers')}>
      <div style={{textAlign: 'center', fontSize: 74, fontWeight: 700, lineHeight: 1.1}}>{t('সৌদি আরবিতে ১ থেকে ১০', 'Numbers 1–10 in Saudi Arabic')}</div>
      <div style={{textAlign: 'center', fontSize: 34, fontWeight: 500, marginTop: 10, color: 'rgba(255,255,255,0.88)'}}>
        {t('দোকানের দাম আর বাসের নম্বর পড়তে কাজে লাগবে', 'Read prices in shops and bus numbers')}
      </div>
      <div style={{flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridAutoRows: '1fr', gap: 16, marginTop: 32}}>
        {NUMS.map(([d, ar, tr], i) => (
          <div key={d} style={{background: '#fff', borderRadius: 26, display: 'flex', alignItems: 'center', padding: '0 24px', gap: 18, color: C.ink, boxShadow: '0 12px 26px rgba(4,47,46,0.2)'}}>
            <div style={{width: 92, height: 92, borderRadius: 24, background: C.g50, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
              <Ar size={58} color={C.green7} style={{lineHeight: 1}}>
                {d}
              </Ar>
            </div>
            <div style={{flex: 1, minWidth: 0}}>
              <Ar size={40} color={C.ink} style={{lineHeight: 1.2}}>
                {ar}
              </Ar>
              <div style={{fontSize: 30, fontWeight: 600, color: C.muted, lineHeight: 1.2}}>{x(tr)}</div>
            </div>
            <div style={{fontSize: 44, fontWeight: 700, color: C.green}}>{n(i + 1)}</div>
          </div>
        ))}
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 26, fontSize: 34, fontWeight: 600}}>
        <Icon name="bulb" size={44} color="#fff" stroke={2.2} />
        <span>
          {t('খেয়াল করো: ', 'Note: ')}
          <Ar size={40} color="#fff" style={{lineHeight: 1}}>
            ٥
          </Ar>{' '}
          {t('দেখতে শূন্যের মতো, কিন্তু এটা ৫!', "looks like a zero, but it's 5!")}
        </span>
      </div>
    </Post>
  );
};

// ───────────── Day 3 · quiz ─────────────
export const W3Quiz: React.FC = () => {
  const t = useT();
  return (
    <Post v="light" tag={t('দিন ৩ · কুইজ', 'Day 3 · Quiz')}>
      <div style={{textAlign: 'center', fontSize: 76, fontWeight: 700, marginTop: 10}}>
        {t('এই শব্দের ', 'What does this ')}
        <Grad>{t('মানে কী?', 'mean?')}</Grad>
      </div>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 26}}>
        <Card style={{textAlign: 'center', padding: '36px 40px 30px', borderRadius: 48}}>
          <Ar size={190} color={C.ink} style={{lineHeight: 1.3}}>
            زين
          </Ar>
          <div style={{fontSize: 48, fontWeight: 600, color: C.muted}}>{t('যেইন', 'zain')}</div>
        </Card>
        {[
          ['A', t('খারাপ', 'Bad')],
          ['B', t('ভালো', 'Good')],
          ['C', t('বড়', 'Big')],
        ].map(([k, txt]) => (
          <Card key={k} style={{display: 'flex', alignItems: 'center', gap: 28, padding: '22px 34px', borderRadius: 30}}>
            <div style={{width: 76, height: 76, borderRadius: 22, background: C.g50, border: `2px solid ${C.mint}`, color: C.green7, fontSize: 42, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              {k}
            </div>
            <span style={{fontSize: 50, fontWeight: 600}}>{txt}</span>
          </Card>
        ))}
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, fontSize: 40, fontWeight: 700, color: C.green7, marginTop: 10}}>
        <Icon name="chat" size={50} color={C.green7} stroke={2.2} />
        {t('কমেন্টে A, B বা C লেখো', 'Comment A, B or C')}
      </div>
    </Post>
  );
};

// ───────────── Day 4 · textbook vs Saudi ─────────────
const VS: {m: Tx; f: string; s: string; tr: Tx}[] = [
  {m: {bn: 'আমি চাই', en: 'I want'}, f: 'أريد', s: 'أبغى', tr: {bn: 'আবগা', en: 'abgha'}},
  {m: {bn: 'কী?', en: 'What?'}, f: 'ماذا', s: 'إيش', tr: {bn: 'ইশ', en: 'esh'}},
  {m: {bn: 'কোথায়?', en: 'Where?'}, f: 'أين', s: 'وين', tr: {bn: 'ওয়েন', en: 'wein'}},
  {m: {bn: 'এখন', en: 'Now'}, f: 'الآن', s: 'الحين', tr: {bn: 'আল-হিন', en: 'al-heen'}},
  {m: {bn: 'এরকম', en: 'Like this'}, f: 'هكذا', s: 'كذا', tr: {bn: 'কিদা', en: 'kidha'}},
];
export const W4Versus: React.FC = () => {
  const t = useT();
  const x = useTx();
  return (
    <Post v="green" tag={t('দিন ৪ · জানো কি?', 'Day 4 · Did you know?')}>
      <div style={{textAlign: 'center', fontSize: 70, fontWeight: 700, lineHeight: 1.15}}>
        {t('বইয়ের আরবি বনাম', 'Textbook Arabic vs')}
        <br />
        {t('সৌদিরা যা বলে', 'what Saudis say')}
      </div>
      <Card style={{flex: 1, marginTop: 40, padding: '16px 36px', border: 'none', display: 'flex', flexDirection: 'column', color: C.ink}}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1.25fr', padding: '18px 0', fontSize: 32, fontWeight: 700, color: C.muted, borderBottom: `2px solid ${C.line}`}}>
          <span>{t('অর্থ', 'Meaning')}</span>
          <span style={{textAlign: 'center'}}>{t('বইয়ে', 'Textbook')}</span>
          <span style={{textAlign: 'center', color: C.green7}}>{t('সৌদিতে', 'In Saudi')}</span>
        </div>
        {VS.map((r, i) => (
          <div
            key={r.s}
            style={{
              flex: 1,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1.25fr',
              alignItems: 'center',
              borderBottom: i < VS.length - 1 ? `2px solid ${C.line}` : 'none',
            }}
          >
            <span style={{fontSize: 42, fontWeight: 700}}>{x(r.m)}</span>
            <div style={{textAlign: 'center', position: 'relative'}}>
              <Ar size={50} color="#94a3b8" weight={600} style={{textDecoration: 'line-through', textDecorationColor: '#ef4444', textDecorationThickness: 4}}>
                {r.f}
              </Ar>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, background: C.g50, borderRadius: 22, padding: '6px 14px'}}>
              <Ar size={56} color={C.green7}>
                {r.s}
              </Ar>
              <span style={{fontSize: 30, fontWeight: 600, color: C.body}}>{x(r.tr)}</span>
            </div>
          </div>
        ))}
      </Card>
      <div style={{textAlign: 'center', fontSize: 36, fontWeight: 600, marginTop: 26}}>
        {t('Lahjio-তে শেখো আসল কথ্য সৌদি আরবি', 'Learn real spoken Saudi Arabic with Lahjio')}
      </div>
    </Post>
  );
};

// ───────────── Day 5 · taxi words ─────────────
const TAXI: {icon: string; ar: string; tr: Tx; m: Tx; note?: Tx}[] = [
  {icon: 'arrowR', ar: 'يمين', tr: {bn: 'ইয়ামিন', en: 'yameen'}, m: {bn: 'ডানে', en: 'Right'}},
  {icon: 'arrowL', ar: 'يسار', tr: {bn: 'ইয়াসার', en: 'yasar'}, m: {bn: 'বামে', en: 'Left'}},
  {icon: 'arrowUp', ar: 'سيدا', tr: {bn: 'সিদা', en: 'seeda'}, m: {bn: 'সোজা', en: 'Straight'}, note: {bn: 'চেনা লাগছে?', en: 'Sounds familiar?'}},
  {icon: 'stop', ar: 'وقّف هنا', tr: {bn: 'ওয়াগ্গিফ হিনা', en: 'waggif hina'}, m: {bn: 'এখানে থামাও', en: 'Stop here'}},
  {icon: 'coin', ar: 'كم؟', tr: {bn: 'কাম?', en: 'kam?'}, m: {bn: 'ভাড়া কত?', en: 'How much?'}},
];
export const W5Taxi: React.FC = () => {
  const t = useT();
  const x = useTx();
  return (
    <Post v="light" tag={t('দিন ৫ · ট্যাক্সি', 'Day 5 · Taxi')}>
      <div style={{display: 'flex', alignItems: 'center', gap: 28, marginTop: 6}}>
        <IconBadge name="car" size={130} solid />
        <div style={{fontSize: 66, fontWeight: 700, lineHeight: 1.12}}>
          {t('ট্যাক্সিতে লাগবে', '5 words you need')}
          <br />
          <Grad>{t('এই ৫টি শব্দ', 'in a taxi')}</Grad>
        </div>
      </div>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20, marginTop: 30}}>
        {TAXI.map((r) => (
          <Card key={r.ar} style={{display: 'flex', alignItems: 'center', gap: 26, padding: '18px 30px', borderRadius: 30}}>
            <div style={{width: 84, height: 84, borderRadius: 24, background: C.g50, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
              <Icon name={r.icon} size={50} color={C.green} stroke={2.6} />
            </div>
            <div style={{flex: 1}}>
              <div style={{fontSize: 46, fontWeight: 700, lineHeight: 1.15, display: 'flex', alignItems: 'center', gap: 16}}>
                {x(r.m)}
                {r.note ? (
                  <Pill v="light" size={24}>
                    {x(r.note)}
                  </Pill>
                ) : null}
              </div>
              <div style={{fontSize: 30, color: C.muted, fontWeight: 600}}>{x(r.tr)}</div>
            </div>
            <Ar size={58} color={C.green7}>
              {r.ar}
            </Ar>
          </Card>
        ))}
      </div>
      <div style={{textAlign: 'center', fontSize: 34, color: C.body, fontWeight: 600, marginTop: 22}}>
        {t('পরের রাইডে ট্রাই করো, কমেন্টে জানাও!', 'Try them on your next ride, tell us below!')}
      </div>
    </Post>
  );
};

// ───────────── Day 6 · greetings and replies ─────────────
const PAIRS: {q: string; qm: Tx; a: string; am: Tx}[] = [
  {q: 'السلام عليكم', qm: {bn: 'সালাম', en: 'Hello (peace be on you)'}, a: 'وعليكم السلام', am: {bn: 'ওয়া আলাইকুম আস-সালাম', en: 'wa alaykum as-salam'}},
  {q: 'كيف حالك؟', qm: {bn: 'কেমন আছেন?', en: 'How are you?'}, a: 'الحمد لله، بخير', am: {bn: 'আলহামদুলিল্লাহ, বিখাইর', en: 'alhamdulillah, bikhair'}},
  {q: 'شكراً', qm: {bn: 'ধন্যবাদ', en: 'Thank you'}, a: 'العفو', am: {bn: 'আল-আফু', en: 'al-afu'}},
  {q: 'يعطيك العافية', qm: {bn: 'কাজের জন্য দোয়া', en: 'Thanks for your work'}, a: 'الله يعافيك', am: {bn: 'আল্লাহ ইয়াআফিক', en: "allah y'afeek"}},
];
export const W6Replies: React.FC = () => {
  const t = useT();
  const x = useTx();
  return (
    <Post v="green" tag={t('দিন ৬ · উত্তর', 'Day 6 · Replies')}>
      <div style={{textAlign: 'center', fontSize: 70, fontWeight: 700, lineHeight: 1.15}}>
        {t('কেউ বললে… ', 'They say… ')}
        <span style={{color: C.mint}}>{t('তুমি বলো', 'you say')}</span>
      </div>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 26, marginTop: 20}}>
        {PAIRS.map((p) => (
          <div key={p.q} style={{display: 'flex', alignItems: 'stretch', gap: 14}}>
            <div style={{flex: 1, borderRadius: 30, background: 'rgba(255,255,255,0.16)', border: '2px solid rgba(255,255,255,0.3)', padding: '26px 22px', textAlign: 'center'}}>
              <Ar size={54} color="#fff" style={{lineHeight: 1.45}}>
                {p.q}
              </Ar>
              <div style={{fontSize: 28, fontWeight: 600, color: 'rgba(255,255,255,0.85)', whiteSpace: 'nowrap'}}>{x(p.qm)}</div>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Icon name="arrowR" size={46} color="#fff" stroke={2.8} />
            </div>
            <div style={{flex: 1.15, borderRadius: 30, background: '#fff', padding: '26px 22px', textAlign: 'center', boxShadow: '0 14px 30px rgba(4,47,46,0.25)'}}>
              <Ar size={54} color={C.green7} style={{lineHeight: 1.45}}>
                {p.a}
              </Ar>
              <div style={{fontSize: 31, fontWeight: 600, color: C.body}}>{x(p.am)}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{textAlign: 'center', fontSize: 34, fontWeight: 600, marginTop: 24, color: 'rgba(255,255,255,0.92)'}}>
        <Ar size={38} color="#fff" style={{lineHeight: 1}}>
          يعطيك العافية
        </Ar>{' '}
        {t('= সৌদিতে খুব বেশি শোনা ধন্যবাদ', "= the 'thank you' you hear most in Saudi")}
      </div>
    </Post>
  );
};

// ───────────── Day 7 · week recap ─────────────
export const W7Recap: React.FC = () => {
  const t = useT();
  const lang = useLang();
  const n = useNum();
  return (
    <Post v="light" tag={t('দিন ৭ · রিক্যাপ', 'Day 7 · Recap')}>
      <div style={{textAlign: 'center', fontSize: 66, fontWeight: 700, lineHeight: 1.15}}>
        {t('এই সপ্তাহের ', "This week's ")}
        <Grad>{t('৭টি বাক্য', '7 phrases')}</Grad>
      </div>
      <div style={{textAlign: 'center', fontSize: 36, color: C.body, fontWeight: 500, marginTop: 8}}>
        {t('কয়টা মনে আছে? সেভ করো, আবার দেখো', 'How many do you remember? Save & review')}
      </div>
      <Card style={{flex: 1, marginTop: 30, padding: '10px 34px', display: 'flex', flexDirection: 'column'}}>
        {PHRASES.slice(0, 7).map((p, i) => (
          <div key={p.slug} style={{flex: 1, display: 'flex', alignItems: 'center', gap: 22, borderBottom: i < 6 ? `2px solid ${C.line}` : 'none'}}>
            <div style={{width: 62, height: 62, borderRadius: 62, background: 'linear-gradient(135deg, #059669, #14b8a6)', color: '#fff', fontSize: 32, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
              {n(p.day)}
            </div>
            <div style={{flex: 1}}>
              <div style={{fontSize: 38, fontWeight: 700, lineHeight: 1.15}}>{p.meaning[lang]}</div>
              <div style={{fontSize: 26, color: C.muted, fontWeight: 600}}>{p.tr[lang]}</div>
            </div>
            <Ar size={48} color={C.green7}>
              {p.ar}
            </Ar>
          </div>
        ))}
      </Card>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, fontSize: 34, fontWeight: 700, color: C.green7, marginTop: 22}}>
        {t('প্রতিদিন নতুন বাক্য, ফলো করো', 'A new phrase every day, follow us')}
        <Icon name="sparkle" size={40} color={C.green7} fill={C.mint} />
      </div>
    </Post>
  );
};

export const WEEK1: {file: string; C: React.FC; v?: V}[] = [
  {file: 'day-1-first-5-phrases/slide-1', C: W1Cover},
  {file: 'day-1-first-5-phrases/slide-2', C: W1P1},
  {file: 'day-1-first-5-phrases/slide-3', C: W1P2},
  {file: 'day-1-first-5-phrases/slide-4', C: W1P3},
  {file: 'day-1-first-5-phrases/slide-5', C: W1P4},
  {file: 'day-1-first-5-phrases/slide-6', C: W1P5},
  {file: 'day-1-first-5-phrases/slide-7', C: W1End},
  {file: 'day-2-numbers-1-10', C: W2Numbers},
  {file: 'day-3-quiz-zain', C: W3Quiz},
  {file: 'day-4-textbook-vs-saudi', C: W4Versus},
  {file: 'day-5-taxi-words', C: W5Taxi},
  {file: 'day-6-greetings-replies', C: W6Replies},
  {file: 'day-7-week-recap', C: W7Recap},
];
