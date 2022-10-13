import corePageVariables from './core-page-variables';
import { BUTTONS, COOKIES_CONSENT, FOOTER, LINKS, PRODUCT } from '../content-strings';

describe('server/helpers/core-page-variables', () => {
  const mock = {
    PAGE_CONTENT_STRINGS: {
      PAGE_TITLE: 'Testing',
      HEADING: 'Testing',
    },
    BACK_LINK: '/mock',
  };

  it('should return an object with provided data and additional content strings', () => {
    const result = corePageVariables(mock);

    const expected = {
      CONTENT_STRINGS: {
        ...mock.PAGE_CONTENT_STRINGS,
        BUTTONS,
        COOKIES_CONSENT,
        FOOTER,
        LINKS,
        PRODUCT,
      },
      BACK_LINK: mock.BACK_LINK,
    };

    expect(result).toEqual(expected);
  });
});
