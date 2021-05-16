import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1620967455620_2218';

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };

  config.orm = {
    type: 'mysql',
    database: 'blog',
    host: '175.24.95.135',
    port: 3306,
    username: 'august',
    password: 'August..0410',
    synchronize: true,
    logging: false,
  }

  config.security = {
    csrf: false
  }

  config.middleware = ['errorHandleMiddleware']

  return config;
};
