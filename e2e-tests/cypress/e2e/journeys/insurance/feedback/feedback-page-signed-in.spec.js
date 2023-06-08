import partials from '../../../partials';
import { BUTTONS, PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';

const CONTENT_STRINGS = PAGES.FEEDBACK_PAGE;

const {
  ALL_SECTIONS,
  FEEDBACK,
  ROOT,
} = ROUTES.INSURANCE;

context('Insurance - Feedback - Feedback page signed in', () => {
  let dashboardUrl;
  const url = FEEDBACK;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      dashboardUrl = `${Cypress.config('baseUrl')}${ROOT}/${refNumber}${ALL_SECTIONS}`;
    });
    partials.phaseBanner.feedbackLink().click();
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements with authenticated header', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: url,
      backLink: dashboardUrl,
      submitButtonCopy: BUTTONS.SEND_FEEDBACK,
      assertAuthenticatedHeader: true,
    });
  });
});
