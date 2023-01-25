import { buyerCountryPage, heading, submitButton } from '../../pages/shared';
import { insurance } from '../../pages';
import partials from '../../partials';
import { LINKS, ORGANISATION, PAGES } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';
import { completeStartForm, completeCheckIfEligibleForm } from '../../../support/insurance/eligibility/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.APPLY_OFFLINE;
const { ACTIONS } = CONTENT_STRINGS;

const COUNTRY_NAME_APPLY_OFFLINE_ONLY = 'Angola';

const insuranceStartRoute = ROUTES.INSURANCE.START;

context('Insurance - apply offline exit page', () => {
  beforeEach(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    completeStartForm();
    completeCheckIfEligibleForm();

    buyerCountryPage.searchInput().type(COUNTRY_NAME_APPLY_OFFLINE_ONLY);

    const results = buyerCountryPage.results();
    results.first().click();

    submitButton().click();

    cy.url().should('include', ROUTES.INSURANCE.APPLY_OFFLINE);
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 75,
      'best-practices': 100,
      seo: 60,
    });
  });

  it('renders an analytics cookies consent banner that can be accepted', () => {
    cy.checkAnalyticsCookiesConsentAndAccept();
  });

  it('renders an analytics cookies consent banner that can be rejected', () => {
    cy.rejectAnalyticsCookies();
  });

  it('should render a header with href to insurance start', () => {
    partials.header.serviceName().should('have.attr', 'href', insuranceStartRoute);
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');
    cy.checkText(partials.backLink(), LINKS.BACK);

    const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY}`;

    partials.backLink().should('have.attr', 'href', expected);
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    cy.checkText(heading(), CONTENT_STRINGS.PAGE_TITLE);
  });

  it('renders `download form` copy with link', () => {
    const expected = `${ACTIONS.DOWNLOAD_FORM.LINK.TEXT} ${ACTIONS.DOWNLOAD_FORM.TEXT}`;
    cy.checkText(insurance.applyOfflinePage.downloadFormCopy(), expected);

    cy.checkText(insurance.applyOfflinePage.downloadFormLink(), ACTIONS.DOWNLOAD_FORM.LINK.TEXT);

    insurance.applyOfflinePage.downloadFormLink().should('have.attr', 'href', ACTIONS.DOWNLOAD_FORM.LINK.HREF_NBI);
  });

  it('renders `contact` copy with link', () => {
    const expected = `${ACTIONS.CONTACT.TEXT} ${ACTIONS.CONTACT.LINK.TEXT}`;
    cy.checkText(insurance.applyOfflinePage.contactCopy(), expected);

    insurance.applyOfflinePage.contactLink().should('have.attr', 'href', ACTIONS.CONTACT.LINK.HREF);
  });
});
