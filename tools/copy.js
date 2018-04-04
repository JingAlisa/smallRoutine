/**
 * 拷贝 HWh5公用文件common包
 *  获取common包，判断是否有最新版本，如果有则替换最新版本到build文件夹common目录
*/
import del from 'del';
import fs from 'fs';
import bluebird from 'bluebird';
import chalk from 'chalk';

// 检测文件或者文件夹存在 nodeJS
function fsExistsSync(path) {
  try {
    fs.accessSync(path, fs.F_OK);
  } catch (e) {
    return false;
  }
  return true;
}

async function copy() {
  // 判断是否有build文件夹
  if (!fsExistsSync('build')) {
    fs.mkdirSync('build');
    console.log(chalk.green('Create build folder.'));
  }
  try {
    const packageName = '@huawei/welink-jsapi';
    // copy目录到build文件夹的common目录
    await del(['build/common/*'], { dot: true });
    const ncp = bluebird.promisify(require('ncp'));
    await bluebird.all([
      ncp(`node_modules/${packageName}/src/common`, 'build/common')
    ]);
    console.log(chalk.green(`Copy ${packageName}'s files to /build/common successfull!`));
  } catch (error) {
    console.log(error);
  }
}

export default copy;
