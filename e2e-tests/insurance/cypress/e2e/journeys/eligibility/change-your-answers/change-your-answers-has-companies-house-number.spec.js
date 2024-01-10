import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { summaryList, noRadio } from '../../../../../../pages/shared';

const { HAS_COMPANIES_HOUSE_NUMBER } = INSURANCE_FIELD_IDS.ELIGIBILITY;

const {
  START,
  ELIGIBILITY: { COMPANIES_HOUSE_NUMBER_CHANGE, CHECK_YOUR_ANSWERS, NO_COMPANIES_HOUSE_NUMBER },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Eligibility - Change your answers - Has companies house number - As an exporter, I want to change my answers to the eligibility Has companies house number section', () => {
  const url = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

  before(() => {
    cy.navigateToUrl(START);

    cy.completeAndSubmitAllInsuranceEligibilityAnswers();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  const fieldId = HAS_COMPANIES_HOUSE_NUMBER;

  describe('when clicking the `change` link', () => {
    it(`should redirect to ${COMPANIES_HOUSE_NUMBER_CHANGE}`, () => {
      cy.navigateToUrl(url);

      summaryList.field(fieldId).changeLink().click();

      cy.assertChangeAnswersPageUrl({ route: COMPANIES_HOUSE_NUMBER_CHANGE, fieldId, isInsuranceEligibility: true });
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

      noRadio().input().click();
      cy.clickSubmitButton();
    });

    it(`should redirect to ${NO_COMPANIES_HOUSE_NUMBER}`, () => {
      cy.assertChangeAnswersPageUrl({ route: NO_COMPANIES_HOUSE_NUMBER, fieldId, isInsuranceEligibility: true });
    });
  });
});
