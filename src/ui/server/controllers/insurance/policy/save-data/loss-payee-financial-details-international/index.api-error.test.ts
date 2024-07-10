import save from '.';
import api from '../../../../../api';
import { mockApplication, mockLossPayeeFinancialDetailsInternational } from '../../../../../test-mocks';

describe('controllers/insurance/policy/save-data/loss-payee-financial-details-international - API error', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));
  const mockFormBody = mockLossPayeeFinancialDetailsInternational;

  beforeEach(() => {
    api.keystone.application.update.updateLossPayeeFinancialDetailsInternational = updateApplicationSpy;
  });

  describe('when there is an error', () => {
    beforeEach(() => {
      updateApplicationSpy = jest.fn(() => Promise.reject(new Error('mock')));
      api.keystone.application.update.updateLossPayeeFinancialDetailsInternational = updateApplicationSpy;
    });

    it('should throw an error', async () => {
      try {
        await save.lossPayeeFinancialDetailsInternational(mockApplication, mockFormBody);
      } catch (err) {
        const expected = new Error("Updating application's loss payee financial details international");
        expect(err).toEqual(expected);
      }
    });
  });
});
