import { APPLICATION } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const { APPLICATION_SUBMITTED } = INSURANCE_ROUTES;

context('Insurance - submit an application - Multiple policy type with a broker - As an Exporter, I want to submit my completed credit insurance application, So that UKEF can process and make a decision on my application', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({
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

  it(`should redirect to ${APPLICATION_SUBMITTED}`, () => {
    cy.assertApplicationSubmittedUrl(referenceNumber);
  });
});
