import { headingCaption, body } from '../../../../../../pages/shared';
import { brokerZeroAddressesPage } from '../../../../../../pages/insurance/policy';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.BROKER_ZERO_ADDRESSES;

const {
  ROOT,
  POLICY: { BROKER_DETAILS_ROOT, BROKER_ZERO_ADDRESSES_ROOT },
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

      cy.navigateToUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: `${ROOT}/${referenceNumber}${BROKER_ZERO_ADDRESSES_ROOT}`,
      backLink: `${ROOT}/${referenceNumber}${BROKER_ZERO_ADDRESSES_ROOT}#`,
      hasAForm: false,
      assertSaveAndBackButtonDoesNotExist: true,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it('renders body text', () => {
      cy.checkText(body(), CONTENT_STRINGS.BODY);
    });

    it('renders outro text', () => {
      cy.checkText(outro.couldNotFind(), CONTENT_STRINGS.OUTRO.COULD_NOT_FIND);
      cy.checkText(outro.postcode(), `${postcode}`);
      cy.checkText(outro.and(), CONTENT_STRINGS.OUTRO.AND);
      cy.checkText(outro.buildingNumberOrName(), `${buildingNumberOrName}.`);
      cy.checkText(outro.youCan(), CONTENT_STRINGS.OUTRO.YOU_CAN);
      cy.checkText(outro.or(), CONTENT_STRINGS.OUTRO.OR);
    });

    it('renders outro `search again` link', () => {
      const expectedHref = `${ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`;

      cy.checkLink(outro.searchAgainLink(), expectedHref, CONTENT_STRINGS.OUTRO.SEARCH_AGAIN);
    });

    it('renders outro `enter manually` link', () => {
      cy.assertEnterAddressManuallyLink({
        referenceNumber,
        expectedText: CONTENT_STRINGS.OUTRO.ENTER_MANUALLY,
      });
    });
  });
});
