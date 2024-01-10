import mapInsuredFor from './map-value';
import { GBP_CURRENCY_CODE } from '../../../constants';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { DEFAULT } from '../../../content-strings';
import formatCurrency from '../../format-currency';
import mockApplication, { mockSinglePolicy, mockMultiplePolicy } from '../../../test-mocks/mock-application';

const {
  POLICY: {
    CONTRACT_POLICY: {
      SINGLE: { TOTAL_CONTRACT_VALUE },
    },
    EXPORT_VALUE: {
      MULTIPLE: { MAXIMUM_BUYER_WILL_OWE },
    },
  },
} = INSURANCE_FIELD_IDS;

describe('server/helpers/mappings/map-applications/map-value', () => {
  describe('when the policy type is single policy type', () => {
    it(`should return formatted ${TOTAL_CONTRACT_VALUE}`, () => {
      const singlePolicyApplication = {
        ...mockApplication,
        policy: mockSinglePolicy,
      };

      const result = mapInsuredFor(singlePolicyApplication);

      const { policy } = singlePolicyApplication;

      const expected = formatCurrency(policy[TOTAL_CONTRACT_VALUE], GBP_CURRENCY_CODE);

      expect(result).toEqual(expected);
    });
  });

  describe('when the policy type is multiple policy type', () => {
    it(`should return formatted ${MAXIMUM_BUYER_WILL_OWE}`, () => {
      const multiplePolicyApplication = {
        ...mockApplication,
        policy: mockMultiplePolicy,
      };

      const result = mapInsuredFor(multiplePolicyApplication);

      const { policy } = multiplePolicyApplication;

      const expected = formatCurrency(policy[MAXIMUM_BUYER_WILL_OWE], GBP_CURRENCY_CODE);

      expect(result).toEqual(expected);
    });
  });

  describe('when the policy type does not exist', () => {
    it('should return default empty string', () => {
      const result = mapInsuredFor({
        ...mockApplication,
        policy: {
          id: mockApplication.policy.id,
        },
      });

      const expected = DEFAULT.EMPTY;

      expect(result).toEqual(expected);
    });
  });
});
