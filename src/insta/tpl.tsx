// Reusable, data-driven post layouts for the "more posts" series (more.tsx). Every layout takes v = 'green' | 'light'
// so the posting order can keep the profile grid a checkerboard. No dates or day numbers on these images.
import React from 'react';
import {C} from '../theme';
import {Ar, Bars, Button, Card, Grad, Icon, IconBadge, Post, Speaker, V, ink, sub, useLang, useNum, useT} from './kit';

export type Tx = {bn: string; en: string};
export type Ph = {ar: string; tr: Tx; m: Tx};
export const T = (bn: string, en: string): Tx => ({bn, en});
export const P = (ar: string, trBn: string, trEn: string, mBn: string, mEn: string): Ph => ({ar, tr: T(trBn, trEn), m: T(mBn, mEn)});
export const useX = () => {
  const l = useLang();
  return (x: Tx) => x[l];
};

const Hi: React.FC<{v: V; children: React.ReactNode}> = ({v, children}) =>
  v === 'green' ? <span style={{color: C.mint}}>{children}</span> : <Grad>{children}</Grad>;

const Title: React.FC<{v: V; a: Tx; b?: Tx; size?: number; br?: boolean}> = ({v, a, b, size = 66, br = true}) => {
  const x = useX();
  return (
    <div style={{textAlign: 'center', fontSize: size, fontWeight: 700, lineHeight: 1.15}}>
      {x(a)}
      {b ? (
        <>
          {br ? <br /> : ' '}
          <Hi v={v}>{x(b)}</Hi>
        </>
      ) : null}
    </div>
  );
};

const Note: React.FC<{v: V; t?: Tx; mt?: number; center?: boolean}> = ({v, t, mt = 12, center = true}) => {
  const x = useX();
  return t ? <div style={{textAlign: center ? 'center' : 'left', fontSize: 33, fontWeight: 500, color: sub(v), marginTop: mt}}>{x(t)}</div> : null;
};

const Foot: React.FC<{v: V; t?: Tx; icon?: string}> = ({v, t, icon = 'chat'}) => {
  const x = useX();
  if (!t) return null;
  const col = v === 'light' ? C.green7 : '#fff';
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, fontSize: 34, fontWeight: 700, color: col, marginTop: 22}}>
      <Icon name={icon} size={42} color={col} stroke={2.2} />
      {x(t)}
    </div>
  );
};

export const TipBox: React.FC<{v: V; t: Tx; ar?: string; mt?: number}> = ({v, t, ar, mt = 24}) => {
  const x = useX();
  const light = v === 'light';
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        borderRadius: 30,
        padding: '16px 30px',
        marginTop: mt,
        background: light ? C.g50 : 'rgba(255,255,255,0.16)',
        border: light ? `2px solid ${C.mint}` : '2px solid rgba(255,255,255,0.32)',
        color: light ? C.body : '#fff',
      }}
    >
      <Icon name="bulb" size={46} color={light ? C.green : '#fff'} stroke={2.2} />
      <span style={{fontSize: 32, fontWeight: 600, lineHeight: 1.3, flex: 1}}>{x(t)}</span>
      {ar ? (
        <Ar size={44} color={light ? C.green7 : '#fff'} style={{lineHeight: 1.3, whiteSpace: 'nowrap'}}>
          {ar}
        </Ar>
      ) : null}
    </div>
  );
};

const Letter: React.FC<{k: string}> = ({k}) => (
  <div style={{width: 76, height: 76, borderRadius: 22, background: C.g50, border: `2px solid ${C.mint}`, color: C.green7, fontSize: 42, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
    {k}
  </div>
);

// ───────────── Carousel cover / end ─────────────
export const Cover: React.FC<{v: V; tag: Tx; icon: string; kicker: Tx; a: Tx; b: Tx; ars?: string[]}> = ({v, tag, icon, kicker, a, b, ars}) => {
  const x = useX();
  const t = useT();
  const col = v === 'light' ? C.green7 : '#fff';
  return (
    <Post v={v} tag={x(tag)}>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
        <IconBadge name={icon} size={170} v={v} solid={v === 'light'} />
        <div style={{fontSize: 44, fontWeight: 600, color: sub(v), marginTop: 36}}>{x(kicker)}</div>
        <div style={{fontSize: 88, fontWeight: 700, lineHeight: 1.12, marginTop: 10}}>
          {x(a)}
          <br />
          <Hi v={v}>{x(b)}</Hi>
        </div>
        {ars ? (
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, marginTop: 46, maxWidth: 900}}>
            {ars.map((s) => (
              <Card key={s} style={{padding: '2px 28px', borderRadius: 26, border: 'none'}}>
                <Ar size={46} color={C.green7} style={{lineHeight: 1.5}}>
                  {s}
                </Ar>
              </Card>
            ))}
          </div>
        ) : null}
        <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 50, fontSize: 40, fontWeight: 700, color: col}}>
          {t('সোয়াইপ করো', 'Swipe')} <Icon name="arrowR" size={46} color={col} stroke={2.6} />
        </div>
      </div>
    </Post>
  );
};

