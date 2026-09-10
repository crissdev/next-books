'use client';

import { Button } from '@astryxdesign/core/Button';
import * as stylex from '@stylexjs/stylex';
import { ErrorState } from '@/components/ui/error-state';
import { spacing } from '@/styles/tokens.stylex';

const styles = stylex.create({ action: { marginTop: spacing.one } });

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <ErrorState body="We couldn't load this page. Please try again." title="Something went wrong">
      <Button label="Try again" onClick={reset} size="sm" variant="secondary" xstyle={styles.action} />
    </ErrorState>
  );
}
