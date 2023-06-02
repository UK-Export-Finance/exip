import mapPolicyLength from './map-policy-length';
import mapMonthString from './map-month-string';
import { FIELD_IDS, FIELD_VALUES } from '../../constants';
import { Quote } from '../../../types';
import { mockQuote } from '../../test-mocks';

const { POLICY_TYPE, POLICY_LENGTH, SINGLE_POLICY_LENGTH, MULTIPLE_POLICY_LENGTH } = FIELD_IDS;

describe('server/helpers/map-policy-length', () => {
  describe('when policy type is single', () => {
    it(`should return an object with mapped ${SINGLE_POLICY_LENGTH}`, () => {
      const mockData = {
        ...mockQuote,
        [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
        [POLICY_LENGTH]: 10,
      } as Quote;

      const result = mapPolicyLength(mockData);

      const expected = {
        [SINGLE_POLICY_LENGTH]: mapMonthString(mockData[POLICY_LENGTH]),
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when policy type is multiple', () => {
    it(`should return an object with mapped ${MULTIPLE_POLICY_LENGTH}`, () => {
      const mockData = {
        ...mockQuote,
        [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
        [POLICY_LENGTH]: FIELD_VALUES.POLICY_LENGTH.MULTIPLE,
      } as Quote;

      const result = mapPolicyLength(mockData);

      const expected = {
        [MULTIPLE_POLICY_LENGTH]: mapMonthString(mockData[POLICY_LENGTH]),
      };

      expect(result).toEqual(expected);
    });
  });
});
