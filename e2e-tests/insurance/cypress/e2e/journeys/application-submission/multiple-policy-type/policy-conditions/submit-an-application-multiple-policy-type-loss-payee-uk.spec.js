import { APPLICATION } from '../../../../../../../constants';

context('Insurance - submit an application - Single policy type, Loss payee - Financial details UK ', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({
      policyType: APPLICATION.POLICY_TYPE.MULTIPLE,
      isAppointingLossPayee: true,
      lossPayeeIsLocatedInUK: true,
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
