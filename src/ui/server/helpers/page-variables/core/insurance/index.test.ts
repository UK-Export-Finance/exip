import insuranceCorePageVariables from '.';
import corePageVariables from '..';
import { ROUTES, TEMPLATES } from '../../../../constants';

const { FEEDBACK: feedbackRoute } = ROUTES.INSURANCE;

const { CONDITIONAL_YES_HTML } = TEMPLATES.PARTIALS.INSURANCE.BUYER.CONNECTION_WITH_BUYER;

describe('server/helpers/page-variables/core/insurance', () => {
  const mock = {
    PAGE_CONTENT_STRINGS: {
      PAGE_TITLE: 'Testing',
      HEADING: 'Testing',
    },
    BACK_LINK: '/mock',
  };

  const HTML_FLAGS = {
    CONDITIONAL_YES_HTML,
    HORIZONTAL_RADIOS: true,
  };

  it('should return corePageVariables with BACK_LINK and insurance/application product description when HTML_FLAGS are not provided', () => {
    const result = insuranceCorePageVariables(mock);

    const expected = corePageVariables({
      PAGE_CONTENT_STRINGS: mock.PAGE_CONTENT_STRINGS,
      BACK_LINK: mock.BACK_LINK,
      FEEDBACK_ROUTE: feedbackRoute,
    });

    expect(result).toEqual(expected);
  });

  it('should return corePageVariables with BACK_LINK, insurance/application product description and HTML_FLAGS when HTML_FLAGS are provided', () => {
    const result = insuranceCorePageVariables({ ...mock, HTML_FLAGS });

    const expected = corePageVariables({
      PAGE_CONTENT_STRINGS: mock.PAGE_CONTENT_STRINGS,
      BACK_LINK: mock.BACK_LINK,
      FEEDBACK_ROUTE: feedbackRoute,
      HTML_FLAGS,
    });

    expect(result).toEqual(expected);
  });
});
