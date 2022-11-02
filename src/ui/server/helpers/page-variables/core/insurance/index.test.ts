import insuranceCorePageVariables from '.';
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
    const result = insuranceCorePageVariables(mock);

    const expected = corePageVariables({
      PAGE_CONTENT_STRINGS: mock.PAGE_CONTENT_STRINGS,
      PRODUCT: {
        ...PRODUCT,
        DESCRIPTION: PRODUCT.DESCRIPTION.APPLICATION,
      },
      BACK_LINK: mock.BACK_LINK,
    });

    expect(result).toEqual(expected);
  });
});
