import { summaryList } from '../../../../../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import checkSummaryList from '../../../../../../../commands/insurance/check-policy-summary-list';

const {
  USING_BROKER,
  BROKER_DETAILS: { NAME, EMAIL, POSTCODE, BUILDING_NUMBER_OR_NAME },
  BROKER_ADDRESSES: { SELECT_THE_ADDRESS },
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: { BROKER_DETAILS_ROOT, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Change your answers - Broker based in UK - Yes to no - As an exporter, I want to change my answers to the broker section', () => {
  let referenceNumber;
  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePolicySection({ usingBroker: true, brokerIsBasedInUk: true });

      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
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

    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId: NAME });
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

    describe(`when going back to ${BROKER_DETAILS_ROOT}`, () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(NAME).changeLink().click();
      });

      it('should retain the existing values', () => {
        cy.assertBrokerDetailsFieldValues({ isBasedInUk: false });
      });

      it('should have empty conditional `yes` field values', () => {
        cy.clickYesRadioInput();

        cy.assertEmptyFieldValue(POSTCODE);
        cy.assertEmptyFieldValue(BUILDING_NUMBER_OR_NAME);
      });
    });
  });

  describe(`when changing the answer again from no to yes and going back to ${BROKER_DETAILS_ROOT}`, () => {
    beforeEach(() => {
      cy.navigateToUrl(checkYourAnswersUrl);

      summaryList.field(NAME).changeLink().click();

      cy.completeAndSubmitBrokerDetailsForm({ isBasedInUk: true });

      cy.clickBackLink();
    });

    it('should retain the submitted values', () => {
      cy.assertBrokerDetailsFieldValues({ isBasedInUk: true });
    });
  });
});
