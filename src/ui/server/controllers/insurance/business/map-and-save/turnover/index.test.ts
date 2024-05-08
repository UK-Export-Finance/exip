import mapAndSave from '.';
import save from '../../save-data/business';
import mapSubmittedData from '../../turnover/map-submitted-data';
import generateValidationErrors from '../../../../../helpers/validation';
import { FIELD_IDS } from '../../../../../constants';
import { mockApplication, mockSpyPromise } from '../../../../../test-mocks';

const {
  EXPORTER_BUSINESS: {
    TURNOVER: { PERCENTAGE_TURNOVER, ESTIMATED_ANNUAL_TURNOVER },
  },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/business/map-and-save/turnover', () => {
  jest.mock('../../save-data/business');

  let mockFormBody = {
    _csrf: '1234',
    [PERCENTAGE_TURNOVER]: '25',
    [ESTIMATED_ANNUAL_TURNOVER]: '35000',
  };

  const mockSaveBusiness = mockSpyPromise();
  save.business = mockSaveBusiness;

  const mockValidationErrors = generateValidationErrors(PERCENTAGE_TURNOVER, 'error', {});

  describe('when the form has data', () => {
    describe('when the form has validation errors', () => {
      it('should call save.business with application, populated submitted data and validationErrors.errorList', async () => {
        await mapAndSave.turnover(mockFormBody, mockApplication, mockValidationErrors);

        expect(save.business).toHaveBeenCalledTimes(1);
        expect(save.business).toHaveBeenCalledWith(mockApplication, mapSubmittedData(mockFormBody), mockValidationErrors?.errorList);
      });

      it('should return true', async () => {
        const result = await mapAndSave.turnover(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });

    describe('when the form does NOT have validation errors', () => {
      mockFormBody = {
        _csrf: '1234',
        [PERCENTAGE_TURNOVER]: '25',
        [ESTIMATED_ANNUAL_TURNOVER]: '35000',
      };

      it('should call save.business with application and populated submitted data', async () => {
        await mapAndSave.turnover(mockFormBody, mockApplication);

        expect(save.business).toHaveBeenCalledTimes(1);
        expect(save.business).toHaveBeenCalledWith(mockApplication, mapSubmittedData(mockFormBody));
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
