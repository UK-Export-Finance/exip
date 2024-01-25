import submittedAnswer from '.';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { GBP, AED } from '../../../../constants';

const {
  CURRENCY: { ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

describe('helpers/mappings/map-currencies/submitted-answer', () => {
  describe('when provided currency is empty', () => {
    it('should return an empty string', () => {
      const result = submittedAnswer();

      expect(result).toEqual('');
    });
  });

  describe('when provided currency is a supported currency', () => {
    it('should return the currency', () => {
      const result = submittedAnswer(GBP);

      expect(result).toEqual(GBP);
    });
  });

  describe('when provided currency is an unsupported currency', () => {
    it(`should return ${ALTERNATIVE_CURRENCY_CODE}`, () => {
      const result = submittedAnswer(AED);

      expect(result).toEqual(ALTERNATIVE_CURRENCY_CODE);
    });
  });
});
