import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { submitButton, summaryList } from '../../../../../../pages/shared';

const { COVER_PERIOD } = INSURANCE_FIELD_IDS.ELIGIBILITY;

const {
  START,
  ELIGIBILITY: { COVER_PERIOD_CHANGE, CHECK_YOUR_ANSWERS, LONG_TERM_COVER },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Eligibility - Change your answers - Cover period - As an exporter, I want to change my answers to the eligibility cover period section', () => {
  const url = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

  before(() => {
    cy.navigateToUrl(START);

    cy.completeAndSubmitAllInsuranceEligibilityAnswers();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  const fieldId = COVER_PERIOD;

  describe('when clicking the `change` link', () => {
    it(`should redirect to ${COVER_PERIOD_CHANGE}`, () => {
      cy.navigateToUrl(url);

      summaryList.field(fieldId).changeLink().click();

      cy.assertChangeAnswersPageUrl({ route: COVER_PERIOD_CHANGE, fieldId, isInsuranceEligibility: true });
    });
  });

  describe('form submission without changing the answer', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      summaryList.field(fieldId).changeLink().click();

      submitButton().click();
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      cy.assertChangeAnswersPageUrl({ route: CHECK_YOUR_ANSWERS, fieldId, isInsuranceEligibility: true });
    });
  });

  describe('form submission with a new answer', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      summaryList.field(fieldId).changeLink().click();

      cy.completeCoverPeriodForm({ underThreshold: false });
    });

    it(`should redirect to ${LONG_TERM_COVER}`, () => {
      cy.assertChangeAnswersPageUrl({ route: LONG_TERM_COVER, fieldId, isInsuranceEligibility: true });
    });
  });
});
