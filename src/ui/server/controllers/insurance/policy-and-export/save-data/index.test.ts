import save from '.';
import api from '../../../../api';
import generateValidationErrors from '../type-of-policy/validation';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import { FIELD_IDS, FIELD_VALUES } from '../../../../constants';
import { mockApplication } from '../../../../test-mocks';

describe('controllers/insurance/policy-and-export/save-data', () => {
  const refNumber = Number(mockApplication.referenceNumber);
  let getApplicationSpy = jest.fn(() => Promise.resolve(mockApplication));

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
    api.keystone.application.get = getApplicationSpy;
    api.keystone.application.update.policyAndExport = updateApplicationSpy;
  });

  it('should call api.keystone.application.get', async () => {
    await save.policyAndExport(refNumber, mockFormBody.invalid);

    expect(getApplicationSpy).toHaveBeenCalledTimes(1);
    expect(getApplicationSpy).toHaveBeenCalledWith(refNumber);
  });

  describe('when errorList is provided', () => {
    const mockErrorList = generateValidationErrors(mockFormBody.invalid)?.errorList;

    it('should call api.keystone.application.update.policyAndExport with policyAndExport ID and stripped and sanitised data', async () => {
      await save.policyAndExport(refNumber, mockFormBody.invalid, mockErrorList);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const expectedSanitisedData = sanitiseData(mockFormBody.invalid);
      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.policyAndExport.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.policyAndExport(refNumber, mockFormBody.invalid);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('when errorList is NOT provided', () => {
    it('should call api.keystone.application.update.policyAndExport with policyAndExport ID and sanitised data', async () => {
      await save.policyAndExport(refNumber, mockFormBody.valid);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const expectedSanitisedData = sanitiseData(mockFormBody.valid);
      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.policyAndExport.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.policyAndExport(refNumber, mockFormBody.valid);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('api error handling', () => {
    describe('when get application returns no application', () => {
      beforeEach(() => {
        // @ts-ignore
        getApplicationSpy = jest.fn(() => Promise.resolve());
        api.keystone.application.get = getApplicationSpy;
      });

      it('should return an error', async () => {
        const result = await save.policyAndExport(refNumber, mockFormBody.valid);

        const expected = new Error('Getting application');

        expect(result).toEqual(expected);
      });
    });

    describe('when get application call fails', () => {
      beforeEach(() => {
        getApplicationSpy = jest.fn(() => Promise.reject());
        api.keystone.application.get = getApplicationSpy;
      });

      it('should return an error', async () => {
        const result = await save.policyAndExport(refNumber, mockFormBody.valid);

        const expected = new Error('Getting application');

        expect(result).toEqual(expected);
      });
    });

    describe('update policyAndExport call', () => {
      describe('when there is an error', () => {
        beforeEach(() => {
          getApplicationSpy = jest.fn(() => Promise.resolve(mockApplication));
          api.keystone.application.get = getApplicationSpy;

          updateApplicationSpy = jest.fn(() => Promise.reject());
          api.keystone.application.update.policyAndExport = updateApplicationSpy;
        });

        it('should return the error', async () => {
          const result = await save.policyAndExport(refNumber, mockFormBody.valid);

          const expected = new Error("Updating application's policyAndExport");
          expect(result).toEqual(expected);
        });
      });
    });
  });
});
