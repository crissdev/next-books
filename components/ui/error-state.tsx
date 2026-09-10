import * as stylex from '@stylexjs/stylex';
import { AlertTriangle } from 'lucide-react';
import { colors, spacing, typography } from '@/styles/tokens.stylex';
import type { ReactNode } from 'react';

type Props = {
  title?: string;
  body?: string;
  compact?: boolean;
  children?: ReactNode;
};

const styles = stylex.create({
  body: {
    color: colors.muted,
    fontSize: typography.small,
    lineHeight: '1.5rem',
    margin: 0,
  },
  compact: {
    gap: spacing.two,
    paddingBlock: spacing.six,
    paddingInline: spacing.four,
  },
  compactBody: {
    fontSize: typography.tiny,
    lineHeight: '1.25rem',
  },
  compactContent: { gap: spacing.two },
  compactIcon: {
    height: '1rem',
    width: '1rem',
  },
  compactText: { fontSize: typography.tiny },
  content: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.three,
    maxWidth: '24rem',
  },
  icon: {
    color: colors.danger,
    height: '1.5rem',
    width: '1.5rem',
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: spacing.three,
    justifyContent: 'center',
    paddingBlock: spacing.twenty,
    paddingInline: spacing.six,
    textAlign: 'center',
  },
  title: {
    color: colors.text,
    fontSize: typography.small,
    fontWeight: 500,
    margin: 0,
  },
});

export function ErrorState({ body, children, compact = false, title }: Props) {
  return (
    <section {...stylex.props(styles.root, compact && styles.compact)}>
      <section {...stylex.props(styles.content, compact && styles.compactContent)}>
        <AlertTriangle aria-hidden {...stylex.props(styles.icon, compact && styles.compactIcon)} />
        <p {...stylex.props(styles.title, compact && styles.compactText)}>{title ?? 'Something went wrong'}</p>
        {body ? <p {...stylex.props(styles.body, compact && styles.compactBody)}>{body}</p> : null}
        {children}
      </section>
    </section>
  );
}
