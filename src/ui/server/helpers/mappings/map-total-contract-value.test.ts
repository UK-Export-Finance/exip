import mapTotalContractValueField from './map-total-contract-value';
import { TOTAL_CONTRACT_VALUE, FIELD_IDS } from '../../constants';
import { DEFAULT } from '../../content-strings';
import { ELIGIBILITY_FIELDS } from '../../content-strings/fields/insurance/eligibility';

const FIELD_ID = FIELD_IDS.INSURANCE.ELIGIBILITY.TOTAL_CONTRACT_VALUE;
const { LESS_THAN_250K, MORE_THAN_250K } = TOTAL_CONTRACT_VALUE;

const { ABOVE, BELOW } = ELIGIBILITY_FIELDS[FIELD_ID].SUMMARY;

describe('server/helpers/mappings/mapTotalContractValueField', () => {
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
