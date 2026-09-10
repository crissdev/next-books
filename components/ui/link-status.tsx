'use client';

import * as stylex from '@stylexjs/stylex';
import { useLinkStatus } from 'next/link';
import { Spinner } from '@/components/ui/spinner';
import { spacing } from '@/styles/tokens.stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  hint?: 'end' | 'start';
  xstyle?: StyleXStyles;
};

const reveal = stylex.keyframes({
  to: { opacity: 1 },
});

const styles = stylex.create({
  pending: {
    animationName: {
      '@media (prefers-reduced-motion: reduce)': 'none',
      default: reveal,
    },
    opacity: { '@media (prefers-reduced-motion: reduce)': 1 },
    visibility: 'visible',
  },
  root: {
    alignItems: 'center',
    display: 'inline-flex',
    gap: spacing.two,
  },
  slot: {
    alignItems: 'center',
    animationDelay: '100ms',
    animationDuration: '200ms',
    animationFillMode: 'forwards',
    animationName: reveal,
    display: 'inline-flex',
    flexShrink: 0,
    height: '0.875rem',
    justifyContent: 'center',
    opacity: 0,
    visibility: 'hidden',
    width: '0.875rem',
  },
  spinner: {
    height: '0.875rem',
    width: '0.875rem',
  },
});

export function LinkStatus({ children, hint = 'end', xstyle }: Props) {
  const { pending } = useLinkStatus();

  const slot = (
    <span {...stylex.props(styles.slot, pending && styles.pending)} aria-hidden>
      {pending ? <Spinner xstyle={styles.spinner} /> : null}
    </span>
  );

  return (
    <span {...stylex.props(styles.root, xstyle)}>
      {hint === 'start' ? slot : null}
      {children}
      {hint === 'end' ? slot : null}
    </span>
  );
}
