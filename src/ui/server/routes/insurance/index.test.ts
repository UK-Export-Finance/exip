import { get, post } from '../../test-mocks/mock-router';
import { INSURANCE_ROUTES, INSURANCE_ROOT } from '../../constants/routes/insurance';
import { get as startGet, post as startPost } from '../../controllers/insurance/start';
import { get as dashboardGet } from '../../controllers/insurance/dashboard';
import { get as allSectionsGet } from '../../controllers/insurance/all-sections';
import { get as pageNotFoundGet } from '../../controllers/insurance/page-not-found';
import { get as noAccessToApplicationGet } from '../../controllers/insurance/no-access-to-application';
import { get as noAccessApplicationSubmittedGet } from '../../controllers/insurance/no-access-application-submitted';
import { get as applicationSubmittedGet } from '../../controllers/insurance/application-submitted';
import { get as completeOtherSectionsGet } from '../../controllers/insurance/complete-other-sections';
import { get as feedbackGet, post as feedbackPost } from '../../controllers/insurance/feedback/feedback-form';
import { get as feedbackConfirmationGet } from '../../controllers/insurance/feedback/feedback-confirmation';

describe('routes/insurance', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(106);
    expect(post).toHaveBeenCalledTimes(94);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.START, startGet);
    expect(post).toHaveBeenCalledWith(INSURANCE_ROUTES.START, startPost);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.DASHBOARD, dashboardGet);
    expect(get).toHaveBeenCalledWith(`${INSURANCE_ROUTES.DASHBOARD_PAGE}/:pageNumber`, dashboardGet);

    expect(get).toHaveBeenCalledWith(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.ALL_SECTIONS}`, allSectionsGet);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.PAGE_NOT_FOUND, pageNotFoundGet);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.NO_ACCESS_TO_APPLICATION, noAccessToApplicationGet);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.NO_ACCESS_APPLICATION_SUBMITTED, noAccessApplicationSubmittedGet);

    expect(get).toHaveBeenCalledWith(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.COMPLETE_OTHER_SECTIONS}`, completeOtherSectionsGet);

    expect(get).toHaveBeenCalledWith(`${INSURANCE_ROOT}/:referenceNumber${INSURANCE_ROUTES.APPLICATION_SUBMITTED}`, applicationSubmittedGet);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.FEEDBACK, feedbackGet);
    expect(post).toHaveBeenCalledWith(INSURANCE_ROUTES.FEEDBACK, feedbackPost);

    expect(get).toHaveBeenCalledWith(INSURANCE_ROUTES.FEEDBACK_SENT, feedbackConfirmationGet);
  });
});
