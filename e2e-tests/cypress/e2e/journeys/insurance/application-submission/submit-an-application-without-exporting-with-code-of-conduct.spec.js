import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  APPLICATION_SUBMITTED,
} = INSURANCE_ROUTES;

context('Insurance - submit an application without `exporting with code of conduct` declaration', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({ exportingWithCodeOfConduct: false }).then((refNumber) => {
      referenceNumber = refNumber;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should successfully submit the application and redirect to ${APPLICATION_SUBMITTED}`, () => {
    url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${APPLICATION_SUBMITTED}`;

    cy.url().should('eq', url);
  });
});
