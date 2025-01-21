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
  POLICY: { BROKER_DETAILS_ROOT, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Change your answers - Broker based in UK - No to yes - As an exporter, I want to change my answers to the broker section', () => {
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

  describe('after changing the answer from no to yes', () => {
    before(() => {
      cy.navigateToUrl(checkYourAnswersUrl);

      summaryList.field(NAME).changeLink().click();

      cy.completeAndSubmitBrokerDetailsForm({ isBasedInUk: true });

      // submit the "confirm broker address" form
      cy.clickSubmitButton();
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId: NAME });
    });

    it('should render new broker details summary list rows', () => {
      cy.navigateToUrl(checkYourAnswersUrl);

      checkSummaryList[USING_BROKER]({ usingBroker: true });

      checkSummaryList.BROKER[NAME]();

      checkSummaryList.BROKER[EMAIL]();

      checkSummaryList.BROKER[SELECT_THE_ADDRESS]({ shouldRender: true });
    });

    it(`should NOT render a ${FULL_ADDRESS} summary list row`, () => {
      cy.navigateToUrl(checkYourAnswersUrl);

      checkSummaryList.BROKER[FULL_ADDRESS]({ shouldRender: false });
    });

    describe(`when going back to ${BROKER_DETAILS_ROOT}`, () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(NAME).changeLink().click();
      });

      it('should retain the existing values', () => {
        cy.assertBrokerDetailsFieldValues({ isBasedInUk: true });
      });
    });
  });
});
