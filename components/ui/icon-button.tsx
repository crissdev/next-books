import * as stylex from '@stylexjs/stylex';
import { colors, radii } from '@/styles/tokens.stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Size = 'default' | 'sm';

type Props = {
  children: ReactNode;
  label: string;
  size?: Size;
  xstyle?: StyleXStyles;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style'>;

const styles = stylex.create({
  defaultSize: { height: '2rem', width: '2rem' },
  root: {
    alignItems: 'center',
    backgroundColor: {
      ':hover': { '@media (hover: hover)': colors.card },
      default: 'transparent',
    },
    border: 0,
    borderRadius: radii.md,
    boxShadow: { ':focus-visible': `0 0 0 2px ${colors.focusAccent}` },
    color: {
      ':hover': { '@media (hover: hover)': colors.text },
      default: colors.muted,
    },
    cursor: { ':disabled': 'not-allowed' },
    display: 'inline-flex',
    flexShrink: 0,
    justifyContent: 'center',
    opacity: { ':disabled': 0.5 },
    outline: { ':focus-visible': 'none' },
    transitionDuration: '150ms',
    transitionProperty: 'background-color, color, box-shadow',
    transitionTimingFunction: 'ease',
  },
  smallSize: { height: '1.75rem', width: '1.75rem' },
});

export function IconButton({ children, label, size = 'default', type = 'button', xstyle, ...props }: Props) {
  return (
    <button
      {...stylex.props(styles.root, size === 'default' ? styles.defaultSize : styles.smallSize, xstyle)}
      aria-label={label}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
