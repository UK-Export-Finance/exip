import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { summaryList } from '../../../../../../pages/shared';

const { VALID_EXPORTER_LOCATION } = INSURANCE_FIELD_IDS.ELIGIBILITY;

const {
  START,
  ELIGIBILITY: { EXPORTER_LOCATION_CHANGE, CHECK_YOUR_ANSWERS, CANNOT_APPLY },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Eligibility - Change your answers - Exporter location - As an exporter, I want to change my answers to the eligibility exporter location section',
  () => {
    const url = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

    before(() => {
      cy.navigateToUrl(START);

      cy.completeAndSubmitAllInsuranceEligibilityAnswers({});

      cy.assertUrl(url);
    });

    beforeEach(() => {
      cy.saveSession();
    });

    const fieldId = VALID_EXPORTER_LOCATION;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${EXPORTER_LOCATION_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ route: EXPORTER_LOCATION_CHANGE, fieldId, isInsuranceEligibility: true });
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

        cy.clickNoRadioInput();
        cy.clickSubmitButton();
      });

      it(`should redirect to ${CANNOT_APPLY}`, () => {
        cy.assertChangeAnswersPageUrl({ route: CANNOT_APPLY, fieldId, isInsuranceEligibility: true });
      });
    });
  },
);
