import sectionStartPageVariables from '.';
import insuranceCorePageVariables from '..';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { referenceNumber } from '../../../../../test-mocks';

const { INSURANCE_ROOT } = INSURANCE_ROUTES;

describe('server/helpers/page-variables/core/insurance/section-start', () => {
  const mock = {
    REFERENCE_NUMBER: referenceNumber,
    START_NOW_ROUTE: '/mock-route',
    PAGE_CONTENT_STRINGS: {
      PAGE_TITLE: 'Mock title',
    },
    BACK_LINK: '/mock',
  };

  it('should return insuranceCorePageVariables with ALL_SECTIONS_URL and START_NOW_URL', () => {
    const result = sectionStartPageVariables(mock);

    const expected = {
      ALL_SECTIONS_URL: `${INSURANCE_ROOT}/${mock.REFERENCE_NUMBER}${INSURANCE_ROUTES.ALL_SECTIONS}`,
      START_NOW_URL: `${INSURANCE_ROOT}/${mock.REFERENCE_NUMBER}${mock.START_NOW_ROUTE}`,
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: mock.PAGE_CONTENT_STRINGS,
        BACK_LINK: mock.BACK_LINK,
      }),
    };

    expect(result).toEqual(expected);
  });
});
