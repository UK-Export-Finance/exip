import mapAndSave from '.';
import save from '../../save-data/company-details';
import { FIELD_IDS } from '../../../../../constants';
import { mockApplication, mockSpyPromise } from '../../../../../test-mocks';

const {
  COMPANIES_HOUSE: { COMPANY_NUMBER },
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME, TRADING_ADDRESS, PHONE_NUMBER },
  },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/business/map-and-save/company-details - API errors', () => {
  jest.mock('../../save-data/company-details');

  const mockFormBody = {
    _csrf: '1234',
    [HAS_DIFFERENT_TRADING_NAME]: 'true',
    [TRADING_ADDRESS]: 'false',
    [PHONE_NUMBER]: '*99',
    [COMPANY_NUMBER]: mockApplication.company.companyNumber,
  };

  const mockSaveCompanyDetails = mockSpyPromise();
  save.companyDetails = mockSaveCompanyDetails;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('when save application companyDetails call does not return anything', () => {
    beforeEach(() => {
      save.companyDetails = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.companyDetails(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save application companyDetails call fails', () => {
    beforeEach(() => {
      save.companyDetails = jest.fn(() => Promise.reject(new Error('mock')));
    });

    it('should return false', async () => {
      const result = await mapAndSave.companyDetails(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });
});
