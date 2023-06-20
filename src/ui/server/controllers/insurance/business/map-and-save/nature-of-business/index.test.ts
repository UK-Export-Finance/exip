import mapAndSave from '.';
import save from '../../save-data/business';
import mapNatureOfBusinessSubmittedData from '../../nature-of-business/map-submitted-data';
import { mockApplication } from '../../../../../test-mocks';
import generateValidationErrors from '../../../../../helpers/validation';
import { FIELD_IDS } from '../../../../../constants';

const {
  EXPORTER_BUSINESS: {
    NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK, EMPLOYEES_INTERNATIONAL },
  },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/business/map-and-save/nature-of-business', () => {
  jest.mock('../../save-data/business');

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
