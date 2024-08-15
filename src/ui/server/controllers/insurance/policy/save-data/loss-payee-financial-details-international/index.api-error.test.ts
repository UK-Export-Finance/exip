import save from '.';
import api from '../../../../../api';
import { mockApplication, mockLossPayeeFinancialDetailsInternational, mockSpyPromiseRejection } from '../../../../../test-mocks';

describe('controllers/insurance/policy/save-data/loss-payee-financial-details-international - API error', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));
  const mockFormBody = mockLossPayeeFinancialDetailsInternational;

  beforeEach(() => {
    api.keystone.application.update.updateLossPayeeFinancialDetailsInternational = updateApplicationSpy;
  });

  describe('when there is an error', () => {
    beforeEach(() => {
      updateApplicationSpy = mockSpyPromiseRejection;
      api.keystone.application.update.updateLossPayeeFinancialDetailsInternational = updateApplicationSpy;
    });

    it('should throw an error', async () => {
      try {
        await save.lossPayeeFinancialDetailsInternational(mockApplication, mockFormBody);
      } catch (error) {
        const expected = new Error("Updating application's loss payee financial details international");
        expect(error).toEqual(expected);
      }
    });
  });
});
