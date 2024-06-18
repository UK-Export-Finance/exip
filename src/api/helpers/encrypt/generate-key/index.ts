import crypto from 'crypto';
import { FINANCIAL_DETAILS } from '../../../constants';

const { ALGORITHM, SIGNATURE, SUBSTRING_INDEX_START, SUBSTRING_INDEX_END } = FINANCIAL_DETAILS.ENCRYPTION.KEY;

/**
 * generateKey
 * generates key for encryption
 * @returns {String} key
 */
const generateKey = () => crypto.createHash(ALGORITHM).update(SIGNATURE).digest('hex').substring(SUBSTRING_INDEX_START, SUBSTRING_INDEX_END);

export default generateKey;
