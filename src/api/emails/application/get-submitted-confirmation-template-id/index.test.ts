import getSubmittedConfirmationTemplateId from '.';
import { APPLICATION, EMAIL_TEMPLATE_IDS, FIELD_VALUES, GBP, USD } from '../../../constants';
import { POLICY as POLICY_FIELD_IDS } from '../../../constants/field-ids/insurance/policy';
import apimCurrencyExchangeRate from '../../../helpers/get-APIM-currencies-exchange-rate';
import { ApplicationPolicy } from '../../../types';
import { mockSpyPromiseRejection, mockErrorMessage } from '../../../test-mocks';
import mockApplication, { mockMultiplePolicy } from '../../../test-mocks/mock-application';
import { mockCurrencyExchange } from '../../../test-mocks/mock-APIM-currencies-exchange-response';

const {
  POLICY_TYPE: { SINGLE, MULTIPLE },
} = FIELD_VALUES;

const {
  EXPORT_VALUE: {
    MULTIPLE: { MAXIMUM_BUYER_WILL_OWE },
  },
  CONTRACT_POLICY: { POLICY_CURRENCY_CODE },
} = POLICY_FIELD_IDS;

const {
  LATEST_VERSION: { SMALL_EXPORT_BUILDER },
} = APPLICATION;

const {
  APPLICATION: {
    SUBMISSION: {
      EXPORTER: { CONFIRMATION },
    },
  },
} = EMAIL_TEMPLATE_IDS;

const mockSingleContractPolicy: ApplicationPolicy = {
  ...mockApplication.policy,
  policyType: SINGLE,
};

const mockMultipleContractPolicy: ApplicationPolicy = {
  ...mockMultiplePolicy,
  policyType: MULTIPLE,
};

const threshold = Number(SMALL_EXPORT_BUILDER?.MAXIMUM_BUYER_WILL_OWE);

