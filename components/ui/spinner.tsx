import * as stylex from '@stylexjs/stylex';
import { LoaderCircle } from 'lucide-react';
import type { StyleXStyles } from '@stylexjs/stylex';

const spin = stylex.keyframes({
  to: { transform: 'rotate(360deg)' },
});

const styles = stylex.create({
  root: {
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationName: spin,
    animationTimingFunction: 'linear',
    flexShrink: 0,
    height: '1rem',
    width: '1rem',
  },
});

export function Spinner({ xstyle }: { xstyle?: StyleXStyles }) {
  return <LoaderCircle aria-hidden {...stylex.props(styles.root, xstyle)} />;
}
