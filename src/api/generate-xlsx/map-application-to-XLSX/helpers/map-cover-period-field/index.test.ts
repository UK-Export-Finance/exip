import mapCoverPeriodField from '.';
import { COVER_PERIOD, FIELD_IDS } from '../../../../constants';
import { DEFAULT } from '../../../../content-strings';
import { FIELDS_ELIGIBILITY } from '../../../../content-strings/fields/insurance/eligibility';

const FIELD_ID = FIELD_IDS.INSURANCE.ELIGIBILITY.COVER_PERIOD;
const { LESS_THAN_2_YEARS, MORE_THAN_2_YEARS } = COVER_PERIOD;

const { ABOVE, BELOW } = FIELDS_ELIGIBILITY[FIELD_ID].OPTIONS;

describe('api/generate-xlsx/map-application-to-xlsx/helpers/map-cover-period-field', () => {
  describe(`when answer is ${MORE_THAN_2_YEARS.DB_ID}`, () => {
    const value = MORE_THAN_2_YEARS.DB_ID;

    it(`should return "${ABOVE.TEXT}"`, () => {
      const response = mapCoverPeriodField(value);

      expect(response).toEqual(ABOVE.TEXT);
    });
  });

  describe(`when answer is ${LESS_THAN_2_YEARS.DB_ID}`, () => {
    const value = LESS_THAN_2_YEARS.DB_ID;

    it(`should return "${BELOW.TEXT}"`, () => {
      const response = mapCoverPeriodField(value);

      expect(response).toEqual(BELOW.TEXT);
    });
  });

  describe('when answer is undefined', () => {
    const value = undefined;

    it(`should return "${DEFAULT.EMPTY}"`, () => {
      const response = mapCoverPeriodField(value);

      expect(response).toEqual(DEFAULT.EMPTY);
    });
  });
});
