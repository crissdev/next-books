'use client';

import * as stylex from '@stylexjs/stylex';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { FastLink } from '@/components/ui/fast-link';
import { spacing } from '@/styles/tokens.stylex';

const styles = stylex.create({ action: { marginTop: spacing.one } });

export default function NotFound() {
  return (
    <EmptyState body="That page isn't in the catalog." title="Page not found">
      <Button render={<FastLink href="/" />} variant="secondary" xstyle={styles.action}>
        Back to the shelf
      </Button>
    </EmptyState>
  );
}
