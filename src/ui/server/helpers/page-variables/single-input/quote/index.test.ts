import quoteSingleInputPageVariables from '.';
import singleInputPageVariables from '..';
import { LINKS } from '../../../../content-strings';

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
      BACK_LINK: mock.BACK_LINK,
      FIELD_ID: mock.FIELD_ID,
      FEEDBACK_ROUTE: LINKS.EXTERNAL.FEEDBACK,
      HAS_SAVE_AND_BACK: false,
    });

    expect(result).toEqual(expected);
  });

  it('should return HAS_SAVE_AND_BACK as false when it is not provided', () => {
    const result = quoteSingleInputPageVariables(mock);

    expect(result.HAS_SAVE_AND_BACK).toEqual(false);
  });
});
