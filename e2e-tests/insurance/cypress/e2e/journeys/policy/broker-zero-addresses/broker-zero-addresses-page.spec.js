import { headingCaption } from '../../../../../../partials';
import { brokerZeroAddressesPage } from '../../../../../../pages/insurance/policy';
import { body } from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.BROKER_ZERO_ADDRESSES;
const {
  ROOT,
  POLICY: { BROKER_ZERO_ADDRESSES_ROOT },
} = INSURANCE_ROUTES;

const { outro } = brokerZeroAddressesPage;

const mockPostcode = 'W1A 1AA';

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Broker - zero addresses page - As an exporter ... TODO: EMS-3994', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

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
      cy.checkText(outro.postcode(), `${mockPostcode}.`);
      cy.checkText(outro.youCan(), CONTENT_STRINGS.OUTRO.YOU_CAN);
      cy.checkText(outro.or(), CONTENT_STRINGS.OUTRO.OR);
    });

    it('renders outro `search again` link', () => {
      cy.checkText(outro.searchAgainLink(), CONTENT_STRINGS.OUTRO.SEARCH_AGAIN.TEXT, '#');
    });

    it('renders outro `enter manually` link', () => {
      cy.checkText(outro.enterManuallyLink(), CONTENT_STRINGS.OUTRO.ENTER_MANUALLY.TEXT, '#');
    });
  });
});
