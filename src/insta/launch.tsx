// Launch grid: the first 9 posts that fill @lahjioapp's empty profile (3 x 3).
// Post them in order 1 → 9. Odd posts are green, even posts light, so the grid reads as a checkerboard.
import React from 'react';
import {C} from '../theme';
import {Logo, PhoneQuiz} from '../parts';
import {COPY} from '../copy';
import {Ar, Bars, Button, Card, Grad, Icon, IconBadge, Pill, Post, Speaker} from './kit';

const center: React.CSSProperties = {flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'};

// 1 · Welcome
export const L1Welcome: React.FC = () => (
  <Post v="green" tag="স্বাগতম">
    <div style={center}>
      <div style={{borderRadius: 70, boxShadow: '0 30px 70px rgba(4,47,46,0.35), 0 0 0 10px rgba(255,255,255,0.18)'}}>
        <Logo size={270} />
      </div>
      <Ar size={104} color="#fff" style={{marginTop: 54}}>السلام عليكم</Ar>
      <div style={{fontSize: 92, fontWeight: 700, lineHeight: 1.15, marginTop: 6}}>Lahjio-তে স্বাগতম!</div>
      <div style={{fontSize: 44, fontWeight: 500, marginTop: 26, color: 'rgba(255,255,255,0.92)', lineHeight: 1.35}}>
        বাংলায় সৌদি আরবি শেখার
        <br />
        সবচেয়ে সহজ উপায়
      </div>
      <div style={{fontSize: 32, marginTop: 30, color: 'rgba(255,255,255,0.75)', fontWeight: 500}}>Learn Saudi Arabic, in Bengali</div>
    </div>
  </Post>
);

// 2 · What is Lahjio (app screen)
export const L2What: React.FC = () => {
  const t = COPY.bn;
  return (
    <Post v="light" tag="Lahjio কী?">
      <div style={{textAlign: 'center', marginTop: 10}}>
        <div style={{fontSize: 88, fontWeight: 700, lineHeight: 1.12}}>
          সৌদি আরবি শেখো,
          <br />
          <Grad>বাংলায়</Grad>
        </div>
        <div style={{fontSize: 38, color: C.body, marginTop: 18, fontWeight: 500}}>ছোট লেসন · অডিও · কুইজ · দিনে ৫ মিনিট</div>
      </div>
      <div style={{position: 'relative', flex: 1, marginTop: 40}}>
        <div style={{position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', zoom: 0.86}}>
          <PhoneQuiz lang="bn" label={t.quizLabel} translit={t.translit} options={t.options} next={t.next} local={200} audioAt={0} tapAt={150} />
        </div>
        {[
          {x: 0, y: 90, icon: 'headphones', txt: 'অডিও লেসন'},
          {x: 0, y: 330, icon: 'cards', txt: 'ফ্ল্যাশকার্ড'},
          {x: 1, y: 200, icon: 'question', txt: 'কুইজ'},
          {x: 1, y: 440, icon: 'refresh', txt: 'স্মার্ট রিভিউ'},
        ].map((c) => (
          <Card
            key={c.txt}
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
export const L3Who: React.FC = () => (
  <Post v="green" tag="তোমার জন্য">
    <div style={{textAlign: 'center', marginTop: 20}}>
      <div style={{fontSize: 52, fontWeight: 600, color: 'rgba(255,255,255,0.9)'}}>সৌদি আরবে থাকো বা যাচ্ছো?</div>
      <div style={{fontSize: 84, fontWeight: 700, lineHeight: 1.15, marginTop: 8}}>
        রোজকার কথাগুলো
        <br />
        আরবিতে বলো
      </div>
    </div>
    <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 30}}>
      {[
        {icon: 'bag', bn: 'দোকানে', sub: 'দাম জিজ্ঞেস করো', ar: 'كم السعر؟'},
        {icon: 'car', bn: 'ট্যাক্সিতে', sub: 'রাস্তা বলে দাও', ar: 'لِفّ يمين'},
        {icon: 'briefcase', bn: 'কাজে', sub: 'বসের সাথে কথা বলো', ar: 'ما فهمت'},
      ].map((r) => (
        <Card key={r.bn} style={{display: 'flex', alignItems: 'center', gap: 28, padding: '26px 36px', border: 'none', boxShadow: '0 20px 44px rgba(4,47,46,0.25)'}}>
          <IconBadge name={r.icon} size={104} solid />
          <div style={{flex: 1, color: C.ink}}>
            <div style={{fontSize: 48, fontWeight: 700, lineHeight: 1.1}}>{r.bn}</div>
            <div style={{fontSize: 32, color: C.muted, fontWeight: 500, marginTop: 4}}>{r.sub}</div>
          </div>
          <Ar size={58} color={C.green7}>{r.ar}</Ar>
        </Card>
      ))}
    </div>
  </Post>
);

// 4 · Features
export const L4Features: React.FC = () => (
  <Post v="light" tag="ফিচার">
    <div style={{textAlign: 'center', marginTop: 16}}>
      <div style={{fontSize: 86, fontWeight: 700, lineHeight: 1.12}}>
        Lahjio-তে <Grad>যা পাবে</Grad>
      </div>
      <div style={{fontSize: 38, color: C.body, marginTop: 14, fontWeight: 500}}>সব কিছু বাংলায় বোঝানো</div>
    </div>
    <div style={{flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginTop: 46}}>
      {[
        {icon: 'headphones', t: 'অডিও লেসন', d: 'প্রতিটি শব্দ নেটিভ সৌদি উচ্চারণে'},
        {icon: 'cards', t: 'ফ্ল্যাশকার্ড ও কুইজ', d: '৩ ধরনের কুইজে প্র্যাকটিস'},
        {icon: 'refresh', t: 'স্মার্ট রিভিউ', d: 'ভুলে যাওয়ার আগেই রিভিশন'},
        {icon: 'flame', t: 'গোল ও স্ট্রিক', d: 'XP আর প্রতিদিনের লক্ষ্য'},
      ].map((c) => (
        <Card key={c.t} style={{padding: '40px 34px', display: 'flex', flexDirection: 'column', gap: 22}}>
          <IconBadge name={c.icon} size={112} solid />
          <div style={{fontSize: 46, fontWeight: 700, lineHeight: 1.15}}>{c.t}</div>
          <div style={{fontSize: 32, color: C.body, lineHeight: 1.35, fontWeight: 500}}>{c.d}</div>
        </Card>
      ))}
    </div>
  </Post>
);

// 5 · Numbers
export const L5Numbers: React.FC = () => (
  <Post v="green" tag="সংখ্যায় Lahjio">
    <div style={{textAlign: 'center', marginTop: 20, fontSize: 72, fontWeight: 700, lineHeight: 1.15}}>
      এক অ্যাপে
      <br />
      পুরো সৌদি আরবি
    </div>
    <div style={{flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26, marginTop: 50}}>
      {[
        {n: '৭৭৩+', l: 'শব্দ ও বাক্য'},
        {n: '৭২', l: 'লেসন'},
        {n: '৩', l: 'ধরনের কুইজ'},
        {n: '৫', l: 'মিনিট, প্রতিদিন'},
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
      প্রতিটি শব্দে অডিও আছে
    </div>
  </Post>
);

// 6 · A sample phrase card
export const L6Sample: React.FC = () => (
  <Post v="light" tag="এভাবে শিখবে">
    <div style={{textAlign: 'center', marginTop: 10, fontSize: 60, fontWeight: 700}}>
      দেখা হলে জিজ্ঞেস করো…
    </div>
    <div style={{flex: 1, display: 'flex', alignItems: 'center'}}>
      <Card style={{width: '100%', padding: '56px 50px', textAlign: 'center', borderRadius: 48}}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 26}}>
          <Speaker size={96} />
          <Bars h={70} color={C.teal} />
        </div>
        <Ar size={150} color={C.ink} style={{marginTop: 20}}>
          كيف حالك؟
        </Ar>
        <div style={{fontSize: 46, color: C.muted, fontWeight: 600}}>কেফ হালাক?</div>
        <div style={{height: 2, background: C.line, margin: '36px 0'}} />
        <div style={{fontSize: 80, fontWeight: 700}}>
          <Grad>কেমন আছেন?</Grad>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', gap: 20, marginTop: 34}}>
          {[
            {ar: 'كيف', bn: 'কেমন'},
            {ar: 'حالك', bn: 'তোমার অবস্থা'},
          ].map((p) => (
            <div key={p.ar} style={{background: C.g50, border: `2px solid ${C.mint}`, borderRadius: 24, padding: '10px 28px', display: 'flex', alignItems: 'center', gap: 16}}>
              <Ar size={46} color={C.green7}>{p.ar}</Ar>
              <span style={{fontSize: 34, fontWeight: 600, color: C.body}}>= {p.bn}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
    <div style={{textAlign: 'center', fontSize: 36, color: C.body, fontWeight: 600}}>উত্তর দাও: <Ar size={42} color={C.green7} style={{lineHeight: 1}}>الحمد لله</Ar> (আলহামদুলিল্লাহ)</div>
  </Post>
);

// 7 · How to start
export const L7How: React.FC = () => (
  <Post v="green" tag="শুরু করো">
    <div style={{textAlign: 'center', marginTop: 20, fontSize: 84, fontWeight: 700}}>কীভাবে শুরু করবে?</div>
    <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 34}}>
      {[
        {n: '১', t: 'lahjio.com খোলো', d: 'ফোনের ব্রাউজারেই চলে', icon: 'phone'},
        {n: '২', t: 'একটা লেসন বেছে নাও', d: 'দোকান, ট্যাক্সি, কাজ…', icon: 'book'},
        {n: '৩', t: 'দিনে ৫ মিনিট প্র্যাকটিস', d: 'শোনো, বলো, কুইজ দাও', icon: 'clock'},
      ].map((s) => (
        <div key={s.n} style={{display: 'flex', alignItems: 'center', gap: 32}}>
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
    <div style={{textAlign: 'center', fontSize: 40, fontWeight: 700}}>একদম ফ্রি শুরু করো</div>
  </Post>
);

// 8 · Daily habit (streak / XP)
export const L8Habit: React.FC = () => {
  const days = ['শ', 'র', 'সো', 'ম', 'বু', 'বৃ', 'শু'];
  return (
    <Post v="light" tag="প্রতিদিনের অভ্যাস">
      <div style={{textAlign: 'center', marginTop: 16, fontSize: 82, fontWeight: 700, lineHeight: 1.15}}>
        প্রতিদিন একটু,
        <br />
        <Grad>প্রতিদিন উন্নতি</Grad>
      </div>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28}}>
        <Card style={{padding: '40px 44px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
            <div style={{width: 110, height: 110, borderRadius: 32, background: '#fff7ed', border: '2px solid #fed7aa', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Icon name="flame" size={70} color={C.amber} fill="#fde68a" stroke={2} />
            </div>
            <div>
              <div style={{fontSize: 60, fontWeight: 700, lineHeight: 1.1}}>৭ দিনের স্ট্রিক!</div>
              <div style={{fontSize: 32, color: C.muted, fontWeight: 500}}>একদিনও বাদ দিও না</div>
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 34}}>
            {days.map((d) => (
              <div key={d} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
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
              <span style={{fontSize: 44, fontWeight: 700}}>আজকের লক্ষ্য</span>
            </div>
            <span style={{fontSize: 42, fontWeight: 700, color: C.green}}>৪০ / ৫০ XP</span>
          </div>
          <div style={{height: 34, borderRadius: 34, background: C.line, marginTop: 24, overflow: 'hidden'}}>
            <div style={{width: '80%', height: '100%', borderRadius: 34, background: 'linear-gradient(90deg, #059669, #14b8a6)'}} />
          </div>
        </Card>
      </div>
      <div style={{textAlign: 'center', fontSize: 38, color: C.body, fontWeight: 600}}>দিনে মাত্র ৫ মিনিটই যথেষ্ট</div>
    </Post>
  );
};

// 9 · Call to action
export const L9Cta: React.FC = () => (
  <Post v="green" tag="ফ্রি">
    <div style={center}>
      <Ar size={150} color="#fff">يلا نبدأ</Ar>
      <div style={{fontSize: 40, fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginTop: -6}}>ইয়াল্লা নাবদা = চলো শুরু করি</div>
      <div style={{fontSize: 96, fontWeight: 700, lineHeight: 1.15, marginTop: 50}}>
        আজই আরবি
        <br />
        বলা শুরু করো
      </div>
      <div style={{marginTop: 60}}>
        <Button dark size={54}>
          ফ্রি শুরু করো
        </Button>
      </div>
      <div style={{fontSize: 56, fontWeight: 700, marginTop: 44}}>lahjio.com</div>
      <div style={{marginTop: 22}}>
        <Pill v="green" size={32}>
          লিংক বায়োতে
        </Pill>
      </div>
    </div>
  </Post>
);

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
