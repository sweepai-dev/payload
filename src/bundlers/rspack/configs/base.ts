import path from 'path';
import { Configuration } from '@rspack/core';
import type { SanitizedConfig } from '../../../config/types';
import { getDevConfig as getDevWebpackConfig } from '../../webpack/configs/dev';

const mockModulePath = path.resolve(__dirname, '../../mocks/emptyModule.js');
const mockDotENVPath = path.resolve(__dirname, '../../mocks/dotENV.js');

const nodeModulesPath = path.resolve(__dirname, '../../../../node_modules');
const adminFolderPath = path.resolve(__dirname, '../../../admin');
const bundlerPath = path.resolve(__dirname, '../bundler.js');

export const getBaseConfig = (payloadConfig: SanitizedConfig): Configuration => {
  const webpackConfig = getDevWebpackConfig(payloadConfig);
  const webpackAliases = webpackConfig?.resolve?.alias || {} as any;

  return {
    entry: {
      main: [
        adminFolderPath,
      ],
    },
    module: {
      rules: [
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|woff(2)?|eot|ttf|otf|svg)$/i,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      fallback: {
        path: require.resolve('path-browserify'),
        crypto: false,
        https: false,
        http: false,
      },
      modules: ['node_modules', path.resolve(__dirname, nodeModulesPath)],
      alias: {
        ...webpackAliases,
        'payload-config': payloadConfig.paths.rawConfig,
        payload$: mockModulePath,
        'payload-user-css': payloadConfig.admin.css,
        dotenv: mockDotENVPath,
        [bundlerPath]: mockModulePath,
      },
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    builtins: {
      html: [
        {
          template: payloadConfig.admin.indexHTML,
          filename: path.normalize('./index.html'),
        },
      ],
      define: Object.entries(process.env).reduce(
        (values, [key, val]) => {
          if (key.indexOf('PAYLOAD_PUBLIC_') === 0) {
            return ({
              ...values,
              [`process.env.${key}`]: `'${val}'`,
            });
          }

          return values;
        },
        {},
      ),
      provide: {
        process: [require.resolve('process/browser')],
      },
    },
  };
};
