import mapAndSave from '.';
import mapSubmittedData from '../../map-submitted-data/broker';
import save from '../../save-data/broker';
import generateValidationErrors from '../../../../../helpers/validation';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../constants/field-ids/insurance/policy';
import { mockApplication } from '../../../../../test-mocks';

const {
  BROKER_DETAILS: { NAME },
} = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/map-and-save/broker', () => {
  jest.mock('../../save-data/broker');

  const mockFormBody = {
    _csrf: '1234',
    ...mockApplication.broker,
  };

  const mockSaveBrokerRespone = {
    ...mockApplication.broker,
    id: 'mock-saved-broker-id',
  };

  const mockSaveBroker = jest.fn().mockResolvedValue(mockSaveBrokerRespone);
  save.broker = mockSaveBroker;

  const populatedData = mapSubmittedData(mockFormBody, mockApplication.broker);

  const mockValidationErrors = generateValidationErrors(NAME, 'error', {});

  describe('when the form has data', () => {
    describe('when the form has validation errors', () => {
      it('should call save.broker with application, populated submitted data and validationErrors.errorList', async () => {
        await mapAndSave.broker(mockFormBody, mockApplication, mockValidationErrors);

        expect(save.broker).toHaveBeenCalledTimes(1);
        expect(save.broker).toHaveBeenCalledWith(mockApplication, populatedData, mockValidationErrors?.errorList);
      });

      it('should return the saved response', async () => {
        const result = await mapAndSave.broker(populatedData, mockApplication, mockValidationErrors);

        expect(result).toEqual(mockSaveBrokerRespone);
      });
    });

    describe('when the form does NOT have validation errors', () => {
      it('should call save.broker with application and populated submitted data', async () => {
        await mapAndSave.broker(populatedData, mockApplication);

        expect(save.broker).toHaveBeenCalledTimes(1);
        expect(save.broker).toHaveBeenCalledWith(mockApplication, populatedData);
      });

      it('should return the saved response', async () => {
        const result = await mapAndSave.broker(populatedData, mockApplication, mockValidationErrors);

        expect(result).toEqual(mockSaveBrokerRespone);
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
