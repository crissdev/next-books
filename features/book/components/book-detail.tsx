import * as stylex from '@stylexjs/stylex';
import { BookOpen, Building2, CalendarDays, Globe, Hash } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { StarRating } from '@/components/ui/star-rating';
import { getBookById } from '@/features/book/book-queries';
import { formatCount, getLanguageLabel } from '@/features/book/book-utils';
import { BookCover, BookCoverSkeleton } from '@/features/book/components/book-cover';
import { colors, fonts, spacing, typography } from '@/styles/tokens.stylex';
import type { ReactNode } from 'react';

const DETAIL_SIZES = '(min-width: 768px) 18rem, 60vw';

const styles = stylex.create({
  author: {
    color: colors.muted,
    fontSize: {
      '@media (min-width: 640px)': typography.large,
      default: typography.base,
    },
    marginBlockEnd: 0,
    marginBlockStart: spacing.two,
  },
  content: { flex: 1, minWidth: 0 },
  cover: {
    boxShadow:
      '0 2px 8px -2px rgb(24 24 27 / 0.12), 0 4px 16px -4px rgb(24 24 27 / 0.1), 0 0 0 1px light-dark(rgb(228 228 231 / 0.7), rgb(40 40 40 / 0.7))',
  },
  coverColumn: {
    flexShrink: 0,
    marginInline: {
      '@media (min-width: 768px)': 0,
      default: 'auto',
    },
    width: {
      '@media (min-width: 640px)': '12rem',
      '@media (min-width: 768px)': '18rem',
      default: '10rem',
    },
  },
  description: {
    color: colors.muted,
    fontSize: typography.small,
    lineHeight: '1.75rem',
    marginBlockEnd: 0,
    marginBlockStart: spacing.six,
    maxWidth: '65ch',
  },
  fact: {
    alignItems: 'flex-start',
    display: 'flex',
    gap: spacing.three,
  },
  factContent: { minWidth: 0 },
  factIcon: {
    color: colors.muted,
    flexShrink: 0,
    marginTop: spacing.half,
  },
  factLabel: {
    color: colors.muted,
    fontSize: typography.tiny,
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },
  factValue: {
    fontSize: typography.small,
    marginTop: spacing.half,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  facts: {
    borderBlockStartColor: colors.divider,
    borderBlockStartStyle: 'solid',
    borderBlockStartWidth: 1,
    columnGap: spacing.eight,
    display: 'grid',
    gridTemplateColumns: {
      '@media (min-width: 640px)': 'repeat(2, minmax(0, 1fr))',
      default: 'minmax(0, 1fr)',
    },
    marginTop: spacing.eight,
    paddingTop: spacing.six,
    rowGap: spacing.four,
  },
  icon: { height: '1rem', width: '1rem' },
  isbn: { fontFamily: fonts.mono, fontSize: typography.tiny },
  rating: {
    alignItems: 'center',
    columnGap: spacing.three,
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: spacing.four,
    rowGap: spacing.one,
  },
  ratingCount: {
    color: colors.muted,
    fontSize: typography.small,
    fontVariantNumeric: 'tabular-nums',
  },
  ratingNumber: {
    fontSize: typography.small,
    fontVariantNumeric: 'tabular-nums',
    fontWeight: 600,
  },
  root: {
    display: 'flex',
    flexDirection: {
      '@media (min-width: 768px)': 'row',
      default: 'column',
    },
    gap: {
      '@media (min-width: 768px)': spacing.ten,
      default: spacing.eight,
    },
  },
  skeletonAuthor: { height: '1.25rem', marginTop: spacing.three, width: '10rem' },
  skeletonDescription: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.twoAndHalf,
    marginTop: spacing.six,
  },
  skeletonFactContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: spacing.oneAndHalf,
    minWidth: 0,
  },
  skeletonFactIcon: {
    borderRadius: '0.25rem',
    height: '1rem',
    marginTop: spacing.half,
    width: '1rem',
  },
  skeletonFactLabel: { height: '0.75rem', width: '4rem' },
  skeletonFactValue: { height: '1rem', width: '6rem' },
  skeletonLine: { height: '0.875rem', maxWidth: '65ch', width: '100%' },
  skeletonRating: { height: '1rem', marginTop: spacing.five, width: '14rem' },
  skeletonShortLine: { width: '80%' },
  skeletonTitle: { height: '2rem', maxWidth: '28rem', width: '75%' },
  title: {
    color: colors.text,
    fontFamily: fonts.sans,
    fontSize: {
      '@media (min-width: 640px)': typography.threeXl,
      default: typography.twoXl,
    },
    fontWeight: 600,
    letterSpacing: '-0.02em',
    lineHeight: {
      '@media (min-width: 640px)': '2.25rem',
      default: '2rem',
    },
    margin: 0,
  },
});

