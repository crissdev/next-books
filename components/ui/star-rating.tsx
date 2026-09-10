import * as stylex from '@stylexjs/stylex';
import { Star } from 'lucide-react';
import { colors, spacing } from '@/styles/tokens.stylex';
import type { StyleXStyles } from '@stylexjs/stylex';

const styles = stylex.create({
  empty: { color: colors.divider },
  filled: { color: colors.warning },
  root: {
    alignItems: 'center',
    display: 'inline-flex',
    gap: spacing.half,
  },
  star: {
    fill: 'currentColor',
    height: '1rem',
    width: '1rem',
  },
});

export function StarRating({ rating, xstyle }: { rating: number; xstyle?: StyleXStyles }) {
  const rounded = Math.round(rating * 2) / 2;

  return (
    <span {...stylex.props(styles.root, xstyle)} aria-label={`Rated ${rating.toFixed(1)} out of 5`} role="img">
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index + 1 <= rounded;
        const half = !filled && index + 0.5 === rounded;
        return (
          <Star
            {...stylex.props(styles.star, filled || half ? styles.filled : styles.empty)}
            aria-hidden
            key={index}
            strokeWidth={0}
          />
        );
      })}
    </span>
  );
}
