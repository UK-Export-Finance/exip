import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { summaryList, submitButton } from '../../../../../../pages/shared';
import { FIELDS_ELIGIBILITY as FIELDS } from '../../../../../../content-strings/fields/insurance/eligibility';

const { TOTAL_CONTRACT_VALUE } = INSURANCE_FIELD_IDS.ELIGIBILITY;

const {
  START,
  ELIGIBILITY: { TOTAL_VALUE_INSURED_CHANGE, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Eligibility - Change your answers - Total contract value - As an exporter, I want to change my answers to the eligibility total contract value section', () => {
  const url = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

  before(() => {
    cy.navigateToUrl(START);

    cy.completeAndSubmitAllInsuranceEligibilityAnswers();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  const fieldId = TOTAL_CONTRACT_VALUE;
  const expectedValue = FIELDS[fieldId].SUMMARY.ABOVE;

  describe('when clicking the `change` link', () => {
    it(`should redirect to ${TOTAL_VALUE_INSURED_CHANGE}`, () => {
      cy.navigateToUrl(url);

      summaryList.field(fieldId).changeLink().click();

      cy.assertChangeAnswersPageUrl({ route: TOTAL_VALUE_INSURED_CHANGE, fieldId, isInsuranceEligibility: true });
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

      cy.completeAndSubmitTotalValueInsuredForm({ underThreshold: false });
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      cy.assertChangeAnswersPageUrl({ route: CHECK_YOUR_ANSWERS, fieldId, isInsuranceEligibility: true });
    });

    it('should render the new answer', () => {
      cy.assertSummaryListRowValue(summaryList, fieldId, expectedValue);
    });
  });
});
