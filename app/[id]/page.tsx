import * as stylex from '@stylexjs/stylex';
import { AnimatedSuspense } from '@/components/ui/animated-suspense';
import ErrorBoundary from '@/components/ui/error-boundary';
import { getBookById } from '@/features/book/book-queries';
import { BackToBooksLink } from '@/features/book/components/back-to-books-link';
import { BookDetail, BookDetailSkeleton } from '@/features/book/components/book-detail';
import { spacing } from '@/styles/tokens.stylex';
import type { Metadata } from 'next';

const styles = stylex.create({
  back: { marginBottom: spacing.six },
  page: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    paddingBlock: spacing.five,
    paddingInline: {
      '@media (min-width: 640px)': spacing.six,
      default: spacing.four,
    },
  },
});

export async function generateMetadata({ params }: PageProps<'/[id]'>): Promise<Metadata> {
  const { id } = await params;
  const book = await getBookById(id);
  return { description: book.description ?? undefined, title: book.title };
}

export default function Page({ params }: PageProps<'/[id]'>) {
  return (
    <section {...stylex.props(styles.page)}>
      <BackToBooksLink xstyle={styles.back} />
      <ErrorBoundary body="We couldn't load this book's details." title="Can't load book">
        <section>
          <AnimatedSuspense fallback={<BookDetailSkeleton />}>
            {params.then(({ id }) => (
              <BookDetail id={id} />
            ))}
          </AnimatedSuspense>
        </section>
      </ErrorBoundary>
    </section>
  );
}
