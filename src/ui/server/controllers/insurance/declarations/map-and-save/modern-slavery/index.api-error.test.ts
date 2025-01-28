import mapAndSave from '.';
import save from '../../save-data/modern-slavery';
import { mockApplication, mockSpyPromiseRejection } from '../../../../../test-mocks';

describe('controllers/insurance/declarations/map-and-save/modern-slavery - api errors', () => {
  jest.mock('../../save-data/modern-slavery');

  const mockFormBody = {
    _csrf: '1234',
    mock: true,
  };

  describe('when save application declarationModernSlavery call does not return anything', () => {
    beforeEach(() => {
      save.declarationModernSlavery = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.declarationModernSlavery(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save application declarationModernSlavery call fails', () => {
    beforeEach(() => {
      save.declarationModernSlavery = mockSpyPromiseRejection;
    });

    it('should return false', async () => {
      const result = await mapAndSave.declarationModernSlavery(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });
});
