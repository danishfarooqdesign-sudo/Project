import './AnimatedButton.css';

/**
 * Button with the vonza.net hover effects:
 *  - a colour fill that sweeps up from the bottom (rounded top that flattens as it grows)
 *  - "rolling" text: each letter slides up and is replaced by a copy, staggered left to right
 *
 * variant: 'blue'  → blue button, fills dark on hover
 *          'dark'  → dark button, fills blue on hover
 *          'light' → white button, fills dark on hover (text turns white)
 *          'onDark'→ transparent/white-text button, fills white on hover (text turns dark)
 */
export default function AnimatedButton({
  as: Tag = 'a',
  href = '#',
  variant = 'blue',
  className = '',
  children,
  iconLeft,
  iconRight,
  ...rest
}) {
  const label = typeof children === 'string' ? children : '';
  const linkProps = Tag === 'a' ? { href } : {};

  return (
    <Tag className={`abtn abtn--${variant} ${className}`} {...linkProps} {...rest}>
      <span className="abtn__bg" aria-hidden="true" />
      {iconLeft}
      <span className="abtn__text">
        <span className="sr-only">{label}</span>
        <span className="abtn__letters" aria-hidden="true">
          {[...label].map((ch, i) => (
            <span key={i} className="abtn__char" data-char={ch} style={{ '--i': i }} />
          ))}
        </span>
      </span>
      {iconRight}
    </Tag>
  );
}
