import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';

const draw = stylex.keyframes({
  from: { opacity: 0, strokeDasharray: '0 64' },
  to: { opacity: 1, strokeDasharray: '64 0' },
});

const styles = stylex.create({
  delayOne: { animationDelay: '90ms' },
  delayTwo: { animationDelay: '180ms' },
  path: {
    animationDuration: {
      '@media (prefers-reduced-motion: reduce)': '0s',
      default: '520ms',
    },
    animationFillMode: 'both',
    animationName: draw,
    animationTimingFunction: 'ease-out',
  },
  root: { height: '1.5rem', width: '1.5rem' },
});

export function BookMark({ animated, xstyle }: { animated?: boolean; xstyle?: StyleXStyles }) {
  return (
    <svg {...stylex.props(styles.root, xstyle)} aria-hidden fill="none" viewBox="0 0 24 24">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}>
        <path {...stylex.props(animated && styles.path)} d="M12 6.5C10.4 5.2 8.4 4.5 6 4.5H3.5v13H6c2.4 0 4.4.7 6 2" />
        <path
          {...stylex.props(animated && styles.path, animated && styles.delayOne)}
          d="M12 6.5c1.6-1.3 3.6-2 6-2h2.5v13H18c-2.4 0-4.4.7-6 2"
        />
        <path {...stylex.props(animated && styles.path, animated && styles.delayTwo)} d="M12 6.5v15" />
      </g>
    </svg>
  );
}
