import validation from '.';
import { FIELD_IDS } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import generateValidationErrors from '../../../../../helpers/validation';

describe('controllers/insurance/eligibility/insured-amount/validation', () => {
  describe('validation', () => {
    const FIELD_ID = FIELD_IDS.INSURANCE.ELIGIBILITY.WANT_COVER_FOR_MORE_THAN_MAX_PERIOD;

    describe('when no values are provided', () => {
      it('should return validation errors', () => {
        const result = validation({});

        const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_ID].IS_EMPTY);

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${FIELD_ID} is not provided`, () => {
      it('should return validation errors', () => {
        const result = validation({
          incorrectField: true,
        });

        const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_ID].IS_EMPTY);

        expect(result).toEqual(expected);
      });
    });

    it('should return null', () => {
      const result = validation({
        [FIELD_ID]: true,
      });

      expect(result).toEqual(null);
    });
  });
});
