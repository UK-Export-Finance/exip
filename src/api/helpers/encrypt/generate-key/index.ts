import crypto from 'crypto';
import { FINANCIAL_DETAILS } from '../../../constants';

const { ALGORITHM, SIGNATURE, SUBSTRING_LOWER_VALUE, SUBSTRING_UPPER_VALUE } = FINANCIAL_DETAILS.ENCRYPTION.KEY;

/**
 * generateKey
 * generates key for encryption
 * @returns {String} key
 */
const generateKey = () => crypto.createHash(ALGORITHM).update(SIGNATURE).digest('hex').substring(SUBSTRING_LOWER_VALUE, SUBSTRING_UPPER_VALUE);

export default generateKey;
