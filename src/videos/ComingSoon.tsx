// "Android app coming soon — download from Google Play" teaser (BN + EN, 9:16 / 4:5 / 16:9)
import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Lang} from '../copy';
import {ArText, Background, Logo, Speaker} from '../parts';
import {C, EASE_IO, FBN, GRAD, GRAD_CARD, ease, lin, num, pop} from '../theme';

const F = (sec: number) => Math.ceil(sec * 30);

// Narrator clips (BN "Shadhin Bangla", EN "Leo"); lengths measured with ffprobe
export const CS_VO = {
  bn: {hook: {src: "audio/bn/cs-hook.mp3", sec: 4.52}, play: {src: "audio/bn/cs-play.mp3", sec: 5.25}},
  en: {hook: {src: "audio/en/cs-hook.mp3", sec: 4.37}, play: {src: "audio/en/cs-play.mp3", sec: 6.12}},
};

const T_ = {
  bn: {
    hook: 'বড় খবর!',
    hookSub: 'Lahjio অ্যান্ড্রয়েড অ্যাপ আসছে',
    chip: 'অ্যান্ড্রয়েড অ্যাপ',
    stamp: 'শীঘ্রই আসছে',
    hello: 'আসসালামু আলাইকুম 👋',
    goal: 'আজকের লক্ষ্য',
    goalVal: '৫ মিনিট',
    lessons: [
      {t: 'কেনাকাটা', e: '🛒', ar: 'كم السعر'},
      {t: 'ট্যাক্সি', e: '🚕', ar: 'وين'},
      {t: 'কাজের জায়গা', e: '🛠️', ar: 'أبغى'},
    ],
    playTitle: 'ডাউনলোড করো',
    playSub: 'Google Play স্টোর থেকে',
    badgeTop: 'শীঘ্রই পাবেন',
    loading: 'প্রস্তুত হচ্ছে…',
    web: 'ততদিন ফ্রি শুরু করো',
    outroLine: 'অ্যান্ড্রয়েড অ্যাপ · শীঘ্রই আসছে',
  },
  en: {
    hook: 'Big news!',
    hookSub: 'Lahjio is coming to Android',
    chip: 'Android app',
    stamp: 'Coming soon',
    hello: 'Assalamu alaikum 👋',
    goal: "Today's goal",
    goalVal: '5 min',
    lessons: [
      {t: 'Shopping', e: '🛒', ar: 'كم السعر'},
      {t: 'Taxi', e: '🚕', ar: 'وين'},
      {t: 'At work', e: '🛠️', ar: 'أبغى'},
    ],
    playTitle: 'Download it',
    playSub: 'from the Google Play Store',
    badgeTop: 'COMING SOON ON',
    loading: 'Getting ready…',
    web: 'Until then, start free at',
    outroLine: 'Android app · coming soon',
  },
};
type TT = (typeof T_)['bn'];

export const csTimeline = (lang: Lang) => {
  const vo = CS_VO[lang];
  const hook = {dur: Math.max(84, 8 + F(vo.hook.sec) + 12), vo: 8};
  const phone = {dur: 150, stamp: 66};
  const play = {dur: Math.max(156, 10 + F(vo.play.sec) + 18), vo: 10};
  const outro = {dur: 105, slam: 12, yalla: 44};
  let t = 0;
  const at = <X extends {dur: number}>(x: X) => {
    const r = {...x, from: t};
    t += x.dur;
    return r;
  };
  const T = {hook: at(hook), phone: at(phone), play: at(play), outro: at(outro)};
  return {...T, total: t};
};

