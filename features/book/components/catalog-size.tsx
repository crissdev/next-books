import * as stylex from '@stylexjs/stylex';
import { colors, spacing, typography } from '@/styles/tokens.stylex';

const styles = stylex.create({
  count: {
    fontSize: typography.twoXl,
    fontVariantNumeric: 'tabular-nums',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    lineHeight: typography.twoXlLineHeight,
    margin: 0,
  },
  description: {
    color: colors.muted,
    fontSize: typography.tiny,
    lineHeight: '1.25rem',
    marginBlockEnd: 0,
    marginBlockStart: spacing.one,
  },
});

export function CatalogSize() {
  return (
    <section>
      <p {...stylex.props(styles.count)}>2M+</p>
      <p {...stylex.props(styles.description)}>books from Goodreads. Built on Next.js 16.3 Instant Navigations.</p>
    </section>
  );
}
