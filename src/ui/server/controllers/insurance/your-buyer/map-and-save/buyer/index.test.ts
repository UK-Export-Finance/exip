import mapAndSave from '.';
import { FIELD_IDS } from '../../../../../constants';
import save from '../../save-data/buyer';
import generateValidationErrors from '../../../../../helpers/validation';
import mapSubmittedData from '../../map-submitted-data/buyer';
import { mockApplication, mockSpyPromise } from '../../../../../test-mocks';

const {
  COMPANY_OR_ORGANISATION: { NAME, ADDRESS },
} = FIELD_IDS.INSURANCE.YOUR_BUYER;

describe('controllers/insurance/your-buyer/map-and-save/buyer', () => {
  jest.mock('../../save-data/buyer');

  describe('buyer', () => {
    let mockFormBody = {
      _csrf: '1234',
      [NAME]: 'Test',
    };

    const mockSaveBuyer = mockSpyPromise;
    save.buyer = mockSaveBuyer;

    const mockValidationErrors = generateValidationErrors(ADDRESS, 'error', {});

    describe('when the form has data', () => {
      describe('when the form has validation errors', () => {
        it('should call save.buyer with application, submitted data and validationErrors.errorList', async () => {
          await mapAndSave.yourBuyer(mockFormBody, mockApplication, mockValidationErrors);

          expect(save.buyer).toHaveBeenCalledTimes(1);
          expect(save.buyer).toHaveBeenCalledWith(mockApplication, mapSubmittedData(mockFormBody), mockValidationErrors?.errorList);
        });

        it('should return true', async () => {
          const result = await mapAndSave.yourBuyer(mockFormBody, mockApplication, mockValidationErrors);

          expect(result).toEqual(true);
        });
      });

      describe('when the form does NOT have validation errors ', () => {
        it('should call save.buyer with application and submitted data', async () => {
          await mapAndSave.yourBuyer(mockFormBody, mockApplication);

          expect(save.buyer).toHaveBeenCalledTimes(1);
          expect(save.buyer).toHaveBeenCalledWith(mockApplication, mapSubmittedData(mockFormBody));
        });

        it('should return true', async () => {
          const result = await mapAndSave.yourBuyer(mockFormBody, mockApplication, mockValidationErrors);

          expect(result).toEqual(true);
        });
      });
    });

    describe('when the form does not have any data', () => {
      it('should return true', async () => {
        mockFormBody = { _csrf: '1234' };

        const result = await mapAndSave.yourBuyer(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });
});
