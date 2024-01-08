import insuranceCorePageVariables from '.';
import corePageVariables from '..';
import { ROUTES } from '../../../../constants';

const { FEEDBACK: feedbackRoute } = ROUTES.INSURANCE;

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
      BACK_LINK: mock.BACK_LINK,
      FEEDBACK_ROUTE: feedbackRoute,
      HAS_SAVE_AND_BACK: true,
    });

    expect(result).toEqual(expected);
  });

  it('should return HAS_SAVE_AND_BACK as true when it is not provided', () => {
    const result = insuranceCorePageVariables(mock);

    expect(result.HAS_SAVE_AND_BACK).toEqual(true);
  });
});
