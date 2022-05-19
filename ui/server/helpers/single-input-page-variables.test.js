const singleInputPageVariables = require('./single-input-page-variables');
const CONTENT_STRINGS = require('../content-strings');

describe('sever/helpers/single-input-page-variables', () => {
  it('should return an object with provided data and additional content strings', () => {
    const mock = {
      FIELD_NAME: 'test',
      PAGE_CONTENT_STRINGS: {
        heading: 'Testing',
      },
      BACK_LINK: '/mock',
    };

    const result = singleInputPageVariables(mock);

    const expected = {
      CONTENT_STRINGS: {
        BUTTONS: CONTENT_STRINGS.BUTTONS,
        LINKS: CONTENT_STRINGS.LINKS,
        ...mock.PAGE_CONTENT_STRINGS,
      },
      FIELD_NAME: mock.FIELD_NAME,
      BACK_LINK: mock.BACK_LINK,
    };

    expect(result).toEqual(expected);
  });
});
