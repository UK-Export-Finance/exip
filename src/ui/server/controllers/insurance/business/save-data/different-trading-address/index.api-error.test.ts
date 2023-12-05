import save from '.';
import api from '../../../../../api';
import { mockApplication, mockDifferentTradingAddress } from '../../../../../test-mocks';

describe('controllers/insurance/business/save-data/different-trading-address - API error', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));
  const mockFormBody = mockDifferentTradingAddress;

  beforeEach(() => {
    api.keystone.application.update.differentTradingAddress = updateApplicationSpy;
  });

  describe('when there is an error', () => {
    beforeEach(() => {
      updateApplicationSpy = jest.fn(() => Promise.reject(new Error('mock')));
      api.keystone.application.update.differentTradingAddress = updateApplicationSpy;
    });

    it('should throw an error', async () => {
      try {
        await save.differentTradingAddress(mockApplication, mockFormBody);
      } catch (err) {
        const expected = new Error("Updating application's differentTradingAddress");
        expect(err).toEqual(expected);
      }
    });
  });
});
