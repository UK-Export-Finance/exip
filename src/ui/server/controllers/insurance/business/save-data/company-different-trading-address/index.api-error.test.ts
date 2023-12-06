import save from '.';
import api from '../../../../../api';
import { mockApplication, mockDifferentTradingAddress } from '../../../../../test-mocks';

describe('controllers/insurance/business/save-data/company-different-trading-address - API error', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));
  const mockFormBody = mockDifferentTradingAddress;

  beforeEach(() => {
    api.keystone.application.update.companyDifferentTradingAddress = updateApplicationSpy;
  });

  describe('when there is an error', () => {
    beforeEach(() => {
      updateApplicationSpy = jest.fn(() => Promise.reject(new Error('mock')));
      api.keystone.application.update.companyDifferentTradingAddress = updateApplicationSpy;
    });

    it('should throw an error', async () => {
      try {
        await save.companyDifferentTradingAddress(mockApplication, mockFormBody);
      } catch (err) {
        const expected = new Error("Updating application's companyDifferentTradingAddress");
        expect(err).toEqual(expected);
      }
    });
  });
});
