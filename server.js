const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const errorOverlayMiddleware = require('react-error-overlay/middleware');
const chalk = require('chalk');
const config = require('./webpack.config');
const proxy = require('http-proxy-middleware');
const { port, host } = require('./config/server.config');
var { packageAlias, versionCode } = require('./pluginAndroid.json'); // 默认取安卓配置文件数据

new WebpackDevServer(webpack(config), {
  hot: true,
  compress: true,
  historyApiFallback: true,
  contentBase: 'build/',
  publicPath: `/apps/${packageAlias}/${versionCode}/`,
  watchOptions: {
    ignored: /node_modules/
  },
  stats: {
    colors: true
  },
  setup(app) {
    // app => express
    app.use(errorOverlayMiddleware());
    
    // 代理配置Demo http://localhost:3000/graphql -> http://xx.xx/graphql
    // app.use('/graphql', proxy({ target: 'https://xx.xx.com', changeOrigin: true }));

    app.use('/welink', proxy({ target: 'https://www.hooxz.cn', changeOrigin: true }));
  }
}).listen(port, host, (err, result)=> {
  if (err) {
    return console.log(err);
  }
  return console.log(chalk.green(`Listening at: http://${host}:${port}
Local development environment access path: http://${host}:${port}/apps/${packageAlias}/${versionCode}/html/index.html`));
});
