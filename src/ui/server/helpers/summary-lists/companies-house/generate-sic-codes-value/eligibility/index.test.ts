import { DEFAULT } from '../../../../../content-strings';
import mapEligibilitySicCodeValues from '.';

const mockSicCodes = ['1234', '5678'];
const mockIndustrySectorNames = ['Industry 1'];


describe('server/helpers/summary-lists/companies-house/generate-sic-codes-value/eligibility', () => {
  describe('when sicCodes and industrySectorNames both are populated', () => {
    it('should return a sic code with and without an industry sector name as a single string with line break', () => {const result = mapEligibilitySicCodeValues(mockSicCodes, mockIndustrySectorNames);

      const expectedFirst = `${mockSicCodes[0]} - ${mockIndustrySectorNames[0]} </br>`;
      const expectedSecond = `${mockSicCodes[1]} </br>`;

      const expected = `${expectedFirst}${expectedSecond}`;

      expect(result).toEqual(expected);
    });
  });

  describe('when sicCodes is not populated', () => {
    it(`should return '${DEFAULT.EMPTY}'`, () => {

      const result = mapEligibilitySicCodeValues([], mockIndustrySectorNames);

      expect(result).toEqual(DEFAULT.EMPTY);
    });
  });
});
