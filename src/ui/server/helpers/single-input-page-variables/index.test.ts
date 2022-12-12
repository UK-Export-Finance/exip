import singleInputPageVariables from '.';
import { BUTTONS, COOKIES_CONSENT, FIELDS, FOOTER, LINKS, PRODUCT } from '../../content-strings';
import { FIELD_IDS } from '../../constants';

describe('server/helpers/single-input-page-variables', () => {
  const mock = {
    FIELD_ID: 'test',
    PAGE_CONTENT_STRINGS: {
      PAGE_TITLE: 'Testing',
      HEADING: 'Testing',
    },
    BACK_LINK: '/mock',
  };

  it('should return an object with provided data and additional content strings', () => {
    const result = singleInputPageVariables(mock);

    const expected = {
      CONTENT_STRINGS: {
        ...mock.PAGE_CONTENT_STRINGS,
        BUTTONS,
        COOKIES_CONSENT,
        FOOTER,
        LINKS,
        PRODUCT,
      },
      FIELD_ID: mock.FIELD_ID,
      BACK_LINK: mock.BACK_LINK,
    };

    expect(result).toEqual(expected);
  });

  describe('when a FIELD_ID exists in content string fields', () => {
    it('should also return FIELD_HINT', () => {
      mock.FIELD_ID = FIELD_IDS.BUYER_COUNTRY;
      const result = singleInputPageVariables(mock);

      const expected = FIELDS[mock.FIELD_ID].HINT;

      expect(result.FIELD_HINT).toEqual(expected);
    });
  });
});
