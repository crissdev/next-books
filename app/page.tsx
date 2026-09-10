import * as stylex from '@stylexjs/stylex';
import { Suspense } from 'react';
import { AnimatedSuspense } from '@/components/ui/animated-suspense';
import ErrorBoundary from '@/components/ui/error-boundary';
import { getBooksPage } from '@/features/book/book-queries';
import { toBookQuery } from '@/features/book/book-utils';
import { BookGrid, BookGridSkeleton } from '@/features/book/components/book-grid';
import { BookPagination, BookPaginationSkeleton } from '@/features/book/components/book-pagination';
import { parseSearchParams } from '@/lib/url-state';
import type { SearchParams } from '@/lib/url-state';
import { colors, spacing } from '@/styles/tokens.stylex';

const styles = stylex.create({
  footer: {
    borderBlockStartColor: colors.divider,
    borderBlockStartStyle: 'solid',
    borderBlockStartWidth: 1,
    marginTop: 'auto',
    paddingBlock: spacing.three,
    paddingInline: {
      '@media (min-width: 640px)': spacing.six,
      default: spacing.four,
    },
  },
  results: {
    flex: 1,
    paddingBlock: spacing.five,
    paddingInline: {
      '@media (min-width: 640px)': spacing.six,
      default: spacing.four,
    },
    transitionDuration: '200ms',
    transitionProperty: 'opacity',
    transitionTimingFunction: 'ease-out',
  },
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    minHeight: 0,
  },
});

export default function Page({ searchParams }: PageProps<'/'>) {
  return (
    <ErrorBoundary
      body="The catalog query failed. Check your database connection and try again."
      title="Can't load books"
    >
      <section {...stylex.props(styles.root)}>
        <section {...stylex.props(styles.results)} data-book-results>
          <AnimatedSuspense fallback={<BookGridSkeleton />}>
            {searchParams.then(params => (
              <BookResults searchParams={parseSearchParams(params)} />
            ))}
          </AnimatedSuspense>
        </section>
        <footer {...stylex.props(styles.footer)}>
          <Suspense fallback={<BookPaginationSkeleton />}>
            {searchParams.then(params => (
              <BookPagination searchParams={parseSearchParams(params)} />
            ))}
          </Suspense>
        </footer>
      </section>
    </ErrorBoundary>
  );
}

async function BookResults({ searchParams }: { searchParams: SearchParams }) {
  const books = await getBooksPage(toBookQuery(searchParams));

  return <BookGrid books={books} searchParams={searchParams} />;
}
