import multiplePolicyTypeTemplateId from '.';
import { APPLICATION, EMAIL_TEMPLATE_IDS, FIELD_VALUES, GBP, USD } from '../../../../constants';
import { POLICY as POLICY_FIELD_IDS } from '../../../../constants/field-ids/insurance/policy';
import apimCurrencyExchangeRate from '../../../../helpers/get-APIM-currencies-exchange-rate';
import { mockSpyPromiseRejection, mockErrorMessage } from '../../../../test-mocks';
import { mockMultiplePolicy } from '../../../../test-mocks/mock-application';
import { mockCurrencyExchange } from '../../../../test-mocks/mock-APIM-currencies-exchange-response';

const {
  POLICY_TYPE: { MULTIPLE },
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
  UNABLE_TO_DETERMINE_TEMPLATE_ID,
} = EMAIL_TEMPLATE_IDS;

const { policyType } = mockMultiplePolicy;

describe('emails/application/get-submitted-confirmation-template-id/multiple-policy-type', () => {
  jest.mock('../../../../helpers/get-APIM-currencies-exchange-rate');

  const mockApimCurrencyExchangeRateSpy = jest.fn(() => Promise.resolve(mockCurrencyExchange.midPrice));

  beforeEach(() => {
    apimCurrencyExchangeRate.get = mockApimCurrencyExchangeRateSpy;
  });

  describe(`when policy type is ${MULTIPLE}`, () => {
    // TODO: EMS-4122
    describe.skip(`when ${POLICY_CURRENCY_CODE} is ${GBP}`, () => {
      it('should NOT call apimCurrencyExchangeRate.get', async () => {
        await multiplePolicyTypeTemplateId.get(policyType);

        expect(mockApimCurrencyExchangeRateSpy).toHaveBeenCalledTimes(0);
      });

      describe(`when ${MAXIMUM_BUYER_WILL_OWE} is below ${SMALL_EXPORT_BUILDER?.MAXIMUM_BUYER_WILL_OWE}`, () => {
        it('should return the correct email template ID', async () => {
          const result = await multiplePolicyTypeTemplateId.get(policyType);

          const expected = CONFIRMATION.MULTIPLE_CONTRACT_POLICY.ELIGIBLE_FOR_SMALL_EXPORT_BUILDER_CONFIRMATION;

          expect(result).toEqual(expected);
        });
      });

      describe(`when ${MAXIMUM_BUYER_WILL_OWE} is equal to ${SMALL_EXPORT_BUILDER?.MAXIMUM_BUYER_WILL_OWE}`, () => {
        it('should return the correct email template ID', async () => {
          const result = await multiplePolicyTypeTemplateId.get(policyType);

          const expected = CONFIRMATION.MULTIPLE_CONTRACT_POLICY.ELIGIBLE_FOR_SMALL_EXPORT_BUILDER_CONFIRMATION;

          expect(result).toEqual(expected);
        });
      });

      describe(`when ${MAXIMUM_BUYER_WILL_OWE} is over ${SMALL_EXPORT_BUILDER?.MAXIMUM_BUYER_WILL_OWE}`, () => {
        it('should return the correct email template ID', async () => {
          const result = await multiplePolicyTypeTemplateId.get(policyType);

          const expected = CONFIRMATION.SINGLE_OR_MULTIPLE_CONTRACT_POLICY;

          expect(result).toEqual(expected);
        });
      });
    });

    // TODO: EMS-4122 - remove
    it('should return the correct email template ID', async () => {
      const result = await multiplePolicyTypeTemplateId.get(policyType);

      const expected = CONFIRMATION.SINGLE_OR_MULTIPLE_CONTRACT_POLICY;

      expect(result).toEqual(expected);
    });

    // TODO: EMS-4122
    describe.skip(`when ${POLICY_CURRENCY_CODE} is NOT ${GBP}`, () => {
      const mockPolicyCurrencyCode = USD;

      it('should call apimCurrencyExchangeRate.get', async () => {
        await multiplePolicyTypeTemplateId.get(policyType);

        expect(mockApimCurrencyExchangeRateSpy).toHaveBeenCalledTimes(1);

        expect(mockApimCurrencyExchangeRateSpy).toHaveBeenCalledWith(GBP, mockPolicyCurrencyCode);
      });

      describe(`when ${MAXIMUM_BUYER_WILL_OWE} in ${GBP} is below ${SMALL_EXPORT_BUILDER?.MAXIMUM_BUYER_WILL_OWE}`, () => {
        it('should return the correct email template ID', async () => {
          apimCurrencyExchangeRate.get = jest.fn(() => Promise.resolve(1));

          const result = await multiplePolicyTypeTemplateId.get(policyType);

          const expected = CONFIRMATION.MULTIPLE_CONTRACT_POLICY.ELIGIBLE_FOR_SMALL_EXPORT_BUILDER_CONFIRMATION;

          expect(result).toEqual(expected);
        });
      });

      describe(`when ${MAXIMUM_BUYER_WILL_OWE} in ${GBP} is over ${SMALL_EXPORT_BUILDER?.MAXIMUM_BUYER_WILL_OWE}`, () => {
        it('should return the correct email template ID', async () => {
          /**
           * Mock return an exchange rate of zero.
           * This allows us to easily create a mock MAXIMUM_BUYER_WILL_OWE that is just above the threshold.
           */
          apimCurrencyExchangeRate.get = jest.fn(() => Promise.resolve(0));

          const result = await multiplePolicyTypeTemplateId.get(policyType);

          const expected = CONFIRMATION.SINGLE_OR_MULTIPLE_CONTRACT_POLICY;

          expect(result).toEqual(expected);
        });
      });

      describe('when apimCurrencyExchangeRate.get throws an error', () => {
        it('should throw an error', async () => {
          apimCurrencyExchangeRate.get = mockSpyPromiseRejection;

          await expect(multiplePolicyTypeTemplateId.get(policyType)).rejects.toThrow(
            `Getting submitted confirmation template ID for a multiple policy type (multiplePolicyTypeTemplateId helper) ${new Error(mockErrorMessage)}`,
          );
        });
      });
    });
  });

  describe(`when policy type is not ${MULTIPLE}`, () => {
    it(`should return ${UNABLE_TO_DETERMINE_TEMPLATE_ID}`, async () => {
      const mockPolicyType = 'invalid-policy-type';

      const result = await multiplePolicyTypeTemplateId.get(mockPolicyType);

      expect(result).toEqual(UNABLE_TO_DETERMINE_TEMPLATE_ID);
    });
  });
});
