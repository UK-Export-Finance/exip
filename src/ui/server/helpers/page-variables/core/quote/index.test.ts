import quoteCorePageVariables from '.';
import corePageVariables from '..';
import { PRODUCT } from '../../../../content-strings';

describe('server/helpers/page-variables/core/insurance', () => {
  const mock = {
    PAGE_CONTENT_STRINGS: {
      PAGE_TITLE: 'Testing',
      HEADING: 'Testing',
    },
    BACK_LINK: '/mock',
  };

  it('should return corePageVariables with BACK_LINK and insurance/application product description', () => {
    const result = quoteCorePageVariables(mock);

    const expected = corePageVariables({
      PAGE_CONTENT_STRINGS: mock.PAGE_CONTENT_STRINGS,
      PRODUCT: {
        ...PRODUCT,
        DESCRIPTION: PRODUCT.DESCRIPTION.QUOTE,
      },
      BACK_LINK: mock.BACK_LINK,
    });

    expect(result).toEqual(expected);
  });
});
