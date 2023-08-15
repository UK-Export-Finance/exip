import { submitButton } from '../../../../../pages/shared';
import partials from '../../../../../partials';
import { feedbackConfirmation } from '../../../../../pages/insurance/feedback';
import { BUTTONS, PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';

const CONTENT_STRINGS = PAGES.FEEDBACK_SENT_PAGE;

const {
  START,
  FEEDBACK_SENT,
} = ROUTES.INSURANCE;

context('Insurance - Feedback Confirmation page', () => {
  const startUrl = START;
  const url = FEEDBACK_SENT;

  before(() => {
    cy.navigateToUrl(startUrl);
    partials.phaseBanner.feedbackLink().click();
    // to reach confirmation page
    submitButton().click();
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: url,
      submitButtonCopy: BUTTONS.BACK_TO_SERVICE,
      assertAuthenticatedHeader: false,
      assertBackLink: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render text confirming feedback', () => {
      cy.checkText(feedbackConfirmation.feedbackConfirmation(), CONTENT_STRINGS.FEEDBACK_TEXT);
    });
  });
});
