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
    NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK, EMPLOYEES_INTERNATIONAL },
  },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/business/save-data', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));

  describe('companyDetails', () => {
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
        expect(updateApplicationSpy).toHaveBeenCalledWith(
          mockApplication.exporterCompany.id,
          mockApplication.exporterCompany.registeredOfficeAddress.id,
          expectedSanitisedData,
        );
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
        expect(updateApplicationSpy).toHaveBeenCalledWith(
          mockApplication.exporterCompany.id,
          mockApplication.exporterCompany.registeredOfficeAddress.id,
          expectedSanitisedData,
        );
      });

      it('should return the API response', async () => {
        const result = await save.companyDetails(mockApplication, mockFormBody);

        expect(result).toEqual(mockUpdateApplicationResponse);
      });
    });
  });

  describe('exporterBusiness', () => {
    const mockFormBody = {
      [GOODS_OR_SERVICES]: 'test',
      [YEARS_EXPORTING]: '5',
      [EMPLOYEES_UK]: '3',
      [EMPLOYEES_INTERNATIONAL]: '25',
    };

    beforeEach(() => {
      api.keystone.application.update.exporterBusiness = updateApplicationSpy;
    });

    describe('when errorList is provided', () => {
      const mockValidationErrors = generateValidationErrors(EMPLOYEES_UK, 'error', {});

      it(`should call api.keystone.application.update.exporterBusiness with ${GOODS_OR_SERVICES}, ${YEARS_EXPORTING}, ${EMPLOYEES_INTERNATIONAL} but not ${EMPLOYEES_UK}`, async () => {
        await save.natureOfBusiness(mockApplication, mockFormBody, mockValidationErrors.errorList);

        expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

        const dataToSave = getDataToSave(mockFormBody, mockValidationErrors.errorList);
        const expectedSanitisedData = sanitiseData(dataToSave);
        expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.exporterBusiness.id, expectedSanitisedData);
      });

      it('should return the API response', async () => {
        const result = await save.natureOfBusiness(mockApplication, mockFormBody);

        expect(result).toEqual(mockUpdateApplicationResponse);
      });
    });

    describe('when errorList is NOT provided', () => {
      it(`should call api.keystone.application.update.exporterBusiness with ${GOODS_OR_SERVICES}, ${YEARS_EXPORTING}, ${EMPLOYEES_INTERNATIONAL} and ${EMPLOYEES_UK}`, async () => {
        await save.natureOfBusiness(mockApplication, mockFormBody);

        expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

        const dataToSave = getDataToSave(mockFormBody);
        const expectedSanitisedData = sanitiseData(dataToSave);
        expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.exporterBusiness.id, expectedSanitisedData);
      });

      it('should return the API response', async () => {
        const result = await save.natureOfBusiness(mockApplication, mockFormBody);

        expect(result).toEqual(mockUpdateApplicationResponse);
      });
    });
  });

  describe('api error handling', () => {
    describe('update exporterCompany call', () => {
      const mockFormBody = {
        [TRADING_NAME]: 'true',
        [TRADING_ADDRESS]: 'false',
        [PHONE_NUMBER]: '*99',
      };

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

    describe('update exporterBusiness call', () => {
      const mockFormBody = {
        [GOODS_OR_SERVICES]: 'test',
        [YEARS_EXPORTING]: '5',
        [EMPLOYEES_UK]: '3',
        [EMPLOYEES_INTERNATIONAL]: '25',
      };

      describe('when there is an error', () => {
        beforeEach(() => {
          updateApplicationSpy = jest.fn(() => Promise.reject());
          api.keystone.application.update.exporterBusiness = updateApplicationSpy;
        });

        it('should throw an error', async () => {
          try {
            await save.natureOfBusiness(mockApplication, mockFormBody);
          } catch (err) {
            const expected = new Error("Updating application's natureOfBusiness");
            expect(err).toEqual(expected);
          }
        });
      });
    });
  });
});
