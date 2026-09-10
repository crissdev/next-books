import * as stylex from '@stylexjs/stylex';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Suspense } from 'react';
import { BookMark } from '@/components/book-mark';
import { MobileBookSidebar, MobileBookSidebarTrigger } from '@/components/mobile-book-sidebar';
import { OfflineIndicator } from '@/components/offline-indicator';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Toaster } from '@/components/toaster';
import ErrorBoundary from '@/components/ui/error-boundary';
import { FastLink } from '@/components/ui/fast-link';
import { GitHubIcon } from '@/components/ui/github-icon';
import { BookFilters, BookFiltersFallback } from '@/features/book/components/book-filters';
import { BookSearch } from '@/features/book/components/book-search';
import { CatalogSize } from '@/features/book/components/catalog-size';
import { colors, fonts, spacing, typography } from '@/styles/tokens.stylex';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

const geistSans = Geist({
  display: 'block',
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  display: 'block',
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

const description =
  'Browse two million Goodreads books with Next.js 16.3 Instant Navigations, streaming search, and URL-driven filters.';

export const viewport: Viewport = {
  themeColor: [
    { color: '#fafafa', media: '(prefers-color-scheme: light)' },
    { color: '#121212', media: '(prefers-color-scheme: dark)' },
  ],
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  description,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : 'http://localhost:3000'),
  ),
  openGraph: {
    description,
    siteName: 'NextBooks',
    title: 'NextBooks',
    type: 'website',
  },
  title: { default: 'NextBooks', template: '%s · NextBooks' },
};

const styles = stylex.create({
  body: {
    WebkitFontSmoothing: 'antialiased',
    backgroundColor: colors.surface,
    color: colors.text,
    fontFamily: fonts.sans,
  },
  catalog: {
    borderBlockEndColor: colors.divider,
    borderBlockEndStyle: 'solid',
    borderBlockEndWidth: 1,
    marginTop: spacing.six,
    paddingBottom: spacing.five,
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    minWidth: 0,
  },
  filterLabel: {
    color: colors.muted,
    fontSize: typography.tiny,
    fontWeight: 600,
    letterSpacing: '0.04em',
    marginBlockEnd: spacing.four,
    marginBlockStart: spacing.five,
    textTransform: 'uppercase',
  },
  githubLink: {
    borderRadius: '9999px',
    color: {
      ':hover': { '@media (hover: hover)': colors.text },
      default: colors.muted,
    },
    padding: spacing.oneAndHalf,
    transitionDuration: '150ms',
    transitionProperty: 'color',
    transitionTimingFunction: 'ease',
  },
  header: {
    alignItems: 'center',
    backdropFilter: 'blur(12px) saturate(1.5)',
    backgroundColor: 'light-dark(rgb(250 250 250 / 0.8), rgb(18 18 18 / 0.8))',
    borderBlockEndColor: colors.divider,
    borderBlockEndStyle: 'solid',
    borderBlockEndWidth: 1,
    display: 'flex',
    gap: {
      '@media (min-width: 640px)': spacing.three,
      default: spacing.two,
    },
    paddingBlock: spacing.three,
    paddingInline: {
      '@media (min-width: 640px)': spacing.six,
      default: spacing.four,
    },
    position: 'sticky',
    top: 0,
    viewTransitionName: 'site-header',
    zIndex: 20,
  },
  homeLink: {
    alignItems: 'center',
    color: colors.text,
    display: 'inline-flex',
    fontSize: typography.base,
    fontWeight: 600,
    gap: spacing.two,
    letterSpacing: '-0.02em',
    textDecoration: 'none',
  },
  logo: {
    color: colors.action,
    height: '1.25rem',
    width: '1.25rem',
  },
  main: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    minWidth: 0,
  },
  shell: {
    display: 'flex',
    minHeight: '100dvh',
  },
  sidebar: {
    backgroundColor: colors.surface,
    borderColor: colors.divider,
    borderInlineEndStyle: 'solid',
    borderInlineEndWidth: 1,
    display: {
      '@media (min-width: 768px)': 'flex',
      default: 'none',
    },
    flexDirection: 'column',
    flexShrink: 0,
    height: '100dvh',
    padding: spacing.five,
    position: 'sticky',
    top: 0,
    viewTransitionName: 'sidebar',
    width: '18rem',
  },
  sidebarFooter: {
    alignItems: 'center',
    borderBlockStartColor: colors.divider,
    borderBlockStartStyle: 'solid',
    borderBlockStartWidth: 1,
    display: 'flex',
    gap: spacing.two,
    justifyContent: 'space-between',
    marginTop: spacing.four,
    paddingTop: spacing.four,
  },
  sidebarTitle: {
    alignItems: 'center',
    display: 'flex',
    gap: spacing.two,
    justifyContent: 'space-between',
  },
  smallIcon: { height: '1rem', width: '1rem' },
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable}`}
      data-astryx-theme="neutral"
      lang="en"
      suppressHydrationWarning
    >
      <body {...stylex.props(styles.body)}>
        <ThemeProvider>
          <MobileBookSidebar sidebar={<BookSidebarContent idPrefix="mobile" mobile />}>
            <section {...stylex.props(styles.shell)} data-app-shell>
              <aside {...stylex.props(styles.sidebar)}>
                <BookSidebarContent idPrefix="desktop" />
              </aside>

              <section {...stylex.props(styles.content)}>
                <header {...stylex.props(styles.header)}>
                  <MobileBookSidebarTrigger />
                  <BookSearch />
                </header>

                <main {...stylex.props(styles.main)}>{children}</main>
              </section>
            </section>
          </MobileBookSidebar>
          <OfflineIndicator />
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

function BookSidebarContent({ idPrefix, mobile = false }: { idPrefix: string; mobile?: boolean }) {
  return (
    <>
      <header {...stylex.props(styles.sidebarTitle)}>
        <FastLink {...stylex.props(styles.homeLink)} aria-label="NextBooks home" href="/" prefetch={true}>
          <BookMark xstyle={styles.logo} />
          NextBooks
        </FastLink>
      </header>
      <section {...stylex.props(styles.catalog)}>
        <CatalogSize />
      </section>
      <p {...stylex.props(styles.filterLabel)}>Filters</p>
      <ErrorBoundary compact title="Filters unavailable">
        <Suspense fallback={<BookFiltersFallback idPrefix={idPrefix} />}>
          <BookFilters idPrefix={idPrefix} />
        </Suspense>
      </ErrorBoundary>
      {mobile ? null : (
        <footer {...stylex.props(styles.sidebarFooter)}>
          <ThemeToggle />
          <a
            {...stylex.props(styles.githubLink)}
            aria-label="View source on GitHub"
            href="https://github.com/vercel-labs/next-books"
            rel="noopener noreferrer"
            target="_blank"
          >
            <GitHubIcon xstyle={styles.smallIcon} />
          </a>
        </footer>
      )}
    </>
  );
}
