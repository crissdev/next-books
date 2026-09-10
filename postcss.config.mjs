const config = {
  plugins: {
    '@stylexswc/postcss-plugin': {
      include: ['app/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}', 'features/**/*.{ts,tsx}', 'styles/**/*.stylex.ts'],
      rsOptions: {
        aliases: { '@/*': ['./*'] },
        dev: process.env.NODE_ENV !== 'production',
        unstable_moduleResolution: { type: 'commonJS' },
      },
    },
  },
};

export default config;
