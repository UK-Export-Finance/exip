import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import mapSubmittedData from '.';

const {
  LOSS_PAYEE: { IS_APPOINTED },
} = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/map-submitted-data/loss-payee', () => {
  describe(`when form body ${IS_APPOINTED} is true`, () => {
    const mockBody = {
      [IS_APPOINTED]: true,
    };

    it('should return form data as provided', () => {
      const result = mapSubmittedData(mockBody);

      const expected = mockBody;

      expect(result).toEqual(expected);
    });
  });

  describe(`when form body ${IS_APPOINTED} is false`, () => {
    const mockBody = {
      [IS_APPOINTED]: false,
    };

    it('should return form data as provided', () => {
      const result = mapSubmittedData(mockBody);

      const expected = mockBody;

      expect(result).toEqual(expected);
    });
  });

  describe(`when form body ${IS_APPOINTED} is not provided`, () => {
    it('should wipe all other fields', () => {
      const mockBody = {};

      const result = mapSubmittedData(mockBody);

      expect(result).toEqual(mockBody);
    });
  });
});
