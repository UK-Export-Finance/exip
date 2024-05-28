import mapSicCodes from '.';
import NEW_LINE from '../../helpers/xlsx-new-line';
import { mockApplication } from '../../../../test-mocks';

describe('api/generate-xlsx/map-application-to-xlsx/map-exporter-business/map-sic-codes', () => {
  it('should return a string of SIC codes', () => {
    const sicCodes = mockApplication.companySicCodes;

    const result = mapSicCodes(sicCodes);

    const [first, last] = sicCodes;

    const expectedFirst = `${first.sicCode} - ${first.industrySectorName}${NEW_LINE}`;

    const expectedLast = `${last.sicCode} - ${last.industrySectorName}${NEW_LINE}`;

    const expected = `${expectedFirst}${expectedLast}`;

    expect(result).toEqual(expected);
  });
});
