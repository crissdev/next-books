'use client';

import { Button } from '@astryxdesign/core/Button';
import * as stylex from '@stylexjs/stylex';
import { EmptyState } from '@/components/ui/empty-state';
import { FastLink } from '@/components/ui/fast-link';
import { spacing } from '@/styles/tokens.stylex';

const styles = stylex.create({ action: { marginTop: spacing.one } });

export default function NotFound() {
  return (
    <EmptyState body="That page isn't in the catalog." title="Page not found">
      <Button as={FastLink} href="/" label="Back to the shelf" variant="secondary" xstyle={styles.action} />
    </EmptyState>
  );
}
