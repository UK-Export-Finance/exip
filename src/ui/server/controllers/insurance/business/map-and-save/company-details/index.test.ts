import companyDetails from '.';
import companyDetailsSave from '../../save-data/company-details';
import mapCompanyDetailsSubmittedData from '../../company-details/map-submitted-data';
import { mockApplication } from '../../../../../test-mocks';
import generateValidationErrors from '../../../../../helpers/validation';
import { FIELD_IDS } from '../../../../../constants';

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: { INPUT, COMPANY_NUMBER },
    YOUR_COMPANY: { TRADING_NAME, TRADING_ADDRESS, PHONE_NUMBER },
  },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/business/map-and-save/company-details', () => {
  jest.mock('../../save-data/company-details');

  let mockFormBody = {
    _csrf: '1234',
    [INPUT]: '12345',
    [TRADING_NAME]: 'true',
    [TRADING_ADDRESS]: 'false',
    [PHONE_NUMBER]: '*99',
    [COMPANY_NUMBER]: mockApplication.company.companyNumber,
  };

  const mockSaveCompanyDetails = jest.fn(() => Promise.resolve({}));
  companyDetailsSave.save = mockSaveCompanyDetails;

  const mockValidationErrors = generateValidationErrors(PHONE_NUMBER, 'error', {});

  describe('when the form has data', () => {
    describe('when the form has validation errors ', () => {
      it('should call companyDetailsSave.save with application, populated submitted data and validationErrors.errorList', async () => {
        await companyDetails.mapAndSave(mockFormBody, mockApplication, mockValidationErrors);

        expect(companyDetailsSave.save).toHaveBeenCalledTimes(1);
        expect(companyDetailsSave.save).toHaveBeenCalledWith(
          mockApplication,
          mapCompanyDetailsSubmittedData(mockFormBody, mockApplication),
          mockValidationErrors?.errorList,
        );
      });

      it('should return true', async () => {
        const result = await companyDetails.mapAndSave(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });

    describe('when the form does NOT have validation errors ', () => {
      it('should call companyDetailsSave.save with application and populated submitted data', async () => {
        await companyDetails.mapAndSave(mockFormBody, mockApplication);

        expect(companyDetailsSave.save).toHaveBeenCalledTimes(1);
        expect(companyDetailsSave.save).toHaveBeenCalledWith(mockApplication, mapCompanyDetailsSubmittedData(mockFormBody, mockApplication));
      });

      it('should return true', async () => {
        const result = await companyDetails.mapAndSave(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });

  describe('when the form does not have any data', () => {
    it('should return true', async () => {
      mockFormBody = { _csrf: '1234' };

      const result = await companyDetails.mapAndSave(mockFormBody, mockApplication, mockValidationErrors);

      expect(result).toEqual(true);
    });
  });
});
