import goodsOrServicesDescriptionRules, { MAXIMUM } from './description';
import INSURANCE_FIELD_IDS from '../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import generateValidationErrors from '../../../../../../helpers/validation';
import { mockErrors } from '../../../../../../test-mocks';

const {
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION: FIELD_ID },
  },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: {
      ABOUT_GOODS_OR_SERVICES: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/export-contract/about-goods-or-services/validation/rules/goods-or-services-description', () => {
  describe('when the field is not provided', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {};

      const result = goodsOrServicesDescriptionRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when total contract is above the maximum', () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [FIELD_ID]: 'a'.repeat(MAXIMUM + 1),
      };

      const result = goodsOrServicesDescriptionRules(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_ID, ERROR_MESSAGE.ABOVE_MAXIMUM, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the provided errors object', () => {
      const mockSubmittedData = {
        [FIELD_ID]: 'Mock text',
      };

      const result = goodsOrServicesDescriptionRules(mockSubmittedData, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
