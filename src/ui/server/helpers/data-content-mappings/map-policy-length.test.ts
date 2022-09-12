import mapPolicyLength from './map-policy-length';
import mapPeriodMonths from './map-period-months';
import { FIELD_IDS, FIELD_VALUES } from '../../constants';
import { Quote } from '../../../types';
import { mockQuote } from '../../test-mocks';

const { POLICY_TYPE, POLICY_LENGTH, SINGLE_POLICY_LENGTH, MULTI_POLICY_LENGTH } = FIELD_IDS;

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
        [SINGLE_POLICY_LENGTH]: {
          text: mapPeriodMonths(mockData[POLICY_LENGTH]),
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when policy type is multi', () => {
    it(`should return an object with mapped ${MULTI_POLICY_LENGTH}`, () => {
      const mockData = {
        ...mockQuote,
        [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
        [POLICY_LENGTH]: FIELD_VALUES.POLICY_LENGTH.MULTI,
      } as Quote;

      const result = mapPolicyLength(mockData);

      const expected = {
        [MULTI_POLICY_LENGTH]: {
          text: mapPeriodMonths(mockData[POLICY_LENGTH]),
        },
      };

      expect(result).toEqual(expected);
    });
  });
});
