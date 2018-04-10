let configs = {};
/**
 * 前端基本配置文件
 */
if (process.env.NODE_ENV === 'production') {
  configs = {
    prefix: {
      url1: 'http://xx.xx.com/getData'
    }
  };
} else if (process.env.NODE_ENV === 'uat') {
  configs = {
    prefix: {
      url1: 'https://www.hooxz.cn'
    }
  };
} else {
  /* 开发环境 */
  configs = {
    prefix: {
      url1: `http://localhost:3000`
    }
  };
}

const {
  prefix
} = configs;

module.exports = {
  urls: { // 接口地址配置，本地使用node代理请求
    graphql: prefix.url1
  }
};
