import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, Stagger, StaggerItem } from './motion.jsx';
import AnimatedButton from './AnimatedButton.jsx';
import './Footer.css';

const A = '/assets/footer/';

const COLUMNS = [
  ['Products', ['VONZA', 'Nexus AI Suite', 'Vonza School', 'Webinarcake', 'Digital Creator Academy', 'The New Rich']],
  [
    'Tools',
    ['Link in Bio', 'Community', 'Online Courses', 'Website Builder', 'Digital Products', 'CRM', 'Invoice', 'Sales Funnels',
      'Email Marketing', 'Scheduling', 'Forms', 'Landing Pages', 'SMS Text', 'Online Store', 'Webinar', 'Vonza Schools'],
  ],
  [
    'Learn',
    ['Best all-in-one platform', 'Kajabi alternative', 'Teachable alternative', 'Kartra alternative', 'Clickfunnels alternative',
      'Shopify alternative', 'Podia alternative', 'Thinkific alternative', 'Learnworlds alternative', 'Calendly alternative',
      'WordPress alternative', 'Samcart alternative', 'Udemy alternative'],
  ],
  [
    'Compare',
    ['Vonza AI', 'Blog', 'Watch Demo', 'Examples', 'Vonza University', 'Vonza Experts', 'Free Migration', 'Privacy Policy',
      'Terms of Use', 'Income Disclaimer', 'Vonza Roadmap', 'Vonza Status'],
  ],
  ['Vonza', ['Home', 'About', 'Vonzafest', 'Pricing', 'Features', 'Investors', 'Affiliates', 'Contact Us']],
];

const SOCIAL = [
  ['facebook', 'Facebook', { width: 7, height: 14 }],
  ['x', 'X', { width: 20, height: 20 }],
  ['instagram', 'Instagram', { width: 20, height: 20 }],
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return;
    setSent(true);
    setEmail('');
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <footer className="footer">
      <div className="footer__top">
        <Reveal className="footer__brand">
          <div className="footer__intro">
            <img src={A + 'vonza-logo.svg'} alt="Vonza" width="234" height="64" />
            <p>Try out the world’s best platform for growing your business</p>
            <div className="footer__social">
              {SOCIAL.map(([icon, label, size]) => (
                <motion.a key={icon} href="#" aria-label={label} className="social-btn" whileHover={{ y: -3, scale: 1.08 }}>
                  <img src={A + icon + '.svg'} alt="" {...size} />
                </motion.a>
              ))}
            </div>
          </div>

          <form className="newsletter" onSubmit={submit}>
            <h3>Sign Up to Newsletter</h3>
            <p>
              Sign up to our newsletter and get 15% off full price styles in your next order. By signing up you agree to
              our Privacy Policy.
            </p>
            <div className="newsletter__row">
              <input
                type="email"
                placeholder="Email"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <AnimatedButton as="button" type="submit" variant="blue" className="newsletter__send">
                Send
              </AnimatedButton>
            </div>
            <AnimatePresence>
              {sent && (
                <motion.span
                  className="newsletter__ok"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  Thanks! You’re on the list.
                </motion.span>
              )}
            </AnimatePresence>
          </form>
        </Reveal>

        <Stagger className="footer__cols" stagger={0.08} delay={0.1}>
          {COLUMNS.map(([title, links]) => (
            <StaggerItem key={title} className="footer__col">
              <h4>{title}</h4>
              <ul>
                {links.map((l) => (
                  <li key={l}>
                    <a href="#">{l}</a>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <div className="footer__bottom">
        <img src={A + 'line.svg'} alt="" className="footer__line" />
        <span>© 2025 All Rights Reserved</span>
      </div>
    </footer>
  );
}
