import { APPLICATION } from '../../../../../../../constants';

context('Insurance - submit an application, Multiple contract policy, all modern slavery declaration answers as `yes`', () => {
  let referenceNumber;

  before(() => {
    cy.createAccount({});

    cy.completeSignInAndSubmitAnApplication({
      policyType: APPLICATION.POLICY_TYPE.MULTIPLE,
      willAdhereToAllRequirements: true,
      hasNoOffensesOrInvestigations: true,
      isNotAwareOfExistingSlavery: true,
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

  it('should render in a `submitted` state in the dashboard', () => {
    cy.assertDashboardApplicationSubmitted(referenceNumber);
  });
});
