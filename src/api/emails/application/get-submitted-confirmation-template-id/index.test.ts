import getSubmittedConfirmationTemplateId from '.';
import { EMAIL_TEMPLATE_IDS, FIELD_VALUES } from '../../../constants';
import multiplePolicyTypeTemplateId from './multiple-policy-type';
import { ApplicationPolicy } from '../../../types';
import { mockSpyPromiseRejection, mockErrorMessage } from '../../../test-mocks';
import mockApplication, { mockMultiplePolicy } from '../../../test-mocks/mock-application';

const {
  POLICY_TYPE: { SINGLE, MULTIPLE },
} = FIELD_VALUES;

const {
  APPLICATION: {
    SUBMISSION: {
      EXPORTER: { CONFIRMATION },
    },
  },
  UNABLE_TO_DETERMINE_TEMPLATE_ID,
} = EMAIL_TEMPLATE_IDS;

const mockSingleContractPolicy: ApplicationPolicy = {
  ...mockApplication.policy,
  policyType: SINGLE,
};

const mockMultipleContractPolicy: ApplicationPolicy = {
  ...mockMultiplePolicy,
  policyType: MULTIPLE,
};

describe('emails/application/get-submitted-confirmation-template-id', () => {
  jest.mock('./multiple-policy-type');

  const mockMultiplePolicyTypeTemplateId = CONFIRMATION.MULTIPLE_CONTRACT_POLICY.ELIGIBLE_FOR_SMALL_EXPORT_BUILDER_CONFIRMATION;

  const mockMultiplePolicyTypeTemplateIdSpy = jest.fn(() => Promise.resolve(mockMultiplePolicyTypeTemplateId));

  beforeEach(() => {
    multiplePolicyTypeTemplateId.get = mockMultiplePolicyTypeTemplateIdSpy;
  });

  describe(`when policy type is ${SINGLE}`, () => {
    it('should return the correct email template ID', async () => {
      const result = await getSubmittedConfirmationTemplateId(mockSingleContractPolicy);

      const expected = CONFIRMATION.SINGLE_OR_MULTIPLE_CONTRACT_POLICY;

      expect(result).toEqual(expected);
    });
  });

  describe(`when policy type is ${MULTIPLE}`, () => {
    const mockPolicyData: ApplicationPolicy = mockMultipleContractPolicy;

    const { policyType, policyCurrencyCode, maximumBuyerWillOwe } = mockPolicyData;

    it('should call multiplePolicyTypeTemplateId.get', async () => {
      await getSubmittedConfirmationTemplateId(mockPolicyData);

      expect(mockMultiplePolicyTypeTemplateIdSpy).toHaveBeenCalledTimes(1);

      expect(mockMultiplePolicyTypeTemplateIdSpy).toHaveBeenCalledWith(policyType, policyCurrencyCode, maximumBuyerWillOwe);
    });

    it('should return the result of multiplePolicyTypeTemplateId.get', async () => {
      const result = await getSubmittedConfirmationTemplateId(mockPolicyData);

      const expected = mockMultiplePolicyTypeTemplateId;

      expect(result).toEqual(expected);
    });

    describe('when multiplePolicyTypeTemplateId.get throws an error', () => {
      it('should throw an error', async () => {
        multiplePolicyTypeTemplateId.get = mockSpyPromiseRejection;

        await expect(getSubmittedConfirmationTemplateId(mockPolicyData)).rejects.toThrow(
          `Getting submitted confirmation template ID (getSubmittedConfirmationTemplateId helper) ${new Error(mockErrorMessage)}`,
        );
      });
    });
  });

  describe('when policy type is not recognised', () => {
    it(`should return ${UNABLE_TO_DETERMINE_TEMPLATE_ID}`, async () => {
      const mockPolicy = {
        ...mockApplication.policy,
        policyType: 'invalid-policy-type',
      };

      const result = await getSubmittedConfirmationTemplateId(mockPolicy);

      expect(result).toEqual(UNABLE_TO_DETERMINE_TEMPLATE_ID);
    });
  });
});
