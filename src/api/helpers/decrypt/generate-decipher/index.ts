import crypto from 'crypto';
import { FINANCIAL_DETAILS } from '../../../constants';

const { ENCRYPTION_METHOD } = FINANCIAL_DETAILS.ENCRYPTION.CIPHER;

const generateDecipher = (key: string, iv: string) => crypto.createDecipheriv(ENCRYPTION_METHOD, key, iv);

export default generateDecipher;
