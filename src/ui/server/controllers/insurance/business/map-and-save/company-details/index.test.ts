import mapAndSave from '.';
import save from '../../save-data/company-details';
import generateValidationErrors from '../../../../../helpers/validation';
import { FIELD_IDS } from '../../../../../constants';
import mapSubmittedData from '../../map-submitted-data/company-details';
import { mockApplication, mockSpyPromise } from '../../../../../test-mocks';

const {
  COMPANIES_HOUSE: { COMPANY_NUMBER },
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME, TRADING_ADDRESS, PHONE_NUMBER },
  },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/business/map-and-save/company-details', () => {
  jest.mock('../../save-data/company-details');

  let mockFormBody = {
    _csrf: '1234',
    [HAS_DIFFERENT_TRADING_NAME]: 'true',
    [TRADING_ADDRESS]: 'false',
    [PHONE_NUMBER]: '*99',
    [COMPANY_NUMBER]: mockApplication.company.companyNumber,
  };

  const mockSaveCompanyDetails = mockSpyPromise;
  save.companyDetails = mockSaveCompanyDetails;

  const mockValidationErrors = generateValidationErrors(PHONE_NUMBER, 'error', {});

  describe('when the form has data', () => {
    describe('when the form has validation errors', () => {
      it('should call save.companyDetails with application, mapped submitted data and validationErrors.errorList', async () => {
        await mapAndSave.companyDetails(mockFormBody, mockApplication, mockValidationErrors);

        expect(save.companyDetails).toHaveBeenCalledTimes(1);
        expect(save.companyDetails).toHaveBeenCalledWith(mockApplication, mapSubmittedData(mockFormBody), mockValidationErrors?.errorList);
      });

      it('should return true', async () => {
        const result = await mapAndSave.companyDetails(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });

    describe('when the form does NOT have validation errors ', () => {
      it('should call save.companyDetails with application and mapped submitted data', async () => {
        await mapAndSave.companyDetails(mockFormBody, mockApplication);

        expect(save.companyDetails).toHaveBeenCalledTimes(1);
        expect(save.companyDetails).toHaveBeenCalledWith(mockApplication, mapSubmittedData(mockFormBody));
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
