import { motion } from 'framer-motion';
import { Reveal, Stagger, StaggerItem } from './motion.jsx';
import './RoomControls.css';

const A = '/assets/room-controls/';

const FEATURES = [
  ['users', 'Co-hosts', 'Add co-hosts who can share, admit and moderate alongside you.'],
  ['screen', 'Screen sharing', 'Share your screen, and approve screen-share requests from participants.'],
  ['chat', 'Live chat', 'Participants send messages while you teach; you answer in the room.'],
  ['hand', 'Raised hands', 'See who has a question and bring them in when you are ready.'],
  ['door', 'Waiting room', 'Require host admission so people wait for approval before joining.'],
  ['mute', 'Mute all, listen-only', 'Mute everyone in one click, or keep participants on listen-only.'],
  ['cast', 'Interactive or broadcast', 'Run a two-way session, or broadcast to a large audience.'],
  ['doc', 'Recordings & transcripts', 'Auto-record each stream and switch on a transcript per stream.'],
];

function Tile({ icon, title, body }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <StaggerItem className="rc-tile" y={30} onMouseMove={onMove}>
      <motion.div className="rc-tile__icon" whileHover={{ rotate: -8, scale: 1.08 }}>
        <img src={A + icon + '.svg'} alt="" width="22" height="22" />
      </motion.div>
      <h3>{title}</h3>
      <p>{body}</p>
    </StaggerItem>
  );
}

export default function RoomControls() {
  return (
    <section className="rc">
      <motion.div
        className="rc__dark"
        initial={{ opacity: 0, scale: 0.96, borderRadius: 48 }}
        whileInView={{ opacity: 1, scale: 1, borderRadius: 28 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="rc__glow" aria-hidden />
        <div className="rc__head">
          <Reveal as="h2" className="section-title rc__title">Run the room from one screen</Reveal>
          <Reveal as="p" className="rc__sub" delay={0.1}>
            Everything a host needs during a live class, coaching session or event, without a second tool.
          </Reveal>
        </div>
        <Stagger className="rc__grid" stagger={0.07} delay={0.15}>
          {FEATURES.map(([icon, title, body]) => (
            <Tile key={title} icon={icon} title={title} body={body} />
          ))}
        </Stagger>
      </motion.div>
    </section>
  );
}
