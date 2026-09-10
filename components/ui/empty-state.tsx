import * as stylex from '@stylexjs/stylex';
import { BookMark } from '@/components/book-mark';
import { colors, spacing, typography } from '@/styles/tokens.stylex';
import type { ReactNode } from 'react';

type Props = {
  title: string;
  body?: string;
  children?: ReactNode;
};

const styles = stylex.create({
  body: {
    color: colors.muted,
    fontSize: typography.small,
    lineHeight: '1.5rem',
    margin: 0,
  },
  content: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.three,
    maxWidth: '24rem',
  },
  icon: {
    height: '2.5rem',
    marginBottom: spacing.one,
    width: '2.5rem',
  },
  root: {
    display: 'grid',
    flex: 1,
    paddingBlock: spacing.twenty,
    paddingInline: spacing.six,
    placeItems: 'center',
    textAlign: 'center',
  },
  title: {
    color: colors.text,
    fontSize: typography.small,
    fontWeight: 500,
    margin: 0,
  },
});

export function EmptyState({ body, children, title }: Props) {
  return (
    <section {...stylex.props(styles.root)}>
      <section {...stylex.props(styles.content)}>
        <BookMark animated xstyle={styles.icon} />
        <p {...stylex.props(styles.title)}>{title}</p>
        {body ? <p {...stylex.props(styles.body)}>{body}</p> : null}
        {children}
      </section>
    </section>
  );
}
