import { useEffect, useState } from 'react';
import { motion, animate } from 'framer-motion';
import ScaleBox from './ScaleBox.jsx';
import AnimatedButton from './AnimatedButton.jsx';
import { EASE_OUT_EXPO } from './motion.jsx';
import './Hero.css';

const A = '/assets/hero/';

const TITLE = ['Go', 'Live', '&', 'Engage', 'Grow', 'Your', 'Audience', 'Live'];

const CONTROLS = [
  { icon: 'ctl-mic.svg', label: 'Mute' },
  { icon: 'ctl-cam.svg', label: 'Camera' },
  { icon: 'ctl-cc.svg', label: 'Captions' },
  { icon: 'ctl-share.svg', label: 'Share screen' },
];

const tileIn = (i) => ({
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  transition: { delay: 0.9 + i * 0.1, duration: 0.6, ease: EASE_OUT_EXPO },
});

function NameTag({ icon, name, style }) {
  return (
    <div className="name-tag" style={style}>
      <img src={A + icon} alt="" width="11" height="11" />
      <span>{name}</span>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__grid" aria-hidden />

      <div className="hero__copy">
        <h1 className="hero__title">
          {TITLE.map((w, i) => (
            <motion.span
              key={i}
              className="hero__word"
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.7, ease: EASE_OUT_EXPO }}
            >
              {w}{' '}
            </motion.span>
          ))}
        </h1>
        <motion.p
          className="hero__sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          Host live classes, coaching calls and events in one place. Chat, share your screen, record every
          session and invite anyone with a single link.
        </motion.p>
        <motion.div
          className="hero__ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          <AnimatedButton variant="blue" className="hero__cta">Start 14 Day Free Trial</AnimatedButton>
          <a href="#" className="btn btn--outline">
            <img src={A + 'icon-play.svg'} alt="" width="14" height="14" />
            Watch Demo
          </a>
        </motion.div>
      </div>

      <ScaleBox width={1200} height={600} className="hero__stage-wrap">
        <motion.div
          className="call"
          initial={{ opacity: 0, y: 80, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: EASE_OUT_EXPO }}
        >
          <div className="call__main">
            <motion.img
              className="call__presenter"
              src={A + 'presenter.png'}
              alt="Ethan presenting"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 1.6, ease: EASE_OUT_EXPO }}
            />
            <div className="call__blend call__blend--l" />
            <div className="call__blend call__blend--r" />
            <div className="call__scrim" />

            <div className="presenter-tag">
              <span className="dot dot--green" />
              Ethan presenting
            </div>

            <div className="live-badges">
              <div className="badge badge--live">
                <span className="dot dot--white dot--pulse" />
                LIVE
              </div>
              <div className="badge badge--dim">
                <img src={A + 'icon-eye.svg'} alt="" width="14" height="14" />
                <Counter to={128} /> watching
              </div>
            </div>

            <motion.div
              className="controls"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6, ease: EASE_OUT_EXPO }}
            >
              {CONTROLS.map((c) => (
                <button key={c.label} className="control" aria-label={c.label}>
                  <img src={A + c.icon} alt="" width="20" height="20" />
                </button>
              ))}
              <button className="control control--end" aria-label="End call">
                <img src={A + 'ctl-end.svg'} alt="" width="20" height="20" />
              </button>
            </motion.div>
          </div>

          <div className="call__tiles">
            <motion.div className="tile tile--active" {...tileIn(0)}>
              <div className="tile__layer">
                <img src={A + 'brie.png'} alt="" style={{ height: '182.57%', top: '-6.51%' }} />
              </div>
              <div className="tile__layer">
                <img src={A + 'brie-1.png'} alt="" style={{ height: '244.91%', top: '-37.67%' }} />
              </div>
              <NameTag icon="icon-mic.svg" name="Sophie" style={{ left: 5, top: 93 }} />
            </motion.div>

            <motion.div className="tile" style={{ background: '#c5d5e2' }} {...tileIn(1)}>
              <div className="tile__layer">
                <img src={A + 'marcus.png'} alt="" style={{ height: '244.8%', top: '-33.48%' }} />
              </div>
              <div className="tile__layer">
                <img
                  src={A + 'marcus-1.png'}
                  alt=""
                  style={{ height: '170.04%', top: '-14.6%', left: '-6.03%', width: '112.06%' }}
                />
              </div>
              <NameTag icon="icon-mic-off.svg" name="Jordan" />
            </motion.div>

            <motion.div className="tile" {...tileIn(2)}>
              <img className="tile__cover" src={A + 'tida.png'} alt="" />
              <NameTag icon="icon-mic.svg" name="Priya" />
            </motion.div>

            <motion.div className="tile" {...tileIn(3)}>
              <div className="tile__layer">
                <img src={A + 'felix.png'} alt="" style={{ height: '204.25%', top: '-23.54%' }} />
              </div>
              <NameTag icon="icon-mic.svg" name="Kwame" />
              <motion.div
                className="raised-hand"
                animate={{ rotate: [0, -14, 10, -8, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2.2 }}
              >
                <img src={A + 'icon-hand.svg'} alt="Raised hand" width="15" height="15" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating co-host card */}
        <motion.div
          className="float-participant-wrap"
          initial={{ opacity: 0, x: -60, rotate: -12 }}
          animate={{ opacity: 1, x: 0, rotate: -5 }}
          transition={{ delay: 1.1, duration: 0.9, ease: EASE_OUT_EXPO }}
        >
          <motion.div
            className="float-participant"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="tile__layer">
              <img src={A + 'claire.png'} alt="" style={{ height: '136.36%', top: '-0.17%', left: '-1.16%' }} />
            </div>
            <div className="tile__layer">
              <img src={A + 'claire-1.png'} alt="" style={{ height: '204.55%', top: '-6.52%', left: '-1.4%' }} />
            </div>
            <NameTag icon="icon-mic-claire.svg" name="Claire · Co-host" style={{ left: 8, top: 135, padding: '4px 9px' }} />
          </motion.div>
        </motion.div>

        {/* Chat bubble */}
        <motion.div
          className="chat-bubble-wrap"
          initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: 4 }}
          transition={{ delay: 1.5, type: 'spring', stiffness: 220, damping: 16 }}
        >
          <motion.div
            className="chat-bubble"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          >
            <div className="chat-bubble__head">
              <img src={A + 'avatar-priya.png'} alt="" width="22" height="22" />
              <span>Priya</span>
            </div>
            <p>
              Hey everyone, we have something important to share, <span>but let’s start…</span>
            </p>
          </motion.div>
        </motion.div>

        {/* New messages pill */}
        <motion.div
          className="chat-count"
          initial={{ opacity: 0, y: -16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.8, type: 'spring', stiffness: 260, damping: 18 }}
        >
          <img src={A + 'icon-chat.svg'} alt="" width="15" height="15" />
          24 new messages
        </motion.div>
      </ScaleBox>
    </section>
  );
}

/** Counts up from 0 once mounted. */
function Counter({ to }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const c = animate(0, to, { duration: 1.6, delay: 0.9, ease: 'easeOut', onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [to]);
  return <span>{v}</span>;
}
