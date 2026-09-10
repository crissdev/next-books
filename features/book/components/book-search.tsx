'use client';

import * as stylex from '@stylexjs/stylex';
import { Search as SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useRef, useTransition } from 'react';
import { SeedFromSearchParam } from '@/components/scripts/seed-from-search-param';
import { IconButton } from '@/components/ui/icon-button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useSyncSearchParamToInput } from '@/hooks/use-sync-search-param-to-input';
import { buildHref, parseSearchParams, withFilters } from '@/lib/url-state';
import { colors, spacing } from '@/styles/tokens.stylex';

const DEBOUNCE_MS = 220;

const styles = stylex.create({
  clear: {
    insetInlineEnd: spacing.oneAndHalf,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  form: { flex: 1, position: 'relative' },
  icon: { height: '1rem', width: '1rem' },
  leadingIcon: {
    alignItems: 'center',
    color: colors.muted,
    display: 'flex',
    height: '1rem',
    insetInlineStart: spacing.threeAndHalf,
    justifyContent: 'center',
    pointerEvents: 'none',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '1rem',
    zIndex: 1,
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
});

export function BookSearch() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputId = useId();
  const [isPending, startTransition] = useTransition();

  useSyncSearchParamToInput(inputRef, 'search');

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  function navigate(value: string) {
    const query = value.trim();
    const current = parseSearchParams(Object.fromEntries(new URLSearchParams(window.location.search)));
    startTransition(() => {
      router.replace(buildHref(withFilters(current, { search: query || undefined })), { scroll: false });
    });
  }

  return (
    <form
      {...stylex.props(styles.form)}
      aria-busy={isPending}
      data-search-form
      data-filtering={isPending ? '' : undefined}
      onSubmit={event => {
        event.preventDefault();
        if (timerRef.current) clearTimeout(timerRef.current);
        navigate(inputRef.current?.value ?? '');
      }}
      role="search"
    >
      <label {...stylex.props(styles.srOnly)} htmlFor={inputId}>
        Search books
      </label>
      <span {...stylex.props(styles.leadingIcon)} aria-hidden>
        {isPending ? <Spinner xstyle={styles.icon} /> : <SearchIcon {...stylex.props(styles.icon)} />}
      </span>
      <Input
        defaultValue=""
        id={inputId}
        name="search"
        onChange={event => {
          const { value } = event.target;
          if (timerRef.current) clearTimeout(timerRef.current);
          timerRef.current = setTimeout(() => navigate(value), DEBOUNCE_MS);
        }}
        placeholder="Search books…"
        ref={inputRef}
        suppressHydrationWarning
        type="search"
        variant="search"
      />
      <IconButton
        data-clear-search
        label="Clear search"
        onClick={() => {
          if (timerRef.current) clearTimeout(timerRef.current);
          if (inputRef.current) inputRef.current.value = '';
          navigate('');
          inputRef.current?.focus();
        }}
        xstyle={styles.clear}
      >
        <X {...stylex.props(styles.icon)} />
      </IconButton>
      <SeedFromSearchParam param="search" targetId={inputId} />
    </form>
  );
}
