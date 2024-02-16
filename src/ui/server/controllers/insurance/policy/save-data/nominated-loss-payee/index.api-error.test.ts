import save from '.';
import api from '../../../../../api';
import { mockApplication, mockNominatedLossPayee } from '../../../../../test-mocks';

describe('controllers/insurance/policy/save-data/nominated-loss-payee - API error', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));
  const mockFormBody = mockNominatedLossPayee;

  beforeEach(() => {
    api.keystone.application.update.nominatedLossPayee = updateApplicationSpy;
  });

  describe('when there is an error', () => {
    beforeEach(() => {
      updateApplicationSpy = jest.fn(() => Promise.reject(new Error('mock')));
      api.keystone.application.update.nominatedLossPayee = updateApplicationSpy;
    });

    it('should throw an error', async () => {
      try {
        await save.nominatedLossPayee(mockApplication, mockFormBody);
      } catch (err) {
        const expected = new Error("Updating application's nominated loss payee");
        expect(err).toEqual(expected);
      }
    });
  });
});
