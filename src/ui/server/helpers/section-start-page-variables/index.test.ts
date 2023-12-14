import sectionStartPageVariables from '.';
import { INSURANCE_ROUTES } from '../../constants/routes/insurance';
import { mockApplication } from '../../test-mocks';

const { INSURANCE_ROOT, ALL_SECTIONS } = INSURANCE_ROUTES;

const { referenceNumber } = mockApplication;

describe('server/helpers/section-start-page-variables', () => {
  it('should return an object with START_NOW_URL and ALL_SECTIONS_URL', () => {
    const mockStartNowRoute = '/mock-route';

    const result = sectionStartPageVariables({
      referenceNumber,
      startNowRoute: mockStartNowRoute
    });

    const expected = {
      START_NOW_URL: `${INSURANCE_ROOT}/${referenceNumber}${mockStartNowRoute}`,
      ALL_SECTIONS_URL: `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`,
    };

    expect(result).toEqual(expected);
  });
});
