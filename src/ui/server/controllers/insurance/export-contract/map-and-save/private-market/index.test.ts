import mapAndSave from '.';
import save from '../../save-data/private-market';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import { mockApplication } from '../../../../../test-mocks';
import generateValidationErrors from '../../../../../helpers/validation';

const {
  EXPORT_CONTRACT: {
    PRIVATE_MARKET: { ATTEMPTED, DECLINED_DESCRIPTION },
  },
} = INSURANCE_FIELD_IDS;

describe('controllers/insurance/export-contract/map-and-save/export-contract', () => {
  jest.mock('../../save-data/private-market');

  describe('buyer', () => {
    let mockFormBody = {
      _csrf: '1234',
      [ATTEMPTED]: mockApplication.exportContract.privateMarket[ATTEMPTED],
      [DECLINED_DESCRIPTION]: mockApplication.exportContract.privateMarket[DECLINED_DESCRIPTION],
    };

    const mockSaveExportContract = jest.fn(() => Promise.resolve({}));
    save.privateMarket = mockSaveExportContract;

    const mockValidationErrors = generateValidationErrors(DECLINED_DESCRIPTION, 'error', {});

    describe('when the form has data', () => {
      describe('when the form has validation errors', () => {
        it('should call save.privateMarket with application, submitted data and validationErrors.errorList', async () => {
          await mapAndSave.privateMarket(mockFormBody, mockApplication, mockValidationErrors);

          expect(save.privateMarket).toHaveBeenCalledTimes(1);
          expect(save.privateMarket).toHaveBeenCalledWith(mockApplication, mockFormBody, mockValidationErrors?.errorList);
        });

        it('should return true', async () => {
          const result = await mapAndSave.privateMarket(mockFormBody, mockApplication, mockValidationErrors);

          expect(result).toEqual(true);
        });
      });

      describe('when the form does NOT have validation errors ', () => {
        it('should call save.privateMarket with application and submitted data', async () => {
          await mapAndSave.privateMarket(mockFormBody, mockApplication);

          expect(save.privateMarket).toHaveBeenCalledTimes(1);
          expect(save.privateMarket).toHaveBeenCalledWith(mockApplication, mockFormBody);
        });

        it('should return true', async () => {
          const result = await mapAndSave.privateMarket(mockFormBody, mockApplication, mockValidationErrors);

          expect(result).toEqual(true);
        });
      });
    });

    describe('when the form does not have any data', () => {
      it('should return true', async () => {
        mockFormBody = { _csrf: '1234' };

        const result = await mapAndSave.privateMarket(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });
});
