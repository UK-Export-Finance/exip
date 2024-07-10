import { summaryList, field } from '../../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../../constants';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES, INSURANCE_ROOT } from '../../../../../../../constants/routes/insurance';

const {
  POLICY: {
    CHECK_YOUR_ANSWERS,
    PRE_CREDIT_PERIOD,
    PRE_CREDIT_PERIOD_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  NEED_PRE_CREDIT_PERIOD,
  CREDIT_PERIOD_WITH_BUYER,
} = POLICY_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Change your answers - Pre-credit period - As an exporter, I want to check my answers for the pre-credit cover questions', () => {
  let referenceNumber;
  let url;
  let needPreCreditPeriodUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({ needPreCreditPeriod: true });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      needPreCreditPeriodUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${PRE_CREDIT_PERIOD}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(CREDIT_PERIOD_WITH_BUYER, () => {
    const fieldId = CREDIT_PERIOD_WITH_BUYER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${PRE_CREDIT_PERIOD_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: PRE_CREDIT_PERIOD_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      const newDescription = 'Updated description';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitPreCreditPeriodForm({
          needPreCreditPeriod: true,
          description: newDescription,
        });
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, newDescription);
      });
    });
  });

  describe(NEED_PRE_CREDIT_PERIOD, () => {
    const fieldId = NEED_PRE_CREDIT_PERIOD;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${PRE_CREDIT_PERIOD_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: PRE_CREDIT_PERIOD_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitPreCreditPeriodForm({ needPreCreditPeriod: false });
      });

      it(`should render the new answer and NOT render a ${CREDIT_PERIOD_WITH_BUYER} row`, () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.NO);

        cy.assertSummaryListRowDoesNotExist(summaryList, CREDIT_PERIOD_WITH_BUYER);
      });

      describe('when going back to the page', () => {
        it(`should have the submitted 'yes' value and an empty ${CREDIT_PERIOD_WITH_BUYER} value`, () => {
          cy.navigateToUrl(needPreCreditPeriodUrl);

          cy.assertNoRadioOptionIsChecked();

          field(CREDIT_PERIOD_WITH_BUYER).textarea().should('have.value', '');
        });
      });
    });
  });
});
