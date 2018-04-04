import { join } from 'path';
import fs from 'fs';
import Config from './config';
import { argv } from 'yargs';
import leftPad from 'left-pad';
import chalk from 'chalk';
import map from 'map-stream';
import vfs from 'vinyl-fs';

const args = argv['_'];

function info(type, message) {
  console.log(`${chalk.green.bold(leftPad(type, 12))}  ${message}`);
}

function formatTemplet(file, cb) {
  if (file._contents) {
    let _contents = file._contents.toString();
    _contents = _contents.replace(/__Name__/gi, args[1]);
    file._contents = Buffer.from(_contents, 'utf-8');
    info('create', file.path);
  }
  cb(null, file);
};

function error(message) {
  console.error(chalk.red(message));
}

function success(message) {
  console.error(chalk.green(message));
}

function exit() {
  process.exit();
};

const action = args[0];
let step = 0,
  filesLength = 0; // 步骤
const commands = [];
Object.keys(Config).forEach((key, i) => {
  commands.push(key);
});

function help() {
  
  info('Usage: npm run add <command> <name>', `
  
  <command>:

    ${commands.join(', ')}

  <name>:

    新建组件、路由、Action、Reducer等的名称
  
  Example：

    npm run add ${commands[0]} demo
  `);
}

if (args[0] === 'help' || args[0] === 'h') {
  help();
  exit();
}

if (!Config[action]) {
  error(`
  抱歉，此命令 ${action} 不存在。如果需要，添加相关配置：
    cd ${join(__dirname, 'config.js')}
    `);
  help();
  exit();
}
if (!args[1]) {
  error('缺少指定参数');
  exit();
}

const cwd = join(__dirname, Config[action].target);

/**
 * 多文件处理
 * @param {*源目录} srcDir 
 * @param {*目标目录} targetDir 
 * @param {*新增文件夹名称} name 
 */
function handleFiles(src, target, name) {
  console.log(src, target, name);
  vfs.src([`${src}/**/*`])
    .pipe(map(formatTemplet))
    .pipe(vfs.dest(join(target, name))).on('end', () => {
      success(`
Success! Created ${name} at ${target}.
`);
      exit();
    });
}
/**
 * 单文件处理
 * @param {*源文件} src 
 * @param {*目标文件} target 
 * @param {*新增文件} name 
 */
function handleFile(src, target, name) {
  // 设置编码格式
  fs.readFile(src, 'utf-8', (err, data) => {
    // 读取文件失败/错误
    if (err) {
      throw err;
    }
    // 读取文件成功
    fs.writeFile(target, data, (err)=> {
      if (err) {
        throw err;
      }
      success(`
Success! Created ${name} at ${target}.
    `);
      exit();
    });
  });
}

// 处理不同步骤
function handle(input) {
  const { src, target } = Config[action];
  const addName = args[1];
  input = (input && input.trim()) || '';
  switch (step) {
    case 0: {
      const files = fs.readdirSync(src).map((file)=> file);
      filesLength = files.length;
      // 多文件模板和单文件模板
      if (filesLength > 1) {
        if (!fs.existsSync(`${target}/${addName}`)) {
          fs.mkdirSync(`${target}/${addName}`);
          handleFiles(src, target, addName);
        } else {
          info('目录已经存在，是否覆盖，之前内容将无法恢复？(Y/N)', `
  ${join(cwd, addName)}`);
          step = 1;
        }
      } else {
        if (!fs.existsSync(`${target}/${addName}.js`)) {
          handleFile(join(src, 'index.js'), join(target, `${addName}.js`), addName);
        } else {
          info('文件已经存在，是否覆盖，之前内容将无法恢复？(Y/N)', `
  ${join(cwd, `${addName}.js`)}`);
          step = 1;
        }
      }
    }
      break;
    case 1: {
      if (input === 'Y' || input === 'y') {
        info('', `
模板文件生成中，请稍后...
        `);
        console.log(filesLength, 'filesLength');
        if (filesLength > 1) {
          handleFiles(src, target, addName);
        } else {
          handleFile(join(src, 'index.js'), join(target, `${addName}.js`), addName);
        }
      } else {
        // 放弃操作
        exit();
      }
    }
  }
};

process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    handle(chunk);
  }
});
handle();
process.stdin.on('end', () => {
  info('任务结束', '');
});
