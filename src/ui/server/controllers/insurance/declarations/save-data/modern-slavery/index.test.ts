import save from '.';
import api from '../../../../../api';
import generateValidationErrors from '../../../../../helpers/validation';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import { mockApplication } from '../../../../../test-mocks';

describe('controllers/insurance/declarations/save-data/modern-slavery', () => {
  const mockUpdateApplicationResponse = mockApplication;
  const updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));
  const mockFormBody = {};

  beforeEach(() => {
    api.keystone.application.update.declarationModernSlavery = updateApplicationSpy;
  });

  describe('when errorList is provided', () => {
    const mockValidationErrors = generateValidationErrors('mock id', 'error', {});

    it('should call api.keystone.application.update.declarationModernSlavery with all fields', async () => {
      await save.declarationModernSlavery(mockApplication, mockFormBody, mockValidationErrors.errorList);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const dataToSave = getDataToSave(mockFormBody, mockValidationErrors.errorList);

      const expectedSanitisedData = sanitiseData(dataToSave);

      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.declaration.modernSlavery.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.declarationModernSlavery(mockApplication, mockFormBody);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('when errorList is NOT provided', () => {
    it('should call api.keystone.application.update.declarationModernSlavery with all fields', async () => {
      await save.declarationModernSlavery(mockApplication, mockFormBody);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const dataToSave = getDataToSave(mockFormBody);

      const expectedSanitisedData = sanitiseData(dataToSave);

      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.declaration.modernSlavery.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.declarationModernSlavery(mockApplication, mockFormBody);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });
});
