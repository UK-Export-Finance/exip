import save from '.';
import api from '../../../../../api';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import stripEmptyFormFields from '../../../../../helpers/strip-empty-form-fields';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import { mockApplication, mockBuyerTradingHistory } from '../../../../../test-mocks';
import generateValidationErrors from '../../../../../helpers/validation';

const {
  CURRENCY: { CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

describe('controllers/insurance/your-buyer/save-data/buyer-trading-history', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));

  describe('broker', () => {
    const mockFormBody = mockBuyerTradingHistory;

    beforeEach(() => {
      api.keystone.application.update.buyerTradingHistory = updateApplicationSpy;
    });

    describe('when errorList is provided', () => {
      const mockValidationErrors = generateValidationErrors(CURRENCY_CODE, 'error', {});

      it(`should call api.keystone.application.update.updateBuyerTradingHistory with all fields but not ${CURRENCY_CODE}`, async () => {
        await save.buyerTradingHistory(mockApplication, mockFormBody, mockValidationErrors.errorList);

        expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

        const dataToSave = getDataToSave(mockFormBody, mockValidationErrors.errorList);
        const expectedSanitisedData = stripEmptyFormFields(sanitiseData(dataToSave));
        expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.buyer.buyerTradingHistory.id, expectedSanitisedData);
      });

      it('should return the API response', async () => {
        const result = await save.buyerTradingHistory(mockApplication, mockFormBody);

        expect(result).toEqual(mockUpdateApplicationResponse);
      });
    });

    describe('when errorList is NOT provided', () => {
      it('should call api.keystone.application.update.buyerTradingHistory with all fields', async () => {
        await save.buyerTradingHistory(mockApplication, mockFormBody);

        expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

        const dataToSave = getDataToSave(mockFormBody);
        const expectedSanitisedData = stripEmptyFormFields(sanitiseData(dataToSave));
        expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.buyer.buyerTradingHistory.id, expectedSanitisedData);
      });

      it('should return the API response', async () => {
        const result = await save.buyerTradingHistory(mockApplication, mockFormBody);

        expect(result).toEqual(mockUpdateApplicationResponse);
      });
    });
  });

  describe('api error handling', () => {
    describe('update buyer call', () => {
      const mockFormBody = mockBuyerTradingHistory;

      describe('when there is an error', () => {
        beforeEach(() => {
          updateApplicationSpy = jest.fn(() => Promise.reject(new Error('mock')));
          api.keystone.application.update.buyerTradingHistory = updateApplicationSpy;
        });

        it('should throw an error', async () => {
          try {
            await save.buyerTradingHistory(mockApplication, mockFormBody);
          } catch (err) {
            const expected = new Error('Updating buyer trading history');
            expect(err).toEqual(expected);
          }
        });
      });
    });
  });
});
