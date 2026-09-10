import * as stylex from '@stylexjs/stylex';
import Image from 'next/image';
import { createPngDataUri } from 'unlazy/thumbhash';
import { Skeleton } from '@/components/ui/skeleton';
import { EMPTY_IMAGE_URL, getLargeBookImageUrl } from '@/features/book/book-constants';
import { colors, radii } from '@/styles/tokens.stylex';
import type { StyleXStyles } from '@stylexjs/stylex';

type Props = {
  title: string;
  src: string | null;
  thumbhash: string | null;
  sizes: string;
  priority?: boolean;
  xstyle?: StyleXStyles;
};

const styles = stylex.create({
  cover: {
    aspectRatio: '2 / 3',
    backgroundColor: colors.card,
    borderRadius: radii.md,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  image: { objectFit: 'cover' },
});

export function BookCover({ priority, sizes, src, thumbhash, title, xstyle }: Props) {
  return (
    <section {...stylex.props(styles.cover, xstyle)}>
      <Image
        {...stylex.props(styles.image)}
        alt={title}
        blurDataURL={thumbhash ? createPngDataUri(thumbhash) : undefined}
        fill
        placeholder={thumbhash ? 'blur' : 'empty'}
        priority={priority}
        sizes={sizes}
        src={getLargeBookImageUrl(src ?? EMPTY_IMAGE_URL)}
      />
    </section>
  );
}

export function BookCoverSkeleton({ xstyle }: { xstyle?: StyleXStyles }) {
  return <Skeleton subtle xstyle={[styles.cover, xstyle]} />;
}
