import save from '.';
import api from '../../../../../api';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../constants/field-ids/insurance/policy';
import { mockApplication, mockBroker } from '../../../../../test-mocks';
import generateValidationErrors from '../../../../../helpers/validation';

const {
  BROKER_DETAILS: { FULL_ADDRESS },
} = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/save-data/broker', () => {
  const mockUpdateApplicationResponse = mockApplication;
  const updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));
  const mockFormBody = mockBroker;

  beforeEach(() => {
    api.keystone.application.update.broker = updateApplicationSpy;
  });

  describe('when errorList is provided', () => {
    const mockValidationErrors = generateValidationErrors(FULL_ADDRESS, 'error', {});

    it(`should call api.keystone.application.update.broker with all fields but not ${FULL_ADDRESS}`, async () => {
      await save.broker(mockApplication, mockFormBody, mockValidationErrors.errorList);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const dataToSave = getDataToSave(mockFormBody, mockValidationErrors.errorList);

      const expectedSanitisedData = sanitiseData(dataToSave);

      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.broker.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.broker(mockApplication, mockFormBody);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('when errorList is NOT provided', () => {
    it('should call api.keystone.application.update.broker with all fields', async () => {
      await save.broker(mockApplication, mockFormBody);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const dataToSave = getDataToSave(mockFormBody);

      const expectedSanitisedData = sanitiseData(dataToSave);

      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.broker.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.broker(mockApplication, mockFormBody);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });
});