export async function BookDetail({ id }: { id: string }) {
  const book = await getBookById(id);
  const rating = Number(book.average_rating);
  const hasRating = book.average_rating !== null && !Number.isNaN(rating);

  return (
    <article {...stylex.props(styles.root)}>
      <section {...stylex.props(styles.coverColumn)}>
        <BookCover
          priority
          sizes={DETAIL_SIZES}
          src={book.image_url}
          thumbhash={book.thumbhash}
          title={book.title}
          xstyle={styles.cover}
        />
      </section>

      <section {...stylex.props(styles.content)}>
        <h1 {...stylex.props(styles.title)}>{book.title}</h1>
        {book.authors.length > 0 ? <p {...stylex.props(styles.author)}>{book.authors.join(', ')}</p> : null}

        {hasRating ? (
          <section {...stylex.props(styles.rating)}>
            <StarRating rating={rating} />
            <span {...stylex.props(styles.ratingNumber)}>{rating.toFixed(1)}</span>
            {book.ratings_count ? (
              <span {...stylex.props(styles.ratingCount)}>{formatCount(book.ratings_count)} ratings</span>
            ) : null}
          </section>
        ) : null}

        {book.description ? <p {...stylex.props(styles.description)}>{book.description}</p> : null}

        <dl {...stylex.props(styles.facts)}>
          <Fact icon={<BookOpen {...stylex.props(styles.icon)} aria-hidden />} label="Pages">
            {book.num_pages ? book.num_pages.toLocaleString() : 'Unknown'}
          </Fact>
          <Fact icon={<Globe {...stylex.props(styles.icon)} aria-hidden />} label="Language">
            {getLanguageLabel(book.language_code)}
          </Fact>
          <Fact icon={<CalendarDays {...stylex.props(styles.icon)} aria-hidden />} label="Published">
            {book.publication_year ?? 'Unknown'}
          </Fact>
          <Fact icon={<Building2 {...stylex.props(styles.icon)} aria-hidden />} label="Publisher">
            {book.publisher ?? 'Unknown'}
          </Fact>
          <Fact icon={<Hash {...stylex.props(styles.icon)} aria-hidden />} label="ISBN">
            <span {...stylex.props(styles.isbn)}>{book.isbn ?? 'None'}</span>
          </Fact>
        </dl>
      </section>
    </article>
  );
}

function Fact({ children, icon, label }: { children: ReactNode; icon: ReactNode; label: string }) {
  return (
    <section {...stylex.props(styles.fact)}>
      <span {...stylex.props(styles.factIcon)}>{icon}</span>
      <section {...stylex.props(styles.factContent)}>
        <dt {...stylex.props(styles.factLabel)}>{label}</dt>
        <dd {...stylex.props(styles.factValue)}>{children}</dd>
      </section>
    </section>
  );
}

export function BookDetailSkeleton() {
  return (
    <section {...stylex.props(styles.root)} aria-hidden>
      <section {...stylex.props(styles.coverColumn)}>
        <BookCoverSkeleton />
      </section>
      <section {...stylex.props(styles.content)}>
        <Skeleton subtle xstyle={styles.skeletonTitle} />
        <Skeleton subtle xstyle={styles.skeletonAuthor} />
        <Skeleton subtle xstyle={styles.skeletonRating} />
        <section {...stylex.props(styles.skeletonDescription)}>
          <Skeleton subtle xstyle={styles.skeletonLine} />
          <Skeleton subtle xstyle={styles.skeletonLine} />
          <Skeleton subtle xstyle={[styles.skeletonLine, styles.skeletonShortLine]} />
        </section>
        <section {...stylex.props(styles.facts)}>
          {Array.from({ length: 5 }).map((_, index) => (
            <section {...stylex.props(styles.fact)} key={index}>
              <Skeleton subtle xstyle={styles.skeletonFactIcon} />
              <section {...stylex.props(styles.skeletonFactContent)}>
                <Skeleton subtle xstyle={styles.skeletonFactLabel} />
                <Skeleton subtle xstyle={styles.skeletonFactValue} />
              </section>
            </section>
          ))}
        </section>
      </section>
    </section>
  );
}
