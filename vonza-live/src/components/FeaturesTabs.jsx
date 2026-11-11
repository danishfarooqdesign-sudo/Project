import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, EASE_OUT_EXPO } from './motion.jsx';
import AnimatedButton from './AnimatedButton.jsx';
import './FeaturesTabs.css';

const A = '/assets/features/';

// Only "Schedule" has content in the Figma design. The other tabs reuse the
// layout with placeholder copy — replace with the real content when designed.
const TABS = [
  {
    id: 'schedule',
    label: 'Schedule',
    title: 'Schedule Streams Your Audience Won’t Miss',
    points: [
      'Set the date, time, timezone and duration',
      'Run multi-day events for courses and series',
      'Send reminder emails to invitees automatically',
    ],
  },
  {
    id: 'live',
    label: 'Go Live Now',
    title: 'Go Live Instantly, No Setup Needed',
    points: ['Start a stream in one click', 'Invite co-hosts on the fly', 'Share your screen in seconds'],
  },
  {
    id: 'invites',
    label: 'Invites',
    title: 'Invite Anyone With a Single Link',
    points: ['Share a permanent room link', 'Email invites with calendar files', 'Track who has joined'],
  },
  {
    id: 'privacy',
    label: 'Privacy',
    title: 'Keep Every Session Private and Secure',
    points: ['Public, private or password protected', 'Waiting room for approvals', 'Lock the room at any time'],
  },
  {
    id: 'recordings',
    label: 'Recordings',
    title: 'Record Every Session Automatically',
    points: ['Auto-record when you go live', 'Transcripts on every recording', 'Reuse recordings in your courses'],
  },
];

function Field({ label, icon, value }) {
  return (
    <div className="field">
      <span className="field__label">{label}</span>
      <div className="field__box">
        <img src={A + icon} alt="" width="16" height="16" />
        <span>{value}</span>
      </div>
    </div>
  );
}

function OptionRow({ icon, text, action, actionIcon }) {
  return (
    <div className="option-row">
      <div className="option-row__icon">
        <img src={A + icon} alt="" width="16" height="16" />
      </div>
      <span className="option-row__text">{text}</span>
      <span className="option-row__spacer" />
      <button className="option-row__action">
        {action}
        {actionIcon && <img src={A + actionIcon} alt="" width="14" height="14" />}
      </button>
    </div>
  );
}

function ScheduleMockup() {
  const [multiDay, setMultiDay] = useState(true);
  return (
    <div className="schedule-mock">
      <div className="schedule-mock__head">
        <span className="schedule-mock__title">Schedule stream</span>
        <span className="option-row__spacer" />
        <button className="cohost-btn">
          <img src={A + 'plus.svg'} alt="" width="14" height="14" />
          Add co-host
        </button>
      </div>
      <span className="schedule-mock__caption">Stream details</span>
      <Field label="Title" icon="cal.svg" value="Launch Week Q&A" />
      <div className="field-row">
        <Field label="Date" icon="cal.svg" value="Thu, 05 Nov 2026" />
        <Field label="Time" icon="clock.svg" value="6:00 PM" />
      </div>
      <div className="field-row">
        <Field label="Timezone" icon="globe.svg" value="Asia/Karachi" />
        <Field label="Duration" icon="timer.svg" value="60 minutes" />
      </div>
      <div className="toggle-row">
        <span>Multi-day event</span>
        <button
          className={`switch ${multiDay ? 'is-on' : ''}`}
          role="switch"
          aria-checked={multiDay}
          onClick={() => setMultiDay((v) => !v)}
        >
          <motion.span className="switch__knob" layout transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
        </button>
      </div>
      <div className="schedule-mock__actions">
        <button className="mini-btn mini-btn--ghost">Cancel</button>
        <button className="mini-btn mini-btn--primary">Schedule</button>
      </div>
      <OptionRow icon="mail.svg" text="Reminder email · 1 day before" action="Edit" />
      <OptionRow icon="users.svg" text="3 invitees, 1 co-host" action="Manage" />
      <OptionRow icon="link.svg" text="vonza.net/streamings/launch-week" action="Copy link" actionIcon="copy.svg" />
    </div>
  );
}

export default function FeaturesTabs() {
  const [active, setActive] = useState(TABS[0].id);
  const tab = TABS.find((t) => t.id === active);

  return (
    <section className="features">
      <Reveal as="h2" className="section-title features__title">
        Everything You Need to Go Live,
        <br />
        All in One Place
      </Reveal>

      <Reveal className="tabs" delay={0.1} role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={t.id === active}
            className={`tabs__tab ${t.id === active ? 'is-active' : ''}`}
            onClick={() => setActive(t.id)}
          >
            {t.id === active && (
              <motion.span className="tabs__pill" layoutId="tab-pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
            )}
            <span className="tabs__label">{t.label}</span>
          </button>
        ))}
      </Reveal>

      <Reveal className="showcase" delay={0.15} y={40}>
        <div className="showcase__copy">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id}
              className="showcase__copy-inner"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            >
              <h3 className="showcase__title">{tab.title}</h3>
              <ul className="checklist">
                {tab.points.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.35 }}
                  >
                    <span className="checklist__check">
                      <img src={A + 'check.svg'} alt="" width="12" height="12" />
                    </span>
                    {p}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
          <AnimatedButton variant="blue" style={{ minWidth: 196 }}>Start 14 Day Free Trial</AnimatedButton>
        </div>

        <motion.div
          className="showcase__backdrop"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.25, duration: 0.9, ease: EASE_OUT_EXPO }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            >
              <ScheduleMockup />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </Reveal>
    </section>
  );
}
