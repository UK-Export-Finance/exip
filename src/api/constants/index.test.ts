import { ACCOUNT } from '.';
import { get30minutesFromNow, getTomorrowDay, getYesterdayDay } from '../helpers/date';

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
        it('should have the correct value', () => {
          const result = ACCOUNT.OTP.DIGITS;

          expect(result).toEqual(6);
        });
      });

      describe('VERIFICATION_EXPIRY', () => {
        it('should have a time of 30 minutes from now', () => {
          const result = ACCOUNT.OTP.VERIFICATION_EXPIRY();

          const resultMinutes = new Date(result).getMinutes();

          const expectedMinutes = get30minutesFromNow();

          expect(resultMinutes).toEqual(expectedMinutes);
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

    describe('MAX_AUTH_RETRIES', () => {
      it('should have the correct value', () => {
        const result = ACCOUNT.MAX_AUTH_RETRIES;

        expect(result).toEqual(6);
      });
    });

    describe('MAX_AUTH_RETRIES_TIMEFRAME', () => {
      it('should have a day of yesterday', () => {
        const result = ACCOUNT.MAX_AUTH_RETRIES_TIMEFRAME;

        const resultDay = new Date(result).getDate();

        const expectedDay = getYesterdayDay();

        expect(resultDay).toEqual(expectedDay);
      });
    });
  });
});
