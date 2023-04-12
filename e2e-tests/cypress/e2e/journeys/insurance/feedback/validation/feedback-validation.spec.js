import partials from '../../../../partials';
import { feedbackPage } from '../../../../pages/insurance/feedback';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';
import { FIELD_IDS } from '../../../../../../constants/field-ids';
import { submitButton } from '../../../../pages/shared';

const {
  FEEDBACK: {
    IMPROVEMENT,
    OTHER_COMMENTS,
  },
} = FIELD_IDS;

const {
  START,
  FEEDBACK,
} = ROUTES.INSURANCE;

const ERROR_MESSAGE_IMPROVEMENT = ERROR_MESSAGES[IMPROVEMENT];
const ERROR_MESSAGE_OTHER_COMMENT = ERROR_MESSAGES[OTHER_COMMENTS];

context('Insurance - Feedback - form validation', () => {
  const startUrl = START;
  const url = FEEDBACK;

  before(() => {
    cy.navigateToUrl(startUrl);
    partials.phaseBanner.feedbackLink().click();
  });

  beforeEach(() => {
    cy.saveSession();
  });

  describe('when validation errors are present', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
      cy.keyboardInput(feedbackPage[IMPROVEMENT].input(), 'a'.repeat(1201));
      cy.keyboardInput(feedbackPage[OTHER_COMMENTS].input(), 'a'.repeat(1201));
      submitButton().click();
    });

    it('should display validation errors', () => {
      partials.errorSummaryListItems().should('have.length', 2);

      cy.checkText(partials.errorSummaryListItems().first(), ERROR_MESSAGE_IMPROVEMENT);
      cy.checkText(partials.errorSummaryListItems().eq(1), ERROR_MESSAGE_OTHER_COMMENT);
    });

    it(`should focus to the ${IMPROVEMENT} when clicking the first error`, () => {
      partials.errorSummaryListItemLinks().first().click();
      feedbackPage[IMPROVEMENT].input().should('have.focus');
    });

    it(`should display the error for ${IMPROVEMENT}`, () => {
      cy.checkText(feedbackPage[IMPROVEMENT].errorMessage(), `Error: ${ERROR_MESSAGE_IMPROVEMENT}`);
    });

    it(`should focus to the ${OTHER_COMMENTS} when clicking the second error`, () => {
      partials.errorSummaryListItemLinks().eq(1).click();
      feedbackPage[OTHER_COMMENTS].input().should('have.focus');
    });

    it(`should display the error for ${OTHER_COMMENTS}`, () => {
      cy.checkText(feedbackPage[OTHER_COMMENTS].errorMessage(), `Error: ${ERROR_MESSAGE_OTHER_COMMENT}`);
    });
  });
});
