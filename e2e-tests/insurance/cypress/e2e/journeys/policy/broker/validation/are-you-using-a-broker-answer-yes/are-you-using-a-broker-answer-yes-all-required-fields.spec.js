import partials from '../../../../../../../../partials';
import { FIELD_VALUES } from '../../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';

const {
  ROOT,
  POLICY: {
    BROKER_ROOT,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Broker Page - As an Exporter I want to confirm that I am using a broker for my export Insurance so that UKEF and I can easily collaborate and manage correspondence regarding my credit insurance', () => {
  let referenceNumber;
  let checkYourAnswersUrl;

  before(() => {
    cy.clearCookies();
    Cypress.session.clearAllSavedSessions();

    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsurancePolicySection({});

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
      cy.completeAndSubmitSingleContractPolicyForm();
      cy.completeAndSubmitNameOnPolicyForm({});

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

  it('should not display validation errors when the yes radio is selected and all required fields are entered', () => {
    cy.completeAndSubmitBrokerForm({});

    partials.errorSummaryListItems().should('have.length', 0);

    cy.assertUrl(checkYourAnswersUrl);
  });
});
