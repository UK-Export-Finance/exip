import mapLossPayeeLocation from '.';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS } from '../../../../../../content-strings/fields/insurance/policy';
import { mockApplication } from '../../../../../../test-mocks';

const {
  LOSS_PAYEE_DETAILS: { IS_LOCATED_INTERNATIONALLY, IS_LOCATED_IN_UK, LOCATION },
} = FIELD_IDS;

const CONTENT_STRINGS = POLICY_FIELDS.LOSS_PAYEE_DETAILS[LOCATION].OPTIONS;

describe('api/generate-xlsx/map-application-to-xlsx/map-policy/map-loss-payee/map-appointed-loss-payee/map-location', () => {
  describe(`when a loss payee has ${IS_LOCATED_INTERNATIONALLY}`, () => {
    it('should return `internationally` content string', () => {
      const mockLossPayee = {
        ...mockApplication.nominatedLossPayee,
        [IS_LOCATED_IN_UK]: false,
        [IS_LOCATED_INTERNATIONALLY]: true,
      };

      const result = mapLossPayeeLocation(mockLossPayee);

      expect(result).toEqual(CONTENT_STRINGS?.INTERNATIONALLY.TEXT);
    });
  });

  describe(`when a loss payee has ${IS_LOCATED_IN_UK}`, () => {
    it('should return `UK` content string', () => {
      const mockLossPayee = {
        ...mockApplication.nominatedLossPayee,
        [IS_LOCATED_IN_UK]: true,
        [IS_LOCATED_INTERNATIONALLY]: false,
      };

      const result = mapLossPayeeLocation(mockLossPayee);

      expect(result).toEqual(CONTENT_STRINGS?.UK.TEXT);
    });
  });

  describe(`when a loss payee does NOT have ${IS_LOCATED_INTERNATIONALLY} or ${IS_LOCATED_IN_UK}`, () => {
    it('should not return anything', () => {
      const mockLossPayee = {
        ...mockApplication.nominatedLossPayee,
        [IS_LOCATED_IN_UK]: false,
        [IS_LOCATED_INTERNATIONALLY]: false,
      };

      const result = mapLossPayeeLocation(mockLossPayee);

      expect(result).toBeUndefined();
    });
  });
});
