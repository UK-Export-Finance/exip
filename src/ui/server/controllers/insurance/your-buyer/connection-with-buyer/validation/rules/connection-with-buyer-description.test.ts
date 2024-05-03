import connectionWithBuyerDescriptionRule from './connection-with-buyer-description';
import { FIELD_IDS, MAXIMUM_CHARACTERS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import providedAndMaxLength from '../../../../../../shared-validation/provided-and-max-length';
import { RequestBody } from '../../../../../../../types';
import { mockErrors } from '../../../../../../test-mocks';

const {
  INSURANCE: {
    YOUR_BUYER: { CONNECTION_WITH_BUYER_DESCRIPTION: FIELD_ID, CONNECTION_WITH_BUYER },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/your-buyer/connection-with-buyer/validation/rules/connection-with-buyer-description', () => {
  const mockBody = {
    [FIELD_ID]: '',
    [CONNECTION_WITH_BUYER]: true,
  } as RequestBody;

  describe(`${CONNECTION_WITH_BUYER} is false`, () => {
    it(`should return "mockErrors" when ${CONNECTION_WITH_BUYER} is false`, () => {
      mockBody[CONNECTION_WITH_BUYER] = false;

      const result = connectionWithBuyerDescriptionRule(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });

  describe(`${CONNECTION_WITH_BUYER} is true`, () => {
    it('should return the result of providedAndMaxLength', () => {
      mockBody[CONNECTION_WITH_BUYER] = 'true';

      const result = connectionWithBuyerDescriptionRule(mockBody, mockErrors);

      const expected = providedAndMaxLength(mockBody, FIELD_ID, ERROR_MESSAGES_OBJECT, mockErrors, MAXIMUM_CHARACTERS.CONNECTION_WITH_BUYER_DESCRIPTION);

      expect(result).toEqual(expected);
    });
  });
});
