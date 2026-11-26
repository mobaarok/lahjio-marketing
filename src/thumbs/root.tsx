// Separate Remotion entry for YouTube thumbnails (1280x720).
// Render: node scripts/render-thumbs.mjs [filter] -> out/thumbnails/<name>.jpg (+ .png)
import React from 'react';
import {AbsoluteFill, registerRoot, Still} from 'remotion';
import {C, FAR, FBN} from '../theme';
import {Logo, PhoneQuiz} from '../parts';
import {COPY} from '../copy';

const YELLOW = '#fde047';
const DEEP = '#064e3b';

const Waves: React.FC = () => (
  <svg width={980} height={980} viewBox="0 0 200 200" style={{position: 'absolute', right: -330, top: -150, opacity: 0.12}}>
    <g fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="8">
      <path d="M60 68 Q75 100 60 132" />
      <path d="M84 48 Q112 100 84 152" />
      <path d="M108 28 Q150 100 108 172" />
    </g>
  </svg>
);

// Promo #1, English channel: "Speak Saudi Arabic in 5 min a day"
const Promo1EN: React.FC = () => {
  const c = COPY.en;
  return (
    <AbsoluteFill style={{background: 'linear-gradient(135deg, #065f46 0%, #059669 55%, #14b8a6 100%)', fontFamily: FBN, overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(circle 420px at 78% 50%, rgba(255,255,255,0.28), transparent 70%), radial-gradient(circle 520px at 0% 100%, rgba(2,44,34,0.45), transparent 70%)',
        }}
      />
      <Waves />

      {/* logo + brand */}
      <div style={{position: 'absolute', left: 56, top: 44, display: 'flex', alignItems: 'center', gap: 16}}>
        <div style={{borderRadius: 22, boxShadow: '0 6px 18px rgba(0,0,0,0.25)'}}>
          <Logo size={74} />
        </div>
        <div style={{color: '#fff', fontSize: 44, fontWeight: 700, letterSpacing: -0.5}}>Lahjio</div>
      </div>

      {/* headline */}
      <div style={{position: 'absolute', left: 52, top: 150, width: 720, color: '#fff', textShadow: '0 6px 0 rgba(2,44,34,0.35)'}}>
        <div style={{fontSize: 118, fontWeight: 700, lineHeight: 0.98, letterSpacing: -3}}>SPEAK</div>
        <div style={{fontSize: 118, fontWeight: 700, lineHeight: 0.98, letterSpacing: -3}}>SAUDI</div>
        <div style={{fontSize: 118, fontWeight: 700, lineHeight: 0.98, letterSpacing: -3}}>ARABIC</div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 50,
          top: 520,
          background: YELLOW,
          color: DEEP,
          fontSize: 66,
          fontWeight: 700,
          padding: '4px 30px 0',
          borderRadius: 18,
          transform: 'rotate(-3deg)',
          boxShadow: '0 10px 0 #ca8a04, 0 18px 30px rgba(0,0,0,0.3)',
          letterSpacing: -1,
        }}
      >
        5 MIN A DAY
      </div>

      {/* phone */}
      <div style={{position: 'absolute', left: 836, top: 92, transform: 'rotate(7deg)'}}>
        <div style={{zoom: 0.78}}>
          <PhoneQuiz lang="en" label={c.quizLabel} translit={c.translit} options={c.options} next={c.next} local={200} audioAt={0} tapAt={150} />
        </div>
      </div>

      {/* Arabic speech bubble */}
      <div style={{position: 'absolute', left: 640, top: 52, transform: 'rotate(-6deg)'}}>
        <div
          style={{
            background: '#fff',
            borderRadius: 34,
            padding: '6px 34px 12px',
            boxShadow: '0 16px 36px rgba(0,0,0,0.3)',
            position: 'relative',
          }}
        >
          <div style={{fontFamily: FAR, fontSize: 84, fontWeight: 700, color: C.green7, direction: 'rtl', lineHeight: 1.35}}>كم السعر؟</div>
          <div style={{fontSize: 36, fontWeight: 700, color: C.ink, textAlign: 'center', marginTop: -10}}>= How much?</div>
          <svg width={60} height={44} viewBox="0 0 60 44" style={{position: 'absolute', left: 70, bottom: -38}}>
            <path d="M0 0 H60 L8 44 Z" fill="#fff" />
          </svg>
        </div>
      </div>

      {/* FREE badge (kept clear of YouTube's bottom-right timestamp) */}
      <div
        style={{
          position: 'absolute',
          left: 520,
          top: 470,
          width: 170,
          height: 170,
          borderRadius: '50%',
          background: '#ef4444',
          border: '7px solid #fff',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'rotate(12deg)',
          boxShadow: '0 14px 30px rgba(0,0,0,0.35)',
          lineHeight: 1,
        }}
      >
        <div style={{fontSize: 56, fontWeight: 700, marginTop: 8}}>FREE</div>
        <div style={{fontSize: 24, fontWeight: 600, marginTop: 4}}>to start</div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- shared pieces for the Bangla YouTube thumbnail and the Reel covers ----------
