import withStylexTurbopack from '@stylexswc/nextjs-plugin/turbopack';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    inlineCss: true,
    useOffline: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: '*.gr-assets.com',
        port: '',
        protocol: 'https',
      },
    ],
  },
  partialPrefetching: true,
  reactCompiler: true,
  typedRoutes: true,
};

export default withStylexTurbopack({
  rsOptions: {
    aliases: { '@/*': ['./*'] },
    dev: process.env.NODE_ENV !== 'production',
    unstable_moduleResolution: { type: 'commonJS' },
  },
})(nextConfig);
