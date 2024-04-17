import { FINANCIAL_DETAILS } from '../../../constants';

const { STRING_ENCODING, OUTPUT_ENCODING } = FINANCIAL_DETAILS.ENCRYPTION.CIPHER;

const generateBufferInStringFormat = (value: string) => Buffer.from(value, STRING_ENCODING).toString(OUTPUT_ENCODING);

export default generateBufferInStringFormat;
