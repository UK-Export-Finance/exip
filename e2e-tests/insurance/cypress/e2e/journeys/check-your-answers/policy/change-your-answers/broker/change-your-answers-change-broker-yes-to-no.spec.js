import {
  field,
  status,
  summaryList,
} from '../../../../../../../../pages/shared';
import partials from '../../../../../../../../partials';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import { FIELD_VALUES } from '../../../../../../../../constants';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    TYPE_OF_POLICY,
  },
  POLICY: {
    BROKER_CHECK_AND_CHANGE,
    BROKER_DETAILS_ROOT,
  },
} = INSURANCE_ROUTES;

const {
  USING_BROKER: FIELD_ID,
  BROKER_DETAILS: {
    NAME,
    EMAIL,
    FULL_ADDRESS,
  },
} = POLICY_FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Change your answers - Policy - Broker - Yes to no - As an exporter, I want to change my answers to the broker section', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber, usingBroker: true });

      task.link().click();

      // To get past previous "Check your answers" pages
      cy.completeAndSubmitMultipleCheckYourAnswers({ count: 2 });

      url = `${baseUrl}${ROOT}/${referenceNumber}${TYPE_OF_POLICY}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when clicking the `change` link', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${BROKER_CHECK_AND_CHANGE}`, () => {
      cy.navigateToUrl(url);

      summaryList.field(FIELD_ID).changeLink().click();

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: BROKER_CHECK_AND_CHANGE, fieldId: FIELD_ID });
    });
  });

  describe('after changing the answer from yes to no', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      summaryList.field(FIELD_ID).changeLink().click();

      cy.completeAndSubmitBrokerForm({ usingBroker: false });
    });

    it(`should redirect to ${TYPE_OF_POLICY}`, () => {
      cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY, fieldId: FIELD_ID });
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

    it('should retain a `completed` status tag', () => {
      cy.checkTaskStatusCompleted(status);
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