export const EndSlide: React.FC<{a: Tx; b: Tx; note: Tx}> = ({a, b, note}) => {
  const x = useX();
  const t = useT();
  return (
    <Post v="green" tag={t('সেভ করো', 'Save this')}>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
        <Icon name="bookmark" size={130} color="#fff" fill="rgba(255,255,255,0.2)" stroke={2} />
        <div style={{fontSize: 80, fontWeight: 700, lineHeight: 1.15, marginTop: 30}}>
          {x(a)}
          <br />
          <span style={{color: C.mint}}>{x(b)}</span>
        </div>
        <div style={{fontSize: 42, fontWeight: 500, marginTop: 34, color: 'rgba(255,255,255,0.9)', lineHeight: 1.4, maxWidth: 820}}>{x(note)}</div>
        <div style={{marginTop: 56}}>
          <Button dark size={50}>
            {t('ফ্রি শুরু করো', 'Start free')}
          </Button>
        </div>
        <div style={{fontSize: 50, fontWeight: 700, marginTop: 34}}>lahjio.com</div>
      </div>
    </Post>
  );
};

// ───────────── One phrase per slide (inside carousels) ─────────────
export const PhraseSlide: React.FC<{i: number; of: number; p: Ph; tip?: Tx; tipAr?: string}> = ({i, of, p, tip, tipAr}) => {
  const x = useX();
  const n = useNum();
  const size = p.ar.length > 13 ? 92 : p.ar.length > 9 ? 112 : 140;
  return (
    <Post v="light" tag={`${n(i)} / ${n(of)}`}>
      <div style={{flex: 1, display: 'flex', alignItems: 'center'}}>
        <Card style={{width: '100%', padding: '56px 46px', textAlign: 'center', borderRadius: 48, color: C.ink}}>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 26}}>
            <Speaker size={86} />
            <Bars h={60} color={C.teal} />
          </div>
          <Ar size={size} color={C.ink} style={{marginTop: 22}}>
            {p.ar}
          </Ar>
          <div style={{fontSize: 46, color: C.muted, fontWeight: 600}}>{x(p.tr)}</div>
          <div style={{height: 2, background: C.line, margin: '36px 0'}} />
          <div style={{fontSize: 74, fontWeight: 700, lineHeight: 1.15}}>
            <Grad>{x(p.m)}</Grad>
          </div>
        </Card>
      </div>
      {tip ? <TipBox v="light" t={tip} ar={tipAr} mt={10} /> : null}
    </Post>
  );
};

// ───────────── List of phrases ─────────────
const Row: React.FC<{v: V; p: Ph; big?: boolean}> = ({v, p, big}) => {
  const x = useX();
  const light = v === 'light';
  return (
    <div
      style={{
        flex: 1,
        maxHeight: big ? 250 : 200,
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        borderRadius: 30,
        padding: big ? '18px 40px' : '10px 32px',
        background: light ? '#fff' : 'rgba(255,255,255,0.16)',
        border: light ? `2px solid ${C.line}` : '2px solid rgba(255,255,255,0.3)',
        boxShadow: light ? '0 12px 28px rgba(15,23,42,0.06)' : 'none',
        color: light ? C.ink : '#fff',
      }}
    >
      <div style={{flex: 1, minWidth: 0}}>
        <div style={{fontSize: big ? 52 : 40, fontWeight: 700, lineHeight: 1.2}}>{x(p.m)}</div>
        <div style={{fontSize: big ? 34 : 28, fontWeight: 600, color: light ? C.muted : 'rgba(255,255,255,0.82)'}}>{x(p.tr)}</div>
      </div>
      <Ar size={big ? 74 : 54} color={light ? C.green7 : '#fff'} style={{lineHeight: 1.3, whiteSpace: 'nowrap'}}>
        {p.ar}
      </Ar>
    </div>
  );
};

