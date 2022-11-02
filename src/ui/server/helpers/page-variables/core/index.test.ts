import corePageVariables from '.';
import { BUTTONS, COOKIES_CONSENT, FOOTER, LINKS, PRODUCT } from '../../../content-strings';

describe('server/helpers/page-variables/core', () => {
  const mock = {
    PAGE_CONTENT_STRINGS: {
      PAGE_TITLE: 'Testing',
      HEADING: 'Testing',
    },
    PRODUCT: {
      DESCRIPTION: PRODUCT.DESCRIPTION.QUOTE,
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
        PRODUCT: mock.PRODUCT,
      },
      BACK_LINK: mock.BACK_LINK,
    };

    expect(result).toEqual(expected);
  });
});
