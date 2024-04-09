import crypto from 'crypto';
import { FINANCIAL_DETAILS } from '../../../constants';

const { KEY, ALGORITHM } = FINANCIAL_DETAILS.ENCRYPTION;

const generateKey = () => crypto.createHash(ALGORITHM).update(KEY.SIGNATURE).digest('hex').substring(0, 32);

export default generateKey;
