import save from '.';
import api from '../../../../../api';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import stripEmptyFormFields from '../../../../../helpers/strip-empty-form-fields';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../constants/field-ids/insurance/policy';
import { mockApplication, mockJointlyInsuredParty } from '../../../../../test-mocks';
import generateValidationErrors from '../../../../../helpers/validation';

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { REQUESTED },
} = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/save-data/jointly-insured-party', () => {
  const mockUpdateApplicationResponse = mockApplication;
  const updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));
  const mockFormBody = mockJointlyInsuredParty;

  beforeEach(() => {
    api.keystone.application.update.jointlyInsuredParty = updateApplicationSpy;
  });

  describe('when errorList is provided', () => {
    const mockValidationErrors = generateValidationErrors(REQUESTED, 'error', {});

    it(`should call api.keystone.application.update.jointlyInsuredParty with all fields but not ${REQUESTED}`, async () => {
      await save.jointlyInsuredParty(mockApplication, mockFormBody, mockValidationErrors.errorList);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const dataToSave = stripEmptyFormFields(getDataToSave(mockFormBody, mockValidationErrors.errorList));
      const expectedSanitisedData = sanitiseData(dataToSave);
      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.jointlyInsuredParty.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.jointlyInsuredParty(mockApplication, mockFormBody);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('when errorList is NOT provided', () => {
    it('should call api.keystone.application.update.jointlyInsuredParty with all fields', async () => {
      await save.jointlyInsuredParty(mockApplication, mockFormBody);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const dataToSave = getDataToSave(mockFormBody);
      const expectedSanitisedData = sanitiseData(dataToSave);
      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.jointlyInsuredParty.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.jointlyInsuredParty(mockApplication, mockFormBody);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });
});
