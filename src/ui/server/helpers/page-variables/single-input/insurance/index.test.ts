import insuranceSingleInputPageVariables from '.';
import singleInputPageVariables from '..';
import { ROUTES } from '../../../../constants';

const { FEEDBACK: feedbackRoute } = ROUTES.INSURANCE;

describe('server/helpers/page-variables/single-input/insurance', () => {
  const mock = {
    PAGE_CONTENT_STRINGS: {
      PAGE_TITLE: 'Testing',
      HEADING: 'Testing',
    },
    BACK_LINK: '/mock',
    FIELD_ID: 'mock',
  };

  it('should return singleInputPageVariables with BACK_LINK, insurance/application product description and FIELD_ID', () => {
    const result = insuranceSingleInputPageVariables(mock);

    const expected = singleInputPageVariables({
      PAGE_CONTENT_STRINGS: mock.PAGE_CONTENT_STRINGS,
      BACK_LINK: mock.BACK_LINK,
      FIELD_ID: mock.FIELD_ID,
      FEEDBACK_ROUTE: feedbackRoute,
    });

    expect(result).toEqual(expected);
  });
});
