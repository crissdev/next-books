'use client';

import * as Ariakit from '@ariakit/react';
import { Icon } from '@astryxdesign/core/Icon';
import { IconButton } from '@astryxdesign/core/IconButton';
import * as stylex from '@stylexjs/stylex';
import { SlidersHorizontal, X } from 'lucide-react';
import { createContext, useContext } from 'react';
import { colors, shadows, spacing } from '@/styles/tokens.stylex';
import type { ReactNode } from 'react';

const MobileBookSidebarContext = createContext<Ariakit.DialogStore | null>(null);

const styles = stylex.create({
  backdrop: {
    backdropFilter: 'blur(2px)',
    backgroundColor: colors.overlay,
    display: {
      '@media (min-width: 768px)': 'none',
      default: 'block',
    },
    inset: 0,
    position: 'fixed',
    viewTransitionName: 'mobile-sidebar-backdrop',
    zIndex: 40,
  },
  dialog: {
    backgroundColor: colors.surface,
    borderColor: colors.divider,
    borderInlineEndStyle: 'solid',
    borderInlineEndWidth: 1,
    boxShadow: shadows.elevated,
    display: {
      '@media (min-width: 768px)': 'none',
      default: 'flex',
    },
    flexDirection: 'column',
    insetBlock: 0,
    insetInlineStart: 0,
    maxWidth: '100%',
    outline: 'none',
    overflowX: 'hidden',
    paddingBlockEnd: 'max(1rem, env(safe-area-inset-bottom))',
    paddingBlockStart: 'max(1rem, env(safe-area-inset-top))',
    paddingInlineEnd: spacing.four,
    paddingInlineStart: 'max(1rem, env(safe-area-inset-left))',
    position: 'fixed',
    touchAction: 'pan-y',
    viewTransitionName: 'mobile-sidebar',
    width: 'min(20rem, calc(100vw - 3rem))',
    zIndex: 50,
  },
  dismiss: {
    insetInlineEnd: spacing.three,
    position: 'absolute',
    top: 'max(0.75rem, env(safe-area-inset-top))',
  },
  srOnly: {
    border: 0,
    clip: 'rect(0, 0, 0, 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1,
  },
  trigger: {
    display: {
      '@media (min-width: 768px)': 'none',
      default: 'inline-flex',
    },
  },
});

export function MobileBookSidebar({ children, sidebar }: { children: ReactNode; sidebar: ReactNode }) {
  const store = Ariakit.useDialogStore();

  return (
    <MobileBookSidebarContext.Provider value={store}>
      {children}
      <Ariakit.Dialog
        {...stylex.props(styles.dialog)}
        backdrop={<section {...stylex.props(styles.backdrop)} />}
        hideOnInteractOutside
        onClick={event => {
          if ((event.target as HTMLElement).closest('a[href]')) store.hide();
        }}
        store={store}
        unmountOnHide
      >
        <Ariakit.DialogHeading {...stylex.props(styles.srOnly)}>Book filters</Ariakit.DialogHeading>
        <Ariakit.DialogDismiss
          render={
            <IconButton
              icon={<Icon icon={X} size="sm" />}
              label="Close filters"
              size="sm"
              variant="ghost"
              xstyle={styles.dismiss}
            />
          }
        />
        {sidebar}
      </Ariakit.Dialog>
    </MobileBookSidebarContext.Provider>
  );
}

export function MobileBookSidebarTrigger() {
  const store = useContext(MobileBookSidebarContext);
  if (!store) return null;

  return (
    <Ariakit.DialogDisclosure
      render={
        <IconButton
          icon={<Icon icon={SlidersHorizontal} size="sm" />}
          label="Open filters"
          size="sm"
          variant="ghost"
          xstyle={styles.trigger}
        />
      }
      store={store}
    />
  );
}
