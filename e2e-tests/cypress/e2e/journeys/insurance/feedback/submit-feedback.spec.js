import partials from '../../../partials';
import { feedbackPage } from '../../../pages/insurance/feedback';
import { ROUTES } from '../../../../../constants';
import { FIELD_IDS } from '../../../../../constants/field-ids';
import { submitButton } from '../../../pages/shared';

const {
  FEEDBACK: {
    SATISFACTION,
    SATISFIED,
    IMPROVEMENT,
    OTHER_COMMENTS,
  },
} = FIELD_IDS;

const {
  START,
  FEEDBACK_CONFIRMATION,
} = ROUTES.INSURANCE;

context('Insurance - Feedback - Submit feedback form', () => {
  const startUrl = `${Cypress.config('baseUrl')}${START}`;
  const feedbackConfirmationUrl = `${Cypress.config('baseUrl')}${FEEDBACK_CONFIRMATION}`;

  before(() => {
    cy.navigateToUrl(startUrl);
    partials.phaseBanner.feedbackLink().click();
  });

  beforeEach(() => {
    cy.saveSession();
  });

  describe('when submitting a valid feedback form', () => {
    it(`should redirect to ${FEEDBACK_CONFIRMATION}`, () => {
      feedbackPage[SATISFACTION][SATISFIED].input().click();
      cy.keyboardInput(feedbackPage[IMPROVEMENT].input(), 'test');
      cy.keyboardInput(feedbackPage[OTHER_COMMENTS].input(), 'test');
      submitButton().click();

      cy.url().should('eq', feedbackConfirmationUrl);
    });
  });

  describe('when clicking ', () => {
    it(`should redirect to ${startUrl}`, () => {
      submitButton().click();

      cy.url().should('eq', startUrl);
    });
  });
});
