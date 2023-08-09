import partials from '../../../../../../../../partials';
import { ROUTES } from '../../../../../../../../constants';

const {
  ROOT,
  EXPORTER_BUSINESS: {
    BROKER,
    CHECK_YOUR_ANSWERS,
  },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

context('Insurance - Your business - Broker Page - As an Exporter I want to confirm that I am using a broker for my export Insurance so that UKEF and I can easily collaborate and manage correspondence regarding my export insurance', () => {
  let referenceNumber;
  let checkYourAnswersUrl;

  before(() => {
    cy.clearCookies();
    Cypress.session.clearAllSavedSessions();

    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompanyDetails();
      cy.completeAndSubmitYourContact({});
      cy.completeAndSubmitNatureOfYourBusiness();
      cy.completeAndSubmitTurnoverForm();

      const url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${BROKER}`;
      checkYourAnswersUrl = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

      cy.url().should('eq', url);
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

    cy.url().should('eq', checkYourAnswersUrl);
  });
});
