import validation from '.';
import { FIELD_IDS } from '../../constants';
import generateValidationErrors from '../../helpers/validation';

describe('shared-validation/yes-no-radios-form', () => {
  const FIELD_ID = FIELD_IDS.INSURANCE.ELIGIBILITY.WANT_COVER_OVER_MAX_PERIOD;
  const mockErrorMessage = 'mock';

  describe('when no values are provided in the formBody', () => {
    it('should return validation errors', () => {
      const result = validation({}, FIELD_ID, mockErrorMessage);

      const expected = generateValidationErrors(FIELD_ID, mockErrorMessage);

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FIELD_ID} is not provided`, () => {
    it('should return validation errors', () => {
      const result = validation({ incorrectField: true }, FIELD_ID, mockErrorMessage);

      const expected = generateValidationErrors(FIELD_ID, mockErrorMessage);

      expect(result).toEqual(expected);
    });
  });

  it('should return null', () => {
    const result = validation({ [FIELD_ID]: true }, FIELD_ID, mockErrorMessage);

    expect(result).toEqual(null);
  });
});
