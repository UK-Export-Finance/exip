import mapAndSave from '.';
import saveCompany from '../../save-data/company-details';
import nullify from '../nullify-company-different-address';
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
  const mockNullify = mockSpyPromise();

  saveCompany.companyDetails = mockSaveCompanyDetails;
  nullify.companyDifferentTradingAddress = mockNullify;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('when saveCompany.companyDetails does not return anything', () => {
    beforeEach(() => {
      saveCompany.companyDetails = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.companyDetails(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when saveCompany.companyDetails fails', () => {
    beforeEach(() => {
      saveCompany.companyDetails = jest.fn(() => Promise.reject(new Error('mock')));
    });

    it('should return false', async () => {
      const result = await mapAndSave.companyDetails(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when nullify.companyDifferentTradingAddress does not return anything', () => {
    beforeEach(() => {
      nullify.companyDifferentTradingAddress = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.companyDetails(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when nullify.companyDifferentTradingAddress fails', () => {
    beforeEach(() => {
      nullify.companyDifferentTradingAddress = jest.fn(() => Promise.reject(new Error('mock')));
    });

    it('should return false', async () => {
      const result = await mapAndSave.companyDetails(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });
});
