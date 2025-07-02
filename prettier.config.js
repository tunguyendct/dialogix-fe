const config = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '^react$',
    '<THIRD_PARTY_MODULES>',
    '^@/.*', // alias
    '^[./].*$', // relative imports
    '^.+\\.css$',
  ],
  importOrderSortSpecifiers: true,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  tabWidth: 2,
};
export default config;
