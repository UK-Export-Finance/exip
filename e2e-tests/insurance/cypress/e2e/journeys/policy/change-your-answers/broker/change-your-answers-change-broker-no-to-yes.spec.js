import { summaryList } from '../../../../../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import checkSummaryList from '../../../../../../../commands/insurance/check-policy-summary-list';

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
  POLICY: { BROKER_CHANGE, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Change your answers - Broker - No to yes - As an exporter, I want to change my answers to the broker section', () => {
  let referenceNumber;
  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({ usingBroker: false });

      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when clicking the `change` link', () => {
    it(`should redirect to ${BROKER_CHANGE}`, () => {
      cy.navigateToUrl(checkYourAnswersUrl);

      summaryList.field(FIELD_ID).changeLink().click();

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: BROKER_CHANGE, fieldId: FIELD_ID });
    });
  });

  describe('after changing the answer from no to yes and completing (now required) broker details fields', () => {
    beforeEach(() => {
      cy.navigateToUrl(checkYourAnswersUrl);
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      summaryList.field(FIELD_ID).changeLink().click();

      cy.completeAndSubmitBrokerForm({ usingBroker: true });
      cy.completeAndSubmitBrokerDetailsForm({ usingBroker: true });

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId: FIELD_ID });
    });

    it(`should render new ${FIELD_ID} answer and broker details fields`, () => {
      checkSummaryList[FIELD_ID]({ usingBroker: true });
      checkSummaryList.BROKER[NAME]({});
      checkSummaryList.BROKER[FULL_ADDRESS]();
      checkSummaryList.BROKER[EMAIL]();
    });
  });
});
