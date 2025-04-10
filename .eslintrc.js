module.exports = {
  extends: [
    'next/core-web-vitals',
    'next/typescript'
  ],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
}; 