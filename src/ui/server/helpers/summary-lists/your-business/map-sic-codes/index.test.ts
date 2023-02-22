import mapSicCodes from '.';
import { DEFAULT } from '../../../../content-strings';
import { ApplicationExporterSicCodes } from '../../../../../types';
import { mockSicCodes } from '../../../../test-mocks';

describe('helpers/summary-lists/your-business/sic-code-mapping', () => {
  it('should return a string with multiple sic codes if provided with more than one', () => {
    const sicCodes = mockSicCodes;

    const response = mapSicCodes(sicCodes);

    const expected = `${mockSicCodes[0].sicCode},${mockSicCodes[1].sicCode}`;

    expect(response).toEqual(expected);
  });

  it('should return a string with one sic code if provided with one sic code', () => {
    const sicCodes = [mockSicCodes[0]];

    const response = mapSicCodes(sicCodes);

    const expected = `${mockSicCodes[0].sicCode}`;

    expect(response).toEqual(expected);
  });

  it(`should return ${DEFAULT.EMPTY} if provide with an empty array`, () => {
    const sicCodes = [] as Array<ApplicationExporterSicCodes>;

    const response = mapSicCodes(sicCodes);

    expect(response).toEqual(DEFAULT.EMPTY);
  });

  it(`should return ${DEFAULT.EMPTY} if not provided with any sic codes`, () => {
    const response = mapSicCodes();

    expect(response).toEqual(DEFAULT.EMPTY);
  });
});
