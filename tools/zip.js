const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const config = require('../pluginAndroid.json');
const appName = config.packageAlias,
  versionCode = config.versionCode;

function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  }
  if (mkdirsSync(path.dirname(dirname))) {
    fs.mkdirSync(dirname);
    return true;
  }
  return false;
}

async function zip() {
  if (!fs.existsSync('./build/zip')) {
    mkdirsSync('./build/zip');
  }
  // Aondrid打包
  const outWelinkAndroid = fs.createWriteStream(`./build/zip/${appName}_Android.zip`);
  const archive1 = archiver('zip');
  archive1.pipe(outWelinkAndroid);
  // append a file from stream
  const file1 = process.cwd() + '/pluginAndroid.json';
  archive1.file(file1, { name: 'plugin.json' });
  archive1.directory(`./build/apps/${appName}/${versionCode}/`, false);
  archive1.finalize();
  // IOS打包
  const outWelinkIOS = fs.createWriteStream(`./build/zip/${appName}_IOS.zip`);
  const archive2 = archiver('zip');
  archive2.pipe(outWelinkIOS);
  // append a file from stream
  const file2 = process.cwd() + '/pluginIOS.json';
  archive2.file(file2, { name: 'plugin.json' });
  archive2.directory(`./build/apps/${appName}/${versionCode}/`, false);
  archive2.finalize();

}

module.exports = zip;