export const ListPost: React.FC<{v: V; tag: string | [number, number]; icon: string; a: Tx; b?: Tx; note?: Tx; items: Ph[]; foot?: Tx}> = ({v, tag, icon, a, b, note, items, foot}) => {
  const x = useX();
  const n = useNum();
  return (
    <Post v={v} tag={typeof tag === 'string' ? tag : `${n(tag[0])} / ${n(tag[1])}`}>
      <div style={{display: 'flex', alignItems: 'center', gap: 28}}>
        <IconBadge name={icon} size={120} v={v} solid={v === 'light'} />
        <div style={{fontSize: 60, fontWeight: 700, lineHeight: 1.12}}>
          {x(a)}
          {b ? (
            <>
              <br />
              <Hi v={v}>{x(b)}</Hi>
            </>
          ) : null}
        </div>
      </div>
      <Note v={v} t={note} mt={18} center={false} />
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: items.length <= 3 ? 30 : 16, marginTop: 24}}>
        {items.map((p) => (
          <Row key={p.ar} v={v} p={p} big={items.length <= 3} />
        ))}
      </div>
      <Foot v={v} t={foot} />
    </Post>
  );
};

// ───────────── 2-column cheat sheet (8 items, optional colour swatch) ─────────────
export type GI = Ph & {sw?: string};
export const GridPost: React.FC<{v: V; tag: string; a: Tx; b: Tx; note?: Tx; items: GI[]}> = ({v, tag, a, b, note, items}) => {
  const x = useX();
  return (
    <Post v={v} tag={tag}>
      <Title v={v} a={a} b={b} size={68} br={false} />
      <Note v={v} t={note} />
      <div style={{flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridAutoRows: '1fr', gap: 16, marginTop: 30}}>
        {items.map((it) => (
          <div
            key={it.ar}
            style={{
              background: '#fff',
              borderRadius: 26,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '0 22px',
              color: C.ink,
              border: v === 'light' ? `2px solid ${C.line}` : 'none',
              boxShadow: v === 'light' ? '0 10px 24px rgba(15,23,42,0.06)' : '0 12px 26px rgba(4,47,46,0.2)',
            }}
          >
            {it.sw ? <div style={{width: 54, height: 54, borderRadius: 54, background: it.sw, border: '3px solid #e5e7eb', flexShrink: 0}} /> : null}
            <div style={{flex: 1, minWidth: 0}}>
              <div style={{fontSize: 33, fontWeight: 700, lineHeight: 1.15}}>{x(it.m)}</div>
              <div style={{fontSize: 25, fontWeight: 600, color: C.muted}}>{x(it.tr)}</div>
            </div>
            <Ar size={44} color={C.green7} style={{lineHeight: 1.2, whiteSpace: 'nowrap'}}>
              {it.ar}
            </Ar>
          </div>
        ))}
      </div>
    </Post>
  );
};

// ───────────── Quiz (A / B / C) with a word, a blank sentence or an icon sum on top ─────────────
export type Opt = {t?: Tx; ar?: string; tr?: Tx};
export const QuizPost: React.FC<{v: V; tag: string; a: Tx; b: Tx; top: React.ReactNode; hint?: Tx; opts: Opt[]; foot?: Tx}> = ({v, tag, a, b, top, hint, opts, foot}) => {
  const x = useX();
  return (
    <Post v={v} tag={tag}>
      <Title v={v} a={a} b={b} size={68} br={false} />
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 22}}>
        <Card style={{textAlign: 'center', padding: '26px 40px', borderRadius: 44, color: C.ink}}>
          {top}
          {hint ? <div style={{fontSize: 36, fontWeight: 600, color: C.muted, marginTop: 4}}>{x(hint)}</div> : null}
        </Card>
        {opts.map((o, i) => (
          <Card key={i} style={{display: 'flex', alignItems: 'center', gap: 28, padding: '16px 34px', borderRadius: 30, color: C.ink}}>
            <Letter k={'ABC'[i]} />
            {o.t ? <span style={{fontSize: 48, fontWeight: 600}}>{x(o.t)}</span> : null}
            {o.ar ? (
              <Ar size={54} color={C.green7} style={{lineHeight: 1.35}}>
                {o.ar}
              </Ar>
            ) : null}
            {o.tr ? <span style={{fontSize: 32, fontWeight: 600, color: C.muted}}>{x(o.tr)}</span> : null}
          </Card>
        ))}
      </div>
      <Foot v={v} t={foot ?? T('কমেন্টে A, B বা C লেখো', 'Comment A, B or C')} />
    </Post>
  );
};

