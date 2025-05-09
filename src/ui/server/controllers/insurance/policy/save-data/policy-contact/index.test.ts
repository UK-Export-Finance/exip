import save from '.';
import api from '../../../../../api';
import generateValidationErrors from '../../name-on-policy/validation';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import { mockApplication, mockSpyPromiseRejection } from '../../../../../test-mocks';

const {
  NAME_ON_POLICY: { POSITION, IS_SAME_AS_OWNER },
} = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/save-data/policy-contact', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));

  const mockFormBody = {
    valid: {
      [IS_SAME_AS_OWNER]: true,
      [POSITION]: 'CEO',
      otherField: true,
    },
    invalid: {
      otherField: true,
    },
  };

  beforeEach(() => {
    api.keystone.application.update.policyContact = updateApplicationSpy;
  });

  describe('when errorList is provided', () => {
    const mockErrorList = generateValidationErrors(mockFormBody.invalid)?.errorList;

    it('should call api.keystone.application.update.policy with policyContact ID and stripped and sanitised data', async () => {
      await save.policyContact(mockApplication, mockFormBody.invalid, mockErrorList);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const expectedSanitisedData = sanitiseData(mockFormBody.invalid);

      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.policyContact.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.policyContact(mockApplication, mockFormBody.invalid);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('when errorList is NOT provided', () => {
    it('should call api.keystone.application.update.policyContact with policyContact id and sanitised data', async () => {
      await save.policyContact(mockApplication, mockFormBody.valid);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const expectedSanitisedData = sanitiseData(mockFormBody.valid);

      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.policyContact.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.policyContact(mockApplication, mockFormBody.valid);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('when there is an error calling the API', () => {
    beforeEach(() => {
      updateApplicationSpy = mockSpyPromiseRejection;
      api.keystone.application.update.policyContact = updateApplicationSpy;
    });

    it('should throw an error', async () => {
      try {
        await save.policyContact(mockApplication, mockFormBody.valid);
      } catch (error) {
        const expected = new Error("Updating application's policy contact");
        expect(error).toEqual(expected);
      }
    });
  });
});
