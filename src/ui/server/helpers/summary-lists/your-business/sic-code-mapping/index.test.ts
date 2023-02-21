import sicCodeMapping from '.';
import { DEFAULT } from '../../../../content-strings';
import { ApplicationExporterSicCodes } from '../../../../../types';

describe('helpers/summary-lists/your-business/sic-code-mapping', () => {
  it('should return a string with multiple sic codes if provided with more than one', () => {
    const sicCodes = [
      {
        id: 'cle5xb2op0986dcno2yiidukj',
        sicCode: '64999',
        __typename: 'ExporterCompanySicCode',
      },
      {
        id: 'cle5xb2op0986dcno2yiidukj',
        sicCode: '64910',
        __typename: 'ExporterCompanySicCode',
      },
    ];

    const response = sicCodeMapping(sicCodes);

    const expected = '64999,64910';

    expect(response).toEqual(expected);
  });

  it('should return a string with one sic codes if provided with one sic code', () => {
    const sicCodes = [
      {
        id: 'cle5xb2op0986dcno2yiidukj',
        sicCode: '64999',
        __typename: 'ExporterCompanySicCode',
      },
    ];

    const response = sicCodeMapping(sicCodes);

    const expected = '64999';

    expect(response).toEqual(expected);
  });

  it(`should return ${DEFAULT.EMPTY} if provide with an empty array`, () => {
    const sicCodes = [] as Array<ApplicationExporterSicCodes>;

    const response = sicCodeMapping(sicCodes);

    expect(response).toEqual(DEFAULT.EMPTY);
  });

  it(`should return ${DEFAULT.EMPTY} if not provided with any sic codes`, () => {
    const response = sicCodeMapping();

    expect(response).toEqual(DEFAULT.EMPTY);
  });
});
