import quoteCorePageVariables from '.';
import corePageVariables from '..';
import { PRODUCT } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';

const { START: quoteStart } = ROUTES.QUOTE;

describe('server/helpers/page-variables/core/insurance', () => {
  const mock = {
    PAGE_CONTENT_STRINGS: {
      PAGE_TITLE: 'Testing',
      HEADING: 'Testing',
    },
    BACK_LINK: '/mock',
    START_ROUTE: quoteStart,
  };

  it('should return corePageVariables with BACK_LINK and insurance/application product description and START_ROUTE to start route', () => {
    const result = quoteCorePageVariables(mock);

    const expected = corePageVariables({
      PAGE_CONTENT_STRINGS: mock.PAGE_CONTENT_STRINGS,
      PRODUCT: {
        ...PRODUCT,
        DESCRIPTION: PRODUCT.DESCRIPTION.QUOTE,
      },
      BACK_LINK: mock.BACK_LINK,
      START_ROUTE: quoteStart,
    });

    expect(result).toEqual(expected);
  });
});
