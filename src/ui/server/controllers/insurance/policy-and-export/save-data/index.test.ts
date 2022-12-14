import save from '.';
import api from '../../../../api';
import generateValidationErrors from '../type-of-policy/validation';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import { FIELD_IDS, FIELD_VALUES } from '../../../../constants';
import { mockApplication } from '../../../../test-mocks';

describe('controllers/insurance/policy-and-export/save-data', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));

  const mockFormBody = {
    valid: {
      [FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
      otherField: true,
    },
    invalid: {
      otherField: true,
    },
  };

  beforeEach(() => {
    api.keystone.application.update.policyAndExport = updateApplicationSpy;
  });

  describe('when errorList is provided', () => {
    const mockErrorList = generateValidationErrors(mockFormBody.invalid)?.errorList;

    it('should call api.keystone.application.update.policyAndExport with policyAndExport ID and stripped and sanitised data', async () => {
      await save.policyAndExport(mockApplication, mockFormBody.invalid, mockErrorList);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const expectedSanitisedData = sanitiseData(mockFormBody.invalid);
      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.policyAndExport.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.policyAndExport(mockApplication, mockFormBody.invalid);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('when errorList is NOT provided', () => {
    it('should call api.keystone.application.update.policyAndExport with policyAndExport ID and sanitised data', async () => {
      await save.policyAndExport(mockApplication, mockFormBody.valid);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const expectedSanitisedData = sanitiseData(mockFormBody.valid);
      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.policyAndExport.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.policyAndExport(mockApplication, mockFormBody.valid);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('when an application is not provided', () => {
    it('should throw an error', async () => {
      try {
        // @ts-ignore
        await save.policyAndExport(undefined, mockFormBody.valid);
      } catch (err) {
        const expected = new Error('No application provided');
        expect(err).toEqual(expected);
      }
    });
  });

  describe('api error handling', () => {
    describe('update policyAndExport call', () => {
      describe('when there is an error', () => {
        beforeEach(() => {
          updateApplicationSpy = jest.fn(() => Promise.reject());
          api.keystone.application.update.policyAndExport = updateApplicationSpy;
        });

        it('should throw an error', async () => {
          try {
            await save.policyAndExport(mockApplication, mockFormBody.valid);
          } catch (err) {
            const expected = new Error("Updating application's policyAndExport");
            expect(err).toEqual(expected);
          }
        });
      });
    });
  });
});
