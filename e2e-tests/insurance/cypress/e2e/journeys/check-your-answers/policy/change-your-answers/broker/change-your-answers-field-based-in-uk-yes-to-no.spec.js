import { summaryList } from '../../../../../../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import checkSummaryList from '../../../../../../../../commands/insurance/check-policy-summary-list';

const {
  USING_BROKER,
  BROKER_DETAILS: { NAME, EMAIL },
  BROKER_ADDRESSES: { SELECT_THE_ADDRESS },
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Change your answers - Policy - Broker - Broker based in UK - Yes to no - As an exporter, I want to change my answers to the broker section',
  () => {
    let referenceNumber;
    let checkYourAnswersUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completePrepareApplicationSinglePolicyType({
          usingBroker: false,
          brokerIsBasedInUk: true,
        });

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

    describe('after changing the answer from yes to no', () => {
      before(() => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(NAME).changeLink().click();

        cy.completeAndSubmitBrokerDetailsForm({ isBasedInUk: false });

        cy.completeAndSubmitBrokerManualAddressForm({});
      });

      it(`should redirect to ${TYPE_OF_POLICY}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY, fieldId: NAME });
      });

      it('should render new broker details summary list rows', () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        checkSummaryList[USING_BROKER]({ usingBroker: true });

        checkSummaryList.BROKER[NAME]();

        checkSummaryList.BROKER[EMAIL]();

        checkSummaryList.BROKER[FULL_ADDRESS]({ shouldRender: true });
      });

      it(`should NOT render a ${SELECT_THE_ADDRESS} summary list row`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        checkSummaryList.BROKER[SELECT_THE_ADDRESS]({ shouldRender: false });
      });
    });
  },
);
