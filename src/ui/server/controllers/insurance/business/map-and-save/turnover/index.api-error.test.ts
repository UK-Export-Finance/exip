import mapAndSave from '.';
import save from '../../save-data/business';
import { FIELD_IDS } from '../../../../../constants';
import { mockApplication, mockSpyPromise } from '../../../../../test-mocks';

const {
  EXPORTER_BUSINESS: {
    TURNOVER: { PERCENTAGE_TURNOVER, ESTIMATED_ANNUAL_TURNOVER },
  },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/business/map-and-save/turnover - API error', () => {
  jest.mock('../../save-data/business');

  const mockFormBody = {
    _csrf: '1234',
    [PERCENTAGE_TURNOVER]: '25',
    [ESTIMATED_ANNUAL_TURNOVER]: '35000',
  };

  const mockSaveBusiness = mockSpyPromise();
  save.business = mockSaveBusiness;

  describe('when save application business call does not return anything', () => {
    beforeEach(() => {
      save.business = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.turnover(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save application business call fails', () => {
    beforeEach(() => {
      save.business = jest.fn(() => Promise.reject(new Error('mock')));
    });

    it('should return false', async () => {
      const result = await mapAndSave.turnover(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });
});
