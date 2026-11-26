// Week 1 image posts (one per day, after the 9 launch posts). They alternate light / green
// so the profile grid stays a checkerboard. Day 1 is a carousel; the other days are single images.
import React from 'react';
import {C} from '../theme';
import {PHRASES} from '../daily/phrases';
import {Ar, Bars, Button, Card, Grad, Icon, IconBadge, Pill, Post, Speaker, V} from './kit';

const BN = '০১২৩৪৫৬৭৮৯';
const bn = (n: number) => String(n).replace(/\d/g, (d) => BN[Number(d)]);

// ───────────── Day 1 · carousel "5 phrases for your first day" ─────────────
const FIRST5 = [
  {ar: 'السلام عليكم', tr: 'আস-সালামু আলাইকুম', bn: 'আসসালামু আলাইকুম', when: 'দেখা হলে প্রথম কথা', tipAr: 'وعليكم السلام', tip: 'উত্তর: ওয়া আলাইকুম আস-সালাম'},
  {ar: 'كيف حالك؟', tr: 'কেফ হালাক?', bn: 'কেমন আছেন?', when: 'খোঁজ নিতে', tipAr: 'الحمد لله', tip: 'উত্তর: আলহামদুলিল্লাহ'},
  {ar: 'كم السعر؟', tr: "কাম আস-সি'র?", bn: 'দাম কত?', when: 'দোকানে, মার্কেটে', tipAr: 'بكم؟', tip: 'ছোট করে বলো: বিকাম?'},
  {ar: 'ما فهمت', tr: 'মা ফিহিম্‌ত', bn: 'আমি বুঝিনি', when: 'কাজে, কথা না বুঝলে', tipAr: 'شوي شوي', tip: 'সাথে বলো: শুওয়াই শুওয়াই (আস্তে)'},
  {ar: 'شكراً', tr: 'শুকরান', bn: 'ধন্যবাদ', when: 'সব জায়গায়', tipAr: 'العفو', tip: 'উত্তর: আল-আফু (স্বাগতম)'},
];

export const W1Cover: React.FC = () => (
  <Post v="light" tag="দিন ১ · সেভ করো">
    <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
      <div style={{fontSize: 58, fontWeight: 600, color: C.body}}>সৌদিতে প্রথম দিনেই লাগবে</div>
      <div style={{fontSize: 200, fontWeight: 700, lineHeight: 1.3, marginTop: 4}}>
        <Grad>৫টি</Grad>
      </div>
      <div style={{fontSize: 104, fontWeight: 700, lineHeight: 1.1}}>আরবি বাক্য</div>
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
            <Ar size={60} color={i === 1 ? C.green7 : C.ink}>{p.ar}</Ar>
          </Card>
        ))}
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 50, fontSize: 40, fontWeight: 700, color: C.green7}}>
        সোয়াইপ করো <Icon name="arrowR" size={46} color={C.green7} stroke={2.6} />
      </div>
    </div>
  </Post>
);

const PhraseSlide: React.FC<{i: number}> = ({i}) => {
  const p = FIRST5[i];
  return (
    <Post v="light" tag={`${bn(i + 1)} / ৫`}>
      <div style={{display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center', marginTop: 10}}>
        <Pill v="light" size={36}>
          {p.when}
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
          <div style={{fontSize: 48, color: C.muted, fontWeight: 600}}>{p.tr}</div>
          <div style={{height: 2, background: C.line, margin: '38px 0'}} />
          <div style={{fontSize: 84, fontWeight: 700, lineHeight: 1.15}}>
            <Grad>{p.bn}</Grad>
          </div>
        </Card>
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, background: C.g50, border: `2px solid ${C.mint}`, borderRadius: 30, padding: '18px 30px'}}>
        <Icon name="bulb" size={48} color={C.green} stroke={2.2} />
        <span style={{fontSize: 36, fontWeight: 600, color: C.body}}>{p.tip}</span>
        <Ar size={44} color={C.green7}>{p.tipAr}</Ar>
      </div>
    </Post>
  );
};
export const W1P1 = () => <PhraseSlide i={0} />;
export const W1P2 = () => <PhraseSlide i={1} />;
export const W1P3 = () => <PhraseSlide i={2} />;
export const W1P4 = () => <PhraseSlide i={3} />;
export const W1P5 = () => <PhraseSlide i={4} />;

