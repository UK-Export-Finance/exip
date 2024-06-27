import mapInsuredFor from './map-value';
import { GBP_CURRENCY_CODE } from '../../../constants';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { DEFAULT } from '../../../content-strings';
import formatCurrency from '../../format-currency';
import mockApplication, { mockSinglePolicy, mockMultiplePolicy } from '../../../test-mocks/mock-application';
import { EUR } from '../../../test-mocks/mock-currencies';

const { policy: initPolicy } = mockApplication;

const {
  POLICY: {
    CONTRACT_POLICY: {
      POLICY_CURRENCY_CODE,
      SINGLE: { TOTAL_CONTRACT_VALUE },
    },
    EXPORT_VALUE: {
      MULTIPLE: { MAXIMUM_BUYER_WILL_OWE },
    },
  },
} = INSURANCE_FIELD_IDS;

describe('server/helpers/mappings/map-applications/map-value', () => {
  describe(`when the policy type is single policy type and ${POLICY_CURRENCY_CODE} is available`, () => {
    it(`should return formatted ${TOTAL_CONTRACT_VALUE} with default ${GBP_CURRENCY_CODE}`, () => {
      const singlePolicyApplication = {
        ...mockApplication,
        policy: {
          ...mockSinglePolicy,
          [POLICY_CURRENCY_CODE]: EUR.isoCode,
        },
      };

      const result = mapInsuredFor(singlePolicyApplication);

      const { policy } = singlePolicyApplication;

      const expected = formatCurrency(policy[TOTAL_CONTRACT_VALUE], policy[POLICY_CURRENCY_CODE]);

      expect(result).toEqual(expected);
    });
  });

  describe(`when the policy type is single policy type and ${POLICY_CURRENCY_CODE} is NOT available`, () => {
    it(`should return formatted ${TOTAL_CONTRACT_VALUE} with default ${GBP_CURRENCY_CODE}`, () => {
      const singlePolicyApplication = {
        ...mockApplication,
        policy: {
          ...mockSinglePolicy,
          [POLICY_CURRENCY_CODE]: null,
        },
      };

      const result = mapInsuredFor(singlePolicyApplication);

      const { policy } = singlePolicyApplication;

      const expected = formatCurrency(policy[TOTAL_CONTRACT_VALUE], GBP_CURRENCY_CODE);

      expect(result).toEqual(expected);
    });
  });

  describe(`when the policy type is multiple policy type and ${POLICY_CURRENCY_CODE} is available`, () => {
    it(`should return formatted ${MAXIMUM_BUYER_WILL_OWE} with default ${GBP_CURRENCY_CODE}`, () => {
      const multiplePolicyApplication = {
        ...mockApplication,
        policy: {
          ...mockMultiplePolicy,
          [POLICY_CURRENCY_CODE]: EUR.isoCode,
        },
      };

      const result = mapInsuredFor(multiplePolicyApplication);

      const { policy } = multiplePolicyApplication;

      const expected = formatCurrency(policy[MAXIMUM_BUYER_WILL_OWE], policy[POLICY_CURRENCY_CODE]);

      expect(result).toEqual(expected);
    });
  });

  describe(`when the policy type is multiple policy type and ${POLICY_CURRENCY_CODE} is NOT available`, () => {
    it(`should return formatted ${MAXIMUM_BUYER_WILL_OWE} with default ${GBP_CURRENCY_CODE}`, () => {
      const multiplePolicyApplication = {
        ...mockApplication,
        policy: {
          ...mockMultiplePolicy,
          [POLICY_CURRENCY_CODE]: null,
        },
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
          id: initPolicy.id,
          jointlyInsuredParty: {
            id: initPolicy.jointlyInsuredParty.id,
          },
        },
      });

      const expected = DEFAULT.EMPTY;

      expect(result).toEqual(expected);
    });
  });
});
