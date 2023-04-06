import { get, post } from '../../test-mocks/mock-router';
import { INSURANCE_ROUTES, INSURANCE_ROOT } from '../../constants/routes/insurance';
import { get as startGet, post as startPost } from '../../controllers/insurance/start';
import { get as dashboardGet } from '../../controllers/insurance/dashboard';
import { get as allSectionsGet } from '../../controllers/insurance/all-sections';
import { get as pageNotFoundGet } from '../../controllers/insurance/page-not-found';
import { get as noAccessToApplicationGet } from '../../controllers/insurance/no-access-to-application';
import { get as applicationSubmittedGet } from '../../controllers/insurance/application-submitted';

describe('routes/insurance', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(79);
    expect(post).toHaveBeenCalledTimes(84);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.START, startGet);
    expect(post).toHaveBeenCalledWith(INSURANCE_ROUTES.START, startPost);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.DASHBOARD, dashboardGet);

    expect(get).toHaveBeenCalledWith(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.ALL_SECTIONS}`, allSectionsGet);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.PAGE_NOT_FOUND, pageNotFoundGet);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.NO_ACCESS_TO_APPLICATION, noAccessToApplicationGet);

    expect(get).toHaveBeenCalledWith(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.APPLICATION_SUBMITTED}`, applicationSubmittedGet);
  });
});
