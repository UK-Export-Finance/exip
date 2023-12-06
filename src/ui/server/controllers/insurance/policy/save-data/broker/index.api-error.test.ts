import save from '.';
import api from '../../../../../api';
import { mockApplication, mockBroker } from '../../../../../test-mocks';

describe('controllers/insurance/policy/save-data/broker - API error', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));
  const mockFormBody = mockBroker;

  beforeEach(() => {
    api.keystone.application.update.broker = updateApplicationSpy;
  });

  describe('when there is an error', () => {
    beforeEach(() => {
      updateApplicationSpy = jest.fn(() => Promise.reject(new Error('mock')));
      api.keystone.application.update.broker = updateApplicationSpy;
    });

    it('should throw an error', async () => {
      try {
        await save.broker(mockApplication, mockFormBody);
      } catch (err) {
        const expected = new Error("Updating application's broker");
        expect(err).toEqual(expected);
      }
    });
  });
});
