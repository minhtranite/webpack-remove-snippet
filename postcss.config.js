const flexBugsFixes = require('postcss-flexbugs-fixes');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = ({ env }) => {
  const PROD = env === 'production';
  return {
    plugins: [
      flexBugsFixes(),
      autoprefixer(),
      ...(PROD
        ? [
            cssnano({
              preset: ['default', { cssDeclarationSorter: false }],
            }),
          ]
        : []),
    ],
  };
};
