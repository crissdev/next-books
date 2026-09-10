import * as stylex from '@stylexjs/stylex';
import { ChevronDown } from 'lucide-react';
import { colors, radii, spacing, typography } from '@/styles/tokens.stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import type { ComponentProps } from 'react';

const styles = stylex.create({
  icon: {
    color: colors.muted,
    height: '1rem',
    insetInlineEnd: spacing.twoAndHalf,
    pointerEvents: 'none',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '1rem',
  },
  select: {
    appearance: 'none',
    backgroundColor: {
      ':disabled': colors.card,
      default: colors.input,
    },
    borderColor: {
      ':focus': colors.accent,
      default: colors.divider,
    },
    borderRadius: radii.md,
    borderStyle: 'solid',
    borderWidth: 1,
    boxShadow: {
      ':focus': `0 0 0 2px ${colors.focusAccent}`,
      default: 'none',
    },
    color: {
      ':disabled': colors.muted,
      default: colors.text,
    },
    cursor: { ':disabled': 'not-allowed' },
    fontSize: typography.small,
    opacity: { ':disabled': 0.6 },
    outline: { ':focus': 'none' },
    paddingBlock: spacing.two,
    paddingInlineEnd: spacing.eight,
    paddingInlineStart: spacing.three,
    transitionDuration: '150ms',
    transitionProperty: 'background-color, border-color, box-shadow',
    transitionTimingFunction: 'ease',
    width: '100%',
  },
  wrapper: {
    display: 'block',
    minWidth: 0,
    position: 'relative',
  },
});

export function Select({
  children,
  xstyle,
  ...props
}: Omit<ComponentProps<'select'>, 'className' | 'style'> & { xstyle?: StyleXStyles }) {
  return (
    <span {...stylex.props(styles.wrapper)}>
      <select {...stylex.props(styles.select, xstyle)} {...props}>
        {children}
      </select>
      <ChevronDown aria-hidden {...stylex.props(styles.icon)} />
    </span>
  );
}
