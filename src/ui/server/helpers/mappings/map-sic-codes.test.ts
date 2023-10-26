import mapSicCodes from './map-sic-codes';
import { mockSicCodes } from '../../test-mocks';
import { FIELD_IDS } from '../../constants';

const {
  COMPANIES_HOUSE: { SIC_CODE, INDUSTRY_SECTOR_NAME },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

describe('server/helpers/mappings/map-sic-codes', () => {
  describe('when sic codes array is populated', () => {
    describe(SIC_CODE, () => {
      it(`should return an array of ${SIC_CODE} in string format`, () => {
        const response = mapSicCodes(mockSicCodes, SIC_CODE);

        const expected = [mockSicCodes[0][SIC_CODE], mockSicCodes[1][SIC_CODE]];

        expect(response).toEqual(expected);
      });
    });

    describe(INDUSTRY_SECTOR_NAME, () => {
      it(`should return an array of ${INDUSTRY_SECTOR_NAME} in string format`, () => {
        const response = mapSicCodes(mockSicCodes, INDUSTRY_SECTOR_NAME);

        const expected = [mockSicCodes[0][INDUSTRY_SECTOR_NAME], mockSicCodes[1][INDUSTRY_SECTOR_NAME]];

        expect(response).toEqual(expected);
      });
    });
  });
});
