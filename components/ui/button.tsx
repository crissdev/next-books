'use client';

import * as stylex from '@stylexjs/stylex';
import { cloneElement } from 'react';
import { useFormStatus } from 'react-dom';
import { Spinner } from '@/components/ui/spinner';
import { colors, radii, spacing, typography } from '@/styles/tokens.stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import type { ButtonHTMLAttributes, CSSProperties, ReactElement, ReactNode } from 'react';

type Variant = 'ghost' | 'primary' | 'secondary';
type Size = 'default' | 'icon' | 'sm';

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  render?: ReactElement<{ children?: ReactNode; className?: string; style?: CSSProperties }>;
  xstyle?: StyleXStyles;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style'>;

const styles = stylex.create({
  base: {
    alignItems: 'center',
    borderRadius: radii.full,
    display: 'inline-flex',
    fontWeight: 600,
    gap: spacing.two,
    justifyContent: 'center',
    outline: { ':focus-visible': 'none' },
    transitionDuration: '150ms',
    transitionProperty: 'background-color, border-color, color, box-shadow',
    transitionTimingFunction: 'ease',
    whiteSpace: 'nowrap',
  },
  defaultSize: {
    fontSize: typography.small,
    height: '2.25rem',
    paddingInline: spacing.four,
  },
  disabled: {
    cursor: { ':disabled': 'not-allowed' },
    opacity: { ':disabled': 0.5 },
  },
  focus: {
    boxShadow: { ':focus-visible': `0 0 0 2px ${colors.focusAction}` },
  },
  ghost: {
    backgroundColor: {
      ':hover': { '@media (hover: hover)': colors.card },
      default: 'transparent',
    },
    borderColor: 'transparent',
    color: {
      ':hover': { '@media (hover: hover)': colors.text },
      default: colors.muted,
    },
  },
  iconSize: {
    height: '2.25rem',
    width: '2.25rem',
  },
  primary: {
    backgroundColor: {
      ':hover': { '@media (hover: hover)': colors.actionHover },
      default: colors.action,
    },
    borderColor: 'transparent',
    color: '#ffffff',
  },
  secondary: {
    backgroundColor: {
      ':hover': { '@media (hover: hover)': colors.card },
      default: 'light-dark(#ffffff, transparent)',
    },
    borderColor: {
      ':hover': { '@media (hover: hover)': 'light-dark(rgb(161 161 170 / 0.4), rgb(161 161 170 / 0.3))' },
      default: colors.divider,
    },
    borderStyle: 'solid',
    borderWidth: 1,
    color: colors.text,
  },
  smallSize: {
    fontSize: typography.tiny,
    height: '2rem',
    paddingInline: spacing.three,
  },
});

const sizeStyles = {
  default: styles.defaultSize,
  icon: styles.iconSize,
  sm: styles.smallSize,
};

const variantStyles = {
  ghost: styles.ghost,
  primary: styles.primary,
  secondary: styles.secondary,
};

export function Button({
  children,
  variant = 'primary',
  size = 'default',
  xstyle,
  render,
  type = 'button',
  disabled,
  ...props
}: Props) {
  const { pending } = useFormStatus();
  const isSubmit = type === 'submit';
  const isDisabled = disabled || (isSubmit && pending);
  const styleProps = stylex.props(
    styles.base,
    styles.disabled,
    styles.focus,
    sizeStyles[size],
    variantStyles[variant],
    xstyle,
  );
  const content = (
    <>
      {isSubmit && pending && <Spinner />}
      {children}
    </>
  );

  if (render) {
    return cloneElement(
      render,
      {
        ...props,
        className: [render.props.className, styleProps.className].filter(Boolean).join(' '),
        style: { ...styleProps.style, ...render.props.style },
      },
      content,
    );
  }

  return (
    <button {...styleProps} disabled={isDisabled} type={type} {...props}>
      {content}
    </button>
  );
}
