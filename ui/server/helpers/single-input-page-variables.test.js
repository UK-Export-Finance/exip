const singleInputPageVariables = require('./single-input-page-variables');
const CONTENT_STRINGS = require('../content-strings');
const CONSTANTS = require('../constants');

describe('sever/helpers/single-input-page-variables', () => {
  const mock = {
    FIELD_NAME: 'test',
    PAGE_CONTENT_STRINGS: {
      heading: 'Testing',
    },
    BACK_LINK: '/mock',
  };

  it('should return an object with provided data and additional content strings', () => {
    const result = singleInputPageVariables(mock);

    const expected = {
      CONTENT_STRINGS: {
        BUTTONS: CONTENT_STRINGS.BUTTONS,
        LINKS: CONTENT_STRINGS.LINKS,
        HINTS: CONTENT_STRINGS.HINTS,
        ...mock.PAGE_CONTENT_STRINGS,
      },
      FIELD_NAME: mock.FIELD_NAME,
      BACK_LINK: mock.BACK_LINK,
    };

    expect(result).toEqual(expected);
  });

  describe('when a FIELD_NAME exists in content string fields', () => {
    it('should also return FIELD_HINT', () => {
      mock.FIELD_NAME = CONSTANTS.FIELDS.COUNTRY_SEARCH;
      const result = singleInputPageVariables(mock);

      const expected = CONTENT_STRINGS.FIELDS[mock.FIELD_NAME].HINT;

      expect(result.FIELD_HINT).toEqual(expected);
    });
  });
});
