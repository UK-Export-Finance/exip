import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  CHECK_YOUR_ANSWERS: { YOUR_BUSINESS },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Check your answers - Your business page - Save and back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({});

      cy.clickTaskCheckAnswers();

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${YOUR_BUSINESS}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    cy.clickSaveAndBackButton();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should redirect to `all sections`', () => {
    cy.assertAllSectionsUrl(referenceNumber);
  });

  it('should retain the status of task `check your answers` as `in progress`', () => {
    cy.checkTaskCheckAnswersStatusIsInProgress();
  });

  it('should retain the status of task `declarations and submit` as `cannot start`', () => {
    cy.checkTaskDeclarationsAndSubmitStatusIsCannotStart();
  });
});
