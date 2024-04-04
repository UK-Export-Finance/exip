import save from '.';
import api from '../../../../../api';
import generateValidationErrors from '../../../policy/type-of-policy/validation';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import { mockApplication } from '../../../../../test-mocks';

const {
  EXPORT_CONTRACT: {
    AGENT: { NAME, FULL_ADDRESS },
  },
} = INSURANCE_FIELD_IDS;

describe('controllers/insurance/export-contract/save-data/export-contract-agent', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));

  const mockFormBody = {
    valid: {
      [NAME]: mockApplication.exportContract.agent[NAME],
      [FULL_ADDRESS]: mockApplication.exportContract.agent[FULL_ADDRESS],
      otherField: true,
    },
    invalid: {
      otherField: true,
    },
  };

  beforeEach(() => {
    api.keystone.application.update.exportContractAgent = updateApplicationSpy;
  });

  describe('when errorList is provided', () => {
    const mockErrorList = generateValidationErrors(mockFormBody.invalid)?.errorList;

    it('should call api.keystone.application.update.exportContractAgent with exportContract.agent ID and stripped and sanitised data', async () => {
      await save.exportContractAgent(mockApplication, mockFormBody.invalid, mockErrorList);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const expectedSanitisedData = sanitiseData(mockFormBody.invalid);
      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.exportContract.agent.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.exportContractAgent(mockApplication, mockFormBody.invalid);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('when errorList is NOT provided', () => {
    it('should call api.keystone.application.update.exportContractAgent with exportContract.agent ID and sanitised data', async () => {
      await save.exportContractAgent(mockApplication, mockFormBody.valid);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const expectedSanitisedData = sanitiseData(mockFormBody.valid);
      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.exportContract.agent.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.exportContractAgent(mockApplication, mockFormBody.valid);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('api error handling', () => {
    describe('when there is an error', () => {
      beforeEach(() => {
        updateApplicationSpy = jest.fn(() => Promise.reject(new Error('mock')));
        api.keystone.application.update.exportContractAgent = updateApplicationSpy;
      });

      it('should throw an error', async () => {
        try {
          await save.exportContractAgent(mockApplication, mockFormBody.valid);
        } catch (err) {
          const expected = new Error("Updating application's exportContractAgent");
          expect(err).toEqual(expected);
        }
      });
    });
  });
});
