import { Slider } from '@astryxdesign/core/Slider';
import { Stack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
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

export function Range({ disabled, hint, id, label, onValueChange, readout, value, values, xstyle }: Props) {
  const selectedIndex = values.reduce(
    (closest, option, index) => (Math.abs(option - value) < Math.abs(values[closest] - value) ? index : closest),
    0,
  );

  return (
    <Stack gap={1.5} width="100%">
      <Slider
        formatValue={() => String(readout ?? value)}
        id={id}
        isDisabled={disabled}
        label={label}
        max={values.length - 1}
        min={0}
        onChange={(index: number) => onValueChange(values[index])}
        step={1}
        value={selectedIndex}
        valueDisplay="text"
        width="100%"
        xstyle={xstyle}
      />
      {hint ? (
        <Stack direction="horizontal" justify="between" width="100%">
          <Text color="secondary" hasTabularNumbers type="supporting">
            {hint[0]}
          </Text>
          <Text color="secondary" hasTabularNumbers type="supporting">
            {hint[1]}
          </Text>
        </Stack>
      ) : null}
    </Stack>
  );
}
