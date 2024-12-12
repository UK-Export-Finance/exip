import getSubmittedConfirmationTemplateId from '.';
import { APPLICATION, EMAIL_TEMPLATE_IDS, FIELD_VALUES } from '../../../constants';
import { POLICY as POLICY_FIELD_IDS } from '../../../constants/field-ids/insurance/policy';
import { ApplicationPolicy } from '../../../types';
import { mockApplication } from '../../../test-mocks';

const {
  POLICY_TYPE: { SINGLE, MULTIPLE },
} = FIELD_VALUES;

const {
  EXPORT_VALUE: {
    MULTIPLE: { MAXIMUM_BUYER_WILL_OWE },
  },
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
  ...mockApplication.policy,
  policyType: MULTIPLE,
};

const threshold = Number(SMALL_EXPORT_BUILDER?.MAXIMUM_BUYER_WILL_OWE);

describe('emails/application/get-submitted-confirmation-template-id', () => {
  describe(`when policy type is ${SINGLE}`, () => {
    it('should return the correct email template ID', () => {
      const result = getSubmittedConfirmationTemplateId(mockSingleContractPolicy);

      const expected = CONFIRMATION.SINGLE_OR_MULTIPLE_CONTRACT_POLICY;

      expect(result).toEqual(expected);
    });
  });

  describe(`when policy type is ${MULTIPLE}`, () => {
    describe(`when the requested credit limit is below ${SMALL_EXPORT_BUILDER?.MAXIMUM_BUYER_WILL_OWE}`, () => {
      it('should return the correct email template ID', () => {
        const mockPolicy: ApplicationPolicy = {
          ...mockMultipleContractPolicy,
          [MAXIMUM_BUYER_WILL_OWE]: Number(threshold - 1),
        };

        const result = getSubmittedConfirmationTemplateId(mockPolicy);

        const expected = CONFIRMATION.MULTIPLE_CONTRACT_POLICY.ELIGIBLE_FOR_SMALL_EXPORT_BUILDER_CONFIRMATION;

        expect(result).toEqual(expected);
      });
    });

    describe(`when the requested credit limit is equal to ${SMALL_EXPORT_BUILDER?.MAXIMUM_BUYER_WILL_OWE}`, () => {
      it('should return the correct email template ID', () => {
        const mockPolicy: ApplicationPolicy = {
          ...mockMultipleContractPolicy,
          [MAXIMUM_BUYER_WILL_OWE]: SMALL_EXPORT_BUILDER?.MAXIMUM_BUYER_WILL_OWE,
        };

        const result = getSubmittedConfirmationTemplateId(mockPolicy);

        const expected = CONFIRMATION.MULTIPLE_CONTRACT_POLICY.ELIGIBLE_FOR_SMALL_EXPORT_BUILDER_CONFIRMATION;

        expect(result).toEqual(expected);
      });
    });

    describe(`when the requested credit limit is over ${SMALL_EXPORT_BUILDER?.MAXIMUM_BUYER_WILL_OWE}`, () => {
      it('should return the correct email template ID', () => {
        const mockPolicy: ApplicationPolicy = {
          ...mockMultipleContractPolicy,
          [MAXIMUM_BUYER_WILL_OWE]: Number(threshold + 1),
        };

        const result = getSubmittedConfirmationTemplateId(mockPolicy);

        const expected = CONFIRMATION.SINGLE_OR_MULTIPLE_CONTRACT_POLICY;

        expect(result).toEqual(expected);
      });
    });
  });

  describe('when policy type is not recognised', () => {
    it('should return an empty string', () => {
      const mockPolicy = {
        ...mockApplication.policy,
        policyType: 'invalid-policy-type',
      };

      const result = getSubmittedConfirmationTemplateId(mockPolicy);

      expect(result).toEqual('');
    });
  });
});
