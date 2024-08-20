import save from '.';
import api from '../../../../../api';
import { mockApplication, mockNominatedLossPayee, mockSpyPromiseRejection } from '../../../../../test-mocks';

describe('controllers/insurance/policy/save-data/nominated-loss-payee - API error', () => {
  const mockFormBody = mockNominatedLossPayee;

  beforeEach(() => {
    const updateApplicationSpy = mockSpyPromiseRejection;
    api.keystone.application.update.nominatedLossPayee = updateApplicationSpy;
  });

  it('should throw an error', async () => {
    try {
      await save.nominatedLossPayee(mockApplication, mockFormBody);
    } catch (error) {
      const expected = new Error("Updating application's nominated loss payee");
      expect(error).toEqual(expected);
    }
  });
});
