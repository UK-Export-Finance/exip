context(
  'Insurance - submit an application, Single contract policy, no broker, no `have traded with buyer before` and no `have code of conduct` declaration',
  () => {
    let referenceNumber;

    before(() => {
      cy.createAccount({});

      cy.completeSignInAndSubmitAnApplication({
        exporterHasTradedWithBuyer: false,
        hasAntiBriberyCodeOfConduct: false,
        exportingWithCodeOfConduct: false,
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
