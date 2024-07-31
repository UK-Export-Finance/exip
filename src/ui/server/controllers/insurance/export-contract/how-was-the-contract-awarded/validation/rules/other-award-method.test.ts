import otherAwardMethodRule from './other-award-method';
import { EXPORT_CONTRACT_AWARD_METHOD, MAXIMUM_CHARACTERS } from '../../../../../../constants';
import { EXPORT_CONTRACT as EXPORT_CONTRACT_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import providedAndMaxLength from '../../../../../../shared-validation/provided-and-max-length';
import { mockErrors } from '../../../../../../test-mocks';

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD, OTHER_AWARD_METHOD },
} = EXPORT_CONTRACT_FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: {
      HOW_WAS_THE_CONTRACT_AWARDED: { [OTHER_AWARD_METHOD]: ERROR_MESSAGES_OBJECT },
    },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/export-contract/how-was-the-contract-awarded/validation/rules/other-award-method', () => {
  describe(`when ${AWARD_METHOD} is ${EXPORT_CONTRACT_AWARD_METHOD.OTHER.DB_ID}`, () => {
    it('should return `providedAndMaxLength`', () => {
      const mockBody = {
        [AWARD_METHOD]: EXPORT_CONTRACT_AWARD_METHOD.OTHER.DB_ID,
      };

      const result = otherAwardMethodRule(mockBody, mockErrors);

      const expected = providedAndMaxLength(
        mockBody,
        OTHER_AWARD_METHOD,
        ERROR_MESSAGES_OBJECT,
        mockErrors,
        MAXIMUM_CHARACTERS.EXPORT_CONTRACT.OTHER_AWARD_METHOD,
      );

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${AWARD_METHOD} is NOT ${EXPORT_CONTRACT_AWARD_METHOD.OTHER.DB_ID}`, () => {
    it('should return the provided errors object', () => {
      const mockBody = {
        [AWARD_METHOD]: EXPORT_CONTRACT_AWARD_METHOD.COMPETITIVE_BIDDING.DB_ID,
      };

      const result = otherAwardMethodRule(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