export const WordTop: React.FC<{ar: string; tr: Tx}> = ({ar, tr}) => {
  const x = useX();
  return (
    <>
      <Ar size={170} color={C.ink} style={{lineHeight: 1.3}}>
        {ar}
      </Ar>
      <div style={{fontSize: 46, fontWeight: 600, color: C.muted}}>{x(tr)}</div>
    </>
  );
};

// parts read right to left; null = the blank
export const BlankTop: React.FC<{parts: (string | null)[]}> = ({parts}) => (
  <div style={{display: 'flex', direction: 'rtl', justifyContent: 'center', alignItems: 'center', gap: 22, padding: '10px 0'}}>
    {parts.map((p, i) =>
      p === null ? (
        <div key={i} style={{width: 210, height: 116, borderRadius: 26, border: `5px dashed ${C.green}`, background: C.g50, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 70, fontWeight: 700, color: C.green}}>
          ?
        </div>
      ) : (
        <Ar key={i} size={112} color={C.ink} style={{lineHeight: 1.3}}>
          {p}
        </Ar>
      ),
    )}
  </div>
);

export const IconsTop: React.FC<{icons: string[]}> = ({icons}) => {
  const sign = (s: string) => <span style={{fontSize: 90, fontWeight: 700, color: C.muted, lineHeight: 1}}>{s}</span>;
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 26, padding: '24px 0'}}>
      {icons.map((nm, i) => (
        <React.Fragment key={nm}>
          {i > 0 ? sign('+') : null}
          <IconBadge name={nm} size={170} solid />
        </React.Fragment>
      ))}
      {sign('=')}
      <div style={{width: 170, height: 170, borderRadius: 51, border: `5px dashed ${C.green}`, background: C.g50, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 110, fontWeight: 700, color: C.green}}>?</div>
    </div>
  );
};

// ───────────── This or that ─────────────
export type Side = {icon: string; ar: string; tr: Tx; m: Tx};
export const VersusPost: React.FC<{v: V; tag: string; a: Tx; b: Tx; l: Side; r: Side; foot: Tx}> = ({v, tag, a, b, l, r, foot}) => {
  const x = useX();
  const t = useT();
  return (
    <Post v={v} tag={tag}>
      <Title v={v} a={a} b={b} size={68} />
      <div style={{flex: 1, display: 'flex', alignItems: 'center', position: 'relative', marginTop: 20}}>
        {[l, r].map((s, i) => (
          <Card
            key={s.ar}
            style={{
              flex: 1,
              height: '88%',
              margin: i === 0 ? '0 14px 0 0' : '0 0 0 14px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: C.ink,
              padding: '30px 20px',
              border: 'none',
            }}
          >
            <IconBadge name={s.icon} size={150} solid={i === 0} v="light" />
            <Ar size={s.ar.length > 6 ? 74 : 104} color={C.ink} style={{marginTop: 28, lineHeight: 1.35}}>
              {s.ar}
            </Ar>
            <div style={{fontSize: 36, fontWeight: 600, color: C.muted}}>{x(s.tr)}</div>
            <div style={{fontSize: 52, fontWeight: 700, marginTop: 16, lineHeight: 1.15}}>
              <Grad>{x(s.m)}</Grad>
            </div>
          </Card>
        ))}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            width: 124,
            height: 124,
            borderRadius: 124,
            background: v === 'light' ? C.green : '#fff',
            color: v === 'light' ? '#fff' : C.green7,
            fontSize: 42,
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 12px 30px rgba(0,0,0,0.18)',
            border: v === 'light' ? '6px solid #fff' : `6px solid ${C.green}`,
          }}
        >
          {t('নাকি', 'OR')}
        </div>
      </div>
      <Foot v={v} t={foot} />
    </Post>
  );
};

