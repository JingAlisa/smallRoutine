
import run from './run';

/**
 * Compiles the project from source files into a distributable
 * format and copies it to the output (build) folder.
 */
async function build() {
  await run(require('./clean'));
  // await run(require('./jsapi'));
  // await run(require('./copy'));
  await run(require('./bundle'));
  await run(require('./zip'));
  await run(require('./qrcode'));
}

export default build;

