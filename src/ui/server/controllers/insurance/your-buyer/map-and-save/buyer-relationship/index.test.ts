import mapAndSave from '.';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import save from '../../save-data/buyer-relationship';
import generateValidationErrors from '../../../../../helpers/validation';
import mapSubmittedData from '../../map-submitted-data/buyer-relationship';
import { mockApplication, mockSpyPromise } from '../../../../../test-mocks';

const {
  YOUR_BUYER: { CONNECTION_WITH_BUYER, CONNECTION_WITH_BUYER_DESCRIPTION },
} = INSURANCE_FIELD_IDS;

describe('controllers/insurance/your-buyer/map-and-save/buyer-relationship', () => {
  jest.mock('../../save-data/buyer-relationship');

  let mockFormBody = {
    _csrf: '1234',
    [CONNECTION_WITH_BUYER]: true,
    [CONNECTION_WITH_BUYER_DESCRIPTION]: 'mock description',
  };

  const mockSaveBuyer = mockSpyPromise;
  save.buyerRelationship = mockSaveBuyer;

  const mockValidationErrors = generateValidationErrors(CONNECTION_WITH_BUYER_DESCRIPTION, 'error', {});

  describe('when the form has data', () => {
    describe('when the form has validation errors', () => {
      it('should call save.buyerRelationship with application, submitted data and validationErrors.errorList', async () => {
        await mapAndSave.buyerRelationship(mockFormBody, mockApplication, mockValidationErrors);

        expect(save.buyerRelationship).toHaveBeenCalledTimes(1);
        expect(save.buyerRelationship).toHaveBeenCalledWith(mockApplication, mapSubmittedData(mockFormBody), mockValidationErrors?.errorList);
      });

      it('should return true', async () => {
        const result = await mapAndSave.buyerRelationship(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });

    describe('when the form does NOT have validation errors ', () => {
      it('should call save.buyerRelationship with application and submitted data', async () => {
        await mapAndSave.buyerRelationship(mockFormBody, mockApplication);

        expect(save.buyerRelationship).toHaveBeenCalledTimes(1);
        expect(save.buyerRelationship).toHaveBeenCalledWith(mockApplication, mapSubmittedData(mockFormBody));
      });

      it('should return true', async () => {
        const result = await mapAndSave.buyerRelationship(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });

  describe('when the form does not have any data', () => {
    it('should return true', async () => {
      mockFormBody = { _csrf: '1234' };

      const result = await mapAndSave.buyerRelationship(mockFormBody, mockApplication, mockValidationErrors);

      expect(result).toEqual(true);
    });
  });
});
