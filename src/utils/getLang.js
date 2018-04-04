function getLang() {
  return new Promise((resolve) => {
    window.HWH5.appInfo().then((data) => {
      const { language } = data;
      // 本地可直接模拟，中英文环境，默认是中文环境，模拟英文只需把 language 传成 en
      // resolve('en');
      resolve(language);
    });
  });
}

export default getLang;
