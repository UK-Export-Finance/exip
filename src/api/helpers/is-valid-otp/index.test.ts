import generate from '../generate-otp';
import isValidOTP from '.';

describe('api/helpers/is-valid-otp', () => {
  const { salt, hash, securityCode } = generate.otp();

  describe('when OTP is valid', () => {
    it('should return true', () => {
      const result = isValidOTP(securityCode, salt, hash);

      expect(result).toEqual(true);
    });
  });

  describe('when OTP is invalid', () => {
    it('should return false', () => {
      const result = isValidOTP('Invalid', salt, hash);

      expect(result).toEqual(false);
    });
  });
});
