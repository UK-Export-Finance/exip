import broker from '.';
import brokerSave from '../../save-data/broker';
import { mockApplication, mockBroker } from '../../../../../test-mocks';

describe('controllers/insurance/business/map-and-save/broker - API error', () => {
  jest.mock('../../save-data/broker');

  const mockFormBody = {
    _csrf: '1234',
    ...mockBroker,
  };

  const mockSaveBroker = jest.fn(() => Promise.resolve({}));
  brokerSave.save = mockSaveBroker;

  describe('when save application broker call does not return anything', () => {
    beforeEach(() => {
      brokerSave.save = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await broker.mapAndSave(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save application broker call fails', () => {
    beforeEach(() => {
      brokerSave.save = jest.fn(() => Promise.reject(new Error('Mock error')));
    });

    it('should return false', async () => {
      const result = await broker.mapAndSave(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });
});
