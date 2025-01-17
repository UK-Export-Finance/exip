import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT,
  POLICY: { BROKER_CONFIRM_ADDRESS_ROOT, BROKER_DETAILS_ROOT },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Broker confirm address - Visit directly without completing any address forms', () => {
  let referenceNumber;
  let url;
  let brokerDetailsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_CONFIRM_ADDRESS_ROOT}`;
      brokerDetailsUrl = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should redirect to ${BROKER_DETAILS_ROOT}`, () => {
    cy.assertUrl(brokerDetailsUrl);
  });
});
