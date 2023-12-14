import { brokerPage } from '../../../../../../../pages/insurance/policy';
import partials from '../../../../../../../partials';
import { submitButton } from '../../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { POLICY as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';

const {
  BROKER: {
    USING_BROKER: FIELD_ID,
  },
} = FIELD_IDS;

const {
  ROOT,
  POLICY: {
    BROKER_ROOT,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Broker Page - As an Exporter I want to confirm that I am not using a broker for my export Insurance so that UKEF and I can easily collaborate and manage correspondence regarding my credit insurance', () => {
  let referenceNumber;

  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsurancePolicySection();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitAboutGoodsOrServicesForm({});
      cy.completeAndSubmitNameOnPolicyForm({ sameName: true });

      const url = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_ROOT}`;
      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when the no radio is selected', () => {
    it(`should  not display validation errors and redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      const field = brokerPage[FIELD_ID];

      field.noRadioInput().click();
      submitButton().click();

      partials.errorSummaryListItems().should('have.length', 0);
      cy.assertUrl(checkYourAnswersUrl);
    });
  });
});
