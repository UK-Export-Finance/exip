import { feedbackConfirmation } from '../../../../../pages/insurance/feedback';
import { BUTTONS, PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';

const CONTENT_STRINGS = PAGES.FEEDBACK_SENT_PAGE;

const { FEEDBACK_SENT } = ROUTES.INSURANCE;

context('Insurance - Feedback Confirmation page', () => {
  const url = FEEDBACK_SENT;

  before(() => {
    cy.navigateToCheckIfEligibleUrl();
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
      assertAuthenticatedHeader: false,
      assertBackLink: false,
      submitButtonCopy: BUTTONS.BACK_TO_SERVICE,
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
