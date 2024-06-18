import save from '.';
import api from '../../../../../api';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import { mockApplication, mockCompanyDifferentTradingAddress } from '../../../../../test-mocks';

describe('controllers/insurance/business/save-data/company-different-trading-address', () => {
  const mockUpdateApplicationResponse = mockApplication;
  const updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));
  const mockFormBody = mockCompanyDifferentTradingAddress;

  beforeEach(() => {
    api.keystone.application.update.companyDifferentTradingAddress = updateApplicationSpy;
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
