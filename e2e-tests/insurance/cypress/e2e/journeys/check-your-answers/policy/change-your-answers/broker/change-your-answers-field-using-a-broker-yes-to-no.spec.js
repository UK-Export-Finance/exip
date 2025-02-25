import { summaryList, status } from '../../../../../../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import { FIELD_VALUES } from '../../../../../../../../constants';

const {
  USING_BROKER: FIELD_ID,
  BROKER_DETAILS: { NAME, EMAIL },
  BROKER_ADDRESSES: { SELECT_THE_ADDRESS },
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY },
  POLICY: { BROKER_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Change your answers - Policy - Broker - Using a broker - Yes to no - As an exporter, I want to change my answers to the broker section',
  () => {
    let referenceNumber;
    let checkYourAnswersUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completePrepareApplicationSinglePolicyType({ usingBroker: true });

        cy.clickTaskCheckAnswers();

        // To get past previous "Check your answers" pages
        cy.completeAndSubmitMultipleCheckYourAnswers({ count: 2 });

        checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${TYPE_OF_POLICY}`;
      });
    });

    beforeEach(() => {
      cy.saveSession();
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${BROKER_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(FIELD_ID).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: BROKER_CHECK_AND_CHANGE, fieldId: FIELD_ID });
      });
    });

    describe('after changing the answer from yes to no', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(`should redirect to ${TYPE_OF_POLICY}`, () => {
        summaryList.field(FIELD_ID).changeLink().click();

        cy.completeAndSubmitBrokerForm({ usingBroker: false });

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY, fieldId: FIELD_ID });
      });

      it('renders a `completed` status tag', () => {
        cy.checkTaskStatusCompleted(status);
      });

      it(`should render new ${FIELD_ID} answer and change link, with no other broker details fields`, () => {
        cy.assertSummaryListRowValue(summaryList, FIELD_ID, FIELD_VALUES.NO);

        cy.assertSummaryListRowDoesNotExist(summaryList, NAME);

        /**
         * Here, we can only assert the EMAIL field's "change" link.
         * Otherwise, the other (non-broker) EMAIL field's key and value is picked up.
         */
        summaryList.field(EMAIL).changeLink().should('not.exist');

        cy.assertSummaryListRowDoesNotExist(summaryList, SELECT_THE_ADDRESS);
        cy.assertSummaryListRowDoesNotExist(summaryList, FULL_ADDRESS);
      });
    });
  },
);
