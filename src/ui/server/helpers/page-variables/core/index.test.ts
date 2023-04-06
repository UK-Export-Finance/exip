import corePageVariables from '.';
import { BUTTONS, COOKIES_CONSENT, HEADER, FOOTER, LINKS, PRODUCT } from '../../../content-strings';
import { ROUTES } from '../../../constants';

const { START: quoteStart } = ROUTES.QUOTE;

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
    START_ROUTE: quoteStart,
  };

  it('should return an object with provided data and additional content strings', () => {
    const result = corePageVariables(mock);

    const expected = {
      CONTENT_STRINGS: {
        ...mock.PAGE_CONTENT_STRINGS,
        BUTTONS,
        COOKIES_CONSENT,
        HEADER,
        FOOTER,
        LINKS,
        PRODUCT: mock.PRODUCT,
      },
      BACK_LINK: mock.BACK_LINK,
      START_ROUTE: quoteStart,
    };

    expect(result).toEqual(expected);
  });
});
