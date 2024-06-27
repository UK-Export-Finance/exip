import { APPLICATION } from '../../../../../../../constants';

context('Insurance - submit an application - Multiple policy - fully populated business section', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({
      alternativeCurrencyTurnover: true,
      differentTradingName: true,
      differentTradingAddress: true,
      policyType: APPLICATION.POLICY_TYPE.MULTIPLE,
      usingBroker: true,
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
