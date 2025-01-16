import { APPLICATION } from '../../../../../../../../constants';

context(
  'Insurance - submit an application - Multiple policy type, exporter has traded with buyer, has outstanding payments, failed to pay on time, alternative currency',
  () => {
    let referenceNumber;

    before(() => {
      cy.completeSignInAndSubmitAnApplication({
        policyType: APPLICATION.POLICY_TYPE.MULTIPLE,
        alternativeCurrencyBuyer: true,
        exporterHasTradedWithBuyer: true,
        buyerOutstandingPayments: true,
        buyerFailedToPayOnTime: true,
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
  },
);
