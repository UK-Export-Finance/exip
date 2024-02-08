import mapAndSave from '.';
import save from '../../save-data/buyer-relationship';
import { mockApplication } from '../../../../../test-mocks';

describe('controllers/insurance/business/map-and-save/buyer-relationship - api errors', () => {
  jest.mock('../../save-data/buyer-relationship');

  const mockFormBody = {
    _csrf: '1234',
    mock: true,
  };

  describe('when save application buyerRelationship call does not return anything', () => {
    beforeEach(() => {
      save.buyerRelationship = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.buyerRelationship(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save application buyerRelationship call fails', () => {
    beforeEach(() => {
      save.buyerRelationship = jest.fn(() => Promise.reject(new Error('mock')));
    });

    it('should return false', async () => {
      const result = await mapAndSave.buyerRelationship(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });
});
