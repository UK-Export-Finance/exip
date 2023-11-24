import mapLengthOfPolicyField from './map-cover-period';
import { COVER_PERIOD } from '../../constants';
import { DEFAULT } from '../../content-strings';

const { LESS_THAN_2_YEARS, MORE_THAN_2_YEARS } = COVER_PERIOD;

describe('server/helpers/mappings/map-length-of-policy', () => {
  describe(`when answer is ${LESS_THAN_2_YEARS.DB_ID}`, () => {
    const value = LESS_THAN_2_YEARS.DB_ID;

    it(`should return "${LESS_THAN_2_YEARS.VALUE}"`, () => {
      const response = mapLengthOfPolicyField(value);

      expect(response).toEqual(LESS_THAN_2_YEARS.VALUE);
    });
  });

  describe(`when answer is ${MORE_THAN_2_YEARS.DB_ID}`, () => {
    const value = MORE_THAN_2_YEARS.DB_ID;

    it(`should return "${MORE_THAN_2_YEARS.VALUE}"`, () => {
      const response = mapLengthOfPolicyField(value);

      expect(response).toEqual(MORE_THAN_2_YEARS.VALUE);
    });
  });

  describe('when answer is undefined', () => {
    it(`should return "${DEFAULT.EMPTY}"`, () => {
      const response = mapLengthOfPolicyField();

      expect(response).toEqual(DEFAULT.EMPTY);
    });
  });
});
