import quoteSingleInputPageVariables from '.';
import singleInputPageVariables from '..';
import { PRODUCT, LINKS } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';

const { START: quoteStart } = ROUTES.QUOTE;

describe('server/helpers/page-variables/single-input/quote', () => {
  const mock = {
    PAGE_CONTENT_STRINGS: {
      PAGE_TITLE: 'Testing',
      HEADING: 'Testing',
    },
    BACK_LINK: '/mock',
    FIELD_ID: 'mock',
    START_ROUTE: quoteStart,
  };

  it('should return singleInputPageVariables with BACK_LINK, insurance/application product description and FIELD_ID', () => {
    const result = quoteSingleInputPageVariables(mock);

    const expected = singleInputPageVariables({
      PAGE_CONTENT_STRINGS: mock.PAGE_CONTENT_STRINGS,
      PRODUCT: {
        ...PRODUCT,
        DESCRIPTION: PRODUCT.DESCRIPTION.QUOTE,
      },
      BACK_LINK: mock.BACK_LINK,
      FIELD_ID: mock.FIELD_ID,
      START_ROUTE: quoteStart,
      FEEDBACK_ROUTE: LINKS.EXTERNAL.FEEDBACK,
    });

    expect(result).toEqual(expected);
  });
});
