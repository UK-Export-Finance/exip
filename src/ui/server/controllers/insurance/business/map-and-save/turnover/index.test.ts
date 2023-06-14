import turnover from '.';
import businessSave from '../../save-data/business';
import mapTurnoverSubmittedData from '../../turnover/map-submitted-data';
import { mockApplication } from '../../../../../test-mocks';
import generateValidationErrors from '../../../../../helpers/validation';
import { FIELD_IDS } from '../../../../../constants';

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

  const mockSaveBusiness = jest.fn(() => Promise.resolve({}));
  businessSave.save = mockSaveBusiness;

  const mockValidationErrors = generateValidationErrors(PERCENTAGE_TURNOVER, 'error', {});

  describe('when the form has data', () => {
    describe('when the form has validation errors ', () => {
      it('should call businessSave.save with application, populated submitted data and validationErrors.errorList', async () => {
        await turnover.mapAndSave(mockFormBody, mockApplication, mockValidationErrors);

        expect(businessSave.save).toHaveBeenCalledTimes(1);
        expect(businessSave.save).toHaveBeenCalledWith(mockApplication, mapTurnoverSubmittedData(mockFormBody), mockValidationErrors?.errorList);
      });

      it('should return true', async () => {
        const result = await turnover.mapAndSave(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });

    describe('when the form does NOT have validation errors ', () => {
      mockFormBody = {
        _csrf: '1234',
        [PERCENTAGE_TURNOVER]: '25',
        [ESTIMATED_ANNUAL_TURNOVER]: '35000',
      };

      it('should call businessSave.save with application and populated submitted data', async () => {
        await turnover.mapAndSave(mockFormBody, mockApplication);

        expect(businessSave.save).toHaveBeenCalledTimes(1);
        expect(businessSave.save).toHaveBeenCalledWith(mockApplication, mapTurnoverSubmittedData(mockFormBody));
      });

      it('should return true', async () => {
        const result = await turnover.mapAndSave(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });

  describe('when the form does not have any data', () => {
    it('should return true', async () => {
      mockFormBody = { _csrf: '1234' };

      const result = await turnover.mapAndSave(mockFormBody, mockApplication, mockValidationErrors);

      expect(result).toEqual(true);
    });
  });
});
