// locales文件必须是严格的json数据，最后一个不能有逗号！！
import i18n from 'i18next';
import resBundle from 'i18next-resource-store-loader?include=\\.json$!../src/locales/index.js';

function i18nInit(lang) {

  if (typeof window !== 'undefined') {

    const backendOpts = {
      loadPath: './src/locales/{{lng}}/{{ns}}.json',
      addPath: './src/locales/{{lng}}/{{ns}}.missing.json',
      jsonIndent: 2
    };
    const i18nOpts = {
      lng: lang,
      resources: resBundle,
      ns: ['common'],
      preload: ['zh_CN', 'en_US'],
      defaultNS: 'common',
      debug: false,
      backend: backendOpts,
      interpolation: {
        escapeValue: false // not needed for react!!
      }
    };
    i18n.init(i18nOpts);
  }
}

i18n.initByLang = i18nInit;

export default i18n;
