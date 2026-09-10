import * as stylex from '@stylexjs/stylex';
import { EmptyState } from '@/components/ui/empty-state';
import { ITEMS_PER_PAGE } from '@/features/book/book-constants';
import type { BookSummary } from '@/features/book/book-queries';
import { BookCard, BookCardSkeleton } from '@/features/book/components/book-card';
import { getCurrentPage, type SearchParams } from '@/lib/url-state';
import { spacing } from '@/styles/tokens.stylex';

const styles = stylex.create({
  grid: {
    display: 'grid',
    gap: spacing.four,
    gridTemplateColumns: {
      '@media (min-width: 1024px)': 'repeat(6, minmax(0, 1fr))',
      '@media (min-width: 1280px)': 'repeat(7, minmax(0, 1fr))',
      '@media (min-width: 640px)': 'repeat(4, minmax(0, 1fr))',
      '@media (min-width: 768px)': 'repeat(5, minmax(0, 1fr))',
      default: 'repeat(3, minmax(0, 1fr))',
    },
  },
});

export function BookGrid({ books, searchParams }: { books: BookSummary[]; searchParams: SearchParams }) {
  if (books.length === 0) {
    return (
      <EmptyState
        body="Nothing matched these filters. Try widening the year range or clearing the search."
        title="No books found"
      />
    );
  }

  const eagerPrefetch = getCurrentPage(searchParams) === 1;

  return (
    <section {...stylex.props(styles.grid)}>
      {books.map((book, index) => (
        <BookCard
          book={book}
          eagerPrefetch={eagerPrefetch}
          key={book.id}
          priority={index < 10}
          searchParams={searchParams}
        />
      ))}
    </section>
  );
}

export function BookGridSkeleton({ count = ITEMS_PER_PAGE }: { count?: number }) {
  return (
    <section {...stylex.props(styles.grid)} aria-hidden>
      {Array.from({ length: count }).map((_, index) => (
        <BookCardSkeleton key={index} />
      ))}
    </section>
  );
}
