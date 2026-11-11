import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScaleBox from './ScaleBox.jsx';
import { Reveal, Stagger, StaggerItem, EASE_OUT_EXPO } from './motion.jsx';
import './PersonalRoom.css';

const A = '/assets/personal-room/';

// QR modules on a 21×21 grid (finder squares are drawn separately).
const QR_ROWS = [
  [10, 11, 12], [9, 12], [8, 11], [8, 10], [8, 9, 12], [8, 10, 11], [9, 10, 12], [8, 10, 11],
  [0, 1, 2, 4, 6, 7, 9, 12, 13, 14, 15, 16, 17],
  [0, 1, 3, 5, 6, 7, 8, 10, 11, 20],
  [0, 1, 2, 3, 6, 8, 9, 11, 12, 14, 17, 18],
  [0, 1, 2, 7, 9, 10, 11, 12, 16, 18, 19],
  [0, 1, 2, 3, 5, 6, 7, 9, 10, 11, 12, 13, 14, 16, 18],
  [9, 10, 11, 13, 14, 15, 16, 17, 19, 20],
  [11, 12, 18], [8, 17, 18], [9, 13, 16, 17, 18], [8, 10, 11, 13, 14, 17, 18, 19],
  [8, 10, 13, 15, 16, 17, 20], [8, 10, 11, 13, 14, 15, 17, 20], [8, 9, 10, 11, 12, 15, 17, 18, 19],
];
const CELL = 6.393;

function QRCode() {
  const cells = [];
  QR_ROWS.forEach((cols, r) => cols.forEach((c) => cells.push([c, r])));
  return (
    <div className="qr">
      {cells.map(([c, r], i) => (
        <motion.span
          key={i}
          className="qr__cell"
          style={{ left: c * CELL, top: r * CELL }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + (r + c) * 0.02, duration: 0.2 }}
        />
      ))}
      {[[0, 0], [14, 0], [0, 14]].map(([c, r]) => (
        <span key={`${c}-${r}`}>
          <span className="qr__finder" style={{ left: c * CELL, top: r * CELL }} />
          <span className="qr__finder-dot" style={{ left: (c + 2) * CELL, top: (r + 2) * CELL }} />
        </span>
      ))}
    </div>
  );
}

const FEATURES = [
  ['link', 'One permanent link', 'Share your invite link once and reuse it. It never changes.'],
  ['qr-white', 'Scan to join', 'Generate a QR code for slides, flyers or your event screen.'],
  ['lock', 'Open or locked', 'Keep the room open, or lock it with a passcode.'],
  ['pointer', 'One-click join', 'Start your room straight from the dashboard.'],
  ['hash', 'Your own room ID', 'A memorable stream ID that is easy to share.'],
  ['cal-off', 'No scheduling needed', 'No calendar invites. Your room is ready when you are.'],
];

export default function PersonalRoom() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText('https://oliver.vonza.net/streamings/oliver-personal-room').catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="pr">
      <Reveal className="pr__visual" x={-50} y={0} duration={0.9}>
        <ScaleBox width={600} height={584}>
          <div className="pr-card">
            <motion.div
              className="room-card"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.2, duration: 1, ease: EASE_OUT_EXPO }}
            >
              <div className="room-card__head">
                <span className="room-card__title">Personal room</span>
                <img src={A + 'info.svg'} alt="" width="22" height="22" />
                <span className="room-card__spacer" />
                <button className="rc-btn rc-btn--secondary">
                  <img src={A + 'edit.svg'} alt="" width="21" height="21" />
                  Edit
                </button>
                <button className="rc-btn rc-btn--primary">
                  <img src={A + 'key.svg'} alt="" width="21" height="21" />
                  Join personal room
                </button>
              </div>

              <div className="room-details">
                <span className="room-details__name">Oliver personal room</span>
                <div className="room-details__row">
                  <span className="room-details__label">Security</span>
                  <span className="room-card__spacer" />
                  <span className="status-open">
                    <span className="status-open__dot" />
                    Open
                  </span>
                </div>
                <div className="room-details__row">
                  <span className="room-details__label">Invite link</span>
                  <span className="room-card__spacer" />
                  <button className="room-details__link" onClick={copy}>
                    oliver.vonza.net/streamings/oliver-personal-room
                    <img src={A + 'copy.svg'} alt="Copy" width="22" height="22" />
                  </button>
                </div>
                <div className="room-details__row">
                  <span className="room-details__label">Stream ID</span>
                  <span className="room-card__spacer" />
                  <span className="room-details__value">oliver-personal-room</span>
                </div>
              </div>

              <div className="qr-block">
                <QRCode />
                <div className="qr-block__text">
                  <span className="qr-block__title">Scan to join</span>
                  <span className="qr-block__body">
                    Generate a QR code for your room and put it on slides, flyers or your event screen.
                  </span>
                </div>
                <button className="rc-btn rc-btn--secondary rc-btn--sm">
                  <img src={A + 'qr.svg'} alt="" width="21" height="21" />
                  Generate QR Code
                </button>
              </div>
            </motion.div>

            <div className="pr-card__fade" />

            <motion.div
              className="join-card"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 180, damping: 18 }}
              whileHover={{ y: -6, rotate: -1 }}
            >
              <div className="join-card__top">
                <div className="join-card__brand">
                  <img src={A + 'key-white.svg'} alt="" width="18" height="18" />
                  Vonza Room
                </div>
                <span className="join-card__pill">
                  <img src={A + 'dot.svg'} alt="" width="6" height="6" className="join-card__dot" />
                  Open
                </span>
              </div>
              <span className="join-card__title">Join in 1 click</span>
              <span className="join-card__url">oliver.vonza.net/streamings/oliver-personal-room</span>
            </motion.div>

            <AnimatePresence>
              {copied && (
                <motion.div
                  className="copied-toast"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  Link copied
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScaleBox>
      </Reveal>

      <div className="pr__copy">
        <Reveal as="h2" className="pr__title">A room that is always yours</Reveal>
        <Reveal as="p" className="pr__sub" delay={0.1}>
          Skip the scheduling. Your personal room has one permanent link, so students, clients and teammates can
          join you.
        </Reveal>
        <Stagger className="pr__features" stagger={0.08} delay={0.2}>
          {FEATURES.map(([icon, title, body]) => (
            <StaggerItem key={title} className="pr-feature">
              <span className="pr-feature__icon">
                <img src={A + icon + '.svg'} alt="" width="18" height="18" />
              </span>
              <div className="pr-feature__text">
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
