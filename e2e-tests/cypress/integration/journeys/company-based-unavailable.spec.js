import companyBasedPage from '../pages/companyBased';
import companyBasedUnavailablePage from '../pages/companyBasedUnavailable';
import partials from '../partials';
import {
  ORGANISATION,
  LINKS,
  EXIT_PAGES,
} from '../../../content-strings';
import CONSTANTS from '../../../constants';

const CONTENT_STRINGS = EXIT_PAGES.COMPANY_BASED;
const { ROUTES, FIELD_IDS } = CONSTANTS;

context('Answering `no` to Company based inside the UK, Channel Islands and Isle of Man', () => {
  beforeEach(() => {
    cy.visit(ROUTES.COMPANY_BASED, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.url().should('include', ROUTES.COMPANY_BASED);

    companyBasedPage[FIELD_IDS.VALID_COMPANY_BASE].no().click();
    companyBasedPage.submitButton().click();
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 80,
      'best-practices': 100,
      seo: 75,
    });
  });

  it(`should redirect to ${ROUTES.COMPANY_BASED_UNAVAILABLE}`, () => {
    cy.url().should('include', ROUTES.COMPANY_BASED_UNAVAILABLE);
  });

  it('renders a back button with correct link', () => {
    partials.backLink().should('exist');
    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    partials.backLink().click();

    cy.url().should('include', ROUTES.COMPANY_BASED);
  });

  it('renders a page title, heading and description', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    companyBasedUnavailablePage.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
    });
  });

  it('renders `actions` content', () => {
    companyBasedUnavailablePage.actions.intro().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.ACTIONS.INTRO);
    });

    const listItems = companyBasedUnavailablePage.actions.listItems();

    const expectedLength = 2;
    listItems.should('have.length', expectedLength);

    companyBasedUnavailablePage.actions.eligibility().invoke('text').then((text) => {
      const expected = `${CONTENT_STRINGS.ACTIONS.ELIGIBILITY.TEXT} ${CONTENT_STRINGS.ACTIONS.ELIGIBILITY.LINK.TEXT}`;
      expect(text.trim()).equal(expected);
    });

    companyBasedUnavailablePage.actions.eligibilityLink().should('have.attr', 'href', CONTENT_STRINGS.ACTIONS.ELIGIBILITY.LINK.HREF);

    companyBasedUnavailablePage.actions.approvedBroker().invoke('text').then((text) => {
      const expected = `${CONTENT_STRINGS.ACTIONS.CONTACT_APPROVED_BROKER.LINK.TEXT} ${CONTENT_STRINGS.ACTIONS.CONTACT_APPROVED_BROKER.TEXT}`;
      expect(text.trim()).equal(expected);
    });

    companyBasedUnavailablePage.actions.approvedBrokerLink().should('have.attr', 'href', CONTENT_STRINGS.ACTIONS.CONTACT_APPROVED_BROKER.LINK.HREF);
  });
});
