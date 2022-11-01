import singleInputPageVariables from './single-input-page-variables';
import corePageVariables from './core-page-variables';
import { FIELDS } from '../content-strings';
import { FIELD_IDS } from '../constants';

describe('server/helpers/single-input-page-variables', () => {
  const mock = {
    FIELD_ID: 'test',
    PAGE_CONTENT_STRINGS: {
      PAGE_TITLE: 'Testing',
    },
    BACK_LINK: '/mock',
  };

  it('should return an object with provided data and additional content strings', () => {
    const result = singleInputPageVariables(mock);

    const expected = {
      FIELD_ID: mock.FIELD_ID,
      ...corePageVariables(mock),
    };

    expect(result).toEqual(expected);
  });

  describe('when a FIELD_ID exists in content string fields', () => {
    it('should also return FIELD_HINT', () => {
      mock.FIELD_ID = FIELD_IDS.COUNTRY;
      const result = singleInputPageVariables(mock);

      const expected = FIELDS[mock.FIELD_ID].HINT;

      expect(result.FIELD_HINT).toEqual(expected);
    });
  });
});
