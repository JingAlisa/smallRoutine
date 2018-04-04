
/**
 * install commander
 */
import { spawn } from 'child_process';
import which from 'which';

const findNpm = () => {
  var npms = process.platform === 'win32' ? ['tnpm.cmd', 'cnpm.cmd', 'npm.cmd'] : ['tnpm', 'cnpm', 'npm'];
  for (let i = 0; i < npms.length; i++) {
    try {
      which.sync(npms[i]);
      console.log(`use npm: ${npms[i]}`);
      return npms[i];
    } catch (e) {
    }
  }
  throw new Error('please install npm');
};

const runCmd = (cmd, args) => new Promise((resolve, reject) => {
  args = args || [];
  const runner = spawn(cmd, args, {
    // keep color
    stdio: 'inherit'
  });
  runner.on('close', (code) => {
    resolve(code);
  });
});

export default { findNpm, runCmd };
