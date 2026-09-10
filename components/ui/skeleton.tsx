import * as stylex from '@stylexjs/stylex';
import { radii } from '@/styles/tokens.stylex';
import type { StyleXStyles } from '@stylexjs/stylex';

const sweep = stylex.keyframes({
  '0%': { backgroundPosition: '150% 0' },
  '100%': { backgroundPosition: '-150% 0' },
});

const styles = stylex.create({
  root: {
    animationDuration: {
      '@media (prefers-reduced-motion: reduce)': '0s',
      default: '1.8s',
    },
    animationIterationCount: 'infinite',
    animationName: sweep,
    animationTimingFunction: 'ease-in-out',
    backgroundColor: 'light-dark(rgb(0 0 0 / 0.055), rgb(255 255 255 / 0.06))',
    backgroundImage:
      'linear-gradient(90deg, transparent 0%, light-dark(rgb(0 0 0 / 0.075), rgb(255 255 255 / 0.07)) 45%, light-dark(rgb(0 0 0 / 0.075), rgb(255 255 255 / 0.07)) 55%, transparent 100%)',
    backgroundPosition: '150% 0',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '200% 100%',
    borderRadius: radii.sm,
    display: 'block',
  },
  subtle: {
    animationName: 'none',
    backgroundImage: 'none',
  },
});

export function Skeleton({ subtle = false, xstyle }: { subtle?: boolean; xstyle?: StyleXStyles }) {
  return <span aria-hidden {...stylex.props(styles.root, subtle && styles.subtle, xstyle)} />;
}
