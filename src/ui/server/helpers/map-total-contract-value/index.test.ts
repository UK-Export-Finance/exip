import mapTotalContractValue from '.';
import { TOTAL_CONTRACT_VALUE } from '../../constants';

describe('server/helpers/map-total-contract-value', () => {
  describe('when the provided answer is a true boolean', () => {
    it(`should return "${TOTAL_CONTRACT_VALUE.LESS_THAN_500K.DB_ID}"`, () => {
      const result = mapTotalContractValue(true);

      const expected = TOTAL_CONTRACT_VALUE.LESS_THAN_500K.DB_ID;
      expect(result).toEqual(expected);
    });
  });

  describe('when the provided answer is a false boolean', () => {
    it(`should return "${TOTAL_CONTRACT_VALUE.MORE_THAN_500K.DB_ID}"`, () => {
      const result = mapTotalContractValue(false);

      const expected = TOTAL_CONTRACT_VALUE.MORE_THAN_500K.DB_ID;
      expect(result).toEqual(expected);
    });
  });
});
