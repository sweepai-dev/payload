import { rspack } from '@rspack/core';
import { getProdConfig } from '../configs/prod';
import { SanitizedConfig } from '../../../config/types';

type BuildAdminType = (options: { payloadConfig: SanitizedConfig }) => Promise<void>;
export const buildAdmin: BuildAdminType = async ({ payloadConfig }) => {
  try {
    const rspackConfig = getProdConfig(payloadConfig);
    rspack(rspackConfig, (err, stats) => {
      console.log('rspack callback', err, stats)

      if (err || stats.hasErrors()) {
        // Handle errors here

        if (stats) {
          console.error(stats.toString({
            chunks: false,
            colors: true,
          }));
        } else {
          console.error(err.message);
        }
      }
    });
  } catch (err) {
    console.error(err);
    throw new Error('Error: there was an error building the webpack prod config.');
  }
};
