import { APPLICATION } from '../../../../../../../constants';

context(
  'Insurance - submit an application - Multiple policy type - As an Exporter, I want to submit my completed credit insurance application with a value greater than 500000, So that UKEF can process and make a decision on my application',
  () => {
    let referenceNumber;

    before(() => {
      cy.completeSignInAndSubmitAnApplication({
        policyType: APPLICATION.POLICY_TYPE.MULTIPLE,
        policyValueOverMvpMaximum: true,
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
