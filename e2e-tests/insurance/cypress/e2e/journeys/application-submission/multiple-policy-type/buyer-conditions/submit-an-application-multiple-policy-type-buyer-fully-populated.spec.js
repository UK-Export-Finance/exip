import { APPLICATION } from '../../../../../../../constants';

context('Insurance - submit an application - Multiple policy type, fully populated buyer', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({
      policyType: APPLICATION.POLICY_TYPE.MULTIPLE,
      hasConnectionToBuyer: true,
      exporterHasTradedWithBuyer: true,
      buyerOutstandingPayments: true,
      buyerFailedToPayOnTime: true,
      hasHadCreditInsuranceCover: true, // TODO: rename to include 'with buyer'
      exporterHasBuyerFinancialAccounts: true,
      totalContractValueOverThreshold: true,
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
});
