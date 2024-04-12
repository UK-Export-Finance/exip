import crypto from 'crypto';
import { FINANCIAL_DETAILS } from '../../../constants';

const { BYTES_SIZE, ENCODING, SLICE_LOWER_VALUE, SLICE_UPPER_VALUE } = FINANCIAL_DETAILS.ENCRYPTION.IV;

/**
 * generateInitialisationVector
 * generates initialisation vector for encrypting data
 * @returns {String} initialisation vector
 */
const generateInitialisationVector = () => crypto.randomBytes(BYTES_SIZE).toString(ENCODING).slice(SLICE_LOWER_VALUE, SLICE_UPPER_VALUE);

export default generateInitialisationVector;
