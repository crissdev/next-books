import * as stylex from '@stylexjs/stylex';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FastLink } from '@/components/ui/fast-link';
import { LinkStatus } from '@/components/ui/link-status';
import { Skeleton } from '@/components/ui/skeleton';
import { getBooksCount } from '@/features/book/book-queries';
import { toBookFilters, toBookQuery } from '@/features/book/book-utils';
import { buildHref, getCurrentPage, getTotalPages, withPage } from '@/lib/url-state';
import type { SearchParams } from '@/lib/url-state';
import { colors, radii, spacing, typography } from '@/styles/tokens.stylex';

const styles = stylex.create({
  disabled: { opacity: 0.4, pointerEvents: 'none' },
  divider: {
    backgroundColor: colors.divider,
    display: {
      '@media (min-width: 640px)': 'block',
      default: 'none',
    },
    height: '0.75rem',
    width: 1,
  },
  icon: { height: '1rem', width: '1rem' },
  root: {
    alignItems: 'center',
    display: 'flex',
    gap: spacing.four,
    justifyContent: 'space-between',
  },
  skeleton: { height: '1rem', width: '5rem' },
  skeletonStatus: {
    alignItems: 'center',
    display: 'flex',
    gap: spacing.two,
  },
  status: {
    alignItems: 'center',
    color: colors.muted,
    display: 'flex',
    fontSize: {
      '@media (min-width: 640px)': typography.small,
      default: typography.tiny,
    },
    fontVariantNumeric: 'tabular-nums',
    gap: spacing.two,
    margin: 0,
  },
  statusCount: { color: colors.text, fontWeight: 500 },
  statusSummary: {
    display: {
      '@media (min-width: 640px)': 'inline',
      default: 'none',
    },
  },
  step: {
    alignItems: 'center',
    backgroundColor: {
      ':hover': { '@media (hover: hover)': colors.card },
      default: 'transparent',
    },
    borderRadius: radii.full,
    boxShadow: { ':focus-visible': `0 0 0 2px ${colors.focusAction}` },
    color: {
      ':hover': { '@media (hover: hover)': colors.text },
      default: colors.muted,
    },
    display: 'inline-flex',
    fontSize: typography.small,
    fontWeight: 500,
    gap: spacing.oneAndHalf,
    height: '2rem',
    outline: { ':focus-visible': 'none' },
    paddingInline: spacing.three,
    textDecoration: 'none',
    transitionDuration: '150ms',
    transitionProperty: 'background-color, color, box-shadow',
    transitionTimingFunction: 'ease',
  },
});

export async function BookPagination({ searchParams }: { searchParams: SearchParams }) {
  const totalResults = await getBooksCount(toBookFilters(toBookQuery(searchParams)));
  const totalPages = getTotalPages(totalResults);
  const currentPage = getCurrentPage(searchParams, totalPages);
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav {...stylex.props(styles.root)} aria-label="Pagination">
      {hasPrevious ? (
        <FastLink
          {...stylex.props(styles.step)}
          aria-label="Previous page"
          href={buildHref(withPage(searchParams, currentPage - 1))}
          prefetch={true}
        >
          <LinkStatus>
            <ChevronLeft {...stylex.props(styles.icon)} aria-hidden />
            Previous
          </LinkStatus>
        </FastLink>
      ) : (
        <span {...stylex.props(styles.step, styles.disabled)} aria-disabled>
          <ChevronLeft {...stylex.props(styles.icon)} aria-hidden />
          Previous
        </span>
      )}

      <p {...stylex.props(styles.status)}>
        <span {...stylex.props(styles.statusSummary)}>
          <span {...stylex.props(styles.statusCount)}>{totalResults.toLocaleString()}</span> books
        </span>
        <span {...stylex.props(styles.divider)} aria-hidden />
        <span>
          Page {currentPage.toLocaleString()} of {totalPages.toLocaleString()}
        </span>
      </p>

      {hasNext ? (
        <FastLink
          {...stylex.props(styles.step)}
          aria-label="Next page"
          href={buildHref(withPage(searchParams, currentPage + 1))}
          prefetch={true}
        >
          <LinkStatus hint="start">
            Next
            <ChevronRight {...stylex.props(styles.icon)} aria-hidden />
          </LinkStatus>
        </FastLink>
      ) : (
        <span {...stylex.props(styles.step, styles.disabled)} aria-disabled>
          Next
          <ChevronRight {...stylex.props(styles.icon)} aria-hidden />
        </span>
      )}
    </nav>
  );
}

export function BookPaginationSkeleton() {
  return (
    <section {...stylex.props(styles.root)} aria-hidden>
      <span {...stylex.props(styles.step, styles.disabled)}>
        <ChevronLeft {...stylex.props(styles.icon)} />
        Previous
      </span>
      <section {...stylex.props(styles.skeletonStatus)}>
        <Skeleton subtle xstyle={[styles.skeleton, styles.statusSummary]} />
        <span {...stylex.props(styles.divider)} />
        <Skeleton subtle xstyle={styles.skeleton} />
      </section>
      <span {...stylex.props(styles.step, styles.disabled)}>
        Next
        <ChevronRight {...stylex.props(styles.icon)} />
      </span>
    </section>
  );
}
