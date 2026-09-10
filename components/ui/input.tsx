import * as stylex from '@stylexjs/stylex';
import { colors, radii, spacing, typography } from '@/styles/tokens.stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import type { ComponentProps } from 'react';

type Variant = 'checkbox' | 'default' | 'search' | 'unstyled';

type Props = Omit<ComponentProps<'input'>, 'className' | 'style'> & {
  variant?: Variant;
  xstyle?: StyleXStyles;
};

const styles = stylex.create({
  base: {
    backgroundColor: colors.input,
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
    color: colors.text,
    cursor: { ':disabled': 'not-allowed' },
    fontSize: typography.small,
    opacity: { ':disabled': 0.6 },
    outline: { ':focus': 'none' },
    paddingBlock: spacing.two,
    paddingInline: spacing.three,
    transitionDuration: '150ms',
    transitionProperty: 'background-color, border-color, box-shadow',
    transitionTimingFunction: 'ease',
    width: '100%',
  },
  checkbox: {
    accentColor: colors.action,
    cursor: { ':disabled': 'not-allowed', default: 'pointer' },
    height: '1rem',
    opacity: { ':disabled': 0.6 },
    width: '1rem',
  },
  disabled: {
    backgroundColor: { ':disabled': colors.card },
    color: { ':disabled': colors.muted },
  },
  search: {
    borderRadius: radii.lg,
    fontSize: {
      '@media (min-width: 640px)': typography.small,
      default: typography.base,
    },
    height: '2.75rem',
    paddingInlineEnd: spacing.ten,
    paddingInlineStart: spacing.ten,
  },
});

export function Input({ type, variant = 'default', xstyle, ...props }: Props) {
  const resolvedVariant = type === 'hidden' ? 'unstyled' : variant;

  return (
    <input
      {...stylex.props(
        resolvedVariant === 'unstyled' ? null : resolvedVariant === 'checkbox' ? styles.checkbox : styles.base,
        resolvedVariant === 'default' && styles.disabled,
        resolvedVariant === 'search' && styles.disabled,
        resolvedVariant === 'search' && styles.search,
        xstyle,
      )}
      type={type}
      {...props}
    />
  );
}
