import mapAndSave from '.';
import save from '../save-data';
import { mockApplication } from '../../../../test-mocks';

describe('controllers/insurance/business/map-and-save - api errors', () => {
  jest.mock('../save-data');

  const mockFormBody = {
    _csrf: '1234',
    mock: true,
  };

  describe('when save application companyDetailsSave call does not return anything', () => {
    beforeEach(() => {
      save.companyDetails = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.companyDetailsSave(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save application companyDetailsSave call fails', () => {
    beforeEach(() => {
      save.companyDetails = jest.fn(() => Promise.reject(new Error('Mock error')));
    });

    it('should return false', async () => {
      const result = await mapAndSave.companyDetailsSave(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });
});
