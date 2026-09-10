import * as stylex from '@stylexjs/stylex';

export const colors = stylex.defineVars({
  accent: 'light-dark(#2563eb, #3b82f6)',
  accentFade: 'light-dark(#2563eb22, #3b82f622)',
  action: 'light-dark(#2563eb, #3b82f6)',
  actionHover: 'light-dark(#1d4ed8, #2563eb)',
  card: 'light-dark(#f4f4f5, #181818)',
  danger: '#e54848',
  divider: 'light-dark(#e4e4e7, #282828)',
  focusAccent: 'light-dark(#2563eb40, #3b82f640)',
  focusAction: 'light-dark(#2563eb66, #3b82f666)',
  gray: '#a1a1aa',
  input: 'light-dark(#ffffff, #1c1c1c)',
  muted: '#71717a',
  overlay: 'rgb(0 0 0 / 0.45)',
  surface: 'light-dark(#fafafa, #121212)',
  text: 'light-dark(#000000, #ffffff)',
  warning: '#f5a524',
});

export const fonts = stylex.defineVars({
  mono: 'var(--font-geist-mono)',
  sans: 'var(--font-geist-sans)',
});

export const radii = stylex.defineVars({
  full: '9999px',
  lg: '0.75rem',
  md: '0.5rem',
  sm: '0.375rem',
  xs: '0.25rem',
});

export const shadows = stylex.defineVars({
  elevated: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  soft: '0 2px 8px -2px rgb(24 24 27 / 0.12), 0 4px 16px -4px rgb(24 24 27 / 0.1)',
});

export const spacing = stylex.defineVars({
  eight: '2rem',
  five: '1.25rem',
  four: '1rem',
  half: '0.125rem',
  one: '0.25rem',
  oneAndHalf: '0.375rem',
  six: '1.5rem',
  ten: '2.5rem',
  three: '0.75rem',
  threeAndHalf: '0.875rem',
  twenty: '5rem',
  two: '0.5rem',
  twoAndHalf: '0.625rem',
});

export const typography = stylex.defineVars({
  base: '1rem',
  hint: '0.6875rem',
  large: '1.125rem',
  small: '0.875rem',
  smallLineHeight: '1.25rem',
  threeXl: '1.875rem',
  tiny: '0.75rem',
  tinyLineHeight: '1rem',
  twoXl: '1.5rem',
  twoXlLineHeight: '2rem',
});
