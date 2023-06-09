import { ACCOUNT } from '.';
import { get30minutesFromNow, getTomorrowDay } from '../helpers/date';

describe('constants/index', () => {
  describe('ACCOUNT', () => {
    describe('EMAIL.VERIFICATION_EXPIRY', () => {
      it('should have a day of tomorrow', () => {
        const result = ACCOUNT.EMAIL.VERIFICATION_EXPIRY();

        const resultDay = new Date(result).getDate();

        const expectedDay = getTomorrowDay();

        expect(resultDay).toEqual(expectedDay);
      });
    });

    describe('PASSWORD_RESET_EXPIRY', () => {
      it('should have a time of 30 minutes from now', () => {
        const result = ACCOUNT.PASSWORD_RESET_EXPIRY();

        const resultMinutes = new Date(result).getMinutes();

        const expectedMinutes = get30minutesFromNow();

        expect(resultMinutes).toEqual(expectedMinutes);
      });
    });

    describe('OTP', () => {
      describe('DIGITS', () => {
        const result = ACCOUNT.OTP.DIGITS;

        expect(result).toEqual(6);
      });

      describe('VERIFICATION_EXPIRY', () => {
        it('should have a time of 30 minutes from now', () => {
          const result = ACCOUNT.OTP.VERIFICATION_EXPIRY();

          const resultMminutes = new Date(result).getMinutes();

          const expectedMinutes = get30minutesFromNow();

          expect(resultMminutes).toEqual(expectedMinutes);
        });
      });
    });

    describe('REACTIVATION_EXPIRY', () => {
      it('should have a day of tomorrow', () => {
        const result = ACCOUNT.REACTIVATION_EXPIRY();

        const resultDay = new Date(result).getDate();

        const expectedDay = getTomorrowDay();

        expect(resultDay).toEqual(expectedDay);
      });
    });
  });
});
