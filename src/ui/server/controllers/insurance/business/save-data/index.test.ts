import save from '.';
import api from '../../../../api';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import getDataToSave from '../../../../helpers/get-data-to-save';
import { FIELD_IDS } from '../../../../constants';
import { mockApplication } from '../../../../test-mocks';
import generateValidationErrors from '../../../../helpers/validation';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { TRADING_NAME, TRADING_ADDRESS, PHONE_NUMBER },
  },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/business/save-data', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));

  const mockFormBody = {
    [TRADING_NAME]: 'true',
    [TRADING_ADDRESS]: 'false',
    [PHONE_NUMBER]: '*99',
  };

  beforeEach(() => {
    api.keystone.application.update.exporterCompany = updateApplicationSpy;
  });

  describe('when errorList is provided', () => {
    const mockValidationErrors = generateValidationErrors(PHONE_NUMBER, 'error', {});

    it(`should call api.keystone.application.update.exporterCompany with ${TRADING_ADDRESS}, ${TRADING_NAME} but not ${PHONE_NUMBER}`, async () => {
      await save.companyDetails(mockApplication, mockFormBody, mockValidationErrors.errorList);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const dataToSave = getDataToSave(mockFormBody, mockValidationErrors.errorList);
      const expectedSanitisedData = sanitiseData(dataToSave);
      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.exporterCompany.id, mockApplication.exporterCompanyAddress.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.companyDetails(mockApplication, mockFormBody);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('when errorList is NOT provided', () => {
    it(`should call api.keystone.application.update.exporterCompany with ${TRADING_ADDRESS}, ${TRADING_NAME} and ${PHONE_NUMBER}`, async () => {
      await save.companyDetails(mockApplication, mockFormBody);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const dataToSave = getDataToSave(mockFormBody);
      const expectedSanitisedData = sanitiseData(dataToSave);
      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.exporterCompany.id, mockApplication.exporterCompanyAddress.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.companyDetails(mockApplication, mockFormBody);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('api error handling', () => {
    describe('update exporterCompany call', () => {
      describe('when there is an error', () => {
        beforeEach(() => {
          updateApplicationSpy = jest.fn(() => Promise.reject());
          api.keystone.application.update.exporterCompany = updateApplicationSpy;
        });

        it('should throw an error', async () => {
          try {
            await save.companyDetails(mockApplication, mockFormBody);
          } catch (err) {
            const expected = new Error("Updating application's companyDetails");
            expect(err).toEqual(expected);
          }
        });
      });
    });
  });
});
