import companyBasedPage from '../pages/companyBased';
import companyBasedUnavailablePage from '../pages/companyBasedUnavailable';
import {
  ORGANISATION,
  EXIT_PAGES,
} from '../../../content-strings';
import CONSTANTS from '../../../constants';

const CONTENT_STRINGS = EXIT_PAGES.COMPANY_BASED;

context('Answering `no` to Company based inside the UK, Channel Islands and Isle of Man', () => {
  before(() => {
    companyBasedPage.visit();
    companyBasedPage[CONSTANTS.FIELDS.VALID_COMPANY_BASE].no().click();
    companyBasedPage.submitButton().click();
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 90,
      'best-practices': 100,
      seo: 90,
    });
    cy.pa11y();
  });

  it(`should redirect to ${CONSTANTS.ROUTES.COMPANY_BASED_UNAVAILABLE}`, () => {
    cy.url().should('include', CONSTANTS.ROUTES.COMPANY_BASED_UNAVAILABLE);
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

    const expectedLength = CONTENT_STRINGS.ACTIONS.LIST.length;
    companyBasedUnavailablePage.actions.listItems().should('have.length', expectedLength);

    companyBasedUnavailablePage.actions.listItems().each(($element, index) => {
      expect($element.text().trim()).equal(CONTENT_STRINGS.ACTIONS.LIST[index].text);
    });
  });
});
