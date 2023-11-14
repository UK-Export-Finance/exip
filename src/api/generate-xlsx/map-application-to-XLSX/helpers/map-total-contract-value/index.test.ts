import mapTotalContractValueField from '.';
import { TOTAL_CONTRACT_VALUE, FIELD_IDS } from '../../../../constants';
import { DEFAULT } from '../../../../content-strings';
import { FIELDS_ELIGIBILITY } from '../../../../content-strings/fields/insurance/eligibility';

const FIELD_ID = FIELD_IDS.INSURANCE.ELIGIBILITY.TOTAL_CONTRACT_VALUE;
const { LESS_THAN_250K, MORE_THAN_250K } = TOTAL_CONTRACT_VALUE;

const { ABOVE, BELOW } = FIELDS_ELIGIBILITY[FIELD_ID].SUMMARY;

describe('api/generate-xlsx/map-application-to-xlsx/helpers/map-total-contract-value', () => {
  describe(`when answer is ${MORE_THAN_250K.DB_ID}`, () => {
    const value = MORE_THAN_250K.DB_ID;

    it(`should return "${ABOVE}"`, () => {
      const response = mapTotalContractValueField(value);

      expect(response).toEqual(ABOVE);
    });
  });

  describe(`when answer is ${LESS_THAN_250K.DB_ID}`, () => {
    const value = LESS_THAN_250K.DB_ID;

    it(`should return "${BELOW}"`, () => {
      const response = mapTotalContractValueField(value);

      expect(response).toEqual(BELOW);
    });
  });

  describe('when answer is undefined', () => {
    const value = undefined;

    it(`should return "${DEFAULT.EMPTY}"`, () => {
      const response = mapTotalContractValueField(value);

      expect(response).toEqual(DEFAULT.EMPTY);
    });
  });
});
