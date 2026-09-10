'use client';

import { Button } from '@astryxdesign/core/Button';
import { catchError } from 'next/error';
import { ErrorState } from '@/components/ui/error-state';
import type { ErrorInfo } from 'next/error';

type Props = { title?: string; body?: string; compact?: boolean };

function ErrorFallback({ body, compact, title }: Props, { retry }: ErrorInfo) {
  return (
    <ErrorState body={body} compact={compact} title={title}>
      <Button label="Try again" onClick={() => retry()} size="sm" variant="secondary" />
    </ErrorState>
  );
}

export default catchError(ErrorFallback);
