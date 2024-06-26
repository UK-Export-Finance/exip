import mapAndSave from '.';
import { FIELD_IDS } from '../../../../constants';
import save from '../save-data';
import { mockApplication } from '../../../../test-mocks';
import generateValidationErrors from '../../../../helpers/validation';

const {
  COMPANY_OR_ORGANISATION: { NAME, ADDRESS },
} = FIELD_IDS.INSURANCE.YOUR_BUYER;

describe('controllers/insurance/your-buyer/map-and-save', () => {
  jest.mock('../save-data');

  describe('buyer', () => {
    let mockFormBody = {
      _csrf: '1234',
      [NAME]: 'Test',
    };

    const mockSaveBuyer = jest.fn(() => Promise.resolve({}));
    save.buyer = mockSaveBuyer;

    const mockValidationErrors = generateValidationErrors(ADDRESS, 'error', {});

    describe('when the form has data', () => {
      describe('when the form has validation errors', () => {
        it('should call save.buyer with application, submitted data and validationErrors.errorList', async () => {
          await mapAndSave.yourBuyer(mockFormBody, mockApplication, mockValidationErrors);

          expect(save.buyer).toHaveBeenCalledTimes(1);
          expect(save.buyer).toHaveBeenCalledWith(mockApplication, mockFormBody, mockValidationErrors?.errorList);
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
          expect(save.buyer).toHaveBeenCalledWith(mockApplication, mockFormBody);
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
