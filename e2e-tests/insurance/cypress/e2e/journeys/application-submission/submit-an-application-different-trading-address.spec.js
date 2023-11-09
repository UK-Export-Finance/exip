import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';

const { APPLICATION_SUBMITTED } = INSURANCE_ROUTES;

context('Insurance - submit an application - Single policy type, with a different `trading address`', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({ differentTradingAddress: true }).then((refNumber) => {
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
    cy.assertApplicationSubmittedUrl(referenceNumber);
  });
});
