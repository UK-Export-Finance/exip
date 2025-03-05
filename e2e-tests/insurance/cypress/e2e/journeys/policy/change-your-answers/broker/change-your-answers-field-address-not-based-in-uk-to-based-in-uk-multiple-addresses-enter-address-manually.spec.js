import { summaryList } from '../../../../../../../pages/shared';
import { ADDRESS_LOOKUP_INPUT_EXAMPLES } from '../../../../../../../constants';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import checkSummaryList from '../../../../../../../commands/insurance/check-policy-summary-list';
import application from '../../../../../../../fixtures/application';

const { WESTMINSTER_BRIDGE_STREET } = ADDRESS_LOOKUP_INPUT_EXAMPLES;

const {
  USING_BROKER,
  IS_BASED_IN_UK,
  BROKER_DETAILS: { NAME, EMAIL },
  BROKER_ADDRESSES: { SELECT_THE_ADDRESS },
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: {
    BROKER_ADDRESSES_CHANGE,
    BROKER_CONFIRM_ADDRESS_CHANGE,
    BROKER_DETAILS_ROOT,
    BROKER_MANUAL_ADDRESS_ROOT,
    BROKER_MANUAL_ADDRESS_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Policy - Change your answers - Broker address - Not based in UK to Based in UK - Multiple addresses available - Enter address manually - As an exporter, I want to change my answers to the broker section',
  () => {
    let referenceNumber;
    let checkYourAnswersUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completePolicySection({
          usingBroker: true,
          brokerIsBasedInUk: false,
        });

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

    describe('after changing the answer from yes to no and submitting the UK broker address manually', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        summaryList.field(FULL_ADDRESS).changeLink().click();

        cy.clickUseDifferentAddressLink();

        cy.completeAndSubmitBrokerDetailsForm({
          isBasedInUk: true,
          postcode: WESTMINSTER_BRIDGE_STREET.POSTCODE,
          buildingNumberOrName: WESTMINSTER_BRIDGE_STREET.BUILDING_NAME,
        });

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: BROKER_ADDRESSES_CHANGE });

        cy.clickEnterAddressManuallyLink();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: BROKER_MANUAL_ADDRESS_CHANGE });

        cy.completeAndSubmitBrokerManualAddressForm({});

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS });
      });

      it(`should render the new ${SELECT_THE_ADDRESS} answer and related fields`, () => {
        checkSummaryList[USING_BROKER]({ usingBroker: true });
        checkSummaryList.BROKER[NAME]();
        checkSummaryList.BROKER[EMAIL]();

        checkSummaryList.BROKER[FULL_ADDRESS]({ shouldRender: true });
      });

      it(`should NOT render ${SELECT_THE_ADDRESS} field`, () => {
        checkSummaryList.BROKER[SELECT_THE_ADDRESS]({ shouldRender: false });
      });

      describe(`when going back to ${BROKER_DETAILS_ROOT}`, () => {
        beforeEach(() => {
          cy.navigateToUrl(checkYourAnswersUrl);

          summaryList.field(NAME).changeLink().click();
        });

        it(`should retain the new ${IS_BASED_IN_UK} value and have empty address lookup fields`, () => {
          cy.assertBrokerDetailsFieldValues({
            isBasedInUk: true,
            expectedPostcode: '',
            expectedBuildingNumberOrName: '',
          });
        });
      });

      describe(`when going to ${BROKER_MANUAL_ADDRESS_ROOT}`, () => {
        beforeEach(() => {
          cy.navigateToUrl(checkYourAnswersUrl);

          summaryList.field(FULL_ADDRESS).changeLink().click();

          cy.clickEnterAddressManuallyLink();
        });

        it('should have the submitted value', () => {
          cy.checkTextareaValue({
            fieldId: FULL_ADDRESS,
            expectedValue: application.BROKER[FULL_ADDRESS],
          });
        });
      });
    });
  },
);
