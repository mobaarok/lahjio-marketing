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

const THUMBS = [{id: 'yt--promo1-en', C: Promo1EN}];

const Root: React.FC = () => (
  <>
    {THUMBS.map((t) => (
      <Still key={t.id} id={t.id} component={t.C} width={1280} height={720} />
    ))}
  </>
);

registerRoot(Root);
