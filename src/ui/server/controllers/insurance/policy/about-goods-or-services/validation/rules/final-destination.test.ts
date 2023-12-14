import finalDestinationRules from './final-destination';
import INSURANCE_FIELD_IDS from '../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';

const {
  POLICY: {
    ABOUT_GOODS_OR_SERVICES: { FINAL_DESTINATION, FINAL_DESTINATION_KNOWN },
  },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: { ABOUT_GOODS_OR_SERVICES: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/policy/about-goods-or-services/validation/rules/final-destination', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe(`when ${FINAL_DESTINATION_KNOWN} is 'true'`, () => {
    it('should return the result of emptyFieldValidation with FINAL_DESTINATION field ID/error mesage', () => {
      const mockBody = {
        [FINAL_DESTINATION_KNOWN]: 'true',
      };

      const result = finalDestinationRules(mockBody, mockErrors);

      const expected = emptyFieldValidation(mockBody, FINAL_DESTINATION, ERROR_MESSAGE[FINAL_DESTINATION].IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FINAL_DESTINATION_KNOWN} is NOT 'true'`, () => {
    it('should return the result of emptyFieldValidation with FINAL_DESTINATION_KNOWN field ID/error mesage', () => {
      const mockBody = {
        [FINAL_DESTINATION_KNOWN]: '',
      };

      const result = finalDestinationRules(mockBody, mockErrors);

      const expected = emptyFieldValidation(mockBody, FINAL_DESTINATION_KNOWN, ERROR_MESSAGE[FINAL_DESTINATION_KNOWN].IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });
});
