'use client';

import * as stylex from '@stylexjs/stylex';
import { useRouter, useSearchParams } from 'next/navigation';
import { useOptimistic, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Range } from '@/components/ui/range';
import { Select } from '@/components/ui/select';
import {
  LANGUAGES,
  LISTS,
  MAX_PAGES,
  MAX_RATING,
  MAX_YEAR,
  MIN_PAGES,
  MIN_RATING,
  MIN_YEAR,
  PAGE_FILTER_VALUES,
  RATING_FILTER_VALUES,
  YEAR_FILTER_VALUES,
} from '@/features/book/book-constants';
import { buildHref, parseSearchParams, withFilters } from '@/lib/url-state';
import type { SearchParams } from '@/lib/url-state';
import { colors, radii, spacing, typography } from '@/styles/tokens.stylex';

type FilterAction = { patch: Partial<SearchParams>; type: 'change' } | { type: 'reset' };

const styles = stylex.create({
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.six,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.two,
  },
  fieldset: {
    border: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.two,
    margin: 0,
    minWidth: 0,
    padding: 0,
  },
  footer: {
    borderBlockStartColor: colors.divider,
    borderBlockStartStyle: 'solid',
    borderBlockStartWidth: 1,
    paddingTop: spacing.three,
  },
  fullWidth: { width: '100%' },
  label: {
    color: colors.muted,
    fontSize: typography.tiny,
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },
  legend: {
    color: colors.muted,
    fontSize: typography.tiny,
    fontWeight: 600,
    letterSpacing: '0.04em',
    marginBottom: spacing.two,
    padding: 0,
    textTransform: 'uppercase',
  },
  listLabel: {
    alignItems: 'center',
    backgroundColor: {
      ':hover': { '@media (hover: hover)': colors.card },
      default: 'transparent',
    },
    borderRadius: radii.md,
    cursor: 'pointer',
    display: 'flex',
    fontSize: typography.small,
    gap: spacing.twoAndHalf,
    marginInline: '-0.5rem',
    paddingBlock: spacing.oneAndHalf,
    paddingInline: spacing.two,
    transitionDuration: '150ms',
    transitionProperty: 'background-color',
    transitionTimingFunction: 'ease',
  },
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    minHeight: 0,
  },
  scroll: {
    flex: 1,
    minHeight: 0,
    overflowX: 'hidden',
    overflowY: 'auto',
    overscrollBehavior: 'contain',
    paddingBottom: spacing.six,
    paddingInline: spacing.one,
    scrollbarGutter: 'stable',
    touchAction: 'pan-y',
  },
});

function filterReducer(filters: SearchParams, action: FilterAction): SearchParams {
  return action.type === 'reset' ? {} : withFilters(filters, action.patch);
}

function BookFiltersForm({ idPrefix, initialParams }: { idPrefix: string; initialParams: SearchParams }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [filters, dispatch] = useOptimistic(initialParams, filterReducer);

  const activeCount = Object.entries(filters).filter(([key, value]) => key !== 'page' && Boolean(value)).length;

  function commit(patch: Partial<SearchParams>) {
    const next = withFilters(filters, patch);
    startTransition(() => {
      dispatch({ patch, type: 'change' });
      router.replace(buildHref(next), { scroll: false });
    });
  }

  function toggleList(slug: string) {
    commit({ list: filters.list === slug ? undefined : slug });
  }

  return (
    <section {...stylex.props(styles.root)} data-filtering={isPending ? '' : undefined}>
      <section {...stylex.props(styles.scroll)}>
        <section {...stylex.props(styles.controls)}>
          <Range
            hint={
              <>
                <span>{MIN_YEAR}</span>
                <span>{MAX_YEAR}</span>
              </>
            }
            id={`${idPrefix}-filter-year`}
            label="Published before"
            onValueChange={value => commit({ year: value === MAX_YEAR ? undefined : String(value) })}
            readout={filters.year ? filters.year : 'Any year'}
            value={Number(filters.year ?? MAX_YEAR)}
            values={YEAR_FILTER_VALUES}
          />

          <Range
            hint={
              <>
                <span>Any</span>
                <span>{MAX_RATING} stars</span>
              </>
            }
            id={`${idPrefix}-filter-rating`}
            label="Minimum rating"
            onValueChange={value => commit({ rating: value === MIN_RATING ? undefined : String(value) })}
            readout={Number(filters.rating) > 0 ? `${filters.rating}+ stars` : 'Any rating'}
            value={Number(filters.rating ?? MIN_RATING)}
            values={RATING_FILTER_VALUES}
          />

          <Range
            hint={
              <>
                <span>{MIN_PAGES}</span>
                <span>{MAX_PAGES.toLocaleString()}</span>
              </>
            }
            id={`${idPrefix}-filter-pages`}
            label="Max pages"
            onValueChange={value => commit({ pages: value === MAX_PAGES ? undefined : String(value) })}
            readout={filters.pages ? `${Number(filters.pages).toLocaleString()} pages` : 'Any length'}
            value={Number(filters.pages ?? MAX_PAGES)}
            values={PAGE_FILTER_VALUES}
          />

          <section {...stylex.props(styles.field)}>
            <label {...stylex.props(styles.label)} htmlFor={`${idPrefix}-filter-language`}>
              Language
            </label>
            <Select
              id={`${idPrefix}-filter-language`}
              onChange={event => commit({ language: event.target.value })}
              value={filters.language ?? 'en'}
            >
              {LANGUAGES.map(language => (
                <option key={language.value} value={language.value}>
                  {language.label}
                </option>
              ))}
            </Select>
          </section>

          <fieldset {...stylex.props(styles.fieldset)}>
            <legend {...stylex.props(styles.legend)}>Book lists</legend>
            {LISTS.map(list => (
              <label {...stylex.props(styles.listLabel)} key={list.name}>
                <Input
                  checked={filters.list === list.slug}
                  onChange={() => toggleList(list.slug)}
                  type="checkbox"
                  variant="checkbox"
                />
                {list.name}
              </label>
            ))}
          </fieldset>
        </section>
      </section>

      {activeCount > 0 ? (
        <footer {...stylex.props(styles.footer)}>
          <Button
            onClick={() =>
              startTransition(() => {
                dispatch({ type: 'reset' });
                router.replace('/', { scroll: false });
              })
            }
            variant="secondary"
            xstyle={styles.fullWidth}
          >
            Clear all filters
          </Button>
        </footer>
      ) : null}
    </section>
  );
}

export function BookFiltersFallback({ idPrefix }: { idPrefix: string }) {
  return <BookFiltersForm idPrefix={idPrefix} initialParams={{}} />;
}

export function BookFilters({ idPrefix }: { idPrefix: string }) {
  const searchParams = useSearchParams();
  return <BookFiltersForm idPrefix={idPrefix} initialParams={parseSearchParams(Object.fromEntries(searchParams))} />;
}