export const W1End: React.FC = () => (
  <Post v="green" tag="আরও শিখবে?">
    <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
      <Icon name="bookmark" size={130} color="#fff" fill="rgba(255,255,255,0.2)" stroke={2} />
      <div style={{fontSize: 80, fontWeight: 700, lineHeight: 1.15, marginTop: 30}}>
        সেভ করে রাখো,
        <br />
        কাজে লাগবে!
      </div>
      <div style={{fontSize: 44, fontWeight: 500, marginTop: 36, color: 'rgba(255,255,255,0.9)', lineHeight: 1.4}}>
        আরও ৭৭৩+ শব্দ ও বাক্য,
        <br />
        প্রতিটির নেটিভ অডিওসহ
      </div>
      <div style={{marginTop: 60}}>
        <Button dark size={50}>
          ফ্রি শুরু করো
        </Button>
      </div>
      <div style={{fontSize: 50, fontWeight: 700, marginTop: 36}}>lahjio.com</div>
    </div>
  </Post>
);

// ───────────── Day 2 · numbers 1–10 ─────────────
const NUMS = [
  ['١', 'واحد', 'ওয়াহিদ'],
  ['٢', 'اثنين', 'ইসনেইন'],
  ['٣', 'ثلاثة', 'সালাসা'],
  ['٤', 'أربعة', "আরবা'আ"],
  ['٥', 'خمسة', 'খামসা'],
  ['٦', 'ستة', 'সিত্তা'],
  ['٧', 'سبعة', "সাব'আ"],
  ['٨', 'ثمانية', 'সামানিয়া'],
  ['٩', 'تسعة', "তিস'আ"],
  ['١٠', 'عشرة', 'আশারা'],
];
export const W2Numbers: React.FC = () => (
  <Post v="green" tag="দিন ২ · সংখ্যা">
    <div style={{textAlign: 'center', fontSize: 74, fontWeight: 700, lineHeight: 1.1}}>সৌদি আরবিতে ১ থেকে ১০</div>
    <div style={{textAlign: 'center', fontSize: 34, fontWeight: 500, marginTop: 10, color: 'rgba(255,255,255,0.88)'}}>দোকানের দাম আর বাসের নম্বর পড়তে কাজে লাগবে</div>
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
            <div style={{fontSize: 30, fontWeight: 600, color: C.muted, lineHeight: 1.2}}>{tr}</div>
          </div>
          <div style={{fontSize: 44, fontWeight: 700, color: C.green}}>{bn(i + 1)}</div>
        </div>
      ))}
    </div>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 26, fontSize: 34, fontWeight: 600}}>
      <Icon name="bulb" size={44} color="#fff" stroke={2.2} />
      <span>
        খেয়াল করো: <Ar size={40} color="#fff" style={{lineHeight: 1}}>٥</Ar> দেখতে শূন্যের মতো, কিন্তু এটা ৫!
      </span>
    </div>
  </Post>
);

// ───────────── Day 3 · quiz ─────────────
export const W3Quiz: React.FC = () => (
  <Post v="light" tag="দিন ৩ · কুইজ">
    <div style={{textAlign: 'center', fontSize: 76, fontWeight: 700, marginTop: 10}}>
      এই শব্দের <Grad>মানে কী?</Grad>
    </div>
    <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 26}}>
      <Card style={{textAlign: 'center', padding: '36px 40px 30px', borderRadius: 48}}>
        <Ar size={190} color={C.ink} style={{lineHeight: 1.3}}>
          زين
        </Ar>
        <div style={{fontSize: 48, fontWeight: 600, color: C.muted}}>যেইন</div>
      </Card>
      {[
        ['A', 'খারাপ'],
        ['B', 'ভালো'],
        ['C', 'বড়'],
      ].map(([k, t]) => (
        <Card key={k} style={{display: 'flex', alignItems: 'center', gap: 28, padding: '22px 34px', borderRadius: 30}}>
          <div style={{width: 76, height: 76, borderRadius: 22, background: C.g50, border: `2px solid ${C.mint}`, color: C.green7, fontSize: 42, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {k}
          </div>
          <span style={{fontSize: 50, fontWeight: 600}}>{t}</span>
        </Card>
      ))}
    </div>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, fontSize: 40, fontWeight: 700, color: C.green7, marginTop: 10}}>
      <Icon name="chat" size={50} color={C.green7} stroke={2.2} />
      কমেন্টে A, B বা C লেখো
    </div>
  </Post>
);

