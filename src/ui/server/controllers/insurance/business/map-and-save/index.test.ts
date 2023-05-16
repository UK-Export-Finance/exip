import mapAndSave from '.';
import { FIELD_IDS } from '../../../../constants';
import mapCompanyDetailsSubmittedData from '../company-details/map-submitted-data';
import mapNatureOfBusinessSubmittedData from '../nature-of-business/map-submitted-data';
import mapTurnoverSubmittedData from '../turnover/map-submitted-data';
import save from '../save-data';
import { mockApplication, mockBroker, mockBusiness } from '../../../../test-mocks';
import generateValidationErrors from '../../../../helpers/validation';

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: { INPUT, COMPANY_NUMBER },
    YOUR_COMPANY: { TRADING_NAME, TRADING_ADDRESS, PHONE_NUMBER },
    NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK, EMPLOYEES_INTERNATIONAL },
    TURNOVER: { PERCENTAGE_TURNOVER, ESTIMATED_ANNUAL_TURNOVER },
    BROKER: { NAME },
    CONTACT: { POSITION },
  },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/business/map-and-save', () => {
  jest.mock('../save-data');

  describe('company-details', () => {
    let mockFormBody = {
      _csrf: '1234',
      [INPUT]: '12345',
      [TRADING_NAME]: 'true',
      [TRADING_ADDRESS]: 'false',
      [PHONE_NUMBER]: '*99',
      [COMPANY_NUMBER]: mockApplication.company.companyNumber,
    };

    const mockSaveCompanyDetails = jest.fn(() => Promise.resolve({}));
    save.companyDetails = mockSaveCompanyDetails;

    const mockValidationErrors = generateValidationErrors(PHONE_NUMBER, 'error', {});

    describe('when the form has data', () => {
      describe('when the form has validation errors ', () => {
        it('should call save.companyDetails with application, populated submitted data and validationErrors.errorList', async () => {
          await mapAndSave.companyDetails(mockFormBody, mockApplication, mockValidationErrors);

          expect(save.companyDetails).toHaveBeenCalledTimes(1);
          expect(save.companyDetails).toHaveBeenCalledWith(
            mockApplication,
            mapCompanyDetailsSubmittedData(mockFormBody, mockApplication),
            mockValidationErrors?.errorList,
          );
        });

        it('should return true', async () => {
          const result = await mapAndSave.companyDetails(mockFormBody, mockApplication, mockValidationErrors);

          expect(result).toEqual(true);
        });
      });

      describe('when the form does NOT have validation errors ', () => {
        it('should call save.companyDetails with application and populated submitted data', async () => {
          await mapAndSave.companyDetails(mockFormBody, mockApplication);

          expect(save.companyDetails).toHaveBeenCalledTimes(1);
          expect(save.companyDetails).toHaveBeenCalledWith(mockApplication, mapCompanyDetailsSubmittedData(mockFormBody, mockApplication));
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

  describe('nature-of-business', () => {
    let mockFormBody = {
      _csrf: '1234',
      [GOODS_OR_SERVICES]: 'test',
      [YEARS_EXPORTING]: '5O',
      [EMPLOYEES_UK]: '3',
      [EMPLOYEES_INTERNATIONAL]: '25',
    };

    const mockSaveBusiness = jest.fn(() => Promise.resolve({}));
    save.business = mockSaveBusiness;

    const mockValidationErrors = generateValidationErrors(YEARS_EXPORTING, 'error', {});

    describe('when the form has data', () => {
      describe('when the form has validation errors ', () => {
        it('should call save.business with application, populated submitted data and validationErrors.errorList', async () => {
          await mapAndSave.natureOfBusiness(mockFormBody, mockApplication, mockValidationErrors);

          expect(save.business).toHaveBeenCalledTimes(1);
          expect(save.business).toHaveBeenCalledWith(mockApplication, mapNatureOfBusinessSubmittedData(mockFormBody), mockValidationErrors?.errorList);
        });

        it('should return true', async () => {
          const result = await mapAndSave.natureOfBusiness(mockFormBody, mockApplication, mockValidationErrors);

          expect(result).toEqual(true);
        });
      });

      describe('when the form does NOT have validation errors ', () => {
        mockFormBody = {
          _csrf: '1234',
          [GOODS_OR_SERVICES]: 'test',
          [YEARS_EXPORTING]: '5',
          [EMPLOYEES_UK]: '3',
          [EMPLOYEES_INTERNATIONAL]: '25',
        };

        it('should call save.business with application and populated submitted data', async () => {
          await mapAndSave.natureOfBusiness(mockFormBody, mockApplication);

          expect(save.business).toHaveBeenCalledTimes(1);

          expect(save.business).toHaveBeenCalledWith(mockApplication, mapNatureOfBusinessSubmittedData(mockFormBody));
        });

        it('should return true', async () => {
          const result = await mapAndSave.natureOfBusiness(mockFormBody, mockApplication, mockValidationErrors);

          expect(result).toEqual(true);
        });
      });
    });

    describe('when the form does not have any data', () => {
      it('should return true', async () => {
        mockFormBody = { _csrf: '1234' };

        const result = await mapAndSave.natureOfBusiness(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });

  describe('turnover', () => {
    let mockFormBody = {
      _csrf: '1234',
      [PERCENTAGE_TURNOVER]: '25',
      [ESTIMATED_ANNUAL_TURNOVER]: '35000',
    };

    const mockSaveBusiness = jest.fn(() => Promise.resolve({}));
    save.business = mockSaveBusiness;

    const mockValidationErrors = generateValidationErrors(PERCENTAGE_TURNOVER, 'error', {});

    describe('when the form has data', () => {
      describe('when the form has validation errors ', () => {
        it('should call save.business with application, populated submitted data and validationErrors.errorList', async () => {
          await mapAndSave.natureOfBusiness(mockFormBody, mockApplication, mockValidationErrors);

          expect(save.business).toHaveBeenCalledTimes(1);
          expect(save.business).toHaveBeenCalledWith(mockApplication, mapTurnoverSubmittedData(mockFormBody), mockValidationErrors?.errorList);
        });

        it('should return true', async () => {
          const result = await mapAndSave.turnover(mockFormBody, mockApplication, mockValidationErrors);

          expect(result).toEqual(true);
        });
      });

      describe('when the form does NOT have validation errors ', () => {
        mockFormBody = {
          _csrf: '1234',
          [PERCENTAGE_TURNOVER]: '25',
          [ESTIMATED_ANNUAL_TURNOVER]: '35000',
        };

        it('should call save.business with application and populated submitted data', async () => {
          await mapAndSave.natureOfBusiness(mockFormBody, mockApplication);

          expect(save.business).toHaveBeenCalledTimes(1);
          expect(save.business).toHaveBeenCalledWith(mockApplication, mapTurnoverSubmittedData(mockFormBody));
        });

        it('should return true', async () => {
          const result = await mapAndSave.turnover(mockFormBody, mockApplication, mockValidationErrors);

          expect(result).toEqual(true);
        });
      });
    });

    describe('when the form does not have any data', () => {
      it('should return true', async () => {
        mockFormBody = { _csrf: '1234' };

        const result = await mapAndSave.turnover(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });

  describe('broker', () => {
    const mockFormBody = {
      _csrf: '1234',
      ...mockBroker,
    };

    const mockSaveBroker = jest.fn(() => Promise.resolve({}));
    save.broker = mockSaveBroker;

    const mockValidationErrors = generateValidationErrors(NAME, 'error', {});

    describe('when the form has data', () => {
      describe('when the form has validation errors ', () => {
        it('should call save.broker with application, populated submitted data and validationErrors.errorList', async () => {
          await mapAndSave.broker(mockFormBody, mockApplication, mockValidationErrors);

          expect(save.broker).toHaveBeenCalledTimes(1);
          expect(save.broker).toHaveBeenCalledWith(mockApplication, mockFormBody, mockValidationErrors?.errorList);
        });

        it('should return true', async () => {
          const result = await mapAndSave.broker(mockFormBody, mockApplication, mockValidationErrors);

          expect(result).toEqual(true);
        });
      });

      describe('when the form does NOT have validation errors ', () => {
        it('should call save.broker with application and populated submitted data', async () => {
          await mapAndSave.broker(mockFormBody, mockApplication);

          expect(save.broker).toHaveBeenCalledTimes(1);
          expect(save.broker).toHaveBeenCalledWith(mockApplication, mockFormBody);
        });

        it('should return true', async () => {
          const result = await mapAndSave.broker(mockFormBody, mockApplication, mockValidationErrors);

          expect(result).toEqual(true);
        });
      });
    });

    describe('when the form does not have any data', () => {
      it('should return true', async () => {
        const emptyMockFormBody = { _csrf: '1234' };

        const result = await mapAndSave.broker(emptyMockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });

  describe('contact', () => {
    const { id, ...mockBusinessBody } = mockBusiness.businessContactDetail;

    const mockFormBody = {
      _csrf: '1234',
      ...mockBusinessBody,
    };

    const mockSaveContact = jest.fn(() => Promise.resolve({}));
    save.contact = mockSaveContact;

    const mockValidationErrors = generateValidationErrors(POSITION, 'error', {});

    describe('when the form has data', () => {
      describe('when the form has validation errors ', () => {
        it('should call save.contact with application, populated submitted data and validationErrors.errorList', async () => {
          await mapAndSave.contact(mockFormBody, mockApplication, mockValidationErrors);

          expect(save.contact).toHaveBeenCalledTimes(1);
          expect(save.contact).toHaveBeenCalledWith(mockApplication, mockFormBody, mockValidationErrors?.errorList);
        });

        it('should return true', async () => {
          const result = await mapAndSave.contact(mockFormBody, mockApplication, mockValidationErrors);

          expect(result).toEqual(true);
        });
      });

      describe('when the form does NOT have validation errors ', () => {
        it('should call save.contact with application and populated submitted data', async () => {
          await mapAndSave.contact(mockFormBody, mockApplication);

          expect(save.contact).toHaveBeenCalledTimes(1);
          expect(save.contact).toHaveBeenCalledWith(mockApplication, mockFormBody);
        });

        it('should return true', async () => {
          const result = await mapAndSave.contact(mockFormBody, mockApplication, mockValidationErrors);

          expect(result).toEqual(true);
        });
      });
    });

    describe('when the form does not have any data', () => {
      it('should return true', async () => {
        const emptyMockFormBody = { _csrf: '1234' };

        const result = await mapAndSave.contact(emptyMockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });
});
