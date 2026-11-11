import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Reveal, Stagger, StaggerItem } from './motion.jsx';
import AnimatedButton from './AnimatedButton.jsx';
import './HowItWorks.css';

const A = '/assets/how/';

function GoLiveCard() {
  const items = [
    ['Go live now', 'Start an instant stream'],
    ['Schedule stream', 'Pick a date and time'],
    ['Personal room', 'Open your permanent room'],
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % items.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="ui-card">
      <div className="mini-tabs">
        <span className="mini-tabs__tab is-active">All streams</span>
        <span className="mini-tabs__tab">Scheduled</span>
        <span className="mini-tabs__tab">Recordings</span>
      </div>
      <div className="golive-menu">
        {items.map(([t, s], i) => (
          <div key={t} className={`golive-menu__item ${i === active ? 'is-active' : ''}`}>
            {i === active && <motion.span layoutId="golive-hl" className="golive-menu__hl" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
            <span className="golive-menu__title">{t}</span>
            <span className="golive-menu__sub">{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypedValue({ text, start }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= text.length) clearInterval(t);
    }, 70);
    return () => clearInterval(t);
  }, [start, text]);
  return (
    <span>
      {text.slice(0, n)}
      <span className={`caret ${n >= text.length ? 'caret--done' : ''}`} />
    </span>
  );
}

function BasicsCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  return (
    <div className="ui-card" ref={ref}>
      <div className="field">
        <span className="field__label">Title</span>
        <div className="field__box">
          <img src={A + 'doc.svg'} alt="" width="22" height="22" style={{ margin: '-3px' }} />
          <TypedValue text="Launch Week Q&A" start={inView} />
        </div>
      </div>
      <div className="field">
        <span className="field__label">Visibility</span>
        <div className="field__box">
          <img src={A + 'globe.svg'} alt="" width="16" height="16" />
          <span>Public</span>
        </div>
      </div>
      <div className="field">
        <span className="field__label">Duration</span>
        <div className="field__box">
          <img src={A + 'timer.svg'} alt="" width="16" height="16" />
          <span>60 minutes</span>
        </div>
      </div>
    </div>
  );
}

function Toggle({ label, delay, start }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!start) return;
    const t = setTimeout(() => setOn(true), delay);
    return () => clearTimeout(t);
  }, [start, delay]);
  return (
    <div className="toggle-row">
      <span>{label}</span>
      <button className={`switch ${on ? 'is-on' : ''}`} role="switch" aria-checked={on} onClick={() => setOn((v) => !v)}>
        <motion.span className="switch__knob" layout transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
      </button>
    </div>
  );
}

function DetailsCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  return (
    <div className="ui-card" ref={ref}>
      {['Add co-host', 'Add invitee', 'Write reminder email…'].map((t) => (
        <button key={t} className="add-row">
          <img src={A + 'plus.svg'} alt="" width="14" height="14" />
          {t}
        </button>
      ))}
      <Toggle label="Auto record stream" delay={500} start={inView} />
      <Toggle label="Waiting room" delay={900} start={inView} />
    </div>
  );
}

const STEPS = [
  {
    title: 'Click Go Live.',
    body: 'Start from the Go Live button in your dashboard, or schedule a stream from the Scheduled streams tab.',
    Card: GoLiveCard,
  },
  {
    title: 'Enter the basics.',
    body: 'Give the stream a title, choose public or private, set the date, time and duration, then start.',
    Card: BasicsCard,
  },
  {
    title: 'Configure the details.',
    body: 'Add co-hosts and invitees, write the reminder email, and pick recording, transcript and waiting-room.',
    Card: DetailsCard,
  },
];

export default function HowItWorks() {
  return (
    <section className="how">
      <div className="how__head">
        <Reveal as="h2" className="section-title how__title" x={-30} y={0}>
          How to go live
          <br />
          with Vonza?
        </Reveal>
        <Reveal className="how__intro" delay={0.1}>
          <p>
            Create, schedule and run every stream from one simple dashboard, with invites, reminders and recordings
            handled for you.
          </p>
          <AnimatedButton variant="blue" style={{ padding: '0 32px' }}>Start streaming with vonza</AnimatedButton>
        </Reveal>
      </div>

      <Stagger className="how__steps" stagger={0.15}>
        {STEPS.map(({ title, body, Card }, i) => (
          <StaggerItem key={title} className="step" y={40}>
            <motion.div className="step__image" whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
              <span className="step__num">{i + 1}</span>
              <Card />
            </motion.div>
            <div className="step__text">
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
