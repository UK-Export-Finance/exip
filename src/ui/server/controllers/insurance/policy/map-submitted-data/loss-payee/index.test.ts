import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import mapSubmittedData from '.';

const {
  LOSS_PAYEE: { IS_APPOINTED },
  LOSS_PAYEE_DETAILS: { IS_LOCATED_INTERNATIONALLY, IS_LOCATED_IN_UK, LOCATION, NAME },
} = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/map-submitted-data/loss-payee', () => {
  describe(`when form body ${IS_APPOINTED} is true`, () => {
    const mockBody = {
      [IS_APPOINTED]: 'true',
    };

    it('should return form data as provided', () => {
      const result = mapSubmittedData(mockBody);

      const expected = mockBody;

      expect(result).toEqual(expected);
    });
  });

  describe(`when form body ${IS_APPOINTED} is false`, () => {
    const mockBody = {
      [IS_APPOINTED]: 'false',
    };

    it('should return form data with nullified fields', () => {
      const result = mapSubmittedData(mockBody);

      const expected = {
        [NAME]: '',
        [IS_LOCATED_INTERNATIONALLY]: null,
        [IS_LOCATED_IN_UK]: null,
      };

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

  describe(`when form body ${LOCATION} is ${IS_LOCATED_IN_UK}`, () => {
    it(`should wipe ${LOCATION} and set ${IS_LOCATED_IN_UK} as true and ${IS_LOCATED_INTERNATIONALLY} as false`, () => {
      const mockBody = {
        [LOCATION]: IS_LOCATED_IN_UK,
      };

      const result = mapSubmittedData(mockBody);

      const expected = {
        [IS_LOCATED_IN_UK]: true,
        [IS_LOCATED_INTERNATIONALLY]: false,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when form body ${LOCATION} is ${IS_LOCATED_INTERNATIONALLY}`, () => {
    it(`should wipe ${LOCATION} and set ${IS_LOCATED_INTERNATIONALLY} as true and ${IS_LOCATED_IN_UK} as false`, () => {
      const mockBody = {
        [LOCATION]: IS_LOCATED_INTERNATIONALLY,
      };

      const result = mapSubmittedData(mockBody);

      const expected = {
        [IS_LOCATED_IN_UK]: false,
        [IS_LOCATED_INTERNATIONALLY]: true,
      };

      expect(result).toEqual(expected);
    });
  });
});
