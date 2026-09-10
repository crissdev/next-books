'use client';

import * as stylex from '@stylexjs/stylex';
import { useTheme } from 'next-themes';
import { Toaster as SonnerToaster } from 'sonner';

const styles = stylex.create({
  root: {
    inset: 0,
    pointerEvents: 'none',
    position: 'fixed',
    viewTransitionName: 'toaster',
    zIndex: 9999,
  },
});

export function Toaster() {
  const { resolvedTheme } = useTheme();

  return (
    <section {...stylex.props(styles.root)}>
      <SonnerToaster position="bottom-right" theme={resolvedTheme === 'dark' ? 'dark' : 'light'} />
    </section>
  );
}
