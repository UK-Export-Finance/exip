import partials from '../../../../../partials';
import { field, submitButton } from '../../../../../pages/shared';
import { ROUTES } from '../../../../../constants';
import { FIELD_IDS } from '../../../../../constants/field-ids';

const {
  FEEDBACK: {
    SATISFIED,
    IMPROVEMENT,
    OTHER_COMMENTS,
  },
} = FIELD_IDS;

const {
  START,
  FEEDBACK_SENT,
} = ROUTES.INSURANCE;

context('Insurance - Feedback - Submit feedback form', () => {
  const startUrl = `${Cypress.config('baseUrl')}${START}`;
  const feedbackConfirmationUrl = `${Cypress.config('baseUrl')}${FEEDBACK_SENT}`;

  describe('when submitting an empty form', () => {
    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(startUrl);
      partials.phaseBanner.feedbackLink().click();
      submitButton().click();
    });

    describe('when submitting a valid feedback form', () => {
      it(`should redirect to ${FEEDBACK_SENT}`, () => {
        cy.assertUrl(feedbackConfirmationUrl);
      });
    });

    describe('when clicking the "back to service button"', () => {
      it(`should redirect to ${startUrl}`, () => {
        submitButton().click();

        cy.assertUrl(startUrl);
      });
    });
  });

  describe('when submitting a populated form', () => {
    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(startUrl);
      partials.phaseBanner.feedbackLink().click();

      field(SATISFIED).input().click();
      cy.keyboardInput(field(IMPROVEMENT).textarea(), 'test');
      cy.keyboardInput(field(OTHER_COMMENTS).textarea(), 'test');
      submitButton().click();
    });

    describe('when submitting a valid feedback form', () => {
      it(`should redirect to ${FEEDBACK_SENT}`, () => {
        cy.assertUrl(feedbackConfirmationUrl);
      });
    });

    describe('when clicking the "back to service button"', () => {
      it(`should redirect to ${startUrl}`, () => {
        submitButton().click();

        cy.assertUrl(startUrl);
      });
    });
  });

  describe(`when submitting a populated form with maximum characters for ${IMPROVEMENT} and ${OTHER_COMMENTS}`, () => {
    const longString = 'a'.repeat(1200);

    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(startUrl);
      partials.phaseBanner.feedbackLink().click();

      field(SATISFIED).input().click();
      cy.keyboardInput(field(IMPROVEMENT).textarea(), longString);
      cy.keyboardInput(field(OTHER_COMMENTS).textarea(), longString);
      submitButton().click();
    });

    describe('when submitting a valid feedback form', () => {
      it(`should redirect to ${FEEDBACK_SENT}`, () => {
        cy.assertUrl(feedbackConfirmationUrl);
      });
    });

    describe('when clicking the "back to service button"', () => {
      it(`should redirect to ${startUrl}`, () => {
        submitButton().click();

        cy.assertUrl(startUrl);
      });
    });
  });

  describe('when submitting a populated form without satisfaction completed', () => {
    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(startUrl);
      partials.phaseBanner.feedbackLink().click();

      cy.keyboardInput(field(IMPROVEMENT).textarea(), 'test');
      submitButton().click();
    });

    describe('when submitting a valid feedback form', () => {
      it(`should redirect to ${FEEDBACK_SENT}`, () => {
        cy.assertUrl(feedbackConfirmationUrl);
      });
    });

    describe('when clicking the "back to service button"', () => {
      it(`should redirect to ${startUrl}`, () => {
        submitButton().click();

        cy.assertUrl(startUrl);
      });
    });
  });
});
