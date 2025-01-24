import { summaryList } from '../../../../../../../../pages/shared';
import { brokerConfirmAddressPage } from '../../../../../../../../pages/insurance/policy';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import checkSummaryList from '../../../../../../../../commands/insurance/check-policy-summary-list';

const {
  USING_BROKER,
  BROKER_DETAILS: { NAME, EMAIL },
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
  BROKER_ADDRESSES: { SELECT_THE_ADDRESS },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Change your answers - Policy - Broker manual address - As an exporter, I want to change my answers to the broker section', () => {
  let referenceNumber;
  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ usingBroker: false });

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

  describe('after changing the answer', () => {
    const newAnswer = 'Mock updated full broker address';

    beforeEach(() => {
      cy.navigateToUrl(checkYourAnswersUrl);
    });

    it(`should redirect to ${TYPE_OF_POLICY}`, () => {
      summaryList.field(FULL_ADDRESS).changeLink().click();

      brokerConfirmAddressPage.useDifferentAddressLink().click();

      cy.completeAndSubmitBrokerDetailsForm({ isBasedInUk: false });

      cy.completeAndSubmitBrokerManualAddressForm({ fullAddress: newAnswer });

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY });
    });

    it(`should render the new ${FULL_ADDRESS} answer and related fields`, () => {
      checkSummaryList[USING_BROKER]({ usingBroker: true });
      checkSummaryList.BROKER[NAME]();
      checkSummaryList.BROKER[EMAIL]();

      checkSummaryList.BROKER[FULL_ADDRESS]({
        shouldRender: true,
        value: newAnswer,
      });
    });

    it(`should NOT render ${SELECT_THE_ADDRESS} field`, () => {
      checkSummaryList.BROKER[SELECT_THE_ADDRESS]({ shouldRender: false });
    });
  });
});
