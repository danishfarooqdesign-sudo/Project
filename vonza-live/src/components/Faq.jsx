import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, Stagger, StaggerItem, EASE_OUT_EXPO } from './motion.jsx';
import AnimatedButton from './AnimatedButton.jsx';
import './Faq.css';

const A = '/assets/faq/';

// Only the first answer exists in the Figma file. The rest are draft answers
// based on the page copy — replace them with approved text.
const FAQS = [
  {
    q: 'What is Vonza?',
    a: 'Vonza is an AI-powered operating system for your business that brings the essential tools you need to build, sell, and grow in one place.',
  },
  {
    q: 'Can I create and sell online courses with Vonza?',
    a: 'Yes. Build course lessons, attach your live stream recordings to them and sell access directly from your Vonza account.',
  },
  {
    q: 'Can I build an online community with Vonza?',
    a: 'Yes. Create community spaces for your members, share recordings with them and host members-only live calls.',
  },
  {
    q: 'What can I use Vonza for?',
    a: 'Live classes, coaching calls, events, courses, communities and more — everything you need to run and grow a digital business.',
  },
  {
    q: 'Why should I use Vonza instead of multiple business tools?',
    a: 'One login and one system means less switching, fewer subscriptions and all your data in one place.',
  },
  {
    q: 'Who is Vonza built for?',
    a: 'Creators, coaches, educators and teams who want to build digital income without juggling a stack of tools.',
  },
];

function FaqItem({ item, open, onToggle }) {
  return (
    <StaggerItem className={`faq-item ${open ? 'is-open' : ''}`}>
      <button className="faq-item__q" aria-expanded={open} onClick={onToggle}>
        <span>{item.q}</span>
        <motion.img
          src={A + 'chevron-down.svg'}
          alt=""
          width="18"
          height="18"
          animate={{ rotate: open ? 0 : 180 }}
          transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="faq-item__a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
          >
            <p>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </StaggerItem>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="faq-wrap">
      <div className="faq">
        <div className="faq__intro">
          <Reveal as="h2" className="faq__title">
            Frequently Asked
            <br />
            Questions
          </Reveal>
          <Reveal as="p" className="faq__sub" delay={0.1}>
            Get answers to common questions here
          </Reveal>
        </div>
        <Stagger className="faq__list" stagger={0.07}>
          {FAQS.map((item, i) => (
            <FaqItem key={item.q} item={item} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </Stagger>
      </div>

      <Reveal className="cta" y={50} duration={0.9}>
        <div className="cta__left">
          <div className="cta__text">
            <h2>This Is Where Your Business Finally Comes Together</h2>
            <p>One login. One system. One clear path to building digital income — without the overwhelm.</p>
          </div>
          <div className="cta__actions">
            <AnimatedButton
              variant="light"
              className="cta__btn"
              iconRight={<img src={A + 'arrow-right.svg'} alt="" width="16" height="16" />}
            >
              Start Free
            </AnimatedButton>
            <a href="#" className="cta__link">Get A Demo</a>
          </div>
        </div>
        <img className="cta__glow" src={A + 'glow.svg'} alt="" aria-hidden />
        <motion.img
          className="cta__image"
          src={A + 'cta-dashboard.png'}
          alt="Vonza dashboard on desktop and mobile"
          initial={{ opacity: 0, x: 80, rotate: 2 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.3, duration: 1, ease: EASE_OUT_EXPO }}
        />
      </Reveal>
    </section>
  );
}
