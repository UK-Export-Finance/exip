import { APPLICATION } from '../../../../../../../constants';

context('Insurance - submit an application - Multiple policy type, using an agent, no charges', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({
      policyType: APPLICATION.POLICY_TYPE.MULTIPLE,
      isUsingAgent: true,
    }).then((refNumber) => {
      referenceNumber = refNumber;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should successfully submit the application and redirect to `application submitted`', () => {
    cy.assertApplicationSubmittedUrl(referenceNumber);
  });

  it('should render the application in a `submitted` state in the dashboard', () => {
    cy.assertDashboardApplicationSubmitted(referenceNumber);
  });
});
