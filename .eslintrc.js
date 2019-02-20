module.exports= {
  extends: ['eslint:recommended'],
  env: {
    node: true,
    browser: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }]
  }
}