type L = "bn" | "en";
const TXT = {
  en: {head: ["SPEAK", "SAUDI", "ARABIC"], tag: "5 MIN A DAY", free: "FREE", freeSub: "to start", mean: "= How much?"},
  bn: {head: ["সৌদি", "আরবি", "বলো"], tag: "দিনে মাত্র ৫ মিনিট", free: "ফ্রি", freeSub: "শুরু করো", mean: "= দাম কত?"},
};
const BG: React.CSSProperties = {background: "linear-gradient(135deg, #065f46 0%, #059669 55%, #14b8a6 100%)", fontFamily: FBN, overflow: "hidden"};
const Glow: React.FC<{x: string; y: string}> = ({x, y}) => (
  <AbsoluteFill style={{background: `radial-gradient(circle 420px at ${x} ${y}, rgba(255,255,255,0.28), transparent 70%), radial-gradient(circle 520px at 0% 100%, rgba(2,44,34,0.45), transparent 70%)`}} />
);
const Brand: React.FC<{size: number}> = ({size}) => (
  <div style={{display: "flex", alignItems: "center", gap: size * 0.22}}>
    <div style={{borderRadius: size * 0.3, boxShadow: "0 6px 18px rgba(0,0,0,0.25)"}}><Logo size={size} /></div>
    <div style={{color: "#fff", fontSize: size * 0.6, fontWeight: 700, letterSpacing: -0.5}}>Lahjio</div>
  </div>
);
const Tag: React.FC<{lang: L; size: number}> = ({lang, size}) => (
  <div style={{display: "inline-block", background: YELLOW, color: DEEP, fontSize: size, fontWeight: 700, padding: lang === "bn" ? "10px 30px 6px" : "4px 30px 0", borderRadius: 18, transform: "rotate(-3deg)", boxShadow: "0 10px 0 #ca8a04, 0 18px 30px rgba(0,0,0,0.3)", letterSpacing: lang === "en" ? -1 : 0, whiteSpace: "nowrap"}}>
    {TXT[lang].tag}
  </div>
);
const Free: React.FC<{lang: L; d: number}> = ({lang, d}) => (
  <div style={{width: d, height: d, borderRadius: "50%", background: "#ef4444", border: `${Math.round(d * 0.04)}px solid #fff`, color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: "rotate(12deg)", boxShadow: "0 14px 30px rgba(0,0,0,0.35)", lineHeight: 1}}>
    <div style={{fontSize: d * 0.33, fontWeight: 700, marginTop: d * 0.05}}>{TXT[lang].free}</div>
    <div style={{fontSize: d * 0.14, fontWeight: 600, marginTop: lang === "bn" ? d * 0.06 : d * 0.02}}>{TXT[lang].freeSub}</div>
  </div>
);
const Bubble: React.FC<{lang: L; scale: number}> = ({lang, scale}) => (
  <div style={{transform: `rotate(-6deg) scale(${scale})`, transformOrigin: "top left"}}>
    <div style={{background: "#fff", borderRadius: 34, padding: "6px 34px 14px", boxShadow: "0 16px 36px rgba(0,0,0,0.3)", position: "relative"}}>
      <div style={{fontFamily: FAR, fontSize: 84, fontWeight: 700, color: C.green7, direction: "rtl", lineHeight: 1.35}}>كم السعر؟</div>
      <div style={{fontSize: 36, fontWeight: 700, color: C.ink, textAlign: "center", marginTop: lang === "bn" ? -4 : -10}}>{TXT[lang].mean}</div>
      <svg width={60} height={44} viewBox="0 0 60 44" style={{position: "absolute", left: 70, bottom: -38}}><path d="M0 0 H60 L8 44 Z" fill="#fff" /></svg>
    </div>
  </div>
);
const Phone: React.FC<{lang: L; zoom: number}> = ({lang, zoom}) => {
  const c = COPY[lang];
  return (
    <div style={{zoom}}>
      <PhoneQuiz lang={lang} label={c.quizLabel} translit={c.translit} options={c.options} next={c.next} local={200} audioAt={0} tapAt={150} />
    </div>
  );
};
const Head: React.FC<{lang: L; size: number; align?: "left" | "center"}> = ({lang, size, align = "left"}) => (
  <div style={{color: "#fff", textShadow: "0 6px 0 rgba(2,44,34,0.35)", textAlign: align}}>
    {TXT[lang].head.map((w) => (
      <div key={w} style={{fontSize: size, fontWeight: 700, lineHeight: lang === "bn" ? 1.12 : 0.98, letterSpacing: lang === "en" ? -3 : 0}}>{w}</div>
    ))}
  </div>
);

