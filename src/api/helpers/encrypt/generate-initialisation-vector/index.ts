import crypto from 'crypto';
import { FINANCIAL_DETAILS } from '../../../constants';

const { BYTES_SIZE, ENCODING, SLICE_INDEX_START, SLICE_INDEX_END } = FINANCIAL_DETAILS.ENCRYPTION.IV;

/**
 * generateInitialisationVector
 * generates initialisation vector for encrypting data
 * @returns {String} initialisation vector
 */
const generateInitialisationVector = () => crypto.randomBytes(BYTES_SIZE).toString(ENCODING).slice(SLICE_INDEX_START, SLICE_INDEX_END);

export default generateInitialisationVector;
