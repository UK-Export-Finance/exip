import save, { NULL_OR_EMPTY_STRING_FIELDS } from '.';
import api from '../../../../../api';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import stripEmptyFormFields from '../../../../../helpers/strip-empty-form-fields';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../constants/field-ids/insurance/policy';
import { mockApplication, mockLossPayeeFinancialDetailsInternational } from '../../../../../test-mocks';
import generateValidationErrors from '../../../../../helpers/validation';

const {
  LOSS_PAYEE_FINANCIAL_INTERNATIONAL: { IBAN, BIC_SWIFT_CODE },
  FINANCIAL_ADDRESS,
} = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/save-data/loss-payee-financial-details-international', () => {
  const mockUpdateApplicationResponse = mockApplication;
  const updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));
  const mockFormBody = mockLossPayeeFinancialDetailsInternational;

  beforeEach(() => {
    api.keystone.application.update.updateLossPayeeFinancialDetailsInternational = updateApplicationSpy;
  });

  describe('NULL_OR_EMPTY_STRING_FIELDS', () => {
    it('should have the relevant fieldIds', () => {
      expect(NULL_OR_EMPTY_STRING_FIELDS).toEqual([IBAN, BIC_SWIFT_CODE, FINANCIAL_ADDRESS]);
    });
  });

  describe('when errorList is provided', () => {
    const mockValidationErrors = generateValidationErrors(FINANCIAL_ADDRESS, 'error', {});

    it('should call api.keystone.application.update.lossPayeeFinancialDetailsInternational', async () => {
      await save.lossPayeeFinancialDetailsInternational(mockApplication, mockFormBody, mockValidationErrors.errorList);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const dataToSave = stripEmptyFormFields(getDataToSave(mockFormBody, mockValidationErrors.errorList), NULL_OR_EMPTY_STRING_FIELDS);
      const expectedSanitisedData = sanitiseData(dataToSave);

      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.nominatedLossPayee.financialInternational.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.lossPayeeFinancialDetailsInternational(mockApplication, mockFormBody);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('when errorList is NOT provided', () => {
    it('should call api.keystone.application.update.lossPayeeFinancialDetailsInternational', async () => {
      await save.lossPayeeFinancialDetailsInternational(mockApplication, mockFormBody);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const dataToSave = stripEmptyFormFields(getDataToSave(mockFormBody), NULL_OR_EMPTY_STRING_FIELDS);
      const expectedSanitisedData = sanitiseData(dataToSave);

      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.nominatedLossPayee.financialInternational.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.lossPayeeFinancialDetailsInternational(mockApplication, mockFormBody);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });
});
