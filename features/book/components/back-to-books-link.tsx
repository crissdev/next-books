'use client';

import * as stylex from '@stylexjs/stylex';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { colors, radii, spacing, typography } from '@/styles/tokens.stylex';
import type { StyleXStyles } from '@stylexjs/stylex';

const styles = stylex.create({
  icon: { height: '1rem', width: '1rem' },
  link: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: {
      ':hover': { '@media (hover: hover)': colors.card },
      default: 'transparent',
    },
    border: 0,
    borderRadius: radii.full,
    color: {
      ':hover': { '@media (hover: hover)': colors.text },
      default: colors.muted,
    },
    display: 'inline-flex',
    fontSize: typography.small,
    fontWeight: 500,
    gap: spacing.two,
    marginInlineStart: '-0.375rem',
    paddingBlock: spacing.oneAndHalf,
    paddingInline: spacing.three,
    transitionDuration: '150ms',
    transitionProperty: 'background-color, color',
    transitionTimingFunction: 'ease',
    width: 'fit-content',
  },
});

export function BackToBooksLink({ xstyle }: { xstyle?: StyleXStyles }) {
  const router = useRouter();

  return (
    <button
      {...stylex.props(styles.link, xstyle)}
      onClick={() => (window.navigation?.canGoBack ? router.back() : router.push('/'))}
      type="button"
    >
      <ArrowLeft {...stylex.props(styles.icon)} aria-hidden />
      Back to books
    </button>
  );
}
