import save, { NULL_OR_EMPTY_STRING_FIELDS } from '.';
import api from '../../../../../api';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import stripEmptyFormFields from '../../../../../helpers/strip-empty-form-fields';
import generateValidationErrors from '../../type-of-policy/validation';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import { FIELD_VALUES } from '../../../../../constants';
import { mockApplication } from '../../../../../test-mocks';
import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';

const { CREDIT_PERIOD_WITH_BUYER, POLICY_TYPE } = POLICY_FIELD_IDS;

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

  describe('NULL_OR_EMPTY_STRING_FIELDS', () => {
    it('should have the relevant fieldIds', () => {
      expect(NULL_OR_EMPTY_STRING_FIELDS).toEqual([CREDIT_PERIOD_WITH_BUYER]);
    });
  });

  describe('when errorList is provided', () => {
    const mockErrorList = generateValidationErrors(mockFormBody.invalid)?.errorList;

    it('should call api.keystone.application.update.policy with policy ID and stripped and sanitised data', async () => {
      await save.policy(mockApplication, mockFormBody.invalid, mockErrorList);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const dataToSave = stripEmptyFormFields(getDataToSave(mockFormBody.invalid, mockErrorList), NULL_OR_EMPTY_STRING_FIELDS);
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

      const dataToSave = stripEmptyFormFields(getDataToSave(mockFormBody.valid));
      const expectedSanitisedData = sanitiseData(dataToSave);

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
          updateApplicationSpy = jest.fn(() => Promise.reject(new Error('mock')));
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
