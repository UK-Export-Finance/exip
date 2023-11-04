import mapTotalContractValue from '.';
import { COVER_PERIOD } from '../../constants';

describe('server/helpers/map-credit-period-id', () => {
  describe('when the provided answer is a true boolean', () => {
    it(`should return "${COVER_PERIOD.LESS_THAN_2_YEARS.DB_ID}"`, () => {
      const result = mapTotalContractValue(true);

      const expected = COVER_PERIOD.LESS_THAN_2_YEARS.DB_ID;
      expect(result).toEqual(expected);
    });
  });

  describe('when the provided answer is a false boolean', () => {
    it(`should return "${COVER_PERIOD.MORE_THAN_2_YEARS.DB_ID}"`, () => {
      const result = mapTotalContractValue(false);

      const expected = COVER_PERIOD.MORE_THAN_2_YEARS.DB_ID;
      expect(result).toEqual(expected);
    });
  });
});
