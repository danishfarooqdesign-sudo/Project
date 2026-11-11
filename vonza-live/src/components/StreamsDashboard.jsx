import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScaleBox from './ScaleBox.jsx';
import { EASE_OUT_EXPO } from './motion.jsx';
import './StreamsDashboard.css';

const A = '/assets/streams/';

/*
 * Timings come from the Figma prototype's 4s timeline (times × 4s).
 * In Figma the timeline loops; on the page it plays once when the section
 * scrolls into view, and the two "attention" pulses keep repeating.
 */
const fadeUp = (inView, { y = 8, x = 0, delay, duration = 0.4, ease = 'easeOut' }) => ({
  initial: { opacity: 0, y, x },
  animate: inView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x },
  transition: { delay, duration, ease },
});

const TABS = ['All streams', 'Scheduled streams', 'Personal room', 'Recordings', 'Settings'];

const CARDS = [
  {
    tags: [
      { label: 'LIVE', bg: '#fee2e2', color: '#dc2626' },
      { label: 'RECORDING', bg: '#f7f9fc', color: '#6b7280' },
    ],
    title: 'Launch Week Q&A',
    time: '6:00 PM',
    meta: 'Today · 128 watching',
    action: 'Join Stream',
    primary: true,
    live: true,
  },
  {
    tags: [
      { label: 'SCHEDULED', bg: '#eef4ff', color: '#008dff' },
      { label: 'PENDING', bg: '#eef4ff', color: '#008dff' },
    ],
    title: 'Weekly coaching call',
    time: '12:00 PM',
    meta: 'Aug 20 – Dec 30, 2026',
    action: 'Start Stream',
  },
  {
    tags: [
      { label: 'ENDED', bg: '#e8f7ee', color: '#16a34a' },
      { label: 'RECORDED', bg: '#f7f9fc', color: '#6b7280' },
    ],
    title: 'Module 3: Pricing your offer',
    time: '4:30 PM',
    meta: 'Oct 28, 2026 · 58 min',
    action: 'View Recording',
  },
];

const CALLOUTS = [
  ['callout-filter', 'Filter and search', 'Narrow by date range, search by title and sort newest or oldest.', 277],
  ['callout-cal', 'Live, scheduled and past', 'Status tags show what is live, pending, ended or recorded.', 251],
  ['callout-sparkle', 'Minutes at a glance', 'Your remaining streaming minutes always sit in the top bar.', 272],
];

const pulse = (scale, delay) => ({
  animate: { scale: [1, scale, 1] },
  transition: { delay, duration: 0.55, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3.45 },
});

function StreamCard({ card, inView, delay }) {
  return (
    <motion.div
      className="stream-card"
      {...fadeUp(inView, { y: 32, delay, duration: 0.55 })}
      whileHover={{ y: -4, boxShadow: '0 18px 36px -12px rgba(16,24,40,0.16)' }}
    >
      <div className="stream-card__tags">
        {card.tags.map((t) => (
          <span key={t.label} className="stream-tag" style={{ background: t.bg, color: t.color }}>
            {card.live && t.label === 'LIVE' && <span className="stream-tag__dot" />}
            {t.label}
          </span>
        ))}
        <span className="flex-spacer" />
        <img src={A + 'more.svg'} alt="More" width="19.55" height="19.55" />
      </div>
      <span className="stream-card__title">{card.title}</span>
      <div className="stream-card__host">
        <img src={A + 'avatar-oliver.png'} alt="" width="26" height="26" />
        Oliver Bennett
      </div>
      <div className="stream-card__divider" />
      <div className="stream-card__footer">
        <div className="stream-card__meta">
          <span className="stream-card__tz">Timezone: Karachi</span>
          <span className="stream-card__time">{card.time}</span>
          <span className="stream-card__when">{card.meta}</span>
        </div>
        <span className="flex-spacer" />
        <button className={`stream-card__action ${card.primary ? 'is-primary' : ''}`}>{card.action}</button>
      </div>
    </motion.div>
  );
}