// ───────────── Day 4 · textbook vs Saudi ─────────────
const VS = [
  {m: 'আমি চাই', f: 'أريد', s: 'أبغى', tr: 'আবগা'},
  {m: 'কী?', f: 'ماذا', s: 'إيش', tr: 'ইশ'},
  {m: 'কোথায়?', f: 'أين', s: 'وين', tr: 'ওয়েন'},
  {m: 'এখন', f: 'الآن', s: 'الحين', tr: 'আল-হিন'},
  {m: 'এরকম', f: 'هكذا', s: 'كذا', tr: 'কিদা'},
];
export const W4Versus: React.FC = () => (
  <Post v="green" tag="দিন ৪ · জানো কি?">
    <div style={{textAlign: 'center', fontSize: 70, fontWeight: 700, lineHeight: 1.15}}>
      বইয়ের আরবি বনাম
      <br />
      সৌদিরা যা বলে
    </div>
    <Card style={{flex: 1, marginTop: 40, padding: '16px 36px', border: 'none', display: 'flex', flexDirection: 'column', color: C.ink}}>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1.25fr', padding: '18px 0', fontSize: 32, fontWeight: 700, color: C.muted, borderBottom: `2px solid ${C.line}`}}>
        <span>অর্থ</span>
        <span style={{textAlign: 'center'}}>বইয়ে</span>
        <span style={{textAlign: 'center', color: C.green7}}>সৌদিতে</span>
      </div>
      {VS.map((r, i) => (
        <div
          key={r.m}
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1.25fr',
            alignItems: 'center',
            borderBottom: i < VS.length - 1 ? `2px solid ${C.line}` : 'none',
          }}
        >
          <span style={{fontSize: 42, fontWeight: 700}}>{r.m}</span>
          <div style={{textAlign: 'center', position: 'relative'}}>
            <Ar size={50} color="#94a3b8" weight={600} style={{textDecoration: 'line-through', textDecorationColor: '#ef4444', textDecorationThickness: 4}}>
              {r.f}
            </Ar>
          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, background: C.g50, borderRadius: 22, padding: '6px 14px'}}>
            <Ar size={56} color={C.green7}>{r.s}</Ar>
            <span style={{fontSize: 30, fontWeight: 600, color: C.body}}>{r.tr}</span>
          </div>
        </div>
      ))}
    </Card>
    <div style={{textAlign: 'center', fontSize: 36, fontWeight: 600, marginTop: 26}}>Lahjio-তে শেখো আসল কথ্য সৌদি আরবি</div>
  </Post>
);

// ───────────── Day 5 · taxi words ─────────────
const TAXI = [
  {icon: 'arrowR', ar: 'يمين', tr: 'ইয়ামিন', bn: 'ডানে'},
  {icon: 'arrowL', ar: 'يسار', tr: 'ইয়াসার', bn: 'বামে'},
  {icon: 'arrowUp', ar: 'سيدا', tr: 'সিদা', bn: 'সোজা', note: 'চেনা লাগছে?'},
  {icon: 'stop', ar: 'وقّف هنا', tr: 'ওয়াগ্গিফ হিনা', bn: 'এখানে থামাও'},
  {icon: 'coin', ar: 'كم؟', tr: 'কাম?', bn: 'ভাড়া কত?'},
];
export const W5Taxi: React.FC = () => (
  <Post v="light" tag="দিন ৫ · ট্যাক্সি">
    <div style={{display: 'flex', alignItems: 'center', gap: 28, marginTop: 6}}>
      <IconBadge name="car" size={130} solid />
      <div style={{fontSize: 66, fontWeight: 700, lineHeight: 1.12}}>
        ট্যাক্সিতে লাগবে
        <br />
        <Grad>এই ৫টি শব্দ</Grad>
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
              {r.bn}
              {r.note ? <Pill v="light" size={24}>{r.note}</Pill> : null}
            </div>
            <div style={{fontSize: 30, color: C.muted, fontWeight: 600}}>{r.tr}</div>
          </div>
          <Ar size={58} color={C.green7}>{r.ar}</Ar>
        </Card>
      ))}
    </div>
    <div style={{textAlign: 'center', fontSize: 34, color: C.body, fontWeight: 600, marginTop: 22}}>পরের রাইডে ট্রাই করো, কমেন্টে জানাও!</div>
  </Post>
);

