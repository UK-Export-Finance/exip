import { APPLICATION } from '../../../../../../../constants';

context('Insurance - submit an application - multiple policy type, minimal buyer', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({
      policyType: APPLICATION.POLICY_TYPE.MULTIPLE,
      hasConnectionToBuyer: false,
      exporterHasTradedWithBuyer: false,
      buyerOutstandingPayments: false,
      buyerFailedToPayOnTime: false,
      hasHadCreditInsuranceCoverWithBuyer: false,
      exporterHasBuyerFinancialAccounts: false,
      totalContractValueOverThreshold: false,
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

  it('should render as expected in the dashboard', () => {
    cy.assertDashboardApplicationSubmitted(referenceNumber);
  });
});
