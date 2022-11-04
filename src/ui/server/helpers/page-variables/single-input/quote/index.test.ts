import quoteSingleInputPageVariables from '.';
import singleInputPageVariables from '..';
import { PRODUCT } from '../../../../content-strings';

describe('server/helpers/page-variables/single-input/quote', () => {
  const mock = {
    PAGE_CONTENT_STRINGS: {
      PAGE_TITLE: 'Testing',
      HEADING: 'Testing',
    },
    BACK_LINK: '/mock',
    FIELD_ID: 'mock',
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
    });

    expect(result).toEqual(expected);
  });
});
