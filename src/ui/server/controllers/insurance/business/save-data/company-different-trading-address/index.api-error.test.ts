import save from '.';
import api from '../../../../../api';
import { mockApplication, mockCompanyDifferentTradingAddress, mockSpyPromiseRejection } from '../../../../../test-mocks';

describe('controllers/insurance/business/save-data/company-different-trading-address - API error', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));
  const mockFormBody = mockCompanyDifferentTradingAddress;

  beforeEach(() => {
    api.keystone.application.update.companyDifferentTradingAddress = updateApplicationSpy;
  });

  describe('when there is an error', () => {
    beforeEach(() => {
      updateApplicationSpy = mockSpyPromiseRejection;
      api.keystone.application.update.companyDifferentTradingAddress = updateApplicationSpy;
    });

    it('should throw an error', async () => {
      try {
        await save.companyDifferentTradingAddress(mockApplication, mockFormBody);
      } catch (error) {
        const expected = new Error("Updating application's companyDifferentTradingAddress");
        expect(error).toEqual(expected);
      }
    });
  });
});
