import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import { DEFAULT } from '../../../../../content-strings';
import mapApplicationSicCodeValues from '.';

const {
  COMPANIES_HOUSE: { SIC_CODE, INDUSTRY_SECTOR_NAME },
} = INSURANCE_FIELD_IDS;

describe('server/helpers/summary-lists/companies-house/generate-sic-codes-value/application', () => {
  describe('when sicCodes and industrySectorNames both are populated', () => {
    it('should return a sic code with and without an industry sector name as a single string with line break', () => {
      const mockSicCodes = [
        {
          id: '1234',
          sicCode: '100',
          industrySectorName: 'Mock',
        },
        {
          id: '5678',
          sicCode: '200',
        },
      ];

      const result = mapApplicationSicCodeValues(mockSicCodes);

      const [first, second] = mockSicCodes;

      const expectedFirst = `${first[SIC_CODE]} - ${first[INDUSTRY_SECTOR_NAME]} </br>`;
      const expectedSecond = `${second[SIC_CODE]} </br>`;

      const expected = `${expectedFirst}${expectedSecond}`;

      expect(result).toEqual(expected);
    });
  });

  describe('when sicCodes is not populated', () => {
    it(`should return '${DEFAULT.EMPTY}'`, () => {
      const result = mapApplicationSicCodeValues([]);

      expect(result).toEqual(DEFAULT.EMPTY);
    });
  });
});
