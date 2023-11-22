import mapSicCodes from '.';
import { DEFAULT } from '../../../../content-strings';
import { mockSicCodes } from '../../../../test-mocks';
import { generateSicCodesValue } from '../../companies-house';

describe('helpers/summary-lists/your-business/sic-code-mapping', () => {
  it('should return a string with multiple sic codes if provided with more than one', () => {
    const sicCodes = mockSicCodes;

    const response = mapSicCodes(sicCodes);

    const sicCodesMapped = sicCodes.map((eachSicCode) => String(eachSicCode.sicCode));
    const industrySectorNamesMapped = sicCodes.map((eachSicCode) => String(eachSicCode.industrySectorName));

    const expected = generateSicCodesValue(sicCodesMapped, industrySectorNamesMapped);

    expect(response).toEqual(expected);
  });

  it('should return a string with one sic code if provided with one sic code', () => {
    const sicCodes = [mockSicCodes[0]];

    const response = mapSicCodes(sicCodes);

    const sicCodesMapped = sicCodes.map((eachSicCode) => String(eachSicCode.sicCode));
    const industrySectorNamesMapped = sicCodes.map((eachSicCode) => String(eachSicCode.industrySectorName));

    const expected = generateSicCodesValue(sicCodesMapped, industrySectorNamesMapped);

    expect(response).toEqual(expected);
  });

  it(`should return ${DEFAULT.EMPTY} if provide with an empty array`, () => {
    const response = mapSicCodes([]);

    expect(response).toEqual(DEFAULT.EMPTY);
  });
});
