import partials from '../../../../../../partials';
import { field as fieldSelector } from '../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';
import { FIELD_IDS } from '../../../../../../constants/field-ids';

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

const TOTAL_REQUIRED_FIELDS = 1;

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
    });

    it('should display validation errors', () => {
      const field = fieldSelector(IMPROVEMENT);
      const value = 'a'.repeat(1201);
      const fieldIndex = 0;
      const expectedMessage = String(ERROR_MESSAGE_IMPROVEMENT);

      cy.submitAndAssertFieldErrors(field, value, fieldIndex, TOTAL_REQUIRED_FIELDS, expectedMessage);
    });

    it('should display validation errors', () => {
      const field = fieldSelector(OTHER_COMMENTS);
      const value = 'a'.repeat(1201);
      const fieldIndex = 0;
      const expectedMessage = String(ERROR_MESSAGE_OTHER_COMMENT);

      cy.submitAndAssertFieldErrors(field, value, fieldIndex, TOTAL_REQUIRED_FIELDS, expectedMessage);
    });
  });
});
