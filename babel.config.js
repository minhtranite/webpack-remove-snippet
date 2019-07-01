module.exports = api => {
  const isTest = api.env('test');
  api.cache(true);
  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        modules: isTest ? 'commonjs' : false,
      },
    ],
    '@babel/react',
  ];
  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    'react-hot-loader/babel',
  ];
  return {
    presets,
    plugins,
  };
};
