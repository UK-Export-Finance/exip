import mapAndSave from '.';
import saveCompany from '../../save-data/company-details';
import saveAddress from '../../save-data/company-different-trading-address';
import generateValidationErrors from '../../../../../helpers/validation';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import mapSubmittedData from '../../map-submitted-data/company-details';
import { mockApplication, mockSpyPromise } from '../../../../../test-mocks';

const {
  COMPANIES_HOUSE: { COMPANY_NUMBER },
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME, TRADING_ADDRESS, PHONE_NUMBER },
    ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS },
  },
} = INSURANCE_FIELD_IDS;

describe('controllers/insurance/business/map-and-save/company-details', () => {
  jest.mock('../../save-data/company-details');
  jest.mock('../../save-data/company-different-trading-address');

  let mockFormBody = {
    _csrf: '1234',
    [HAS_DIFFERENT_TRADING_NAME]: 'true',
    [TRADING_ADDRESS]: 'true',
    [FULL_ADDRESS]: 'Mock address',
    [PHONE_NUMBER]: '*99',
    [COMPANY_NUMBER]: mockApplication.company.companyNumber,
  };

  const mockSaveCompanyDetails = mockSpyPromise();
  const mockSaveCompanyAddress = mockSpyPromise();

  saveCompany.companyDetails = mockSaveCompanyDetails;
  saveAddress.companyDifferentTradingAddress = mockSaveCompanyAddress;

  const mockValidationErrors = generateValidationErrors(PHONE_NUMBER, 'error', {});

  describe('when the form has data, TRADING_ADDRESS=true, has FULL_ADDRESS', () => {
    describe('when the form has validation errors', () => {
      it('should call saveCompany.companyDetails with application, mapped submitted data and validationErrors.errorList', async () => {
        await mapAndSave.companyDetails(mockFormBody, mockApplication, mockValidationErrors);

        expect(saveCompany.companyDetails).toHaveBeenCalledTimes(1);
        expect(saveCompany.companyDetails).toHaveBeenCalledWith(mockApplication, mapSubmittedData(mockFormBody), mockValidationErrors?.errorList);
      });

      it('should NOT call saveAddress.companyDifferentTradingAddress', async () => {
        await mapAndSave.companyDetails(mockFormBody, mockApplication, mockValidationErrors);

        expect(saveAddress.companyDifferentTradingAddress).toHaveBeenCalledTimes(0);
      });

      it('should return true', async () => {
        const result = await mapAndSave.companyDetails(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });

    describe('when the form does NOT have validation errors', () => {
      it('should call saveCompany.companyDetails with application and mapped submitted data', async () => {
        await mapAndSave.companyDetails(mockFormBody, mockApplication);

        expect(saveCompany.companyDetails).toHaveBeenCalledTimes(1);
        expect(saveCompany.companyDetails).toHaveBeenCalledWith(mockApplication, mapSubmittedData(mockFormBody));
      });

      it('should return true', async () => {
        const result = await mapAndSave.companyDetails(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });

  describe('when the form does not have any data', () => {
    it('should return true', async () => {
      mockFormBody = { _csrf: '1234' };

      const result = await mapAndSave.companyDetails(mockFormBody, mockApplication, mockValidationErrors);

      expect(result).toEqual(true);
    });
  });
});
