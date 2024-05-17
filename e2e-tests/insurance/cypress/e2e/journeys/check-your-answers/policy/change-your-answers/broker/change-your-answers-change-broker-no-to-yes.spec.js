import { status, summaryList } from '../../../../../../../../pages/shared';
import partials from '../../../../../../../../partials';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import checkSummaryList from '../../../../../../../../commands/insurance/check-policy-summary-list';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    TYPE_OF_POLICY,
  },
  POLICY: { BROKER_CHECK_AND_CHANGE },
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

context('Insurance - Change your answers - Policy - Broker - No to yes - As an exporter, I want to change my answers to the broker section', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber, usingBroker: false });

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

  describe('after changing the answer from no to yes and completing (now required) broker details fields', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${TYPE_OF_POLICY}`, () => {
      summaryList.field(FIELD_ID).changeLink().click();

      cy.completeAndSubmitBrokerForm({ usingBroker: true });
      cy.completeAndSubmitBrokerDetailsForm({ usingBroker: true });

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY, fieldId: FIELD_ID });
    });

    it(`should render new ${FIELD_ID} answer and broker details fields`, () => {
      checkSummaryList[FIELD_ID]({ usingBroker: true });
      checkSummaryList.BROKER[NAME]({});
      checkSummaryList.BROKER[FULL_ADDRESS]();
      checkSummaryList.BROKER[EMAIL]();
    });

    it('should retain a `completed` status tag', () => {
      cy.checkTaskStatusCompleted(status);
    });
  });
});
