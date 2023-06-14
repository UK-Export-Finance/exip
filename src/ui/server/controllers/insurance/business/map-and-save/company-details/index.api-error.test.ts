import companyDetails from '.';
import companyDetailsSave from '../../save-data/company-details';
import { mockApplication } from '../../../../../test-mocks';
import { FIELD_IDS } from '../../../../../constants';

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: { INPUT, COMPANY_NUMBER },
    YOUR_COMPANY: { TRADING_NAME, TRADING_ADDRESS, PHONE_NUMBER },
  },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/business/map-and-save/company-details - API errors', () => {
  jest.mock('../../save-data/company-details');

  const mockFormBody = {
    _csrf: '1234',
    [INPUT]: '12345',
    [TRADING_NAME]: 'true',
    [TRADING_ADDRESS]: 'false',
    [PHONE_NUMBER]: '*99',
    [COMPANY_NUMBER]: mockApplication.company.companyNumber,
  };

  const mockSaveCompanyDetails = jest.fn(() => Promise.resolve({}));
  companyDetailsSave.save = mockSaveCompanyDetails;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('when save application companyDetails call does not return anything', () => {
    beforeEach(() => {
      companyDetailsSave.save = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await companyDetails.mapAndSave(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save application companyDetails call fails', () => {
    beforeEach(() => {
      companyDetailsSave.save = jest.fn(() => Promise.reject(new Error('Mock error')));
    });

    it('should return false', async () => {
      const result = await companyDetails.mapAndSave(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });
});
