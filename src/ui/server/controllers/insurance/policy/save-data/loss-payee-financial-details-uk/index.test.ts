import save, { NULL_OR_EMPTY_STRING_FIELDS } from '.';
import api from '../../../../../api';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import stripEmptyFormFields from '../../../../../helpers/strip-empty-form-fields';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../constants/field-ids/insurance/policy';
import { mockApplication, mockLossPayeeFinancialDetailsUk } from '../../../../../test-mocks';
import generateValidationErrors from '../../../../../helpers/validation';

const { FINANCIAL_ADDRESS } = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/save-data/loss-payee-financial-details-uk', () => {
  const mockUpdateApplicationResponse = mockApplication;
  const updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));
  const mockFormBody = mockLossPayeeFinancialDetailsUk;

  beforeEach(() => {
    api.keystone.application.update.lossPayeeFinancialDetailsUk = updateApplicationSpy;
  });

  describe('NULL_OR_EMPTY_STRING_FIELDS', () => {
    it('should have the relevant fieldIds', () => {
      expect(NULL_OR_EMPTY_STRING_FIELDS).toEqual([FINANCIAL_ADDRESS]);
    });
  });

  describe('when errorList is provided', () => {
    const mockValidationErrors = generateValidationErrors(FINANCIAL_ADDRESS, 'error', {});

    it(`should call api.keystone.application.update.lossPayeeFinancialDetailsUk with all fields but not ${FINANCIAL_ADDRESS}`, async () => {
      await save.lossPayeeFinancialDetailsUk(mockApplication, mockFormBody, mockValidationErrors.errorList);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const dataToSave = stripEmptyFormFields(getDataToSave(mockFormBody, mockValidationErrors.errorList), NULL_OR_EMPTY_STRING_FIELDS);

      const expectedSanitisedData = sanitiseData(dataToSave);

      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.nominatedLossPayee.financialUk.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.lossPayeeFinancialDetailsUk(mockApplication, mockFormBody);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });

  describe('when errorList is NOT provided', () => {
    it('should call api.keystone.application.update.lossPayeeFinancialDetailsUk with all fields', async () => {
      await save.lossPayeeFinancialDetailsUk(mockApplication, mockFormBody);

      expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

      const dataToSave = stripEmptyFormFields(getDataToSave(mockFormBody), NULL_OR_EMPTY_STRING_FIELDS);

      const expectedSanitisedData = sanitiseData(dataToSave);

      expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.nominatedLossPayee.financialUk.id, expectedSanitisedData);
    });

    it('should return the API response', async () => {
      const result = await save.lossPayeeFinancialDetailsUk(mockApplication, mockFormBody);

      expect(result).toEqual(mockUpdateApplicationResponse);
    });
  });
});
