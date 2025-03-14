import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { summaryList } from '../../../../../../pages/shared';

const { HAS_MINIMUM_UK_GOODS_OR_SERVICES } = INSURANCE_FIELD_IDS.ELIGIBILITY;

const {
  ELIGIBILITY: { UK_GOODS_OR_SERVICES_CHANGE, CHECK_YOUR_ANSWERS, CANNOT_APPLY_EXIT },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Eligibility - Change your answers - UK goods or services - As an exporter, I want to change my answers to the eligibility UK goods or services section',
  () => {
    const url = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

    before(() => {
      cy.navigateToCheckIfEligibleUrl();

      cy.completeAndSubmitAllInsuranceEligibilityAnswers({});

      cy.assertUrl(url);
    });

    beforeEach(() => {
      cy.saveSession();
    });

    const fieldId = HAS_MINIMUM_UK_GOODS_OR_SERVICES;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${UK_GOODS_OR_SERVICES_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ route: UK_GOODS_OR_SERVICES_CHANGE, fieldId, isInsuranceEligibility: true });
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

      it(`should redirect to ${CANNOT_APPLY_EXIT}`, () => {
        cy.assertChangeAnswersPageUrl({ route: CANNOT_APPLY_EXIT, fieldId, isInsuranceEligibility: true });
      });
    });
  },
);
