import { APPLICATION, BUILDING_NAMES, VALID_POSTCODES } from '../../../../../../../constants';

context(
  'Insurance - submit an application - Multiple policy type with a broker - based in UK - Building as a name - As an Exporter, I want to submit my completed credit insurance application, So that UKEF can process and make a decision on my application',
  () => {
    let referenceNumber;

    before(() => {
      cy.completeSignInAndSubmitAnApplication({
        policyType: APPLICATION.POLICY_TYPE.MULTIPLE,
        usingBroker: true,
        brokerIsBasedInUk: true,
        brokerPostcode: VALID_POSTCODES.WITH_SPACE,
        brokerBuildingNumberOrName: BUILDING_NAMES.TREASURY,
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
