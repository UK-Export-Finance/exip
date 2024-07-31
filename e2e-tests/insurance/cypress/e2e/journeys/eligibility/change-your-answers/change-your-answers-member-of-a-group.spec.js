import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { summaryList } from '../../../../../../pages/shared';

const { IS_MEMBER_OF_A_GROUP } = INSURANCE_FIELD_IDS.ELIGIBILITY;

const {
  ELIGIBILITY: { MEMBER_OF_A_GROUP_CHANGE, CHECK_YOUR_ANSWERS, LONG_TERM_COVER },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Eligibility - Change your answers - Party to consortium - As an exporter, I want to change my answers to the eligibility party to consortium section',
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

    const fieldId = IS_MEMBER_OF_A_GROUP;

    describe('when clicking the `change` link', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();
      });

      it(`should redirect to ${MEMBER_OF_A_GROUP_CHANGE}`, () => {
        cy.assertChangeAnswersPageUrl({ route: MEMBER_OF_A_GROUP_CHANGE, fieldId, isInsuranceEligibility: true });
      });

      it(`should have the "no" radio selected`, () => {
        cy.assertNoRadioOptionIsChecked();
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

      it(`should redirect to ${LONG_TERM_COVER}`, () => {
        cy.assertChangeAnswersPageUrl({ route: LONG_TERM_COVER, fieldId, isInsuranceEligibility: true });
      });
    });
  },
);
