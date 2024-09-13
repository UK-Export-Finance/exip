import { BUTTONS, PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';

const CONTENT_STRINGS = PAGES.FEEDBACK_SENT_PAGE;

const { FEEDBACK_SENT } = ROUTES.INSURANCE;

context('Insurance - Feedback confirmation page - Signed in', () => {
  const url = FEEDBACK_SENT;

  before(() => {
    cy.completeSignInAndGoToApplication({});
    cy.clickPhaseBannerFeedbackLink();

    // to reach confirmation page
    cy.clickSubmitButton();
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      hasAForm: false,
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: url,
      assertAuthenticatedHeader: true,
      assertBackLink: false,
      submitButtonCopy: BUTTONS.BACK_TO_SERVICE,
    });
  });
});
