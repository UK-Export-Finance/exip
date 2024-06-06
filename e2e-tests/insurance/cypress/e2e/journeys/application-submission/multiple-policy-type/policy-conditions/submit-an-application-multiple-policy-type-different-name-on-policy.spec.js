import { APPLICATION } from '../../../../../../../constants';

context('Insurance - submit an application - Single policy type, with a different `name on policy`', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({
      policyType: APPLICATION.POLICY_TYPE.MULTIPLE,
      differentPolicyContact: true,
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
