'use client';

import * as stylex from '@stylexjs/stylex';
import { Button } from '@/components/ui/button';
import { ErrorState } from '@/components/ui/error-state';
import { spacing } from '@/styles/tokens.stylex';

const styles = stylex.create({ action: { marginTop: spacing.one } });

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <ErrorState body="We couldn't load this page. Please try again." title="Something went wrong">
      <Button onClick={reset} size="sm" variant="secondary" xstyle={styles.action}>
        Try again
      </Button>
    </ErrorState>
  );
}
