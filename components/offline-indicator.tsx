'use client';

import * as stylex from '@stylexjs/stylex';
import { WifiOff } from 'lucide-react';
import { useOffline } from 'next/offline';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

const styles = stylex.create({
  icon: { height: '1rem', width: '1rem' },
});

export function OfflineIndicator() {
  const offline = useOffline();
  const toastId = useRef<number | string | undefined>(undefined);

  useEffect(() => {
    if (offline) {
      toastId.current = toast.error("You're offline — reconnecting…", {
        duration: Infinity,
        icon: <WifiOff {...stylex.props(styles.icon)} aria-hidden />,
      });
    } else if (toastId.current !== undefined) {
      toast.dismiss(toastId.current);
      toastId.current = undefined;
    }
  }, [offline]);

  return null;
}
