import save from '.';
import api from '../../../../../api';
import generateValidationErrors from '../../../../../helpers/validation';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import { mockApplication } from '../../../../../test-mocks';

describe('controllers/insurance/business/save-data/company-different-trading-address', () => {
  const mockUpdateApplicationResponse = mockApplication;
  const updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));
  const mockFormBody = {};

  beforeEach(() => {
    api.keystone.application.update.companyDifferentTradingAddress = updateApplicationSpy;
  });

  describe('when errorList is provided', () => {
    const mockValidationErrors = generateValidationErrors('mock id', 'error', {});

    it('should call api.keystone.application.update.companyDifferentTradingAddress with all fields', async () => {
      await save.companyDifferentTradingAddress(mockApplication, mockFormBody, mockValidationErrors.errorList);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const dataToSave = getDataToSave(mockFormBody, mockValidationErrors.errorList);

      const expectedSanitisedData = sanitiseData(dataToSave);

      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.company.differentTradingAddress.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.companyDifferentTradingAddress(mockApplication, mockFormBody);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('when errorList is NOT provided', () => {
    it('should call api.keystone.application.update.companyDifferentTradingAddress with all fields', async () => {
      await save.companyDifferentTradingAddress(mockApplication, mockFormBody);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const dataToSave = getDataToSave(mockFormBody);

      const expectedSanitisedData = sanitiseData(dataToSave);

      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.company.differentTradingAddress.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.companyDifferentTradingAddress(mockApplication, mockFormBody);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });
});
