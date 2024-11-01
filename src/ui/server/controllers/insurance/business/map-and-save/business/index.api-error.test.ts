import mapAndSave from '.';
import save from '../../save-data/business';
import { FIELD_IDS } from '../../../../../constants';
import { mockApplication, mockSpyPromise, mockSpyPromiseRejection } from '../../../../../test-mocks';

const {
  EXPORTER_BUSINESS: {
    NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK },
  },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/business/map-and-save/business - API error', () => {
  jest.mock('../../save-data/business');

  const mockFormBody = {
    _csrf: '1234',
    [GOODS_OR_SERVICES]: 'test',
    [YEARS_EXPORTING]: '5O',
    [EMPLOYEES_UK]: '3',
  };

  const mockSaveBusiness = mockSpyPromise();
  save.business = mockSaveBusiness;

  describe('when save application business call does not return anything', () => {
    beforeEach(() => {
      save.business = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.business(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save application business call fails', () => {
    beforeEach(() => {
      save.business = mockSpyPromiseRejection;
    });

    it('should return false', async () => {
      const result = await mapAndSave.business(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });
});
