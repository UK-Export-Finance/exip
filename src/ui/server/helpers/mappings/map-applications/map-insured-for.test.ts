import mapInsuredFor from './map-insured-for';
import { FIELD_IDS, GBP_CURRENCY_CODE } from '../../../constants';
import { DEFAULT } from '../../../content-strings';
import formatCurrency from '../../format-currency';
import mockApplication, { mockSinglePolicyAndExport, mockMultiplePolicyAndExport } from '../../../test-mocks/mock-application';

const {
  POLICY_AND_EXPORTS: {
    CONTRACT_POLICY: {
      SINGLE: { TOTAL_CONTRACT_VALUE },
      MULTIPLE: { MAXIMUM_BUYER_WILL_OWE },
    },
  },
} = FIELD_IDS.INSURANCE;

describe('server/helpers/mappings/map-applications/map-insured-for', () => {
  describe('when the policy type is single policy type', () => {
    it(`should return formatted ${TOTAL_CONTRACT_VALUE}`, () => {
      const singlePolicyApplication = {
        ...mockApplication,
        policyAndExport: mockSinglePolicyAndExport,
      };

      const result = mapInsuredFor(singlePolicyApplication);

      const { policyAndExport } = singlePolicyApplication;

      const expected = formatCurrency(policyAndExport[TOTAL_CONTRACT_VALUE], GBP_CURRENCY_CODE);

      expect(result).toEqual(expected);
    });
  });

  describe('when the policy type is multiple policy type', () => {
    it(`should return formatted ${MAXIMUM_BUYER_WILL_OWE}`, () => {
      const multiplePolicyApplication = {
        ...mockApplication,
        policyAndExport: mockMultiplePolicyAndExport,
      };

      const result = mapInsuredFor(multiplePolicyApplication);

      const { policyAndExport } = multiplePolicyApplication;

      const expected = formatCurrency(policyAndExport[MAXIMUM_BUYER_WILL_OWE], GBP_CURRENCY_CODE);

      expect(result).toEqual(expected);
    });
  });

  describe('when the policy type does not exist', () => {
    it('should return default empty string', () => {
      const result = mapInsuredFor({
        ...mockApplication,
        policyAndExport: {
          id: mockApplication.policyAndExport.id,
        },
      });

      const expected = DEFAULT.EMPTY;

      expect(result).toEqual(expected);
    });
  });
});
