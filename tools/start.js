/**
 * 
*/
import clean from './clean';
import copy from './copy';
import run from './run';

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function start() {
  await run(clean);
  await run(copy.bind(undefined, { watch: true }));
  require('../server');
}

export default start;
