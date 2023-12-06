import mapAndSave from '.';
import save from '../../save-data/broker';
import { mockApplication, mockBroker } from '../../../../../test-mocks';

describe('controllers/insurance/policy/map-and-save/broker - API error', () => {
  jest.mock('../../save-data/broker');

  const mockFormBody = {
    _csrf: '1234',
    ...mockBroker,
  };

  const mockSaveBroker = jest.fn(() => Promise.resolve({}));
  save.broker = mockSaveBroker;

  describe('when save application broker call does not return anything', () => {
    beforeEach(() => {
      save.broker = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.broker(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save application broker call fails', () => {
    beforeEach(() => {
      save.broker = jest.fn(() => Promise.reject(new Error('mock')));
    });

    it('should return false', async () => {
      const result = await mapAndSave.broker(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });
});
