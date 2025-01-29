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
  POLICY: { BROKER_CONFIRM_ADDRESS_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Change your answers - Policy - Broker - Broker address - Not based in UK to Based in UK - Single address available - As an exporter, I want to change my answers to the broker section',
  () => {
    let referenceNumber;
    let checkYourAnswersUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completePrepareApplicationSinglePolicyType({
          usingBroker: true,
          brokerIsBasedInUk: false,
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

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${BROKER_CONFIRM_ADDRESS_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(FULL_ADDRESS).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: BROKER_CONFIRM_ADDRESS_CHECK_AND_CHANGE, fieldId: FULL_ADDRESS });
      });
    });

    describe('after changing the answer from yes to no and completing (now required) UK broker address fields', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(`should redirect to ${TYPE_OF_POLICY}`, () => {
        summaryList.field(FULL_ADDRESS).changeLink().click();

        cy.clickUseDifferentAddressLink();

        cy.completeAndSubmitBrokerDetailsForm({ isBasedInUk: true });

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: BROKER_CONFIRM_ADDRESS_CHECK_AND_CHANGE });

        // submit the "confirm address" form.
        cy.clickSubmitButton();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: TYPE_OF_POLICY });
      });

      it(`should render the new ${SELECT_THE_ADDRESS} answer and related fields`, () => {
        checkSummaryList[USING_BROKER]({ usingBroker: true });
        checkSummaryList.BROKER[NAME]();
        checkSummaryList.BROKER[EMAIL]();

        checkSummaryList.BROKER[SELECT_THE_ADDRESS]({ shouldRender: true });
      });

      it(`should NOT render ${FULL_ADDRESS} field`, () => {
        checkSummaryList.BROKER[FULL_ADDRESS]({ shouldRender: false });
      });
    });
  },
);
