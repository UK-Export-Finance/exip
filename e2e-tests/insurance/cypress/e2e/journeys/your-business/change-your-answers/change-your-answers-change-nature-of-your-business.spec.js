import { field, summaryList } from '../../../../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK },
} = INSURANCE_FIELD_IDS.EXPORTER_BUSINESS;

const {
  ROOT,
  EXPORTER_BUSINESS: { NATURE_OF_BUSINESS_CHANGE, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Your business - Change your answers - Nature of your business- As an exporter, I want to change my answers to the nature of your business section',
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.deleteAccount();

      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completeAndSubmitYourBusinessForms({ stopSubmittingAfter: 'creditControl' });

        url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      });
    });

    beforeEach(() => {
      cy.saveSession();
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    describe(GOODS_OR_SERVICES, () => {
      const fieldId = GOODS_OR_SERVICES;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${NATURE_OF_BUSINESS_CHANGE}`, () => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: NATURE_OF_BUSINESS_CHANGE, fieldId: GOODS_OR_SERVICES });
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = 'test 12345';

        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.keyboardInput(field(fieldId).textarea(), newAnswer);

          cy.clickSubmitButton();
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
        });

        it('should render the new answer', () => {
          cy.assertSummaryListRowValue(summaryList, fieldId, newAnswer);
        });
      });
    });

    describe(YEARS_EXPORTING, () => {
      const fieldId = YEARS_EXPORTING;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${NATURE_OF_BUSINESS_CHANGE}`, () => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: NATURE_OF_BUSINESS_CHANGE, fieldId });
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = '25';

        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.keyboardInput(field(fieldId).input(), newAnswer);

          cy.clickSubmitButton();
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
        });

        it('should render the new answer', () => {
          cy.assertSummaryListRowValue(summaryList, fieldId, newAnswer);
        });
      });
    });

    describe(EMPLOYEES_UK, () => {
      const fieldId = EMPLOYEES_UK;

      describe('when clicking the `change` link', () => {
        it(`should redirect to ${NATURE_OF_BUSINESS_CHANGE}`, () => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.assertChangeAnswersPageUrl({ referenceNumber, route: NATURE_OF_BUSINESS_CHANGE, fieldId });
        });
      });

      describe('form submission with a new answer', () => {
        const newAnswer = '26';

        beforeEach(() => {
          cy.navigateToUrl(url);

          summaryList.field(fieldId).changeLink().click();

          cy.keyboardInput(field(fieldId).input(), newAnswer);

          cy.clickSubmitButton();
        });

        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
        });

        it('should render the new answer', () => {
          cy.assertSummaryListRowValue(summaryList, fieldId, newAnswer);
        });
      });
    });
  },
);
