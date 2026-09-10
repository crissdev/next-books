import * as stylex from '@stylexjs/stylex';
import { HoverPrefetchLink } from '@/components/ui/hover-prefetch-link';
import type { BookSummary } from '@/features/book/book-queries';
import { BookCover, BookCoverSkeleton } from '@/features/book/components/book-cover';
import { buildHref } from '@/lib/url-state';
import type { SearchParams } from '@/lib/url-state';
import { colors, radii, shadows } from '@/styles/tokens.stylex';
import type { Route } from 'next';

const GRID_SIZES =
  '(min-width: 1280px) 14vw, (min-width: 1024px) 16vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, 33vw';

const styles = stylex.create({
  link: {
    borderRadius: radii.md,
    boxShadow: {
      ':hover': { '@media (hover: hover)': shadows.soft },
      default: 'none',
    },
    display: 'block',
    outline: { ':focus-visible': 'none' },
    outlineColor: { ':focus-visible': colors.action },
    outlineOffset: { ':focus-visible': 2 },
    outlineStyle: { ':focus-visible': 'solid' },
    outlineWidth: { ':focus-visible': 2 },
    position: 'relative',
    transform: {
      ':hover': { '@media (hover: hover)': 'scale(1.04)' },
      default: 'none',
    },
    transitionDuration: '200ms',
    transitionProperty: 'transform, box-shadow',
    transitionTimingFunction: 'ease-out',
    zIndex: {
      ':hover': { '@media (hover: hover)': 10 },
      default: 0,
    },
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

type Props = {
  book: BookSummary;
  eagerPrefetch: boolean;
  priority: boolean;
  searchParams: SearchParams;
};

export function BookCard({ book, eagerPrefetch, priority, searchParams }: Props) {
  const back = buildHref(searchParams);
  const href = (back === '/' ? `/${book.id}` : `/${book.id}?${back.slice(2)}`) as Route;

  return (
    <HoverPrefetchLink {...stylex.props(styles.link)} eager={eagerPrefetch} href={href}>
      <BookCover
        priority={priority}
        sizes={GRID_SIZES}
        src={book.image_url}
        thumbhash={book.thumbhash}
        title={book.title}
      />
      <span {...stylex.props(styles.srOnly)}>{book.title}</span>
    </HoverPrefetchLink>
  );
}

export function BookCardSkeleton() {
  return <BookCoverSkeleton />;
}
