import mapAndSave from '.';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import save from '../save-data';
import { mockApplication } from '../../../../test-mocks';
import generateValidationErrors from '../../../../helpers/validation';

const {
  POLICY: {
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
  },
} = INSURANCE_FIELD_IDS;

describe('controllers/insurance/export-contract/map-and-save', () => {
  jest.mock('../save-data');

  describe('buyer', () => {
    let mockFormBody = {
      _csrf: '1234',
      [DESCRIPTION]: mockApplication.exportContract[DESCRIPTION],
      [FINAL_DESTINATION]: mockApplication.exportContract[FINAL_DESTINATION],
    };

    const mockSaveExportContract = jest.fn(() => Promise.resolve({}));
    save.exportContract = mockSaveExportContract;

    const mockValidationErrors = generateValidationErrors(DESCRIPTION, 'error', {});

    describe('when the form has data', () => {
      describe('when the form has validation errors', () => {
        it('should call save.exportContract with application, submitted data and validationErrors.errorList', async () => {
          await mapAndSave.exportContract(mockFormBody, mockApplication, mockValidationErrors);

          expect(save.exportContract).toHaveBeenCalledTimes(1);
          expect(save.exportContract).toHaveBeenCalledWith(mockApplication, mockFormBody, mockValidationErrors?.errorList);
        });

        it('should return true', async () => {
          const result = await mapAndSave.exportContract(mockFormBody, mockApplication, mockValidationErrors);

          expect(result).toEqual(true);
        });
      });

      describe('when the form does NOT have validation errors ', () => {
        it('should call save.exportContract with application and submitted data', async () => {
          await mapAndSave.exportContract(mockFormBody, mockApplication);

          expect(save.exportContract).toHaveBeenCalledTimes(1);
          expect(save.exportContract).toHaveBeenCalledWith(mockApplication, mockFormBody);
        });

        it('should return true', async () => {
          const result = await mapAndSave.exportContract(mockFormBody, mockApplication, mockValidationErrors);

          expect(result).toEqual(true);
        });
      });
    });

    describe('when the form does not have any data', () => {
      it('should return true', async () => {
        mockFormBody = { _csrf: '1234' };

        const result = await mapAndSave.exportContract(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });
});
