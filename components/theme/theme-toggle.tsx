'use client';

import * as stylex from '@stylexjs/stylex';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { colors, radii, spacing } from '@/styles/tokens.stylex';
import type { ReactNode } from 'react';

const subscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

const styles = stylex.create({
  activeButton: {
    backgroundColor: colors.card,
    color: colors.text,
  },
  button: {
    backgroundColor: 'transparent',
    border: 0,
    borderRadius: radii.full,
    color: {
      ':hover': { '@media (hover: hover)': colors.text },
      default: colors.muted,
    },
    padding: spacing.oneAndHalf,
    transitionDuration: '150ms',
    transitionProperty: 'background-color, color',
    transitionTimingFunction: 'ease',
  },
  icon: { height: '1rem', width: '1rem' },
  pill: {
    borderColor: colors.divider,
    borderRadius: radii.full,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: spacing.half,
  },
  root: {
    alignItems: 'center',
    display: 'inline-flex',
    gap: spacing.half,
    viewTransitionName: 'theme-toggle',
  },
});

export function ThemeToggle({ variant = 'pill' }: { variant?: 'inline' | 'pill' }) {
  const { setTheme, theme } = useTheme();
  const mounted = useIsMounted();
  const active = mounted ? theme : undefined;

  return (
    <section {...stylex.props(styles.root, variant === 'pill' && styles.pill)}>
      <ToggleButton active={active === 'light'} label="Light mode" onClick={() => setTheme('light')}>
        <Sun {...stylex.props(styles.icon)} />
      </ToggleButton>
      <ToggleButton active={active === 'dark'} label="Dark mode" onClick={() => setTheme('dark')}>
        <Moon {...stylex.props(styles.icon)} />
      </ToggleButton>
      <ToggleButton active={active === 'system'} label="System theme" onClick={() => setTheme('system')}>
        <Monitor {...stylex.props(styles.icon)} />
      </ToggleButton>
    </section>
  );
}

function ToggleButton({
  active,
  children,
  label,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      {...stylex.props(styles.button, active && styles.activeButton)}
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
