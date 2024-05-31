import mapSubmittedData from '.';
import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import mapDateFields from './date-fields';
import nullifyGenericContractPolicyFields from '../../../../../helpers/nullify-generic-contract-policy-fields';
import nullifyMultipleContractPolicyFields from '../../../../../helpers/nullify-multiple-contract-policy-fields';
import nullifySingleContractPolicyFields from '../../../../../helpers/nullify-single-contract-policy-fields';
import mapCurrencyCodeFormData from '../../../../../helpers/mappings/map-currency-code-form-data';
import { mockApplication, mockApplicationMultiplePolicy } from '../../../../../test-mocks';

const {
  POLICY_TYPE,
  CONTRACT_POLICY: { POLICY_CURRENCY_CODE },
  NEED_PRE_CREDIT_PERIOD,
  CREDIT_PERIOD_WITH_BUYER,
} = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/map-submitted-data/policy', () => {
  describe(`when form body does not have any day/month/year ${NEED_PRE_CREDIT_PERIOD} fields`, () => {
    it('should return the form body', () => {
      const mockBody = {
        anotherField: true,
      };

      const result = mapSubmittedData(mockBody, mockApplication);

      expect(result).toEqual(mockBody);
    });
  });

  describe(`when a ${NEED_PRE_CREDIT_PERIOD} field with a value of 'false' is provided`, () => {
    it(`should return an object with empty ${CREDIT_PERIOD_WITH_BUYER} field`, () => {
      const mockBody = {
        [NEED_PRE_CREDIT_PERIOD]: 'false',
        [CREDIT_PERIOD_WITH_BUYER]: 'mock',
      };

      const result = mapSubmittedData(mockBody, mockApplication);

      const expected = {
        ...mockBody,
        [CREDIT_PERIOD_WITH_BUYER]: '',
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${POLICY_TYPE} is single`, () => {
    it('should return an object with mapped date and currency fields, wiped multiple policy specific fields', () => {
      const mockBody = {
        [POLICY_TYPE]: mockApplication.policy.policyType,
      };

      const result = mapSubmittedData(mockBody, mockApplication);

      const expected = {
        ...mapDateFields(mockBody),
        ...mapCurrencyCodeFormData(mockBody),
        ...nullifyMultipleContractPolicyFields(mockBody),
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${POLICY_TYPE} is multiple`, () => {
    it('should return an object with mapped date and currency fields, wiped single policy specific fields', () => {
      const mockBody = {
        [POLICY_TYPE]: mockApplicationMultiplePolicy.policy.policyType,
      };

      const result = mapSubmittedData(mockBody, mockApplicationMultiplePolicy);

      const expected = {
        ...mapDateFields(mockBody),
        ...mapCurrencyCodeFormData(mockBody),
        ...nullifySingleContractPolicyFields(mockBody),
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${POLICY_TYPE} has changed from single to multiple`, () => {
    it('should return an object with mapped date and currency fields, wiped generic and single policy specific fields', () => {
      const mockBody = {
        [POLICY_TYPE]: mockApplicationMultiplePolicy.policy.policyType,
      };

      const result = mapSubmittedData(mockBody, mockApplication);

      const expected = {
        ...mapDateFields(mockBody),
        ...nullifyGenericContractPolicyFields(mockBody),
        ...nullifySingleContractPolicyFields(mockBody),
        ...mapCurrencyCodeFormData(mockBody),
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${POLICY_TYPE} has changed from multiple to single`, () => {
    it('should return an object with mapped date and currency fields, wiped generic and multiple policy specific fields', () => {
      const mockBody = {
        [POLICY_TYPE]: mockApplication.policy.policyType,
      };

      const result = mapSubmittedData(mockBody, mockApplicationMultiplePolicy);

      const expected = {
        ...mapDateFields(mockBody),
        ...nullifyGenericContractPolicyFields(mockBody),
        ...nullifyMultipleContractPolicyFields(mockBody),
        ...mapCurrencyCodeFormData(mockBody),
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${POLICY_CURRENCY_CODE} is provided`, () => {
    it('should return an object with mapCurrencyCodeFormData', () => {
      const mockBody = {
        [POLICY_CURRENCY_CODE]: mockApplication.policy.policyCurrencyCode,
      };

      const result = mapSubmittedData(mockBody, mockApplication);

      const expected = mapCurrencyCodeFormData(mockBody, POLICY_CURRENCY_CODE);

      expect(result).toEqual(expected);
    });
  });
});
