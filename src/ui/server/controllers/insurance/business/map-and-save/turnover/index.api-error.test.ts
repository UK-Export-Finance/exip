import turnover from '.';
import businessSave from '../../save-data/business';
import { mockApplication } from '../../../../../test-mocks';
import { FIELD_IDS } from '../../../../../constants';

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

  const mockSaveBusiness = jest.fn(() => Promise.resolve({}));
  businessSave.save = mockSaveBusiness;

  describe('when save application business call does not return anything', () => {
    beforeEach(() => {
      businessSave.save = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await turnover.mapAndSave(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save application business call fails', () => {
    beforeEach(() => {
      businessSave.save = jest.fn(() => Promise.reject(new Error('Mock error')));
    });

    it('should return false', async () => {
      const result = await turnover.mapAndSave(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });
});
