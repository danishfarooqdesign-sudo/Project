import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import ScaleBox from './ScaleBox.jsx';
import { Reveal, Stagger, StaggerItem, EASE_OUT_EXPO } from './motion.jsx';
import './Recordings.css';

const A = '/assets/recordings/';

const FEATURES = [
  ['video', 'Auto record & share', 'Switch on auto-record and the replay is shared automatically when the stream ends.'],
  ['doc', 'Transcripts on demand', 'Turn transcripts on per stream so every session is easy to search and quote.'],
  ['share', 'Reuse everywhere', 'Attach recordings to course lessons and community spaces, or rename and share them from one list.'],
];

const ROWS = [
  { thumbs: ['thumb-launch.png', 'thumb-launch-2.png'], bg: '#295cd9', title: 'Launch Week Q&A', meta: '42 min · Recorded today', shared: 128 },
  { thumbs: ['thumb-module.png'], bg: '#734ad9', title: 'Module 3: Pricing your offer', meta: '58 min · Course lesson', shared: 64 },
  { thumbs: ['thumb-members.png'], bg: '#0d9487', title: 'Members-only coaching call', meta: '61 min · Community', shared: 37 },
];

const TRANSCRIPT = '“…so the first thing I’d change about your pricing page is the anchor price at the top.”';

function SharedCount({ to, start, delay }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now() + delay * 1000;
    const tick = (now) => {
      const p = Math.min(1, Math.max(0, (now - t0) / 1200));
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to, delay]);
  return <>Shared with {v}</>;
}

function TypedTranscript({ start }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= TRANSCRIPT.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [start]);
  return (
    <p className="transcript__text">
      {TRANSCRIPT.slice(0, n)}
      {n < TRANSCRIPT.length && <span className="caret caret--light" />}
    </p>
  );
}

export default function Recordings() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <section className="rec">
      <div className="rec__copy">
        <Reveal as="h2" className="rec__title">Every session recorded, shared and reused.</Reveal>
        <Reveal as="p" className="rec__sub" delay={0.1}>
          Turn every live stream into content that keeps working. Recordings and transcripts land in one list, ready
          to share with your audience the moment you go offline.
        </Reveal>
        <Stagger className="rec__features" stagger={0.1} delay={0.2}>
          {FEATURES.map(([icon, title, body]) => (
            <StaggerItem key={title} className="rec-feature">
              <span className="rec-feature__icon">
                <img src={A + icon + '.svg'} alt="" width="20" height="20" />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <Reveal className="rec__visual" x={50} y={0} duration={0.9}>
        <ScaleBox width={600} height={534}>
          <div className="rec-backdrop" ref={ref}>
            <motion.div
              className="rec-mock"
              initial={{ y: 120 }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 1, ease: EASE_OUT_EXPO }}
            >
              <div className="rec-mock__head">
                <span className="rec-mock__title">Recordings</span>
                <span className="flex-spacer" />
                <span className="rec-mock__count">3 recordings</span>
              </div>

              {ROWS.map((r, i) => (
                <motion.div
                  key={r.title}
                  className="rec-row"
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.12, duration: 0.5, ease: EASE_OUT_EXPO }}
                  whileHover={{ backgroundColor: '#f8fbff' }}
                >
                  <div className="rec-row__thumb" style={{ background: r.bg }}>
                    {r.thumbs.map((t) => (
                      <img key={t} src={A + t} alt="" />
                    ))}
                  </div>
                  <div className="rec-row__text">
                    <span className="rec-row__title">{r.title}</span>
                    <span className="rec-row__meta">{r.meta}</span>
                  </div>
                  <span className="flex-spacer" />
                  <span className="shared-pill">
                    <img src={A + 'users.svg'} alt="" width="11" height="11" />
                    <SharedCount to={r.shared} start={inView} delay={0.5 + i * 0.12} />
                  </span>
                  <img src={A + 'more.svg'} alt="More" width="15" height="15" />
                </motion.div>
              ))}

              <div className="rec-mock__bottom">
                <motion.div
                  className="stream-options"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.75, duration: 0.5 }}
                >
                  <span className="stream-options__title">Stream options</span>
                  {['Auto record stream', 'Share recording automatically', 'Enable transcript'].map((t, i) => (
                    <div key={t} className="mini-toggle">
                      <span>{t}</span>
                      <motion.span
                        className="mini-switch"
                        initial={{ backgroundColor: '#d1d5db' }}
                        animate={inView ? { backgroundColor: '#008dff' } : {}}
                        transition={{ delay: 1 + i * 0.2, duration: 0.25 }}
                      >
                        <motion.span
                          className="mini-switch__knob"
                          initial={{ x: 0 }}
                          animate={inView ? { x: 14.9 } : {}}
                          transition={{ delay: 1 + i * 0.2, type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </motion.span>
                    </div>
                  ))}
                </motion.div>
                <motion.div
                  className="transcript"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.85, duration: 0.5 }}
                >
                  <div className="transcript__head">
                    <img src={A + 'transcript.svg'} alt="" width="13" height="13" />
                    Transcript
                  </div>
                  <TypedTranscript start={inView} />
                  <span className="transcript__by">Sarah Mitchell · 00:12:48</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </ScaleBox>
      </Reveal>
    </section>
  );
}
