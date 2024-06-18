import mapNominatedLossPayeeLocation from './map-nominated-loss-payee-location';
import { mockNominatedLossPayee } from '../../test-mocks';

import POLICY_FIELD_IDS from '../../constants/field-ids/insurance/policy';

const { IS_LOCATED_INTERNATIONALLY, IS_LOCATED_IN_UK } = POLICY_FIELD_IDS.LOSS_PAYEE_DETAILS;

describe('server/helpers/mappings/map-nominated-loss-payee-location', () => {
  describe(`when ${IS_LOCATED_INTERNATIONALLY} is true`, () => {
    it(`should return ${IS_LOCATED_INTERNATIONALLY}`, () => {
      mockNominatedLossPayee[IS_LOCATED_INTERNATIONALLY] = true;
      mockNominatedLossPayee[IS_LOCATED_IN_UK] = null;

      const response = mapNominatedLossPayeeLocation(mockNominatedLossPayee);

      expect(response).toEqual(IS_LOCATED_INTERNATIONALLY);
    });
  });

  describe(`when ${IS_LOCATED_IN_UK} is true`, () => {
    it(`should return ${IS_LOCATED_IN_UK}`, () => {
      mockNominatedLossPayee[IS_LOCATED_IN_UK] = true;
      mockNominatedLossPayee[IS_LOCATED_INTERNATIONALLY] = null;

      const response = mapNominatedLossPayeeLocation(mockNominatedLossPayee);

      expect(response).toEqual(IS_LOCATED_IN_UK);
    });
  });

  describe(`when neither ${IS_LOCATED_IN_UK} or ${IS_LOCATED_INTERNATIONALLY} is true`, () => {
    it('should return undefined', () => {
      mockNominatedLossPayee[IS_LOCATED_IN_UK] = null;
      mockNominatedLossPayee[IS_LOCATED_INTERNATIONALLY] = null;

      const response = mapNominatedLossPayeeLocation(mockNominatedLossPayee);

      expect(response).toBeUndefined();
    });
  });
});
