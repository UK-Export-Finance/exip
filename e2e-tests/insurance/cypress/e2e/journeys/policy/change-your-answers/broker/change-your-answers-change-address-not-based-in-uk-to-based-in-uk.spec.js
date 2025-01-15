import { summaryList } from '../../../../../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import checkSummaryList from '../../../../../../../commands/insurance/check-policy-summary-list';

const {
  USING_BROKER,
  BROKER_DETAILS: { NAME, EMAIL },
  BROKER_ADDRESSES: { SELECT_THE_ADDRESS },
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: { BROKER_CONFIRM_ADDRESS_CHANGE, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

/**
 * TODO
 * TODO
 * TODO
 * TODO
 * use constants (after another PR is merged)
 */
const optionValue = '1 H M TREASURY HORSE GUARDS ROAD';

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Policy - Change your answers - Broker address - Not based in UK to Based in UK - As an exporter, I want to change my answers to the broker section',
  () => {
    let referenceNumber;
    let checkYourAnswersUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completePolicySection({ usingBroker: true, brokerIsBasedInUk: false });

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
      it(`should redirect to ${BROKER_CONFIRM_ADDRESS_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(FULL_ADDRESS).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: BROKER_CONFIRM_ADDRESS_CHANGE, fieldId: FULL_ADDRESS });
      });
    });

    describe('after changing the answer from yes to no and completing (now required) UK broker address fields', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        summaryList.field(NAME).changeLink().click();

        cy.completeAndSubmitBrokerDetailsForm({ isBasedInUk: true });
        cy.completeAndSubmitBrokerAddressesForm({ optionValue });

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId: NAME });
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
