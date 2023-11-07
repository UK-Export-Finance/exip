import mapAndSave from '.';
import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import mapSubmittedData from '../../map-submitted-data/policy-contact';
import save from '../../save-data/policy-contact';
import generateValidationErrors from '../../name-on-policy/validation';
import { mockApplication } from '../../../../../test-mocks';

const {
  NAME_ON_POLICY: { NAME, SAME_NAME },
} = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/map-and-save/policy-contact', () => {
  jest.mock('../../save-data/policy-contact');

  let mockFormBody = {
    [NAME]: SAME_NAME,
  };

  const mockValidationErrors = generateValidationErrors(mockFormBody);

  const mockSavePolicyContactData = jest.fn(() => Promise.resolve({}));

  save.policyContact = mockSavePolicyContactData;

  describe('when the form has data', () => {
    describe('when the form has validation errors', () => {
      it('should call save.policyContact with application, populated submitted data and validationErrors.errorList', async () => {
        await mapAndSave.policyContact(mockFormBody, mockApplication, mockValidationErrors);

        expect(save.policyContact).toHaveBeenCalledTimes(1);
        expect(save.policyContact).toHaveBeenCalledWith(mockApplication, mapSubmittedData(mockFormBody, mockApplication), mockValidationErrors?.errorList);
      });

      it('should return true', async () => {
        const result = await mapAndSave.policyContact(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });

    describe('when the form does NOT have validation errors ', () => {
      it('should call save.policy with application and populated submitted data', async () => {
        await mapAndSave.policyContact(mockFormBody, mockApplication);

        expect(save.policyContact).toHaveBeenCalledTimes(1);
        expect(save.policyContact).toHaveBeenCalledWith(mockApplication, mapSubmittedData(mockFormBody, mockApplication));
      });

      it('should return true', async () => {
        const result = await mapAndSave.policyContact(mockFormBody, mockApplication);

        expect(result).toEqual(true);
      });
    });
  });

  describe('when the form does not have any data', () => {
    it('should return true', async () => {
      mockFormBody = { _csrf: '1234' };

      const result = await mapAndSave.policyContact(mockFormBody, mockApplication, mockValidationErrors);

      expect(result).toEqual(true);
    });
  });
});
