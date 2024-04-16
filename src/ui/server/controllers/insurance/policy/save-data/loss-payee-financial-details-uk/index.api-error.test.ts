import save from '.';
import api from '../../../../../api';
import { mockApplication, mockLossPayeeFinancialDetailsUk } from '../../../../../test-mocks';

describe('controllers/insurance/policy/save-data/loss-payee-financial-details-uk - API error', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));
  const mockFormBody = mockLossPayeeFinancialDetailsUk;

  beforeEach(() => {
    api.keystone.application.update.lossPayeeFinancialDetailsUk = updateApplicationSpy;
  });

  describe('when there is an error', () => {
    beforeEach(() => {
      updateApplicationSpy = jest.fn(() => Promise.reject(new Error('mock')));
      api.keystone.application.update.lossPayeeFinancialDetailsUk = updateApplicationSpy;
    });

    it('should throw an error', async () => {
      try {
        await save.lossPayeeFinancialDetailsUk(mockApplication, mockFormBody);
      } catch (err) {
        const expected = new Error("Updating application's loss payee financial details uk");
        expect(err).toEqual(expected);
      }
    });
  });
});
