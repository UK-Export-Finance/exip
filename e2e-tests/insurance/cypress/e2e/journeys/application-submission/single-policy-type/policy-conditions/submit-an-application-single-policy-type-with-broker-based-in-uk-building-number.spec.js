import { VALID_POSTCODES } from '../../../../../../../constants';

context(
  'Insurance - submit an application - Single policy type with a broker - based in UK - Building as a number - As an Exporter, I want to submit my completed credit insurance application, So that UKEF can process and make a decision on my application',
  () => {
    let referenceNumber;

    before(() => {
      cy.completeSignInAndSubmitAnApplication({
        usingBroker: true,
        brokerIsBasedInUk: true,
        // brokerBuildingNumberOrName: 'Treasury',
        // brokerBuildingNumberOrName: 'Westminster Abbey',

        // brokerBuildingNumberOrName: 'Westminster',
        // brokerPostcode: 'SW1H 9NH',

        // brokerBuildingNumberOrName: 'Silvers',
        // brokerPostcode: 'IG95NX',

        // brokerBuildingNumberOrName: '15',
        // brokerPostcode: 'IG95NX',

        brokerPostcode: VALID_POSTCODES.WITH_SPACE,
        brokerBuildingNumberOrName: '1',
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
