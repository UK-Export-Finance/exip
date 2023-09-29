import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const { APPLICATION_SUBMITTED } = INSURANCE_ROUTES;

context('Insurance - submit an application - Single policy type, no broker - with different contact details in the `your business - contact details` form', () => {
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
      useDifferentContactEmail: true,
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