// ───────────── Don't confuse these ─────────────
export const ConfusePost: React.FC<{v: V; tag: string; a: Tx; b: Tx; p1: Ph; p2: Ph; tip: Tx}> = ({v, tag, a, b, p1, p2, tip}) => {
  const x = useX();
  return (
    <Post v={v} tag={tag}>
      <Title v={v} a={a} b={b} size={66} />
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 10}}>
        {[p1, p2].map((p, i) => (
          <React.Fragment key={p.ar}>
            {i === 1 ? (
              <div style={{display: 'flex', justifyContent: 'center', margin: '-22px 0', position: 'relative', zIndex: 2}}>
                <div style={{width: 96, height: 96, borderRadius: 96, background: '#ef4444', color: '#fff', fontSize: 64, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '6px solid #fff', boxShadow: '0 10px 24px rgba(0,0,0,0.15)'}}>≠</div>
              </div>
            ) : null}
            <Card style={{display: 'flex', alignItems: 'center', gap: 34, padding: '50px 48px', borderRadius: 44, color: C.ink, border: 'none'}}>
              <div style={{minWidth: 290, textAlign: 'center'}}>
                <Ar size={150} color={i ? C.teal : C.green7} style={{lineHeight: 1.3}}>
                  {p.ar}
                </Ar>
              </div>
              <div style={{flex: 1}}>
                <div style={{fontSize: 68, fontWeight: 700, lineHeight: 1.15}}>{x(p.m)}</div>
                <div style={{fontSize: 42, fontWeight: 600, color: C.muted}}>{x(p.tr)}</div>
              </div>
            </Card>
          </React.Fragment>
        ))}
      </div>
      <TipBox v={v} t={tip} />
    </Post>
  );
};

// ───────────── Saudi manners: they say → you reply ─────────────
const SayCard: React.FC<{label: Tx; p: Ph; accent?: boolean}> = ({label, p, accent}) => {
  const x = useX();
  return (
    <div
      style={{
        borderRadius: 40,
        padding: '20px 40px 26px',
        textAlign: 'center',
        background: accent ? 'linear-gradient(135deg, #059669, #14b8a6)' : '#fff',
        color: accent ? '#fff' : C.ink,
        boxShadow: '0 16px 36px rgba(15,23,42,0.12)',
      }}
    >
      <div style={{fontSize: 28, fontWeight: 700, color: accent ? 'rgba(255,255,255,0.85)' : C.muted}}>{x(label)}</div>
      <Ar size={p.ar.length > 12 ? 76 : 92} color={accent ? '#fff' : C.green7} style={{lineHeight: 1.4}}>
        {p.ar}
      </Ar>
      <div style={{fontSize: 46, fontWeight: 700, lineHeight: 1.2}}>{x(p.m)}</div>
      <div style={{fontSize: 30, fontWeight: 600, color: accent ? 'rgba(255,255,255,0.85)' : C.muted}}>{x(p.tr)}</div>
    </div>
  );
};
export const CulturePost: React.FC<{v: V; tag: string; icon: string; when: Tx; say: Ph; reply: Ph; tip: Tx; tipAr?: string}> = ({v, tag, icon, when, say, reply, tip, tipAr}) => {
  const x = useX();
  const t = useT();
  return (
    <Post v={v} tag={tag}>
      <div style={{display: 'flex', alignItems: 'center', gap: 26}}>
        <IconBadge name={icon} size={110} v={v} solid={v === 'light'} />
        <div>
          <div style={{fontSize: 30, fontWeight: 600, color: sub(v)}}>{t('যখন…', 'When…')}</div>
          <div style={{fontSize: 46, fontWeight: 700, color: ink(v), lineHeight: 1.2}}>{x(when)}</div>
        </div>
      </div>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10, marginTop: 16}}>
        <SayCard label={T('ওরা বলে', 'They say')} p={say} />
        <div style={{display: 'flex', justifyContent: 'center', transform: 'rotate(180deg)'}}>
          <Icon name="arrowUp" size={56} color={v === 'light' ? C.green : '#fff'} stroke={2.8} />
        </div>
        <SayCard label={T('তুমি বলো', 'You reply')} p={reply} accent={v === 'light'} />
      </div>
      <TipBox v={v} t={tip} ar={tipAr} mt={20} />
    </Post>
  );
};

