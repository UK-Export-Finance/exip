import save from '.';
import api from '../../../../../api';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import stripEmptyFormFields from '../../../../../helpers/strip-empty-form-fields';
import { FIELD_IDS } from '../../../../../constants';
import { mockApplication } from '../../../../../test-mocks';
import generateValidationErrors from '../../../../../helpers/validation';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { TRADING_NAME, TRADING_ADDRESS, PHONE_NUMBER },
  },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/business/save-data/company-details', () => {
  const mockUpdateApplicationResponse = mockApplication;
  const updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));

  const mockFormBody = {
    [TRADING_NAME]: 'true',
    [TRADING_ADDRESS]: 'false',
    [PHONE_NUMBER]: '*99',
  };

  beforeEach(() => {
    api.keystone.application.update.company = updateApplicationSpy;
  });

  describe('when errorList is provided', () => {
    const mockValidationErrors = generateValidationErrors(PHONE_NUMBER, 'error', {});

    it(`should call api.keystone.application.update.company with ${TRADING_ADDRESS}, ${TRADING_NAME} but not ${PHONE_NUMBER}`, async () => {
      await save.companyDetails(mockApplication, mockFormBody, mockValidationErrors.errorList);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const dataToSave = stripEmptyFormFields(getDataToSave(mockFormBody, mockValidationErrors.errorList));
      const expectedSanitisedData = sanitiseData(dataToSave);
      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.company.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.companyDetails(mockApplication, mockFormBody);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('when errorList is NOT provided', () => {
    it(`should call api.keystone.application.update.company with ${TRADING_ADDRESS}, ${TRADING_NAME} and ${PHONE_NUMBER}`, async () => {
      await save.companyDetails(mockApplication, mockFormBody);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const dataToSave = getDataToSave(mockFormBody);
      const expectedSanitisedData = sanitiseData(dataToSave);
      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.company.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.companyDetails(mockApplication, mockFormBody);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });
});
