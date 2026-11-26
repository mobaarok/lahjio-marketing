// Launch grid: the first 9 posts that fill an empty profile (3 x 3). Bangla (@lahjiobn) and English (@lahjioapp).
// Post them in order 1 → 9. Odd posts are green, even posts light, so the grid reads as a checkerboard.
import React from 'react';
import {C} from '../theme';
import {Logo, PhoneQuiz} from '../parts';
import {COPY} from '../copy';
import {Ar, Bars, Button, Card, Grad, Icon, IconBadge, Pill, Post, Speaker, useLang, useT} from './kit';

const center: React.CSSProperties = {flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'};

// 1 · Welcome
export const L1Welcome: React.FC = () => {
  const t = useT();
  return (
    <Post v="green" tag={t('স্বাগতম', 'Welcome')}>
      <div style={center}>
        <div style={{borderRadius: 70, boxShadow: '0 30px 70px rgba(4,47,46,0.35), 0 0 0 10px rgba(255,255,255,0.18)'}}>
          <Logo size={270} />
        </div>
        <Ar size={104} color="#fff" style={{marginTop: 54}}>
          السلام عليكم
        </Ar>
        <div style={{fontSize: t(92, 88), fontWeight: 700, lineHeight: 1.15, marginTop: 6}}>{t('Lahjio-তে স্বাগতম!', 'Welcome to Lahjio!')}</div>
        <div style={{fontSize: 44, fontWeight: 500, marginTop: 26, color: 'rgba(255,255,255,0.92)', lineHeight: 1.35}}>
          {t('বাংলায় সৌদি আরবি শেখার', 'The easiest way to learn')}
          <br />
          {t('সবচেয়ে সহজ উপায়', 'Saudi Arabic')}
        </div>
        <div style={{fontSize: 32, marginTop: 30, color: 'rgba(255,255,255,0.75)', fontWeight: 500}}>
          {t('Learn Saudi Arabic, in Bengali', 'Real spoken Saudi, not textbook Arabic')}
        </div>
      </div>
    </Post>
  );
};

// 2 · What is Lahjio (app screen)
export const L2What: React.FC = () => {
  const t = useT();
  const lang = useLang();
  const c = COPY[lang];
  return (
    <Post v="light" tag={t('Lahjio কী?', 'What is Lahjio?')}>
      <div style={{textAlign: 'center', marginTop: 10}}>
        <div style={{fontSize: t(88, 84), fontWeight: 700, lineHeight: 1.12}}>
          {t('সৌদি আরবি শেখো,', 'Learn Saudi Arabic,')}
          <br />
          <Grad>{t('বাংলায়', 'the easy way')}</Grad>
        </div>
        <div style={{fontSize: 38, color: C.body, marginTop: 18, fontWeight: 500}}>
          {t('ছোট লেসন · অডিও · কুইজ · দিনে ৫ মিনিট', 'Short lessons · Audio · Quizzes · 5 min a day')}
        </div>
      </div>
      <div style={{position: 'relative', flex: 1, marginTop: 40}}>
        <div style={{position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', zoom: 0.86}}>
          <PhoneQuiz lang={lang} label={c.quizLabel} translit={c.translit} options={c.options} next={c.next} local={200} audioAt={0} tapAt={150} />
        </div>
        {[
          {x: 0, y: 90, icon: 'headphones', txt: t('অডিও লেসন', 'Audio lessons')},
          {x: 0, y: 330, icon: 'cards', txt: t('ফ্ল্যাশকার্ড', 'Flashcards')},
          {x: 1, y: 200, icon: 'question', txt: t('কুইজ', 'Quizzes')},
          {x: 1, y: 440, icon: 'refresh', txt: t('স্মার্ট রিভিউ', 'Smart review')},
        ].map((c) => (
          <Card
            key={c.icon}
            style={{
              position: 'absolute',
              top: c.y,
              ...(c.x === 0 ? {left: -10} : {right: -10}),
              padding: '18px 26px',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              borderRadius: 28,
              boxShadow: '0 20px 40px rgba(15,23,42,0.14)',
            }}
          >
            <IconBadge name={c.icon} size={62} solid />
            <span style={{fontSize: 34, fontWeight: 700}}>{c.txt}</span>
          </Card>
        ))}
      </div>
    </Post>
  );
};

// 3 · Who it's for
export const L3Who: React.FC = () => {
  const t = useT();
  return (
    <Post v="green" tag={t('তোমার জন্য', 'For you')}>
      <div style={{textAlign: 'center', marginTop: 20}}>
        <div style={{fontSize: 52, fontWeight: 600, color: 'rgba(255,255,255,0.9)'}}>{t('সৌদি আরবে থাকো বা যাচ্ছো?', 'Living in or moving to Saudi?')}</div>
        <div style={{fontSize: 84, fontWeight: 700, lineHeight: 1.15, marginTop: 8}}>
          {t('রোজকার কথাগুলো', 'Say everyday things')}
          <br />
          {t('আরবিতে বলো', 'in Arabic')}
        </div>
      </div>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 30}}>
        {[
          {icon: 'bag', bn: t('দোকানে', 'At the shop'), sub: t('দাম জিজ্ঞেস করো', 'Ask the price'), ar: 'كم السعر؟'},
          {icon: 'car', bn: t('ট্যাক্সিতে', 'In a taxi'), sub: t('রাস্তা বলে দাও', 'Give directions'), ar: 'لِفّ يمين'},
          {icon: 'briefcase', bn: t('কাজে', 'At work'), sub: t('বসের সাথে কথা বলো', 'Talk to your boss'), ar: 'ما فهمت'},
        ].map((r) => (
          <Card key={r.icon} style={{display: 'flex', alignItems: 'center', gap: 28, padding: '26px 36px', border: 'none', boxShadow: '0 20px 44px rgba(4,47,46,0.25)'}}>
            <IconBadge name={r.icon} size={104} solid />
            <div style={{flex: 1, color: C.ink}}>
              <div style={{fontSize: 48, fontWeight: 700, lineHeight: 1.1}}>{r.bn}</div>
              <div style={{fontSize: 32, color: C.muted, fontWeight: 500, marginTop: 4}}>{r.sub}</div>
            </div>
            <Ar size={58} color={C.green7}>
              {r.ar}
            </Ar>
          </Card>
        ))}
      </div>
    </Post>
  );
};

// 4 · Features
export const L4Features: React.FC = () => {
  const t = useT();
  return (
    <Post v="light" tag={t('ফিচার', 'Features')}>
      <div style={{textAlign: 'center', marginTop: 16}}>
        <div style={{fontSize: 86, fontWeight: 700, lineHeight: 1.12}}>
          {t('Lahjio-তে ', 'What you ')}
          <Grad>{t('যা পাবে', 'get')}</Grad>
        </div>
        <div style={{fontSize: 38, color: C.body, marginTop: 14, fontWeight: 500}}>{t('সব কিছু বাংলায় বোঝানো', 'Everything explained in English')}</div>
      </div>
      <div style={{flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginTop: 46}}>
        {[
          {icon: 'headphones', t: t('অডিও লেসন', 'Audio lessons'), d: t('প্রতিটি শব্দ নেটিভ সৌদি উচ্চারণে', 'Native Saudi audio for every word')},
          {icon: 'cards', t: t('ফ্ল্যাশকার্ড ও কুইজ', 'Flashcards & quizzes'), d: t('৩ ধরনের কুইজে প্র্যাকটিস', 'Practice with 3 quiz types')},
          {icon: 'refresh', t: t('স্মার্ট রিভিউ', 'Smart review'), d: t('ভুলে যাওয়ার আগেই রিভিশন', 'Review just before you forget')},
          {icon: 'flame', t: t('গোল ও স্ট্রিক', 'Goals & streaks'), d: t('XP আর প্রতিদিনের লক্ষ্য', 'XP and a daily goal')},
        ].map((c) => (
          <Card key={c.icon} style={{padding: '40px 34px', display: 'flex', flexDirection: 'column', gap: 22}}>
            <IconBadge name={c.icon} size={112} solid />
            <div style={{fontSize: 46, fontWeight: 700, lineHeight: 1.15}}>{c.t}</div>
            <div style={{fontSize: 32, color: C.body, lineHeight: 1.35, fontWeight: 500}}>{c.d}</div>
          </Card>
        ))}
      </div>
    </Post>
  );
};

// 5 · Numbers
export const L5Numbers: React.FC = () => {
  const t = useT();
  return (
    <Post v="green" tag={t('সংখ্যায় Lahjio', 'Lahjio in numbers')}>
      <div style={{textAlign: 'center', marginTop: 20, fontSize: 72, fontWeight: 700, lineHeight: 1.15}}>
        {t('এক অ্যাপে', 'Everyday Saudi Arabic')}
        <br />
        {t('পুরো সৌদি আরবি', 'in one app')}
      </div>
      <div style={{flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26, marginTop: 50}}>
        {[
          {n: t('৭৭৩+', '773+'), l: t('শব্দ ও বাক্য', 'words & phrases')},
          {n: t('৭২', '72'), l: t('লেসন', 'lessons')},
          {n: t('৩', '3'), l: t('ধরনের কুইজ', 'quiz types')},
          {n: t('৫', '5'), l: t('মিনিট, প্রতিদিন', 'minutes a day')},
        ].map((s) => (
          <div
            key={s.l}
            style={{
              borderRadius: 36,
              background: 'rgba(255,255,255,0.14)',
              border: '2px solid rgba(255,255,255,0.3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{fontSize: 150, fontWeight: 700, lineHeight: 1}}>{s.n}</div>
            <div style={{fontSize: 40, fontWeight: 600, marginTop: 14, color: 'rgba(255,255,255,0.92)'}}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 34, fontSize: 36, fontWeight: 600}}>
        <Icon name="headphones" size={44} color="#fff" stroke={2.4} />
        {t('প্রতিটি শব্দে অডিও আছে', 'Every word has audio')}
      </div>
    </Post>
  );
};

// 6 · A sample phrase card
export const L6Sample: React.FC = () => {
  const t = useT();
  return (
    <Post v="light" tag={t('এভাবে শিখবে', 'How you learn')}>
      <div style={{textAlign: 'center', marginTop: 10, fontSize: 60, fontWeight: 700}}>{t('দেখা হলে জিজ্ঞেস করো…', 'When you meet someone, ask…')}</div>
      <div style={{flex: 1, display: 'flex', alignItems: 'center'}}>
        <Card style={{width: '100%', padding: '56px 50px', textAlign: 'center', borderRadius: 48}}>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 26}}>
            <Speaker size={96} />
            <Bars h={70} color={C.teal} />
          </div>
          <Ar size={150} color={C.ink} style={{marginTop: 20}}>
            كيف حالك؟
          </Ar>
          <div style={{fontSize: 46, color: C.muted, fontWeight: 600}}>{t('কেফ হালাক?', 'kef halak?')}</div>
          <div style={{height: 2, background: C.line, margin: '36px 0'}} />
          <div style={{fontSize: 80, fontWeight: 700}}>
            <Grad>{t('কেমন আছেন?', 'How are you?')}</Grad>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', gap: 20, marginTop: 34}}>
            {[
              {ar: 'كيف', bn: t('কেমন', 'how')},
              {ar: 'حالك', bn: t('তোমার অবস্থা', 'your state')},
            ].map((p) => (
              <div key={p.ar} style={{background: C.g50, border: `2px solid ${C.mint}`, borderRadius: 24, padding: '10px 28px', display: 'flex', alignItems: 'center', gap: 16}}>
                <Ar size={46} color={C.green7}>
                  {p.ar}
                </Ar>
                <span style={{fontSize: 34, fontWeight: 600, color: C.body}}>= {p.bn}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div style={{textAlign: 'center', fontSize: 36, color: C.body, fontWeight: 600}}>
        {t('উত্তর দাও: ', 'Reply: ')}
        <Ar size={42} color={C.green7} style={{lineHeight: 1}}>
          الحمد لله
        </Ar>{' '}
        {t('(আলহামদুলিল্লাহ)', '(alhamdulillah)')}
      </div>
    </Post>
  );
};

// 7 · How to start
export const L7How: React.FC = () => {
  const t = useT();
  return (
    <Post v="green" tag={t('শুরু করো', 'Get started')}>
      <div style={{textAlign: 'center', marginTop: 20, fontSize: 84, fontWeight: 700}}>{t('কীভাবে শুরু করবে?', 'How to start?')}</div>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 34}}>
        {[
          {n: t('১', '1'), t: t('lahjio.com খোলো', 'Open lahjio.com'), d: t('ফোনের ব্রাউজারেই চলে', "Works in your phone's browser"), icon: 'phone'},
          {n: t('২', '2'), t: t('একটা লেসন বেছে নাও', 'Pick a lesson'), d: t('দোকান, ট্যাক্সি, কাজ…', 'Shop, taxi, work…'), icon: 'book'},
          {n: t('৩', '3'), t: t('দিনে ৫ মিনিট প্র্যাকটিস', 'Practice 5 min a day'), d: t('শোনো, বলো, কুইজ দাও', 'Listen, speak, take a quiz'), icon: 'clock'},
        ].map((s) => (
          <div key={s.icon} style={{display: 'flex', alignItems: 'center', gap: 32}}>
            <div
              style={{
                width: 130,
                height: 130,
                borderRadius: 130,
                background: '#fff',
                color: C.green7,
                fontSize: 76,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 16px 36px rgba(4,47,46,0.28)',
              }}
            >
              {s.n}
            </div>
            <div style={{flex: 1}}>
              <div style={{fontSize: 52, fontWeight: 700, lineHeight: 1.15}}>{s.t}</div>
              <div style={{fontSize: 36, fontWeight: 500, color: 'rgba(255,255,255,0.85)', marginTop: 6}}>{s.d}</div>
            </div>
            <Icon name={s.icon} size={70} color="rgba(255,255,255,0.75)" stroke={1.8} />
          </div>
        ))}
      </div>
      <div style={{textAlign: 'center', fontSize: 40, fontWeight: 700}}>{t('একদম ফ্রি শুরু করো', 'Start completely free')}</div>
    </Post>
  );
};

// 8 · Daily habit (streak / XP)
export const L8Habit: React.FC = () => {
  const t = useT();
  const days = t(['শ', 'র', 'সো', 'ম', 'বু', 'বৃ', 'শু'], ['S', 'S', 'M', 'T', 'W', 'T', 'F']);
  return (
    <Post v="light" tag={t('প্রতিদিনের অভ্যাস', 'Daily habit')}>
      <div style={{textAlign: 'center', marginTop: 16, fontSize: 82, fontWeight: 700, lineHeight: 1.15}}>
        {t('প্রতিদিন একটু,', 'A little every day,')}
        <br />
        <Grad>{t('প্রতিদিন উন্নতি', 'better every day')}</Grad>
      </div>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28}}>
        <Card style={{padding: '40px 44px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
            <div style={{width: 110, height: 110, borderRadius: 32, background: '#fff7ed', border: '2px solid #fed7aa', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Icon name="flame" size={70} color={C.amber} fill="#fde68a" stroke={2} />
            </div>
            <div>
              <div style={{fontSize: 60, fontWeight: 700, lineHeight: 1.1}}>{t('৭ দিনের স্ট্রিক!', '7-day streak!')}</div>
              <div style={{fontSize: 32, color: C.muted, fontWeight: 500}}>{t('একদিনও বাদ দিও না', "Don't miss a day")}</div>
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 34}}>
            {days.map((d, i) => (
              <div key={i} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
                <div style={{width: 92, height: 92, borderRadius: 92, background: 'linear-gradient(135deg, #059669, #14b8a6)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <svg width={46} height={46} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </div>
                <span style={{fontSize: 30, fontWeight: 600, color: C.body}}>{d}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card style={{padding: '36px 44px'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
              <Icon name="bolt" size={54} color={C.amber} fill="#fde68a" />
              <span style={{fontSize: 44, fontWeight: 700}}>{t('আজকের লক্ষ্য', "Today's goal")}</span>
            </div>
            <span style={{fontSize: 42, fontWeight: 700, color: C.green}}>{t('৪০ / ৫০ XP', '40 / 50 XP')}</span>
          </div>
          <div style={{height: 34, borderRadius: 34, background: C.line, marginTop: 24, overflow: 'hidden'}}>
            <div style={{width: '80%', height: '100%', borderRadius: 34, background: 'linear-gradient(90deg, #059669, #14b8a6)'}} />
          </div>
        </Card>
      </div>
      <div style={{textAlign: 'center', fontSize: 38, color: C.body, fontWeight: 600}}>{t('দিনে মাত্র ৫ মিনিটই যথেষ্ট', 'Just 5 minutes a day is enough')}</div>
    </Post>
  );
};

// 9 · Call to action
export const L9Cta: React.FC = () => {
  const t = useT();
  return (
    <Post v="green" tag={t('ফ্রি', 'Free')}>
      <div style={center}>
        <Ar size={150} color="#fff">
          يلا نبدأ
        </Ar>
        <div style={{fontSize: 40, fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginTop: -6}}>
          {t('ইয়াল্লা নাবদা = চলো শুরু করি', "yalla nabda = let's start")}
        </div>
        <div style={{fontSize: 96, fontWeight: 700, lineHeight: 1.15, marginTop: 50}}>
          {t('আজই আরবি', 'Start speaking')}
          <br />
          {t('বলা শুরু করো', 'Arabic today')}
        </div>
        <div style={{marginTop: 60}}>
          <Button dark size={54}>
            {t('ফ্রি শুরু করো', 'Start free')}
          </Button>
        </div>
        <div style={{fontSize: 56, fontWeight: 700, marginTop: 44}}>lahjio.com</div>
        <div style={{marginTop: 22}}>
          <Pill v="green" size={32}>
            {t('লিংক বায়োতে', 'Link in bio')}
          </Pill>
        </div>
      </div>
    </Post>
  );
};

export const LAUNCH = [
  {file: '01-welcome', C: L1Welcome},
  {file: '02-what-is-lahjio', C: L2What},
  {file: '03-who-is-it-for', C: L3Who},
  {file: '04-features', C: L4Features},
  {file: '05-numbers', C: L5Numbers},
  {file: '06-sample-phrase', C: L6Sample},
  {file: '07-how-to-start', C: L7How},
  {file: '08-daily-habit', C: L8Habit},
  {file: '09-start-free', C: L9Cta},
];
