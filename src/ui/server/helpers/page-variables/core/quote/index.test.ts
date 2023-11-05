import quoteCorePageVariables from '.';
import corePageVariables from '..';
import { LINKS } from '../../../../content-strings';

describe('server/helpers/page-variables/core/insurance', () => {
  const mock = {
    PAGE_CONTENT_STRINGS: {
      PAGE_TITLE: 'Testing',
      HEADING: 'Testing',
    },
    BACK_LINK: '/mock',
  };

  it('should return corePageVariables with BACK_LINK and insurance/application product description and START_ROUTE to start route', () => {
    const result = quoteCorePageVariables(mock);

    const expected = corePageVariables({
      PAGE_CONTENT_STRINGS: mock.PAGE_CONTENT_STRINGS,
      BACK_LINK: mock.BACK_LINK,
      FEEDBACK_ROUTE: LINKS.EXTERNAL.FEEDBACK,
    });

    expect(result).toEqual(expected);
  });
});
