import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';

const { APPLICATION_SUBMITTED } = INSURANCE_ROUTES;

context('Insurance - submit an application, no broker, no `have traded with buyer before` and no `have code of conduct` declaration', () => {
  let referenceNumber;

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
    cy.assertApplicationSubmittedUrl(referenceNumber);
  });
});
