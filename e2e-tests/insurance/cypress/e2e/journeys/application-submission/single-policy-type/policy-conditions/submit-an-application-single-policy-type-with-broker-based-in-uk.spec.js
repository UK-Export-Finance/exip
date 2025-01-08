context(
  'Insurance - submit an application - Single policy type with a broker - based in UK - As an Exporter, I want to submit my completed credit insurance application, So that UKEF can process and make a decision on my application',
  () => {
    let referenceNumber;

    before(() => {
      cy.completeSignInAndSubmitAnApplication({
        usingBroker: true,
        brokerIsBasedInUk: true,
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
  },
);
