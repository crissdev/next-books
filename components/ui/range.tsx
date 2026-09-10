import * as stylex from '@stylexjs/stylex';
import { colors, radii, spacing, typography } from '@/styles/tokens.stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import type { ComponentProps, ReactNode } from 'react';

type Props = Omit<
  ComponentProps<'input'>,
  'className' | 'max' | 'min' | 'onChange' | 'step' | 'style' | 'type' | 'value'
> & {
  onValueChange: (value: number) => void;
  label: string;
  value: number;
  values: readonly [number, ...number[]];
  readout?: ReactNode;
  hint?: ReactNode;
  xstyle?: StyleXStyles;
};

const styles = stylex.create({
  heading: {
    alignItems: 'baseline',
    display: 'flex',
    gap: spacing.two,
    justifyContent: 'space-between',
  },
  hint: {
    color: colors.muted,
    display: 'flex',
    fontSize: '0.6875rem',
    fontVariantNumeric: 'tabular-nums',
    justifyContent: 'space-between',
  },
  input: {
    borderRadius: radii.full,
    boxShadow: { ':focus-visible': `0 0 0 2px ${colors.focusAccent}` },
    cursor: 'pointer',
    outline: { ':focus-visible': 'none' },
  },
  label: {
    color: colors.muted,
    fontSize: typography.tiny,
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },
  readout: {
    color: colors.text,
    fontSize: typography.small,
    fontVariantNumeric: 'tabular-nums',
    fontWeight: 500,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.two,
  },
});

export function Range({ hint, id, label, onValueChange, readout, value, values, xstyle, ...props }: Props) {
  const selectedIndex = values.reduce(
    (closest, option, index) => (Math.abs(option - value) < Math.abs(values[closest] - value) ? index : closest),
    0,
  );

  return (
    <section {...stylex.props(styles.root)}>
      <header {...stylex.props(styles.heading)}>
        <label {...stylex.props(styles.label)} htmlFor={id}>
          {label}
        </label>
        <span {...stylex.props(styles.readout)}>{readout ?? value}</span>
      </header>
      <input
        {...stylex.props(styles.input, xstyle)}
        id={id}
        max={values.length - 1}
        min={0}
        onChange={event => onValueChange(values[Number(event.currentTarget.value)])}
        step={1}
        type="range"
        value={selectedIndex}
        {...props}
      />
      {hint ? <footer {...stylex.props(styles.hint)}>{hint}</footer> : null}
    </section>
  );
}