// ───────────── Day 6 · greetings and replies ─────────────
const PAIRS = [
  {q: 'السلام عليكم', qbn: 'সালাম', a: 'وعليكم السلام', abn: 'ওয়া আলাইকুম আস-সালাম'},
  {q: 'كيف حالك؟', qbn: 'কেমন আছেন?', a: 'الحمد لله، بخير', abn: 'আলহামদুলিল্লাহ, বিখাইর'},
  {q: 'شكراً', qbn: 'ধন্যবাদ', a: 'العفو', abn: 'আল-আফু'},
  {q: 'يعطيك العافية', qbn: 'কাজের জন্য দোয়া', a: 'الله يعافيك', abn: 'আল্লাহ ইয়াআফিক'},
];
export const W6Replies: React.FC = () => (
  <Post v="green" tag="দিন ৬ · উত্তর">
    <div style={{textAlign: 'center', fontSize: 70, fontWeight: 700, lineHeight: 1.15}}>
      কেউ বললে… <span style={{color: C.mint}}>তুমি বলো</span>
    </div>
    <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 26, marginTop: 20}}>
      {PAIRS.map((p) => (
        <div key={p.q} style={{display: 'flex', alignItems: 'stretch', gap: 14}}>
          <div style={{flex: 1, borderRadius: 30, background: 'rgba(255,255,255,0.16)', border: '2px solid rgba(255,255,255,0.3)', padding: '26px 22px', textAlign: 'center'}}>
            <Ar size={54} color="#fff" style={{lineHeight: 1.45}}>
              {p.q}
            </Ar>
            <div style={{fontSize: 31, fontWeight: 600, color: 'rgba(255,255,255,0.85)'}}>{p.qbn}</div>
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Icon name="arrowR" size={46} color="#fff" stroke={2.8} />
          </div>
          <div style={{flex: 1.15, borderRadius: 30, background: '#fff', padding: '26px 22px', textAlign: 'center', boxShadow: '0 14px 30px rgba(4,47,46,0.25)'}}>
            <Ar size={54} color={C.green7} style={{lineHeight: 1.45}}>
              {p.a}
            </Ar>
            <div style={{fontSize: 31, fontWeight: 600, color: C.body}}>{p.abn}</div>
          </div>
        </div>
      ))}
    </div>
    <div style={{textAlign: 'center', fontSize: 34, fontWeight: 600, marginTop: 24, color: 'rgba(255,255,255,0.92)'}}>
      <Ar size={38} color="#fff" style={{lineHeight: 1}}>يعطيك العافية</Ar> = সৌদিতে খুব বেশি শোনা ধন্যবাদ
    </div>
  </Post>
);

// ───────────── Day 7 · week recap ─────────────
export const W7Recap: React.FC = () => (
  <Post v="light" tag="দিন ৭ · রিক্যাপ">
    <div style={{textAlign: 'center', fontSize: 66, fontWeight: 700, lineHeight: 1.15}}>
      এই সপ্তাহের <Grad>৭টি বাক্য</Grad>
    </div>
    <div style={{textAlign: 'center', fontSize: 36, color: C.body, fontWeight: 500, marginTop: 8}}>কয়টা মনে আছে? সেভ করো, আবার দেখো</div>
    <Card style={{flex: 1, marginTop: 30, padding: '10px 34px', display: 'flex', flexDirection: 'column'}}>
      {PHRASES.slice(0, 7).map((p, i) => (
        <div key={p.slug} style={{flex: 1, display: 'flex', alignItems: 'center', gap: 22, borderBottom: i < 6 ? `2px solid ${C.line}` : 'none'}}>
          <div style={{width: 62, height: 62, borderRadius: 62, background: 'linear-gradient(135deg, #059669, #14b8a6)', color: '#fff', fontSize: 32, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
            {bn(p.day)}
          </div>
          <div style={{flex: 1}}>
            <div style={{fontSize: 38, fontWeight: 700, lineHeight: 1.15}}>{p.meaning.bn}</div>
            <div style={{fontSize: 26, color: C.muted, fontWeight: 600}}>{p.tr.bn}</div>
          </div>
          <Ar size={48} color={C.green7}>{p.ar}</Ar>
        </div>
      ))}
    </Card>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, fontSize: 34, fontWeight: 700, color: C.green7, marginTop: 22}}>
      প্রতিদিন নতুন বাক্য, ফলো করো
      <Icon name="sparkle" size={40} color={C.green7} fill={C.mint} />
    </div>
  </Post>
);

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
