import insuranceCorePageVariables from '.';
import corePageVariables from '..';
import { ROUTES } from '../../../../constants';
import { PRODUCT } from '../../../../content-strings';

const { START: insuranceStart, FEEDBACK: feedbackRoute } = ROUTES.INSURANCE;

describe('server/helpers/page-variables/core/insurance', () => {
  const mock = {
    PAGE_CONTENT_STRINGS: {
      PAGE_TITLE: 'Testing',
      HEADING: 'Testing',
    },
    BACK_LINK: '/mock',
    START_ROUTE: insuranceStart,
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
      START_ROUTE: insuranceStart,
      FEEDBACK_ROUTE: feedbackRoute,
    });

    expect(result).toEqual(expected);
  });
});
