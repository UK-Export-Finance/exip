import crypto from 'crypto';
import { FINANCIAL_DETAILS } from '../../../constants';

const { IV } = FINANCIAL_DETAILS.ENCRYPTION;

/**
 * generateInitialisationVector
 * generates initialisation vector for encrypting data
 * @returns {String} initialisation vector
 */
const generateInitialisationVector = () => crypto.randomBytes(IV.BYTES).toString(IV.ENCODING).slice(0, 16);

export default generateInitialisationVector;
