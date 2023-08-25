import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  APPLICATION_SUBMITTED,
} = INSURANCE_ROUTES;

context('Insurance - submit an application without `have traded with buyer before` and no `have code of conduct` declaration', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.createAccount({});
  });

  beforeEach(() => {
    cy.saveSession();

    cy.completeSignInAndSubmitAnApplication({
      exporterHasTradedWithBuyer: false,
      hasAntiBriberyCodeOfConduct: false,
      exportingWithCodeOfConduct: false,
    }).then((refNumber) => {
      referenceNumber = refNumber;
    });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should successfully submit the application and redirect to ${APPLICATION_SUBMITTED}`, () => {
    url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${APPLICATION_SUBMITTED}`;

    cy.assertUrl(url);
  });
});
