import { init } from '@paralleldrive/cuid2';

/**
 * createCuid
 * Create a CUID.
 * This is only used for data migration
 */
const createCuid = init({
  random: Math.random,
  length: 25,
  // TODO: environment variable
  fingerprint: 'a-custom-host-fingerprint',
});

export default createCuid;
