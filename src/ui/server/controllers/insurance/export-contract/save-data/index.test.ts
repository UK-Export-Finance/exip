import save from '.';
import api from '../../../../api';
import generateValidationErrors from '../../policy/type-of-policy/validation';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { mockApplication } from '../../../../test-mocks';

const {
  POLICY: {
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
  },
} = INSURANCE_FIELD_IDS;

describe('controllers/insurance/export-contract/save-data', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));

  const mockFormBody = {
    valid: {
      [DESCRIPTION]: mockApplication.exportContract[DESCRIPTION],
      [FINAL_DESTINATION]: mockApplication.exportContract[FINAL_DESTINATION],
      otherField: true,
    },
    invalid: {
      otherField: true,
    },
  };

  beforeEach(() => {
    api.keystone.application.update.exportContract = updateApplicationSpy;
  });

  describe('when errorList is provided', () => {
    const mockErrorList = generateValidationErrors(mockFormBody.invalid)?.errorList;

    it('should call api.keystone.application.update.exportContract with exportContract ID and stripped and sanitised data', async () => {
      await save.exportContract(mockApplication, mockFormBody.invalid, mockErrorList);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const expectedSanitisedData = sanitiseData(mockFormBody.invalid);
      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.exportContract.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.exportContract(mockApplication, mockFormBody.invalid);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('when errorList is NOT provided', () => {
    it('should call api.keystone.application.update.exportContract with exportContract ID and sanitised data', async () => {
      await save.exportContract(mockApplication, mockFormBody.valid);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const expectedSanitisedData = sanitiseData(mockFormBody.valid);
      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.exportContract.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.exportContract(mockApplication, mockFormBody.valid);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('api error handling', () => {
    describe('update exportContract call', () => {
      describe('when there is an error', () => {
        beforeEach(() => {
          updateApplicationSpy = jest.fn(() => Promise.reject(new Error('mock')));
          api.keystone.application.update.exportContract = updateApplicationSpy;
        });

        it('should throw an error', async () => {
          try {
            await save.exportContract(mockApplication, mockFormBody.valid);
          } catch (err) {
            const expected = new Error("Updating application's exportContract");
            expect(err).toEqual(expected);
          }
        });
      });
    });
  });
});
