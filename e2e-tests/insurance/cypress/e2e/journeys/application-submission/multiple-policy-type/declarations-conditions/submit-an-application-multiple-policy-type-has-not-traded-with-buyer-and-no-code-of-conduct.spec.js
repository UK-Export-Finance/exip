import { APPLICATION } from '../../../../../../../constants';

context(
  'Insurance - submit an application, Multiple contract policy, no broker, no `have traded with buyer before` and no `have code of conduct` declaration',
  () => {
    let referenceNumber;

    beforeEach(() => {
      cy.completeSignInAndSubmitAnApplication({
        policyType: APPLICATION.POLICY_TYPE.MULTIPLE,
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

    it('should render in a `submitted` state in the dashboard', () => {
      cy.assertDashboardApplicationSubmitted(referenceNumber);
    });
  },
);
