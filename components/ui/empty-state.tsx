import { EmptyState as AstryxEmptyState } from '@astryxdesign/core/EmptyState';
import * as stylex from '@stylexjs/stylex';
import { BookMark } from '@/components/book-mark';
import { spacing } from '@/styles/tokens.stylex';
import type { ReactNode } from 'react';

type Props = {
  title: string;
  body?: string;
  children?: ReactNode;
};

const styles = stylex.create({
  icon: {
    height: '2.5rem',
    width: '2.5rem',
  },
  root: {
    flex: 1,
    paddingBlock: spacing.twenty,
    paddingInline: spacing.six,
  },
});

export function EmptyState({ body, children, title }: Props) {
  return (
    <AstryxEmptyState
      actions={children}
      description={body}
      headingLevel={2}
      icon={<BookMark animated xstyle={styles.icon} />}
      title={title}
      xstyle={styles.root}
    />
  );
}
