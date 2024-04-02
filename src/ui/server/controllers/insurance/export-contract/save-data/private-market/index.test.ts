import save from '.';
import api from '../../../../../api';
import generateValidationErrors from '../../../policy/type-of-policy/validation';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import { mockApplication } from '../../../../../test-mocks';

const {
  EXPORT_CONTRACT: {
    PRIVATE_MARKET: { ATTEMPTED, DECLINED_DESCRIPTION },
  },
} = INSURANCE_FIELD_IDS;

describe('controllers/insurance/export-contract/save-data/private-market', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));

  const mockFormBody = {
    valid: {
      [ATTEMPTED]: mockApplication.exportContract.privateMarket[ATTEMPTED],
      [DECLINED_DESCRIPTION]: mockApplication.exportContract.privateMarket[DECLINED_DESCRIPTION],
      otherField: true,
    },
    invalid: {
      otherField: true,
    },
  };

  beforeEach(() => {
    api.keystone.application.update.privateMarket = updateApplicationSpy;
  });

  describe('when errorList is provided', () => {
    const mockErrorList = generateValidationErrors(mockFormBody.invalid)?.errorList;

    it('should call api.keystone.application.update.privateMarket with privateMarket ID and stripped and sanitised data', async () => {
      await save.privateMarket(mockApplication, mockFormBody.invalid, mockErrorList);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const expectedSanitisedData = sanitiseData(mockFormBody.invalid);
      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.exportContract.privateMarket.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.privateMarket(mockApplication, mockFormBody.invalid);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('when errorList is NOT provided', () => {
    it('should call api.keystone.application.update.privateMarket with privateMarket ID and sanitised data', async () => {
      await save.privateMarket(mockApplication, mockFormBody.valid);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const expectedSanitisedData = sanitiseData(mockFormBody.valid);
      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.exportContract.privateMarket.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.privateMarket(mockApplication, mockFormBody.valid);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('api error handling', () => {
    describe('update privateMarket call', () => {
      describe('when there is an error', () => {
        beforeEach(() => {
          updateApplicationSpy = jest.fn(() => Promise.reject(new Error('mock')));
          api.keystone.application.update.privateMarket = updateApplicationSpy;
        });

        it('should throw an error', async () => {
          try {
            await save.privateMarket(mockApplication, mockFormBody.valid);
          } catch (err) {
            const expected = new Error("Updating application's privateMarket");
            expect(err).toEqual(expected);
          }
        });
      });
    });
  });
});
