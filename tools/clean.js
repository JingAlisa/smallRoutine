
import del from 'del';
import config from '../config/server.config';
/**
 * Cleans up the output (build) directory.
 */
async function clean() {
  await del([`build/apps/${config.appName}/${config.appVersion}/*`], { dot: true });
}

export default clean;
