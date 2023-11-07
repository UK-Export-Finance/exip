import mapAndSave from '.';
import save from '../../save-data/company-details';
import { mockApplication } from '../../../../../test-mocks';
import { FIELD_IDS } from '../../../../../constants';

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: { COMPANY_NUMBER },
    YOUR_COMPANY: { TRADING_NAME, TRADING_ADDRESS, PHONE_NUMBER },
  },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/business/map-and-save/company-details - API errors', () => {
  jest.mock('../../save-data/company-details');

  const mockFormBody = {
    _csrf: '1234',
    [TRADING_NAME]: 'true',
    [TRADING_ADDRESS]: 'false',
    [PHONE_NUMBER]: '*99',
    [COMPANY_NUMBER]: mockApplication.company.companyNumber,
  };

  const mockSaveCompanyDetails = jest.fn(() => Promise.resolve({}));
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
