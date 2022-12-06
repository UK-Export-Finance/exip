import mapCost from './map-cost';
import formatCurrency from '../format-currency';
import { FIELD_IDS, FIELD_VALUES } from '../../constants';
import { SubmittedData } from '../../../types';

const { CONTRACT_VALUE, CURRENCY, MAX_AMOUNT_OWED, POLICY_TYPE } = FIELD_IDS;

describe('server/helpers/data-content-mappings/map-cost', () => {
  describe('when policy type is single', () => {
    it(`should return an object with formatted ${CONTRACT_VALUE}`, () => {
      const mockDataSinglePolicyType = {
        [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
        [CURRENCY]: {
          isoCode: 'GBP',
        },
        [CONTRACT_VALUE]: 10,
      } as SubmittedData;

      const result = mapCost(mockDataSinglePolicyType);

      const expected = {
        [CONTRACT_VALUE]: {
          text: formatCurrency(mockDataSinglePolicyType[CONTRACT_VALUE], mockDataSinglePolicyType[CURRENCY].isoCode, 0),
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when policy type is multi', () => {
    it(`should return an object with formatted ${MAX_AMOUNT_OWED}`, () => {
      const mockDataMultiPolicyType = {
        [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
        [CURRENCY]: {
          isoCode: 'GBP',
        },
        [MAX_AMOUNT_OWED]: 10,
      } as SubmittedData;

      const result = mapCost(mockDataMultiPolicyType);

      const expected = {
        [MAX_AMOUNT_OWED]: {
          text: formatCurrency(mockDataMultiPolicyType[MAX_AMOUNT_OWED], mockDataMultiPolicyType[CURRENCY].isoCode, 0),
        },
      };

      expect(result).toEqual(expected);
    });
  });
});
