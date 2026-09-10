import { EmptyState } from '@astryxdesign/core/EmptyState';
import { Icon } from '@astryxdesign/core/Icon';
import * as stylex from '@stylexjs/stylex';
import { AlertTriangle } from 'lucide-react';
import { spacing } from '@/styles/tokens.stylex';
import type { ReactNode } from 'react';

type Props = {
  title?: string;
  body?: string;
  compact?: boolean;
  children?: ReactNode;
};

const styles = stylex.create({
  compact: {
    paddingBlock: spacing.six,
    paddingInline: spacing.four,
  },
  root: {
    flex: 1,
    paddingBlock: spacing.twenty,
    paddingInline: spacing.six,
  },
});

export function ErrorState({ body, children, compact = false, title }: Props) {
  return (
    <EmptyState
      actions={children}
      description={body}
      headingLevel={2}
      icon={<Icon color="error" icon={AlertTriangle} size={compact ? 'sm' : 'lg'} />}
      isCompact={compact}
      title={title ?? 'Something went wrong'}
      xstyle={[styles.root, compact && styles.compact]}
    />
  );
}
