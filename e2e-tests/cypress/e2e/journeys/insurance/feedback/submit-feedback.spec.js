import partials from '../../../partials';
import { feedbackPage } from '../../../pages/insurance/feedback';
import { ROUTES } from '../../../../../constants';
import { FIELD_IDS } from '../../../../../constants/field-ids';
import { submitButton } from '../../../pages/shared';

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
        cy.url().should('eq', feedbackConfirmationUrl);
      });
    });

    describe('when clicking the "back to service button"', () => {
      it(`should redirect to ${startUrl}`, () => {
        submitButton().click();

        cy.url().should('eq', startUrl);
      });
    });
  });

  describe('when submitting a populated form', () => {
    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(startUrl);
      partials.phaseBanner.feedbackLink().click();

      feedbackPage.field(SATISFIED).input().click();
      cy.keyboardInput(feedbackPage.field(IMPROVEMENT).input(), 'test');
      cy.keyboardInput(feedbackPage.field(OTHER_COMMENTS).input(), 'test');
      submitButton().click();
    });

    describe('when submitting a valid feedback form', () => {
      it(`should redirect to ${FEEDBACK_SENT}`, () => {
        cy.url().should('eq', feedbackConfirmationUrl);
      });
    });

    describe('when clicking the "back to service button"', () => {
      it(`should redirect to ${startUrl}`, () => {
        submitButton().click();

        cy.url().should('eq', startUrl);
      });
    });
  });

  describe(`when submitting a populated form with maximum characters for ${IMPROVEMENT} and ${OTHER_COMMENTS}`, () => {
    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(startUrl);
      partials.phaseBanner.feedbackLink().click();

      feedbackPage.field(SATISFIED).input().click();
      cy.keyboardInput(feedbackPage.field(IMPROVEMENT).input(), 'a'.repeat(1200));
      cy.keyboardInput(feedbackPage.field(OTHER_COMMENTS).input(), 'a'.repeat(1200));
      submitButton().click();
    });

    describe('when submitting a valid feedback form', () => {
      it(`should redirect to ${FEEDBACK_SENT}`, () => {
        cy.url().should('eq', feedbackConfirmationUrl);
      });
    });

    describe('when clicking the "back to service button"', () => {
      it(`should redirect to ${startUrl}`, () => {
        submitButton().click();

        cy.url().should('eq', startUrl);
      });
    });
  });

  describe('when submitting a populated form without satisfaction completed', () => {
    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(startUrl);
      partials.phaseBanner.feedbackLink().click();

      cy.keyboardInput(feedbackPage.field(IMPROVEMENT).input(), 'test');
      submitButton().click();
    });

    describe('when submitting a valid feedback form', () => {
      it(`should redirect to ${FEEDBACK_SENT}`, () => {
        cy.url().should('eq', feedbackConfirmationUrl);
      });
    });

    describe('when clicking the "back to service button"', () => {
      it(`should redirect to ${startUrl}`, () => {
        submitButton().click();

        cy.url().should('eq', startUrl);
      });
    });
  });
});
