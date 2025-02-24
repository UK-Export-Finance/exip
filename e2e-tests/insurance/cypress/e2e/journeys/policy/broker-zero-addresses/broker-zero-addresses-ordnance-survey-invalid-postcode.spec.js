import { brokerZeroAddressesPage } from '../../../../../../pages/insurance/policy';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.BROKER_ZERO_ADDRESSES;

const {
  ROOT,
  POLICY: { BROKER_ZERO_ADDRESSES_ROOT },
} = INSURANCE_ROUTES;

const { outro } = brokerZeroAddressesPage;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Broker - zero addresses page when searching for a postcode ordnance survey determines to be invalid', () => {
  let referenceNumber;
  let url;

  const buildingNumberOrName = '8';
  const postcode = 'A9A 9AA';

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.completeAndSubmitPolicyForms({
        stopSubmittingAfter: 'brokerDetails',
        usingBroker: true,
        isBasedInUk: true,
        buildingNumberOrName,
        postcode,
      });

      url = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_ZERO_ADDRESSES_ROOT}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should redirect to ${BROKER_ZERO_ADDRESSES_ROOT} and display the correct text`, () => {
    cy.assertUrl(url);

    cy.checkText(outro.couldNotFind(), CONTENT_STRINGS.OUTRO.COULD_NOT_FIND);
    cy.checkText(outro.postcode(), postcode);
    cy.checkText(outro.and(), CONTENT_STRINGS.OUTRO.AND);
    cy.checkText(outro.buildingNumberOrName(), `${buildingNumberOrName}.`);
  });
});
