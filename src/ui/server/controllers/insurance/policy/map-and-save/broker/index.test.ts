import mapAndSave from '.';
import save from '../../save-data/broker';
import generateValidationErrors from '../../../../../helpers/validation';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../constants/field-ids/insurance/policy';
import { mockApplication, mockBroker, mockSpyPromise } from '../../../../../test-mocks';

const {
  BROKER_DETAILS: { NAME },
} = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/map-and-save/broker', () => {
  jest.mock('../../save-data/broker');

  const mockFormBody = {
    _csrf: '1234',
    ...mockBroker,
  };

  const mockSaveBroker = mockSpyPromise();
  save.broker = mockSaveBroker;

  const mockValidationErrors = generateValidationErrors(NAME, 'error', {});

  describe('when the form has data', () => {
    describe('when the form has validation errors', () => {
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
