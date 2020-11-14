module.exports = {
  root: true,
  extends: [
    'react-app',
    'react-app/jest',
    'airbnb',
    'airbnb/hooks',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'prettier',
    'prettier/react',
  ],
  plugins: ['jest'],
  env: {
    browser: true,
  },
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/jsx-curly-newline': 'off',
    'react/jsx-indent-props': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
