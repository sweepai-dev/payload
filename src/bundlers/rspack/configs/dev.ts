import { Configuration } from '@rspack/core';
import { getBaseConfig } from './base';
import { SanitizedConfig } from '../../../config/types';

export const getDevConfig = (payloadConfig: SanitizedConfig): Configuration => {
  const baseConfig = getBaseConfig(payloadConfig) as any;

  const rspackConfig: Configuration = {
    ...baseConfig,
    mode: 'development',
    devServer: {
      devMiddleware: {},
    },
    cache: true,
    entry: {
      ...baseConfig.entry,
      main: [
        // require.resolve('webpack-hot-middleware/client'),
        ...(baseConfig.entry.main as string[]),
      ],
    },
    output: {
      publicPath: payloadConfig.routes.admin,
      path: '/',
      filename: '[name].js',
    },
    devtool: 'inline-source-map',
    stats: 'errors-warnings',
    plugins: [
      ...(baseConfig.plugins || []),
      // new webpack.HotModuleReplacementPlugin(),
    ],
  };

  rspackConfig.module.rules.push({
    test: /\.(scss|css)$/,
    sideEffects: true,
    type: 'css',
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          url: (url) => (!url.startsWith('/')),
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          postcssOptions: {
            plugins: [require.resolve('postcss-preset-env')],
          },
        },
      },
      {
        loader: 'sass-loader',
      },
    ],
  });

  return rspackConfig;
};
