import { field as fieldSelector } from '../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';
import { FIELD_IDS } from '../../../../../../constants/field-ids';

const {
  FEEDBACK: { IMPROVEMENT, OTHER_COMMENTS },
} = FIELD_IDS;

const { FEEDBACK } = ROUTES.INSURANCE;

const ERROR_MESSAGE_IMPROVEMENT = ERROR_MESSAGES[IMPROVEMENT];
const ERROR_MESSAGE_OTHER_COMMENT = ERROR_MESSAGES[OTHER_COMMENTS];

context('Insurance - Feedback - form validation', () => {
  const url = FEEDBACK;

  before(() => {
    cy.navigateToCheckIfEligibleUrl();

    cy.clickPhaseBannerFeedbackLink();
  });

  beforeEach(() => {
    cy.saveSession();
  });

  describe('when validation errors are present', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should render an ${IMPROVEMENT} validation error`, () => {
      const field = fieldSelector(IMPROVEMENT);
      const textareaField = { ...field, input: field.textarea };

      cy.submitAndAssertFieldErrors({
        field: textareaField,
        value: 'a'.repeat(1201),
        expectedErrorMessage: String(ERROR_MESSAGE_IMPROVEMENT),
      });
    });

    it(`should render an ${OTHER_COMMENTS} validation error`, () => {
      const field = fieldSelector(OTHER_COMMENTS);
      const textareaField = { ...field, input: field.textarea };

      cy.submitAndAssertFieldErrors({
        field: textareaField,
        value: 'a'.repeat(1201),
        expectedErrorMessage: String(ERROR_MESSAGE_OTHER_COMMENT),
      });
    });
  });
});
