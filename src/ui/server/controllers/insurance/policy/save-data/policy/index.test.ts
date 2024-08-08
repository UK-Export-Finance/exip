import save from '.';
import api from '../../../../../api';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import generateValidationErrors from '../../type-of-policy/validation';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import { FIELD_VALUES } from '../../../../../constants';
import { mockApplication } from '../../../../../test-mocks';
import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';

const { POLICY_TYPE } = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/save-data/policy', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));

  const mockFormBody = {
    valid: {
      [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
      otherField: true,
    },
    invalid: {
      otherField: true,
    },
  };

  beforeEach(() => {
    api.keystone.application.update.policy = updateApplicationSpy;
  });

  describe('when errorList is provided', () => {
    const mockErrorList = generateValidationErrors(mockFormBody.invalid)?.errorList;

    it('should call api.keystone.application.update.policy with policy ID and sanitised data', async () => {
      await save.policy(mockApplication, mockFormBody.invalid, mockErrorList);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const dataToSave = getDataToSave(mockFormBody.invalid, mockErrorList);
      const expectedSanitisedData = sanitiseData(dataToSave);

      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.policy.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.policy(mockApplication, mockFormBody.invalid);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('when errorList is NOT provided', () => {
    it('should call api.keystone.application.update.policy with policy ID and sanitised data', async () => {
      await save.policy(mockApplication, mockFormBody.valid);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const dataToSave = getDataToSave(mockFormBody.valid);
      const expectedSanitisedData = sanitiseData(dataToSave);

      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.policy.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.policy(mockApplication, mockFormBody.valid);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('when there is an error calling the API', () => {
    beforeEach(() => {
      updateApplicationSpy = jest.fn(() => Promise.reject(new Error('mock')));
      api.keystone.application.update.policy = updateApplicationSpy;
    });

    it('should throw an error', async () => {
      try {
        await save.policy(mockApplication, mockFormBody.valid);
      } catch (error) {
        const expected = new Error("Updating application's policy");
        expect(error).toEqual(expected);
      }
    });
  });
});