const useL = () => {
  const {width: W, height: H} = useVideoConfig();
  const r = W / H;
  const mode = r < 0.7 ? 'tall' : r < 1.2 ? 'feed' : 'wide';
  const s = mode === 'tall' ? W / 1080 : mode === 'feed' ? H / 1600 : H / 1080;
  return {W, H, mode, s} as const;
};
const fill: React.CSSProperties = {position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'};
const exit = (f: number, dur: number, n = 10) => 1 - ease(f, dur - n, dur, EASE_IO);

// ── Google Play-style badge (icon + two lines) ──
const PlayIcon: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 100 110">
    <path d="M8 4 L58 55 L8 106 Q2 103 2 96 V14 Q2 7 8 4Z" fill="#00d7fe" />
    <path d="M8 4 Q13 1 19 5 L74 37 L58 55Z" fill="#00f076" />
    <path d="M8 106 L58 55 L74 73 L19 105 Q13 109 8 106Z" fill="#ff3a44" />
    <path d="M74 37 L92 48 Q98 55 92 62 L74 73 L58 55Z" fill="#ffd400" />
  </svg>
);
const PlayBadge: React.FC<{s: number; top: string}> = ({s, top}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 26 * s,
      background: '#000',
      border: `${3 * s}px solid #a6a6a6`,
      borderRadius: 30 * s,
      padding: `${20 * s}px ${48 * s}px ${20 * s}px ${36 * s}px`,
      boxShadow: `0 ${24 * s}px ${50 * s}px rgba(15,23,42,0.3)`,
    }}
  >
    <PlayIcon size={92 * s} />
    <div style={{display: 'flex', flexDirection: 'column', color: '#fff', lineHeight: 1.05}}>
      <span style={{fontSize: 36 * s, fontWeight: 700, letterSpacing: 1 * s}}>{top}</span>
      <span style={{fontSize: 74 * s, fontWeight: 600, fontFamily: `Roboto, ${FBN}`}}>Google Play</span>
    </div>
  </div>
);

