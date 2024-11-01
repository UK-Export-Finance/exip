import save from '.';
import api from '../../../../../api';
import { mockApplication, mockBroker, mockSpyPromiseRejection } from '../../../../../test-mocks';

describe('controllers/insurance/policy/save-data/broker - API error', () => {
  const mockFormBody = mockBroker;

  beforeEach(() => {
    const updateApplicationSpy = mockSpyPromiseRejection;
    api.keystone.application.update.broker = updateApplicationSpy;
  });

  it('should throw an error', async () => {
    try {
      await save.broker(mockApplication, mockFormBody);
    } catch (error) {
      const expected = new Error("Updating application's broker");
      expect(error).toEqual(expected);
    }
  });
});
