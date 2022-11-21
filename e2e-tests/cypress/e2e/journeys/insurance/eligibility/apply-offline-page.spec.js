import { buyerCountryPage, heading, submitButton } from '../../../pages/shared';
import { insurance } from '../../../pages';
import partials from '../../../partials';
import { LINKS, ORGANISATION, PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';
import { completeStartForm, completeCheckIfEligibleForm } from '../../../../support/insurance/eligibility/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.APPLY_OFFLINE;
const { ACTIONS } = CONTENT_STRINGS;

const COUNTRY_NAME_APPLY_OFFLINE_ONLY = 'Angola';

context('Insurance Eligibility - apply offline exit page', () => {
  beforeEach(() => {
    cy.visit(ROUTES.INSURANCE.START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    completeStartForm();
    completeCheckIfEligibleForm();

    buyerCountryPage.searchInput().type(COUNTRY_NAME_APPLY_OFFLINE_ONLY);

    const results = buyerCountryPage.results();
    results.first().click();

    submitButton().click();

    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.APPLY_OFFLINE);
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

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');
    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY}`;

    partials.backLink().should('have.attr', 'href', expected);
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.PAGE_TITLE);
    });
  });

  it('renders `download form` copy with link', () => {
    insurance.eligibility.applyOfflinePage.downloadFormCopy().invoke('text').then((text) => {
      const expected = `${ACTIONS.DOWNLOAD_FORM.LINK.TEXT} ${ACTIONS.DOWNLOAD_FORM.TEXT}`;

      expect(text.trim()).equal(expected);
    });

    insurance.eligibility.applyOfflinePage.downloadFormLink().invoke('text').then((text) => {
      expect(text.trim()).equal(ACTIONS.DOWNLOAD_FORM.LINK.TEXT);
    });

    insurance.eligibility.applyOfflinePage.downloadFormLink().should('have.attr', 'href', ACTIONS.DOWNLOAD_FORM.LINK.HREF);
  });

  it('renders `contact` copy with link', () => {
    insurance.eligibility.applyOfflinePage.contactCopy().invoke('text').then((text) => {
      const expected = `${ACTIONS.CONTACT.TEXT} ${ACTIONS.CONTACT.LINK.TEXT}`;

      expect(text.trim()).equal(expected);
    });

    insurance.eligibility.applyOfflinePage.contactLink().should('have.attr', 'href', ACTIONS.CONTACT.LINK.HREF);
  });
});
