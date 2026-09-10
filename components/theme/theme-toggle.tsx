'use client';

import { Icon } from '@astryxdesign/core/Icon';
import { ToggleButton, ToggleButtonGroup } from '@astryxdesign/core/ToggleButton';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const mounted = useIsMounted();
  const active = mounted && (theme === 'light' || theme === 'dark') ? theme : 'system';

  return (
    <ToggleButtonGroup
      label="Color theme"
      onChange={value => {
        if (value) setTheme(value);
      }}
      size="sm"
      type="single"
      value={active}
    >
      <ToggleButton icon={<Icon icon={Sun} size="sm" />} isIconOnly label="Light mode" value="light" />
      <ToggleButton icon={<Icon icon={Moon} size="sm" />} isIconOnly label="Dark mode" value="dark" />
      <ToggleButton icon={<Icon icon={Monitor} size="sm" />} isIconOnly label="System theme" value="system" />
    </ToggleButtonGroup>
  );
}