describe('emails/application/get-submitted-confirmation-template-id', () => {
  jest.mock('../../../helpers/get-APIM-currencies-exchange-rate');

  const mockApimCurrencyExchangeRateSpy = jest.fn(() => Promise.resolve(mockCurrencyExchange.midPrice));

  beforeEach(() => {
    apimCurrencyExchangeRate.get = mockApimCurrencyExchangeRateSpy;
  });

  describe(`when policy type is ${SINGLE}`, () => {
    it('should return the correct email template ID', async () => {
      const result = await getSubmittedConfirmationTemplateId(mockSingleContractPolicy);

      const expected = CONFIRMATION.SINGLE_OR_MULTIPLE_CONTRACT_POLICY;

      expect(result).toEqual(expected);
    });
  });

  describe(`when policy type is ${MULTIPLE} and ${POLICY_CURRENCY_CODE} is ${GBP}`, () => {
    const mockPolicyData: ApplicationPolicy = {
      ...mockMultipleContractPolicy,
      [POLICY_CURRENCY_CODE]: GBP,
    };

    it('should NOT call apimCurrencyExchangeRate.get', async () => {
      await getSubmittedConfirmationTemplateId(mockPolicyData);

      expect(mockApimCurrencyExchangeRateSpy).toHaveBeenCalledTimes(0);
    });

    describe(`when ${MAXIMUM_BUYER_WILL_OWE} is below ${SMALL_EXPORT_BUILDER?.MAXIMUM_BUYER_WILL_OWE}`, () => {
      it('should return the correct email template ID', async () => {
        const mockPolicy: ApplicationPolicy = {
          ...mockPolicyData,
          [MAXIMUM_BUYER_WILL_OWE]: Number(threshold - 1),
        };

        const result = await getSubmittedConfirmationTemplateId(mockPolicy);

        const expected = CONFIRMATION.MULTIPLE_CONTRACT_POLICY.ELIGIBLE_FOR_SMALL_EXPORT_BUILDER_CONFIRMATION;

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${MAXIMUM_BUYER_WILL_OWE} is equal to ${SMALL_EXPORT_BUILDER?.MAXIMUM_BUYER_WILL_OWE}`, () => {
      it('should return the correct email template ID', async () => {
        const mockPolicy: ApplicationPolicy = {
          ...mockPolicyData,
          [MAXIMUM_BUYER_WILL_OWE]: SMALL_EXPORT_BUILDER?.MAXIMUM_BUYER_WILL_OWE,
        };

        const result = await getSubmittedConfirmationTemplateId(mockPolicy);

        const expected = CONFIRMATION.MULTIPLE_CONTRACT_POLICY.ELIGIBLE_FOR_SMALL_EXPORT_BUILDER_CONFIRMATION;

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${MAXIMUM_BUYER_WILL_OWE} is over ${SMALL_EXPORT_BUILDER?.MAXIMUM_BUYER_WILL_OWE}`, () => {
      it('should return the correct email template ID', async () => {
        const mockPolicy: ApplicationPolicy = {
          ...mockPolicyData,
          [MAXIMUM_BUYER_WILL_OWE]: Number(threshold + 1),
        };

        const result = await getSubmittedConfirmationTemplateId(mockPolicy);

        const expected = CONFIRMATION.SINGLE_OR_MULTIPLE_CONTRACT_POLICY;

        expect(result).toEqual(expected);
      });
    });
  });

  describe(`when policy type is ${MULTIPLE} and ${POLICY_CURRENCY_CODE} is NOT ${GBP}`, () => {
    const mockPolicyData: ApplicationPolicy = {
      ...mockMultipleContractPolicy,
      [POLICY_CURRENCY_CODE]: USD,
    };

    it('should call apimCurrencyExchangeRate.get', async () => {
      await getSubmittedConfirmationTemplateId(mockPolicyData);

      expect(mockApimCurrencyExchangeRateSpy).toHaveBeenCalledTimes(1);

      expect(mockApimCurrencyExchangeRateSpy).toHaveBeenCalledWith(GBP, mockPolicyData.policyCurrencyCode);
    });

    describe(`when ${MAXIMUM_BUYER_WILL_OWE} in ${GBP} is below ${SMALL_EXPORT_BUILDER?.MAXIMUM_BUYER_WILL_OWE}`, () => {
      it('should return the correct email template ID', async () => {
        apimCurrencyExchangeRate.get = jest.fn(() => Promise.resolve(1));

        const mockPolicy: ApplicationPolicy = {
          ...mockPolicyData,
          [MAXIMUM_BUYER_WILL_OWE]: Number(threshold - 1),
        };

        const result = await getSubmittedConfirmationTemplateId(mockPolicy);

        const expected = CONFIRMATION.MULTIPLE_CONTRACT_POLICY.ELIGIBLE_FOR_SMALL_EXPORT_BUILDER_CONFIRMATION;

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${MAXIMUM_BUYER_WILL_OWE} in ${GBP} is over ${SMALL_EXPORT_BUILDER?.MAXIMUM_BUYER_WILL_OWE}`, () => {
      it('should return the correct email template ID', async () => {
        apimCurrencyExchangeRate.get = jest.fn(() => Promise.resolve(1000));

        const mockPolicy: ApplicationPolicy = {
          ...mockPolicyData,
          [MAXIMUM_BUYER_WILL_OWE]: Number(threshold + 1),
        };

        const result = await getSubmittedConfirmationTemplateId(mockPolicy);

        const expected = CONFIRMATION.SINGLE_OR_MULTIPLE_CONTRACT_POLICY;

        expect(result).toEqual(expected);
      });
    });

    describe('when apimCurrencyExchangeRate.get throws an error', () => {
      it('should throw an error', async () => {
        apimCurrencyExchangeRate.get = mockSpyPromiseRejection;

        await expect(getSubmittedConfirmationTemplateId(mockPolicyData)).rejects.toThrow(
          `Getting submitted confirmation template ID (getSubmittedConfirmationTemplateId helper) ${new Error(mockErrorMessage)}`,
        );
      });
    });
  });

  describe('when policy type is not recognised', () => {
    it('should return an empty string', async () => {
      const mockPolicy = {
        ...mockApplication.policy,
        policyType: 'invalid-policy-type',
      };

      const result = await getSubmittedConfirmationTemplateId(mockPolicy);

      expect(result).toEqual('');
    });
  });
});
