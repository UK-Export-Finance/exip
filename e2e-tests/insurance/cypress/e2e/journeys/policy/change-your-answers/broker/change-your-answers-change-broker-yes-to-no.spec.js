import { field, summaryList } from '../../../../../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { FIELD_VALUES } from '../../../../../../../constants';

const {
  USING_BROKER: FIELD_ID,
  BROKER_DETAILS: {
    NAME,
    EMAIL,
    FULL_ADDRESS,
  },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: {
    BROKER_CHANGE,
    BROKER_DETAILS_ROOT,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Change your answers - Broker - Yes to no - As an exporter, I want to change my answers to the broker section', () => {
  let referenceNumber;
  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({ usingBroker: true });

      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(FIELD_ID, () => {
    describe('when clicking the `change` link', () => {
      it(`should redirect to ${BROKER_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(FIELD_ID).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: BROKER_CHANGE, fieldId: FIELD_ID });
      });
    });

    describe('after changing the answer from yes to no', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        summaryList.field(FIELD_ID).changeLink().click();

        cy.completeAndSubmitBrokerForm({ usingBroker: false });

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId: FIELD_ID });
      });

      it(`should render new ${FIELD_ID} answer and change link, with no other broker details fields`, () => {
        cy.assertSummaryListRowValue(summaryList, FIELD_ID, FIELD_VALUES.NO);

        cy.assertSummaryListRowDoesNotExist(summaryList, NAME);

        /**
         * Here, we can only assert the EMAIL field's "change" link.
         * Otherwise, the other (non-broker) EMAIL field's key and value is picked up.
         */
        summaryList.field(EMAIL).changeLink().should('not.exist');

        cy.assertSummaryListRowDoesNotExist(summaryList, FULL_ADDRESS);
      });

      describe(`when changing the answer again from no to yes and going back to ${BROKER_DETAILS_ROOT}`, () => {
        it('should have empty field values', () => {
          summaryList.field(FIELD_ID).changeLink().click();

          cy.completeAndSubmitBrokerForm({ usingBroker: true });

          cy.checkValue(field(NAME), '');
          cy.checkValue(field(EMAIL), '');

          cy.checkTextareaValue({
            fieldId: FULL_ADDRESS,
            expectedValue: '',
          });
        });
      });
    });
  });
});
