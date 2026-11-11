import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedButton from './AnimatedButton.jsx';
import './Header.css';

const NAV = ['Create', 'Pricing', 'Use Case', 'Resources', 'Contact'];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className={`header ${scrolled ? 'header--scrolled' : ''}`}
      initial={{ y: -84, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <a href="#top" className="header__logo" aria-label="Vonza home">
        <img src="/assets/header/vonza-logo.svg" alt="Vonza" width="131" height="35" />
      </a>

      <nav className="header__nav" aria-label="Main">
        {NAV.map((item, i) => (
          <motion.a
            key={item}
            href="#"
            className="header__link"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
          >
            {item}
          </motion.a>
        ))}
      </nav>

      <div className="header__actions">
        <div className="header__lang">
          <img src="/assets/header/flag-gb.svg" alt="English" width="22" height="21" />
          <span className="header__divider" />
          <a href="#" className="header__login">Log In</a>
        </div>
        <AnimatedButton variant="dark" className="header__cta">Start Free Trial</AnimatedButton>
        <button
          className={`header__burger ${open ? 'is-open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="header__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {NAV.map((item) => (
              <a key={item} href="#" onClick={() => setOpen(false)}>
                {item}
              </a>
            ))}
            <a href="#">Log In</a>
            <AnimatedButton variant="dark" className="header__mobile-cta">Start Free Trial</AnimatedButton>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
