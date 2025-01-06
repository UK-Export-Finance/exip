import { APPLICATION } from '../../../../../../../constants';

context('Insurance - submit an application, Multiple contract policy, modern slavery declaration - `aware of existing slavery`', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({
      policyType: APPLICATION.POLICY_TYPE.MULTIPLE,
      isNotAwareOfExistingSlavery: false,

      /**
       * Set other conditional modern slavery fields to null.
       * Otherwise, the test tries to enter text into inputs that are not visible.
       */
      cannotAdhereToAllRequirements: null,
      offensesOrInvestigations: null,
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
