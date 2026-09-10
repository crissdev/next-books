import * as stylex from '@stylexjs/stylex';
import { colors, radii, spacing, typography } from '@/styles/tokens.stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import type { ReactNode } from 'react';

type Props = {
  onValueChange: (value: number) => void;
  label: string;
  value: number;
  values: readonly [number, ...number[]];
  readout?: ReactNode;
  hint?: readonly [ReactNode, ReactNode];
  id?: string;
  disabled?: boolean;
  xstyle?: StyleXStyles;
};

const styles = stylex.create({
  hint: {
    color: colors.muted,
    display: 'flex',
    fontSize: typography.hint,
    fontVariantNumeric: 'tabular-nums',
    justifyContent: 'space-between',
  },
  hintText: {
    fontSize: typography.hint,
    lineHeight: '1.5',
  },
  input: {
    appearance: 'none',
    backgroundColor: 'transparent',
    borderRadius: radii.full,
    color: colors.action,
    cursor: { ':disabled': 'not-allowed', default: 'pointer' },
    height: spacing.five,
    opacity: { ':disabled': 0.6 },
    outline: { ':focus-visible': 'none' },
    width: '100%',
  },
  label: {
    color: colors.muted,
    fontSize: typography.tiny,
    fontWeight: 600,
    letterSpacing: '0.04em',
    lineHeight: typography.tinyLineHeight,
    textTransform: 'uppercase',
  },
  labelRow: {
    alignItems: 'baseline',
    display: 'flex',
    gap: spacing.two,
    justifyContent: 'space-between',
  },
  readout: {
    color: colors.text,
    fontSize: typography.small,
    fontVariantNumeric: 'tabular-nums',
    fontWeight: 500,
    lineHeight: typography.smallLineHeight,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.two,
    width: '100%',
  },
});

export function Range({ disabled, hint, id, label, onValueChange, readout, value, values, xstyle }: Props) {
  const selectedIndex = values.reduce(
    (closest, option, index) => (Math.abs(option - value) < Math.abs(values[closest] - value) ? index : closest),
    0,
  );

  return (
    <section {...stylex.props(styles.root)}>
      <section {...stylex.props(styles.labelRow)}>
        <label {...stylex.props(styles.label)} htmlFor={id}>
          {label}
        </label>
        <output {...stylex.props(styles.readout)} htmlFor={id}>
          {readout ?? value}
        </output>
      </section>
      <input
        disabled={disabled}
        id={id}
        max={values.length - 1}
        min={0}
        onChange={event => onValueChange(values[Number(event.currentTarget.value)])}
        step={1}
        type="range"
        value={selectedIndex}
        {...stylex.props(styles.input, xstyle)}
      />
      {hint ? (
        <section {...stylex.props(styles.hint)}>
          <small {...stylex.props(styles.hintText)}>{hint[0]}</small>
          <small {...stylex.props(styles.hintText)}>{hint[1]}</small>
        </section>
      ) : null}
    </section>
  );
}
