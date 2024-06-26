import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { summaryList } from '../../../../../../pages/shared';

const { HAS_END_BUYER } = INSURANCE_FIELD_IDS.ELIGIBILITY;

const {
  START,
  ELIGIBILITY: { END_BUYER_CHANGE, CHECK_YOUR_ANSWERS, CANNOT_APPLY_MULTIPLE_RISKS },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Eligibility - Change your answers - End buyer - As an exporter, I want to change my answers to the eligibility end buyer section', () => {
  const url = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

  before(() => {
    cy.navigateToUrl(START);

    cy.completeAndSubmitAllInsuranceEligibilityAnswers({});

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  const fieldId = HAS_END_BUYER;

  describe('when clicking the `change` link', () => {
    it(`should redirect to ${END_BUYER_CHANGE}`, () => {
      cy.navigateToUrl(url);

      summaryList.field(fieldId).changeLink().click();

      cy.assertChangeAnswersPageUrl({ route: END_BUYER_CHANGE, fieldId, isInsuranceEligibility: true });
    });
  });

  describe('form submission without changing the answer', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      summaryList.field(fieldId).changeLink().click();

      cy.clickSubmitButton();
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      cy.assertChangeAnswersPageUrl({ route: CHECK_YOUR_ANSWERS, fieldId, isInsuranceEligibility: true });
    });
  });

  describe('form submission with a new answer', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      summaryList.field(fieldId).changeLink().click();

      cy.clickYesRadioInput();
      cy.clickSubmitButton();
    });

    it(`should redirect to ${CANNOT_APPLY_MULTIPLE_RISKS}`, () => {
      cy.assertChangeAnswersPageUrl({ route: CANNOT_APPLY_MULTIPLE_RISKS, fieldId, isInsuranceEligibility: true });
    });
  });
});
