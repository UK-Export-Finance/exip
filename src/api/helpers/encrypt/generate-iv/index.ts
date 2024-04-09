import crypto from 'crypto';
import { FINANCIAL_DETAILS } from '../../../constants';

const { IV } = FINANCIAL_DETAILS.ENCRYPTION;

const generateIv = () => crypto.randomBytes(IV.BYTES).toString(IV.ENCODING);

export default generateIv;