// ── Phone showing the app home screen (base 420 x 860, scaled with zoom) ──
const PhoneHome: React.FC<{t: TT; lang: Lang; f: number}> = ({t, lang, f}) => {
  const goal = ease(f, 30, 80);
  return (
    <div style={{width: 420, height: 860, borderRadius: 60, background: '#0f172a', padding: 12, boxSizing: 'border-box', boxShadow: '0 40px 80px rgba(15,23,42,0.25), 0 12px 24px rgba(15,23,42,0.15)'}}>
      <div style={{width: '100%', height: '100%', borderRadius: 48, background: C.bg, overflow: 'hidden', position: 'relative', fontFamily: FBN}}>
        <div style={{display: 'flex', justifyContent: 'space-between', padding: '18px 30px 0', fontSize: 17, fontWeight: 600, color: C.ink}}>
          <span>9:41</span>
          <span style={{width: 24, height: 12, borderRadius: 4, border: `2px solid ${C.ink}`}} />
        </div>
        <div style={{position: 'absolute', top: 14, left: '50%', marginLeft: -10, width: 20, height: 20, borderRadius: 20, background: '#0f172a'}} />
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '26px 24px 0'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
            <Logo size={44} />
            <span style={{fontSize: 26, fontWeight: 700, color: C.ink}}>Lahjio</span>
          </div>
          <div style={{padding: '4px 12px', borderRadius: 12, background: '#fff7ed', color: '#c2410c', fontWeight: 700, fontSize: 20}}>🔥 {num(7, lang)}</div>
        </div>
        <div style={{padding: '18px 26px 0', fontSize: 22, fontWeight: 600, color: C.body}}>{t.hello}</div>
        <div style={{margin: '14px 22px 0', borderRadius: 24, background: GRAD_CARD, padding: '20px 22px', color: '#fff', boxShadow: '0 12px 24px rgba(5,150,105,0.3)'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 20, fontWeight: 600}}>
            <span>{t.goal}</span>
            <span>{t.goalVal}</span>
          </div>
          <div style={{marginTop: 14, height: 14, borderRadius: 10, background: 'rgba(255,255,255,0.3)', overflow: 'hidden'}}>
            <div style={{width: `${20 + 70 * goal}%`, height: '100%', borderRadius: 10, background: '#fff'}} />
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 14, padding: '20px 22px 0'}}>
          {t.lessons.map((l, i) => {
            const p = ease(f, 14 + i * 8, 36 + i * 8);
            return (
              <div
                key={i}
                style={{
                  height: 92,
                  borderRadius: 20,
                  background: '#fff',
                  border: `2px solid ${C.line}`,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 18px',
                  gap: 14,
                  opacity: p,
                  transform: `translateX(${(1 - p) * 60}px)`,
                }}
              >
                <div style={{width: 56, height: 56, borderRadius: 16, background: C.g50, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30}}>{l.e}</div>
                <div style={{flex: 1, fontSize: 22, fontWeight: 700, color: C.ink}}>{l.t}</div>
                <ArText size={28} color={C.green7}>{l.ar}</ArText>
              </div>
            );
          })}
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 78, background: '#fff', borderTop: `1px solid ${C.line}`, display: 'flex', justifyContent: 'space-around', alignItems: 'center', fontSize: 28}}>
          {['🏠', '🎧', '🃏', '👤'].map((e, i) => (
            <span key={i} style={{opacity: i === 0 ? 1 : 0.45}}>{e}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Scenes ──
const Hook: React.FC<{t: TT; dur: number}> = ({t, dur}) => {
  const f = useCurrentFrame();
  const {mode, s} = useL();
  const a = pop(f, 2, 18);
  const b = pop(f, 10, 20);
  const c = ease(f, 22, 42);
  const x = exit(f, dur);
  const shake = f < 30 ? Math.sin(f * 1.4) * 6 * (1 - f / 30) : 0;
  const big = mode === 'wide' ? 190 : 200;
  return (
    <AbsoluteFill style={{fontFamily: FBN, opacity: x}}>
      <div style={fill}>
        <div style={{fontSize: 170 * s, transform: `scale(${a}) rotate(${-12 + shake}deg)`, lineHeight: 1}}>📢</div>
        <div style={{fontSize: big * s, fontWeight: 700, lineHeight: 1.15, marginTop: 20 * s, transform: `scale(${b})`}}>
          <span style={{backgroundImage: GRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'}}>{t.hook}</span>
        </div>
        <div style={{fontSize: 66 * s, fontWeight: 700, color: C.ink, marginTop: 18 * s, opacity: c, transform: `translateY(${(1 - c) * 30 * s}px)`, textAlign: 'center', padding: `0 ${60 * s}px`, lineHeight: 1.3}}>
          {t.hookSub}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Phone: React.FC<{t: TT; lang: Lang; dur: number; stampAt: number}> = ({t, lang, dur, stampAt}) => {
  const f = useCurrentFrame();
  const {W, mode, s} = useL();
  const rise = ease(f, 0, 26);
  const chip = pop(f, 14, 18);
  const st = ease(f, stampAt - 8, stampAt, EASE_IO);
  const stSc = interpolate(st, [0, 1], [2.4, 1]) * (1 + 0.07 * Math.sin(Math.PI * lin(f, stampAt, stampAt + 10)));
  const x = exit(f, dur);
  const zoom = (mode === 'tall' ? 1.75 : mode === 'feed' ? 1.28 : 1.05) * s;
  const wide = mode === 'wide';
  const drift = Math.sin(f / 30) * 8 * s;
  const phone = (
    <div style={{transform: `translateY(${(1 - rise) * 900 * s + drift}px) rotate(${(1 - rise) * 8 - 3}deg)`, zoom}}>
      <PhoneHome t={t} lang={lang} f={f} />
    </div>
  );
  const chipEl = (
    <div style={{display: 'flex', alignItems: 'center', gap: 16 * s, background: '#fff', border: `${2 * s}px solid ${C.line}`, borderRadius: 60 * s, padding: `${14 * s}px ${34 * s}px`, boxShadow: '0 14px 32px rgba(15,23,42,0.12)', transform: `scale(${chip})`, whiteSpace: 'nowrap'}}>
      <span style={{fontSize: 52 * s}}>📱</span>
      <span style={{fontSize: 54 * s, fontWeight: 700, color: C.green7}}>{t.chip}</span>
    </div>
  );
  const stamp = (
    <div
      style={{
        opacity: st,
        transform: `rotate(-8deg) scale(${stSc})`,
        background: C.amber,
        color: '#fff',
        fontWeight: 700,
        fontSize: (wide ? 104 : 110) * s,
        borderRadius: 30 * s,
        padding: `${10 * s}px ${48 * s}px`,
        border: `${6 * s}px solid #fff`,
        boxShadow: `0 ${20 * s}px ${44 * s}px rgba(245,158,11,0.45)`,
        whiteSpace: 'nowrap',
        lineHeight: 1.3,
      }}
    >
      {t.stamp}
    </div>
  );
  if (wide) {
    return (
      <AbsoluteFill style={{fontFamily: FBN, opacity: x, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 120 * s}}>
        {phone}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 60 * s, width: W * 0.4}}>
          {chipEl}
          {stamp}
        </div>
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill style={{fontFamily: FBN, opacity: x}}>
      <div style={{...fill, justifyContent: 'flex-start', paddingTop: (mode === 'tall' ? 150 : 70) * s}}>{chipEl}</div>
      <div style={{...fill, top: (mode === 'tall' ? 140 : 90) * s}}>{phone}</div>
      <div style={{...fill, justifyContent: 'flex-end', paddingBottom: (mode === 'tall' ? 220 : 90) * s}}>{stamp}</div>
    </AbsoluteFill>
  );
};

const Play: React.FC<{t: TT; dur: number}> = ({t, dur}) => {
  const f = useCurrentFrame();
  const {mode, s} = useL();
  const title = ease(f, 0, 20);
  const badge = pop(f, 8, 22);
  const bar = ease(f, 30, 110);
  const web = ease(f, 70, 92);
  const x = exit(f, dur);
  const breathe = 1 + 0.025 * Math.sin(f / 8);
  const bw = (mode === 'wide' ? 700 : 760) * s;
  return (
    <AbsoluteFill style={{fontFamily: FBN, opacity: x}}>
      <div style={{...fill, gap: 0}}>
        <div style={{fontSize: 120 * s, fontWeight: 700, color: C.ink, lineHeight: 1.2, opacity: title, transform: `translateY(${(1 - title) * 30 * s}px)`}}>{t.playTitle}</div>
        <div style={{fontSize: 60 * s, fontWeight: 600, color: C.body, opacity: title, marginBottom: 50 * s, textAlign: 'center'}}>{t.playSub}</div>
        <div style={{transform: `scale(${badge * breathe})`}}>
          <PlayBadge s={s * 1.15} top={t.badgeTop} />
        </div>
        <div style={{marginTop: 60 * s, width: bw, opacity: ease(f, 26, 36)}}>
          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 40 * s, fontWeight: 600, color: C.muted, marginBottom: 12 * s}}>
            <span>{t.loading}</span>
            <span style={{color: C.green7}}>{Math.round(10 + 85 * bar)}%</span>
          </div>
          <div style={{height: 26 * s, borderRadius: 30 * s, background: C.line, overflow: 'hidden'}}>
            <div style={{width: `${10 + 85 * bar}%`, height: '100%', borderRadius: 30 * s, background: GRAD}} />
          </div>
        </div>
        <div
          style={{
            marginTop: (mode === 'wide' ? 50 : 80) * s,
            opacity: web,
            transform: `translateY(${(1 - web) * 24 * s}px)`,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 18 * s,
            fontSize: 52 * s,
            fontWeight: 700,
            color: C.body,
            padding: `0 ${50 * s}px`,
          }}
        >
          <span>{t.web}</span>
          <span style={{background: C.green, color: '#fff', borderRadius: 24 * s, padding: `${4 * s}px ${28 * s}px`, boxShadow: `0 ${6 * s}px 0 ${C.green7}`}}>lahjio.com</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Outro: React.FC<{t: TT; slam: number; yallaAt: number}> = ({t, slam: slamAt, yallaAt}) => {
  const f = useCurrentFrame();
  const {mode, s} = useL();
  const slam = ease(f, slamAt - 10, slamAt, EASE_IO);
  const sc = interpolate(slam, [0, 1], [0.4, 1]) * (1 - 0.06 * Math.sin(Math.PI * lin(f, slamAt, slamAt + 10)));
  const txt = ease(f, slamAt + 8, slamAt + 28);
  const cta = pop(f, slamAt + 20, 20);
  const yalla = pop(f, yallaAt - 4, 16);
  return (
    <AbsoluteFill style={{fontFamily: FBN}}>
      <div style={fill}>
        <div style={{transform: `scale(${sc})`, opacity: slam, filter: `drop-shadow(0 ${20 * s}px ${36 * s}px rgba(5,150,105,0.35))`}}>
          <Logo size={(mode === 'wide' ? 190 : 230) * s} wave={lin(f, slamAt, slamAt + 18)} />
        </div>
        <div style={{fontSize: 112 * s, fontWeight: 700, color: C.ink, marginTop: 14 * s, opacity: slam, lineHeight: 1.1}}>Lahjio</div>
        <div style={{fontSize: 60 * s, fontWeight: 700, color: C.body, marginTop: 16 * s, opacity: txt, transform: `translateY(${(1 - txt) * 24 * s}px)`, textAlign: 'center', padding: `0 ${50 * s}px`}}>
          {t.outroLine}
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 30 * s, marginTop: 44 * s, transform: `scale(${cta})`, flexWrap: 'wrap', justifyContent: 'center'}}>
          <PlayBadge s={s * 0.8} top={t.badgeTop} />
          <div style={{background: GRAD, color: '#fff', fontSize: 56 * s, fontWeight: 700, borderRadius: 30 * s, padding: `${16 * s}px ${40 * s}px`, boxShadow: `0 ${14 * s}px ${30 * s}px rgba(5,150,105,0.35)`}}>lahjio.com</div>
        </div>
        <div style={{marginTop: 40 * s, transform: `scale(${yalla})`, opacity: Math.min(1, yalla * 2), background: C.ink, borderRadius: 28 * s, padding: `${4 * s}px ${30 * s}px`, display: 'flex', alignItems: 'center', gap: 14 * s}}>
          <Speaker size={34 * s} color={C.mint} />
          <ArText size={50 * s} color="#fff">يلا نبدأ</ArText>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export type ComingSoonProps = {lang: Lang; bgm: boolean};

export const ComingSoon: React.FC<ComingSoonProps> = ({lang, bgm}) => {
  const T = csTimeline(lang);
  const t = T_[lang];
  const vo = CS_VO[lang];
  const voice = [
    {from: T.hook.from + T.hook.vo, src: vo.hook.src, len: F(vo.hook.sec)},
    {from: T.play.from + T.play.vo, src: vo.play.src, len: F(vo.play.sec)},
    {from: T.outro.from + T.outro.yalla, src: 'audio/yalla.mp3', len: 40},
  ];
  const sfx: {from: number; src: string; volume: number; dur?: number}[] = [
    {from: 2, src: 'sfx/pop.mp3', volume: 0.35},
    {from: 10, src: 'sfx/impact-cine-big.mp3', volume: 0.35, dur: 50},
    {from: 22, src: 'sfx/air-woosh-quick.mp3', volume: 0.25},
    {from: T.phone.from, src: 'sfx/whoosh-big.mp3', volume: 0.4},
    {from: T.phone.from + 14, src: 'sfx/pop.mp3', volume: 0.3},
    {from: T.phone.from + 16, src: 'sfx/paper-slide.mp3', volume: 0.3, dur: 20},
    {from: T.phone.from + T.phone.stamp - 14, src: 'sfx/riser-cine.mp3', volume: 0.3, dur: 16},
    {from: T.phone.from + T.phone.stamp, src: 'sfx/impact-cine-big.mp3', volume: 0.55, dur: 60},
    {from: T.play.from, src: 'sfx/swoosh-quick.mp3', volume: 0.3},
    {from: T.play.from + 8, src: 'sfx/switch-tap.mp3', volume: 0.45},
    {from: T.play.from + 12, src: 'sfx/shimmer-sparkle-sweep.mp3', volume: 0.28, dur: 40},
    {from: T.play.from + 30, src: 'sfx/clock-knob-spin.mp3', volume: 0.25, dur: 60},
    {from: T.play.from + 72, src: 'sfx/pop.mp3', volume: 0.3},
    {from: T.outro.from, src: 'sfx/riser-cine.mp3', volume: 0.35, dur: T.outro.slam},
    {from: T.outro.from + T.outro.slam, src: 'sfx/impact-cine-big.mp3', volume: 0.6, dur: 80},
    {from: T.outro.from + T.outro.slam + 6, src: 'sfx/sparkle.mp3', volume: 0.3},
    {from: T.outro.from + T.outro.slam + 20, src: 'sfx/pop.mp3', volume: 0.3},
  ];
  const duck = (fr: number) => {
    let d = 1;
    for (const v of voice) {
      const k = interpolate(fr, [v.from - 8, v.from, v.from + v.len, v.from + v.len + 12], [1, 0.3, 0.3, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      d = Math.min(d, k);
    }
    return d;
  };
  return (
    <AbsoluteFill>
      <Background />
      <Sequence from={T.hook.from} durationInFrames={T.hook.dur}>
        <Hook t={t} dur={T.hook.dur} />
      </Sequence>
      <Sequence from={T.phone.from} durationInFrames={T.phone.dur}>
        <Phone t={t} lang={lang} dur={T.phone.dur} stampAt={T.phone.stamp} />
      </Sequence>
      <Sequence from={T.play.from} durationInFrames={T.play.dur}>
        <Play t={t} dur={T.play.dur} />
      </Sequence>
      <Sequence from={T.outro.from} durationInFrames={T.outro.dur}>
        <Outro t={t} slam={T.outro.slam} yallaAt={T.outro.yalla} />
      </Sequence>
      {voice.map((v, i) => (
        <Sequence key={`v${i}`} from={v.from} durationInFrames={v.len + 10}>
          <Audio src={staticFile(v.src)} volume={1} />
        </Sequence>
      ))}
      {sfx.map((x, i) => (
        <Sequence key={`s${i}`} from={Math.max(0, x.from)} durationInFrames={x.dur ?? 45}>
          <Audio src={staticFile(x.src)} volume={x.volume} />
        </Sequence>
      ))}
      {bgm ? (
        <Audio
          src={staticFile('bgm/house-vibez.mp3')}
          volume={(fr) => 0.3 * duck(fr) * interpolate(fr, [0, 12, T.total - 40, T.total], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
        />
      ) : null}
    </AbsoluteFill>
  );
};