export default function StreamsDashboard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section className="streams" ref={ref}>
      <div className="streams__head">
        <motion.h2 className="section-title streams__title" {...fadeUp(inView, { y: 24, delay: 0, duration: 0.6 })}>
          Every stream, organized in one place
        </motion.h2>
        <motion.p className="streams__sub" {...fadeUp(inView, { y: 20, delay: 0.15, duration: 0.6 })}>
          See live, scheduled and past streams side by side. Filter by date, search, sort and start any stream in a
          click.
        </motion.p>
      </div>

      <ScaleBox width={1200} height={680} className="streams__showcase-wrap">
        <div className="device-showcase">
          <motion.img
            className="glow glow--violet"
            src={A + 'glow-violet.svg'}
            alt=""
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 1.4, ease: 'easeOut' }}
          />
          <motion.img
            className="glow glow--amber"
            src={A + 'glow-amber.svg'}
            alt=""
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 1.4, ease: 'easeOut' }}
          />

          <motion.div
            className="dash-wrap"
            initial={{ opacity: 0, y: 160 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.35,
              y: { delay: 0.35, duration: 1, ease: EASE_OUT_EXPO },
              opacity: { delay: 0.35, duration: 0.8, ease: 'easeOut' },
            }}
          >
            <div className="dash-screen">
              <div className="dash">
                <motion.div className="dash__header" {...fadeUp(inView, { y: -10, delay: 0.85, duration: 0.45 })}>
                  <img src={A + 'vonza-mark.svg'} alt="" width="30" height="30" />
                  <span className="dash__brand">VONZA</span>
                  <span className="flex-spacer" />
                  <motion.div className="minutes-left" {...(inView ? pulse(1.06, 2.5) : {})}>
                    <img src={A + 'sparkle.svg'} alt="" width="15.2" height="15.2" />
                    10K minutes left
                  </motion.div>
                </motion.div>

                <div className="dash__tabs">
                  {TABS.map((t, i) => (
                    <motion.span
                      key={t}
                      className={`dash__tab ${i === 0 ? 'is-active' : ''}`}
                      {...fadeUp(inView, { delay: 1 + i * 0.06 })}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>

                <div className="dash__toolbar">
                  <motion.button className="dash-btn" {...fadeUp(inView, { delay: 1.15 })}>
                    <img src={A + 'calendar.svg'} alt="" width="16.3" height="16.3" />
                    Nov 01, 2026 – Nov 30, 2026
                  </motion.button>
                  <span className="flex-spacer" />
                  <motion.label className="dash-search" {...fadeUp(inView, { delay: 1.21 })}>
                    <img src={A + 'search.svg'} alt="" width="16.3" height="16.3" />
                    <input placeholder="Search" aria-label="Search streams" />
                  </motion.label>
                  <motion.button className="dash-btn dash-btn--icon" aria-label="Filter" {...fadeUp(inView, { delay: 1.27 })}>
                    <img src={A + 'filter.svg'} alt="" width="17.4" height="17.4" />
                  </motion.button>
                  <motion.button className="dash-btn" {...fadeUp(inView, { delay: 1.33 })}>
                    <img src={A + 'sort.svg'} alt="" width="16.3" height="16.3" />
                    Newest
                    <img src={A + 'chevron.svg'} alt="" width="15.2" height="15.2" />
                  </motion.button>
                  <motion.div {...fadeUp(inView, { delay: 1.39 })}>
                    <motion.button className="dash-btn dash-btn--primary" {...(inView ? pulse(1.07, 2.8) : {})}>
                      <img src={A + 'broadcast.svg'} alt="" width="16.3" height="16.3" />
                      Go Live
                      <img src={A + 'chevron-white.svg'} alt="" width="15.2" height="15.2" />
                    </motion.button>
                  </motion.div>
                </div>

                <motion.span className="dash__section" {...fadeUp(inView, { y: 0, x: -12, delay: 1.4 })}>
                  All streams
                </motion.span>

                <div className="dash__cards">
                  {CARDS.map((c, i) => (
                    <StreamCard key={c.title} card={c} inView={inView} delay={1.5 + i * 0.15} />
                  ))}
                </div>

                <motion.div className="dash__pagination" {...fadeUp(inView, { delay: 2.05 })}>
                  <button className="dash-btn dash-btn--sm">
                    10 / page
                    <img src={A + 'chevron-sm.svg'} alt="" width="13" height="13" />
                  </button>
                  <span>Showing 1–3 of 3</span>
                </motion.div>
              </div>
              <div className="dash__home">
                <span />
              </div>
            </div>
          </motion.div>
        </div>
      </ScaleBox>

      <div className="callouts">
        {CALLOUTS.map(([icon, title, body, w], i) => (
          <motion.div key={title} className="callout" {...fadeUp(inView, { y: 20, delay: 2.1 + i * 0.12, duration: 0.5 })}>
            <span className="callout__icon">
              <img src={A + icon + '.svg'} alt="" width="20" height="20" />
            </span>
            <div className="callout__text">
              <h3>{title}</h3>
              <p style={{ maxWidth: w }}>{body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
