import { summaryList } from '../../../../../../../pages/shared';
import { brokerConfirmAddressPage } from '../../../../../../../pages/insurance/policy';
import { EXPECTED_UNDERGROUND_STATION_SINGLE_LINE_STRING, ADDRESS_LOOKUP_INPUT_EXAMPLES, ORDNANCE_SURVEY_EXAMPLES } from '../../../../../../../constants';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import checkSummaryList from '../../../../../../../commands/insurance/check-policy-summary-list';

const { WESTMINSTER_BRIDGE_STREET } = ADDRESS_LOOKUP_INPUT_EXAMPLES;
const { UNDERGROUND_STATION } = ORDNANCE_SURVEY_EXAMPLES.WESTMINSTER_BRIDGE_STREET;

const {
  USING_BROKER,
  BROKER_DETAILS: { NAME, EMAIL },
  BROKER_ADDRESSES: { SELECT_THE_ADDRESS },
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: { BROKER_ADDRESSES_CHANGE, BROKER_CONFIRM_ADDRESS_CHANGE, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const optionValue = `${UNDERGROUND_STATION.ADDRESS_LINE_1} ${UNDERGROUND_STATION.ADDRESS_LINE_2}`;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Policy - Change your answers - Broker address - Not based in UK to Based in UK - Multiple addresses available - As an exporter, I want to change my answers to the broker section',
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
        summaryList.field(FULL_ADDRESS).changeLink().click();

        brokerConfirmAddressPage.useDifferentAddressLink().click();

        cy.completeAndSubmitBrokerDetailsForm({
          isBasedInUk: true,
          postcode: WESTMINSTER_BRIDGE_STREET.POSTCODE,
          buildingNumberOrName: WESTMINSTER_BRIDGE_STREET.BUILDING_NAME,
        });

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: BROKER_ADDRESSES_CHANGE });

        cy.completeAndSubmitBrokerAddressesForm({ optionValue });

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS });
      });

      it(`should render the new ${SELECT_THE_ADDRESS} answer and related fields`, () => {
        checkSummaryList[USING_BROKER]({ usingBroker: true });
        checkSummaryList.BROKER[NAME]();
        checkSummaryList.BROKER[EMAIL]();

        checkSummaryList.BROKER[SELECT_THE_ADDRESS]({
          shouldRender: true,
          expectedValue: EXPECTED_UNDERGROUND_STATION_SINGLE_LINE_STRING,
        });
      });

      it(`should NOT render ${FULL_ADDRESS} field`, () => {
        checkSummaryList.BROKER[FULL_ADDRESS]({ shouldRender: false });
      });
    });
  },
);
