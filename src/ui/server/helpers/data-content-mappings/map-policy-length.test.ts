import mapPolicyLength from './map-policy-length';
import mapMonthString from './map-month-string';
import { FIELD_IDS, FIELD_VALUES } from '../../constants';
import { Quote } from '../../../types';
import { mockQuote } from '../../test-mocks';

const { POLICY_TYPE, POLICY_LENGTH } = FIELD_IDS;

describe('server/helpers/map-policy-length', () => {
  it(`should return an object with mapped ${POLICY_LENGTH}`, () => {
    const mockData = {
      ...mockQuote,
      [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
      [POLICY_LENGTH]: 10,
    } as Quote;

    const result = mapPolicyLength(mockData);

    const expected = {
      [POLICY_LENGTH]: mapMonthString(mockData[POLICY_LENGTH]),
    };

    expect(result).toEqual(expected);
  });
});
