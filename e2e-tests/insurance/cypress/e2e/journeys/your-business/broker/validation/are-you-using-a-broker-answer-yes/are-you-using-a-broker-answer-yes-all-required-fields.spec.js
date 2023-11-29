import partials from '../../../../../../../../partials';
import { ROUTES } from '../../../../../../../../constants';

const {
  ROOT,
  EXPORTER_BUSINESS: {
    BROKER_ROOT,
    CHECK_YOUR_ANSWERS,
  },
} = ROUTES.INSURANCE;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your business - Broker Page - As an Exporter I want to confirm that I am using a broker for my export Insurance so that UKEF and I can easily collaborate and manage correspondence regarding my credit insurance', () => {
  let referenceNumber;
  let checkYourAnswersUrl;

  before(() => {
    cy.clearCookies();
    Cypress.session.clearAllSavedSessions();

    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection();

      cy.completeAndSubmitCompanyDetails({});
      cy.completeAndSubmitNatureOfYourBusiness();
      cy.completeAndSubmitTurnoverForm();
      cy.completeAndSubmitCreditControlForm({});

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
