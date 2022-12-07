import insuranceSingleInputPageVariables from '.';
import singleInputPageVariables from '..';
import { PRODUCT } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';

const { START: insuranceStart } = ROUTES.INSURANCE;

describe('server/helpers/page-variables/single-input/insurance', () => {
  const mock = {
    PAGE_CONTENT_STRINGS: {
      PAGE_TITLE: 'Testing',
      HEADING: 'Testing',
    },
    BACK_LINK: '/mock',
    FIELD_ID: 'mock',
    START_ROUTE: insuranceStart,
  };

  it('should return singleInputPageVariables with BACK_LINK, insurance/application product description and FIELD_ID', () => {
    const result = insuranceSingleInputPageVariables(mock);

    const expected = singleInputPageVariables({
      PAGE_CONTENT_STRINGS: mock.PAGE_CONTENT_STRINGS,
      PRODUCT: {
        ...PRODUCT,
        DESCRIPTION: PRODUCT.DESCRIPTION.APPLICATION,
      },
      BACK_LINK: mock.BACK_LINK,
      FIELD_ID: mock.FIELD_ID,
      START_ROUTE: insuranceStart,
    });

    expect(result).toEqual(expected);
  });
});
