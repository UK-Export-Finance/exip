import save from '.';
import api from '../../../../../api';
import generateValidationErrors from '../../type-of-policy/validation';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import { FIELD_IDS, FIELD_VALUES } from '../../../../../constants';
import { mockApplication } from '../../../../../test-mocks';

describe('controllers/insurance/policy-and-export/save-data/policy', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));

  const mockFormBody = {
    valid: {
      [FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
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

    it('should call api.keystone.application.update.policy with policy ID and stripped and sanitised data', async () => {
      await save.policy(mockApplication, mockFormBody.invalid, mockErrorList);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const expectedSanitisedData = sanitiseData(mockFormBody.invalid);
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

      const expectedSanitisedData = sanitiseData(mockFormBody.valid);
      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.policy.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.policy(mockApplication, mockFormBody.valid);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('api error handling', () => {
    describe('update policy call', () => {
      describe('when there is an error', () => {
        beforeEach(() => {
          updateApplicationSpy = jest.fn(() => Promise.reject());
          api.keystone.application.update.policy = updateApplicationSpy;
        });

        it('should throw an error', async () => {
          try {
            await save.policy(mockApplication, mockFormBody.valid);
          } catch (err) {
            const expected = new Error("Updating application's policy");
            expect(err).toEqual(expected);
          }
        });
      });
    });
  });
});
