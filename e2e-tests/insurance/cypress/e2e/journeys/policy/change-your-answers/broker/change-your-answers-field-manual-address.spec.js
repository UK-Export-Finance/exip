import { insetTextHtml, summaryList } from '../../../../../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import checkSummaryList from '../../../../../../../commands/insurance/check-policy-summary-list';

const {
  USING_BROKER,
  BROKER_DETAILS: { NAME, EMAIL },
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
  BROKER_ADDRESSES: { SELECT_THE_ADDRESS },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: { BROKER_MANUAL_ADDRESS_ROOT, BROKER_CONFIRM_ADDRESS_ROOT, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Change your answers - Broker manual address - As an exporter, I want to change my answers to the broker section', () => {
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

  describe('after changing the answer', () => {
    const newAnswer = 'Mock updated full broker address';

    beforeEach(() => {
      cy.navigateToUrl(checkYourAnswersUrl);
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      summaryList.field(FULL_ADDRESS).changeLink().click();

      cy.clickUseDifferentAddressLink();

      cy.completeAndSubmitBrokerDetailsForm({ isBasedInUk: false });

      cy.completeAndSubmitBrokerManualAddressForm({ fullAddress: newAnswer });

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS });
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

    describe(`when going to ${BROKER_MANUAL_ADDRESS_ROOT}`, () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(FULL_ADDRESS).changeLink().click();

        cy.clickUseDifferentAddressLink();

        cy.completeAndSubmitBrokerDetailsForm({ isBasedInUk: false });
      });

      it(`should retain the new ${FULL_ADDRESS} value`, () => {
        cy.checkTextareaValue({
          fieldId: FULL_ADDRESS,
          expectedValue: newAnswer,
        });
      });
    });

    describe(`when going to ${BROKER_CONFIRM_ADDRESS_ROOT}`, () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(FULL_ADDRESS).changeLink().click();
      });

      it(`should retain the new ${FULL_ADDRESS} value`, () => {
        cy.checkText(insetTextHtml(), newAnswer);
      });
    });
  });
});
