import dotenv from 'dotenv';
import { init } from '@paralleldrive/cuid2';

dotenv.config();

/**
 * createCuid
 * Create a CUID.
 * This is only used for data migration
 */
const createCuid = init({
  random: Math.random,
  length: 25,
  fingerprint: process.env.CUID_FINGERPRINT,
});

export default createCuid;
