import { motion } from 'framer-motion';

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

const viewport = { once: true, amount: 0.25 };

/** Fades + slides children in when scrolled into view. */
export function Reveal({
  as = 'div',
  children,
  delay = 0,
  y = 24,
  x = 0,
  duration = 0.6,
  className,
  style,
  ...rest
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      style={style}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={viewport}
      transition={{ duration, delay, ease: EASE_OUT_EXPO }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Parent that staggers its <StaggerItem> children in when scrolled into view. */
export function Stagger({ as = 'div', children, className, stagger = 0.08, delay = 0, style, ...rest }) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export const itemVariants = (y = 20) => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT_EXPO } },
});

export function StaggerItem({ as = 'div', children, className, y = 20, style, ...rest }) {
  const Comp = motion[as];
  return (
    <Comp className={className} style={style} variants={itemVariants(y)} {...rest}>
      {children}
    </Comp>
  );
}