// ───────────── Myth vs fact ─────────────
export const MythPost: React.FC<{v: V; tag: string; myth: Tx; fact: Tx; ex?: [string, string]}> = ({v, tag, myth, fact, ex}) => {
  const x = useX();
  const t = useT();
  const head = (ok: boolean) => (
    <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
      <div style={{width: 70, height: 70, borderRadius: 70, background: ok ? C.green : '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Icon name={ok ? 'check' : 'x'} size={44} color="#fff" stroke={3.2} />
      </div>
      <span style={{fontSize: 40, fontWeight: 800, color: ok ? C.green7 : '#dc2626'}}>{ok ? t('আসল কথা', 'Fact') : t('ভুল ধারণা', 'Myth')}</span>
    </div>
  );
  return (
    <Post v={v} tag={tag}>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 26}}>
        <Card style={{padding: '34px 44px', borderRadius: 44, color: C.ink, border: 'none'}}>
          {head(false)}
          <div style={{fontSize: 56, fontWeight: 700, lineHeight: 1.2, marginTop: 20, color: '#64748b'}}>“{x(myth)}”</div>
        </Card>
        <Card style={{padding: '34px 44px', borderRadius: 44, color: C.ink, border: v === 'light' ? `4px solid ${C.mint}` : 'none'}}>
          {head(true)}
          <div style={{fontSize: 50, fontWeight: 700, lineHeight: 1.25, marginTop: 20}}>{x(fact)}</div>
          {ex ? (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30, marginTop: 22, background: C.g50, borderRadius: 26, padding: '6px 0'}}>
              <Ar size={64} color="#94a3b8" weight={600} style={{textDecoration: 'line-through', textDecorationColor: '#ef4444', textDecorationThickness: 4}}>
                {ex[0]}
              </Ar>
              <Icon name="arrowR" size={52} color={C.green} stroke={2.8} />
              <Ar size={70} color={C.green7}>
                {ex[1]}
              </Ar>
            </div>
          ) : null}
        </Card>
      </div>
      <Foot v={v} t={T('তুমি কি এটা ভাবতে? কমেন্টে বলো', 'Did you believe this? Tell us below')} />
    </Post>
  );
};

// ───────────── Conversation slide (story carousels) ─────────────
export type Line = {me: boolean; ar: string; tr: Tx; m: Tx};
export const ChatSlide: React.FC<{i: number; of: number; icon: string; title: Tx; them: Tx; lines: Line[]}> = ({i, of, icon, title, them, lines}) => {
  const x = useX();
  const t = useT();
  const n = useNum();
  return (
    <Post v="light" tag={`${n(i)} / ${n(of)}`}>
      <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
        <IconBadge name={icon} size={88} solid />
        <div style={{fontSize: 50, fontWeight: 700}}>{x(title)}</div>
      </div>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 34, marginTop: 10}}>
        {lines.map((b) => (
          <div key={b.ar} style={{display: 'flex', flexDirection: 'column', alignItems: b.me ? 'flex-end' : 'flex-start'}}>
            <div style={{fontSize: 30, fontWeight: 700, color: b.me ? C.green7 : C.muted, margin: '0 16px 8px'}}>{b.me ? t('তুমি', 'You') : x(them)}</div>
            <div
              style={{
                minWidth: 560,
                maxWidth: 900,
                padding: '14px 38px 20px',
                borderRadius: 40,
                borderBottomLeftRadius: b.me ? 40 : 10,
                borderBottomRightRadius: b.me ? 10 : 40,
                background: b.me ? 'linear-gradient(135deg, #059669, #14b8a6)' : '#fff',
                color: b.me ? '#fff' : C.ink,
                border: b.me ? 'none' : `2px solid ${C.line}`,
                boxShadow: '0 14px 30px rgba(15,23,42,0.10)',
                textAlign: b.me ? 'right' : 'left',
              }}
            >
              <Ar size={b.ar.length > 18 ? 60 : 74} color={b.me ? '#fff' : C.green7} style={{lineHeight: 1.4}}>
                {b.ar}
              </Ar>
              <div style={{fontSize: 42, fontWeight: 700, lineHeight: 1.2, marginTop: 4}}>{x(b.m)}</div>
              <div style={{fontSize: 31, fontWeight: 600, color: b.me ? 'rgba(255,255,255,0.85)' : C.muted}}>{x(b.tr)}</div>
            </div>
          </div>
        ))}
      </div>
    </Post>
  );
};

