import { ACCOUNT } from '../../constants';
import generate from '.';

const { OTP, ENCRYPTION } = ACCOUNT;

const {
  RANDOM_BYTES_SIZE,
  OTP: {
    PBKDF2: { KEY_LENGTH },
  },
} = ENCRYPTION;

describe('api/helpers/generate-otp', () => {
  it('should return a security code', () => {
    const result = generate.otp();

    expect(result.securityCode.length).toEqual(OTP.DIGITS);
  });

  it('should return a salt', () => {
    const result = generate.otp();

    expect(result.salt.length).toEqual(RANDOM_BYTES_SIZE * 2);
  });

  it('should return a hash', () => {
    const result = generate.otp();

    expect(result.hash.length).toEqual(KEY_LENGTH * 2);
  });

  it('should return an expiry', () => {
    const result = generate.otp();

    const now = new Date();

    const nowDay = now.getDay();
    const nowMonth = now.getMonth();
    const nowYear = now.getFullYear();

    const expiry = new Date(result.expiry);

    const expiryDay = expiry.getDay();
    const expiryMonth = expiry.getMonth();
    const expiryYear = expiry.getFullYear();

    expect(expiryDay).toEqual(nowDay);
    expect(expiryMonth).toEqual(nowMonth);
    expect(expiryYear).toEqual(nowYear);

    const secondsDifference = (expiry.getTime() - now.getTime()) / 1000;

    // round up (slight millisecond difference in unit tests)
    const rounded = Math.ceil(secondsDifference);

    // 5 minutes
    const expectedSeconds = 60 * 5;

    expect(rounded).toEqual(expectedSeconds);
  });
});
