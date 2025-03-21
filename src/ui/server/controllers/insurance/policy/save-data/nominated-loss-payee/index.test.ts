import save, { NULL_OR_EMPTY_STRING_FIELDS } from '.';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../constants/field-ids/insurance/policy';
import api from '../../../../../api';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import stripEmptyFormFields from '../../../../../helpers/strip-empty-form-fields';
import { mockApplication, mockNominatedLossPayee } from '../../../../../test-mocks';
import generateValidationErrors from '../../../../../helpers/validation';

const { NAME, IS_LOCATED_INTERNATIONALLY, IS_LOCATED_IN_UK } = POLICY_FIELD_IDS.LOSS_PAYEE_DETAILS;

describe('controllers/insurance/policy/save-data/nominated-loss-payee', () => {
  const mockUpdateApplicationResponse = mockApplication;
  const updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));
  const mockFormBody = mockNominatedLossPayee;

  beforeEach(() => {
    api.keystone.application.update.nominatedLossPayee = updateApplicationSpy;
  });

  describe('NULL_OR_EMPTY_STRING_FIELDS', () => {
    it('should have the relevant fieldIds', () => {
      expect(NULL_OR_EMPTY_STRING_FIELDS).toEqual([NAME, IS_LOCATED_INTERNATIONALLY, IS_LOCATED_IN_UK]);
    });
  });

  describe('when errorList is provided', () => {
    const mockValidationErrors = generateValidationErrors(NAME, 'error', {});

    it(`should call api.keystone.application.update.nominatedLossPayee with all fields but not ${NAME}`, async () => {
      await save.nominatedLossPayee(mockApplication, mockFormBody, mockValidationErrors.errorList);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const dataToSave = stripEmptyFormFields(getDataToSave(mockFormBody, mockValidationErrors.errorList), NULL_OR_EMPTY_STRING_FIELDS);

      const expectedSanitisedData = sanitiseData(dataToSave);

      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.nominatedLossPayee.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.nominatedLossPayee(mockApplication, mockFormBody);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('when errorList is NOT provided', () => {
    it('should call api.keystone.application.update.nominatedLossPayee with all fields', async () => {
      await save.nominatedLossPayee(mockApplication, mockFormBody);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const dataToSave = stripEmptyFormFields(getDataToSave(mockFormBody), NULL_OR_EMPTY_STRING_FIELDS);

      const expectedSanitisedData = sanitiseData(dataToSave);

      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.nominatedLossPayee.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.nominatedLossPayee(mockApplication, mockFormBody);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });
});