// ───────────── One word, many meanings ─────────────
export type Use = {label: Tx; ex: string; exTr: Tx; exM: Tx};
export const SpotlightPost: React.FC<{v: V; tag: string; ar: string; tr: Tx; uses: Use[]}> = ({v, tag, ar, tr, uses}) => {
  const x = useX();
  const light = v === 'light';
  return (
    <Post v={v} tag={tag}>
      <Title v={v} a={T('এক শব্দ,', 'One word,')} b={T('অনেক মানে', 'many meanings')} size={62} br={false} />
      <Card style={{marginTop: 24, padding: '14px 40px 22px', textAlign: 'center', borderRadius: 44, color: C.ink, border: 'none'}}>
        <Ar size={136} color={C.ink} style={{lineHeight: 1.35}}>
          {ar}
        </Ar>
        <div style={{fontSize: 42, fontWeight: 600, color: C.muted}}>{x(tr)}</div>
      </Card>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16, marginTop: 22}}>
        {uses.map((u) => (
          <div
            key={u.ex}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              borderRadius: 30,
              padding: '12px 32px',
              background: light ? '#fff' : 'rgba(255,255,255,0.16)',
              border: light ? `2px solid ${C.line}` : '2px solid rgba(255,255,255,0.3)',
              color: light ? C.ink : '#fff',
            }}
          >
            <div style={{flex: 1, minWidth: 0}}>
              <div style={{fontSize: 27, fontWeight: 800, color: light ? C.green7 : C.mint}}>{x(u.label)}</div>
              <div style={{fontSize: 38, fontWeight: 700, lineHeight: 1.2}}>{x(u.exM)}</div>
              <div style={{fontSize: 26, fontWeight: 600, color: light ? C.muted : 'rgba(255,255,255,0.82)'}}>{x(u.exTr)}</div>
            </div>
            <Ar size={50} color={light ? C.green7 : '#fff'} style={{lineHeight: 1.3, whiteSpace: 'nowrap'}}>
              {u.ex}
            </Ar>
          </div>
        ))}
      </div>
    </Post>
  );
};

// ───────────── App feature spotlight ─────────────
export const FeaturePost: React.FC<{v: V; icon: string; a: Tx; b: Tx; points: Tx[]}> = ({v, icon, a, b, points}) => {
  const x = useX();
  const t = useT();
  return (
    <Post v={v} tag={t('Lahjio অ্যাপ', 'Lahjio app')}>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
        <IconBadge name={icon} size={180} v={v} solid={v === 'light'} />
        <div style={{marginTop: 34}}>
          <Title v={v} a={a} b={b} size={74} />
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 20, marginTop: 44, width: 820, textAlign: 'left'}}>
          {points.map((p) => (
            <div key={p.en} style={{display: 'flex', alignItems: 'center', gap: 22, fontSize: 40, fontWeight: 600}}>
              <div style={{width: 56, height: 56, borderRadius: 56, background: v === 'light' ? C.green : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <Icon name="check" size={34} color={v === 'light' ? '#fff' : C.green} stroke={3.2} />
              </div>
              {x(p)}
            </div>
          ))}
        </div>
        <div style={{marginTop: 56}}>
          <Button dark={v === 'green'} size={46}>
            {t('ফ্রি শুরু করো', 'Start free')}
          </Button>
        </div>
        <div style={{fontSize: 44, fontWeight: 700, marginTop: 24}}>lahjio.com</div>
      </div>
    </Post>
  );
};

// ───────────── Follower milestone thank-you ─────────────
export const MilestonePost: React.FC<{v: V; count: string}> = ({v, count}) => {
  const t = useT();
  const n = useNum();
  return (
    <Post v={v} tag={t('ধন্যবাদ', 'Thank you')}>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
        <Icon name="heart" size={120} color={v === 'light' ? C.green : '#fff'} fill={v === 'light' ? C.mint : 'rgba(255,255,255,0.3)'} stroke={2} />
        <div style={{fontSize: 250, fontWeight: 800, lineHeight: 1.05, marginTop: 20}}>
          <Hi v={v}>{n(count)}</Hi>
        </div>
        <div style={{fontSize: 76, fontWeight: 700}}>{t('জন ফলোয়ার!', 'followers!')}</div>
        <Ar size={104} color={v === 'light' ? C.green7 : '#fff'} style={{marginTop: 30}}>
          شكراً لكم
        </Ar>
        <div style={{fontSize: 36, fontWeight: 600, color: sub(v)}}>{t('শুকরান লাকুম = তোমাদের সবাইকে ধন্যবাদ', 'shukran lakum = thank you all')}</div>
        <div style={{fontSize: 44, fontWeight: 700, marginTop: 44}}>{t('চলো একসাথে আরবি শিখি', "Let's keep learning Arabic together")}</div>
      </div>
    </Post>
  );
};