// Promo #1, Bangla YouTube thumbnail (same layout as the English one)
const Promo1BN: React.FC = () => (
  <AbsoluteFill style={BG}>
    <Glow x="78%" y="50%" />
    <Waves />
    <div style={{position: "absolute", left: 56, top: 44}}><Brand size={74} /></div>
    <div style={{position: "absolute", left: 52, top: 150, width: 720}}><Head lang="bn" size={112} /></div>
    <div style={{position: "absolute", left: 46, top: 548}}><Tag lang="bn" size={54} /></div>
    <div style={{position: "absolute", left: 836, top: 92, transform: "rotate(7deg)"}}><Phone lang="bn" zoom={0.78} /></div>
    <div style={{position: "absolute", left: 640, top: 52}}><Bubble lang="bn" scale={1} /></div>
    <div style={{position: "absolute", left: 540, top: 300}}><Free lang="bn" d={170} /></div>
  </AbsoluteFill>
);

// Promo #1, Reel cover (1080x1920). Instagram crops the profile grid to the centre 1080x1440 (y 240..1680),
// so everything important stays inside that band.
const ReelCover: React.FC<{lang: L}> = ({lang}) => (
  <AbsoluteFill style={BG}>
    <Glow x="70%" y="62%" />
    <Waves />
    <div style={{position: "absolute", top: 290, left: 0, right: 0, display: "flex", justifyContent: "center"}}><Brand size={84} /></div>
    <div style={{position: "absolute", top: 420, left: 0, right: 0}}><Head lang={lang} size={lang === "bn" ? 150 : 160} align="center" /></div>
    <div style={{position: "absolute", top: lang === "bn" ? 960 : 935, left: 0, right: 0, textAlign: "center"}}><Tag lang={lang} size={lang === "bn" ? 64 : 76} /></div>
    <div style={{position: "absolute", left: 420, top: 1100, transform: "rotate(7deg)"}}><Phone lang={lang} zoom={0.72} /></div>
    <div style={{position: "absolute", left: 70, top: 1150}}><Bubble lang={lang} scale={0.95} /></div>
    <div style={{position: "absolute", left: 110, top: 1420}}><Free lang={lang} d={210} /></div>
  </AbsoluteFill>
);
const ReelEN: React.FC = () => <ReelCover lang="en" />;
const ReelBN: React.FC = () => <ReelCover lang="bn" />;

const THUMBS = [
  {id: "yt--promo1-en", C: Promo1EN, w: 1280, h: 720},
  {id: "yt--promo1-bn", C: Promo1BN, w: 1280, h: 720},
  {id: "reel--promo1-en", C: ReelEN, w: 1080, h: 1920},
  {id: "reel--promo1-bn", C: ReelBN, w: 1080, h: 1920},
];

const Root: React.FC = () => (
  <>
    {THUMBS.map((t) => (
      <Still key={t.id} id={t.id} component={t.C} width={t.w} height={t.h} />
    ))}
  </>
);

registerRoot(Root);
