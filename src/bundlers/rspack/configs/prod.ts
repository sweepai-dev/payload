import { Configuration, RspackPluginInstance } from '@rspack/core';
// import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { getBaseConfig } from './base';
import { SanitizedConfig } from '../../../config/types';

export const getProdConfig = (payloadConfig: SanitizedConfig): Configuration => {
  const baseConfig = getBaseConfig(payloadConfig) as any;

  const rspackConfig: Configuration = {
    ...baseConfig,
    mode: 'production',
    infrastructureLogging: {
      console: true,
    },
    output: {
      publicPath: `${payloadConfig.routes.admin}/`,
      path: payloadConfig.admin.buildPath,
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
    },
    stats: 'errors-only',
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(sa|sc|c)ss$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    experiments: {
      css: false,
    },
    plugins: [
      ...(baseConfig.plugins || []),
      // new MiniCSSExtractPlugin({
      //   filename: '[name].css',
      //   ignoreOrder: true,
      // }),
    ],
  };

  rspackConfig.module.rules.push({
    // possibly change to only scss?
    test: /\.(scss|css)$/,
    sideEffects: true,
    use: [
      // possibly remove?
      // MiniCSSExtractPlugin.loader,
      // possibly remove?
      {
        loader: require.resolve('css-loader'),
        options: {
          url: (url) => (!url.startsWith('/')),
        },
      },
      // possibly remove?
      {
        loader: require.resolve('postcss-loader'),
        options: {
          postcssOptions: {
            plugins: [require.resolve('postcss-preset-env')],
          },
        },
      },
      require.resolve('sass-loader'),
    ],
  });

  if (process.env.PAYLOAD_ANALYZE_BUNDLE) {
    rspackConfig.plugins.push(new BundleAnalyzerPlugin() as unknown as RspackPluginInstance);
  }

  return rspackConfig;
};
