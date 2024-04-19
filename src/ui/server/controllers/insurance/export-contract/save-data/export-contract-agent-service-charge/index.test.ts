import save, { NULL_OR_EMPTY_STRING_FIELDS } from '.';
import FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import api from '../../../../../api';
import generateValidationErrors from '../../../policy/type-of-policy/validation';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import { mockApplication } from '../../../../../test-mocks';

const {
  AGENT_CHARGES: { CHARGE_PERCENTAGE, FIXED_SUM_AMOUNT, METHOD, PAYABLE_COUNTRY_CODE },
} = FIELD_IDS;

describe('controllers/insurance/export-contract/save-data/export-contract-agent-service-charge', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));

  const mockFormBody = {
    valid: {
      ...mockApplication.exportContract.agent.service.charge,
      otherField: true,
    },
    invalid: {
      otherField: true,
    },
  };

  beforeEach(() => {
    api.keystone.application.update.exportContractAgentServiceCharge = updateApplicationSpy;
  });

  describe('NULL_OR_EMPTY_STRING_FIELDS', () => {
    it('should have the relevant fieldIds', () => {
      const expected = [CHARGE_PERCENTAGE, FIXED_SUM_AMOUNT, METHOD, PAYABLE_COUNTRY_CODE];
      expect(NULL_OR_EMPTY_STRING_FIELDS).toEqual(expected);
    });
  });

  describe('when errorList is provided', () => {
    const mockErrorList = generateValidationErrors(mockFormBody.invalid)?.errorList;

    it('should call api.keystone.application.update.exportContractAgentServiceCharge with exportContract.agent.service.charge ID and sanitised data', async () => {
      await save.exportContractAgentServiceCharge(mockApplication, mockFormBody.invalid, mockErrorList);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const expectedSanitisedData = sanitiseData(mockFormBody.invalid);
      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.exportContract.agent.service.charge.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.exportContractAgentServiceCharge(mockApplication, mockFormBody.invalid);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('when errorList is NOT provided', () => {
    it('should call api.keystone.application.update.exportContractAgentServiceCharge with exportContract.agent.service.charge ID and sanitised data', async () => {
      await save.exportContractAgentServiceCharge(mockApplication, mockFormBody.valid);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const expectedSanitisedData = sanitiseData(mockFormBody.valid);
      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.exportContract.agent.service.charge.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.exportContractAgentServiceCharge(mockApplication, mockFormBody.valid);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('when there is an error calling the API', () => {
    beforeEach(() => {
      updateApplicationSpy = jest.fn(() => Promise.reject(new Error('mock')));
      api.keystone.application.update.exportContractAgentServiceCharge = updateApplicationSpy;
    });

    it('should throw an error', async () => {
      try {
        await save.exportContractAgentServiceCharge(mockApplication, mockFormBody.valid);
      } catch (err) {
        const expected = new Error("Updating application's exportContractAgentServiceCharge");
        expect(err).toEqual(expected);
      }
    });
  });
});
