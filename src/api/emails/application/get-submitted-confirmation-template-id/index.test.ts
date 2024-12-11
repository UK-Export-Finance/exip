import getSubmittedConfirmationTemplateId from '.';
import { EMAIL_TEMPLATE_IDS, FIELD_VALUES } from '../../../constants';

const {
  POLICY_TYPE: { SINGLE, MULTIPLE },
} = FIELD_VALUES;

describe('emails/application/get-submitted-confirmation-template-id', () => {
  describe(`when policy type is ${SINGLE}`, () => {
    it('should return the correct email template ID', () => {
      const result = getSubmittedConfirmationTemplateId(SINGLE);

      const expected = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.SINGLE_CONTRACT_POLICY_CONFIRMATION;

      expect(result).toEqual(expected);
    });
  });

  describe(`when policy type is ${MULTIPLE}`, () => {
    it('should return the correct email template ID', () => {
      const result = getSubmittedConfirmationTemplateId(MULTIPLE);

      const expected = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.MULTIPLE_CONTRACT_POLICY_CONFIRMATION;

      expect(result).toEqual(expected);
    });
  });

  describe('when policy type is not recognised', () => {
    it('should return an empty string', () => {
      const result = getSubmittedConfirmationTemplateId('invalid-policy-type');

      expect(result).toEqual('');
    });
  });
});
