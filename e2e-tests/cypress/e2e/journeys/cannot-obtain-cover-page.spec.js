import { cannotObtainCoverPage, ukGoodsOrServicesPage } from '../pages';
import partials from '../partials';
import {
  ORGANISATION,
  LINKS,
  PAGES,
} from '../../../content-strings';
import CONSTANTS from '../../../constants';

const CONTENT_STRINGS = PAGES.CANNOT_OBTAIN_COVER_PAGE;
const { FIELD_IDS, ROUTES } = CONSTANTS;

context('Cannot obtain UKEF cover exit page', () => {
  beforeEach(() => {
    cy.visit(ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });
    cy.url().should('include', ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES);

    ukGoodsOrServicesPage.no().click();
    ukGoodsOrServicesPage.submitButton().click();

    cy.url().should('include', ROUTES.CANNOT_OBTAIN_COVER);
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 80,
      'best-practices': 100,
      seo: 60,
    });
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');
    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    partials.backLink().click();

    cy.url().should('include', ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES);
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    cannotObtainCoverPage.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
    });
  });

  it('renders a reason', () => {
    cannotObtainCoverPage.reason().should('exist');
  });

  it('renders `actions` content', () => {
    cannotObtainCoverPage.actions.intro().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.ACTIONS.INTRO);
    });

    const listItems = cannotObtainCoverPage.actions.listItems();

    listItems.should('have.length', 2);

    cannotObtainCoverPage.actions.eligibility().invoke('text').then((text) => {
      const expected = `${CONTENT_STRINGS.ACTIONS.ELIGIBILITY.TEXT} ${CONTENT_STRINGS.ACTIONS.ELIGIBILITY.LINK.TEXT}`;
      expect(text.trim()).equal(expected);
    });

    cannotObtainCoverPage.actions.eligibilityLink().should('have.attr', 'href', CONTENT_STRINGS.ACTIONS.ELIGIBILITY.LINK.HREF);

    cannotObtainCoverPage.actions.approvedBroker().invoke('text').then((text) => {
      const expected = `${CONTENT_STRINGS.ACTIONS.CONTACT_APPROVED_BROKER.LINK.TEXT} ${CONTENT_STRINGS.ACTIONS.CONTACT_APPROVED_BROKER.TEXT}`;
      expect(text.trim()).equal(expected);
    });

    cannotObtainCoverPage.actions.approvedBrokerLink().should('have.attr', 'href', CONTENT_STRINGS.ACTIONS.CONTACT_APPROVED_BROKER.LINK.HREF);
  });

  describe('when clicking `eligibility` link', () => {
    it('redirects to guidance page - eligibility section', () => {
      cannotObtainCoverPage.actions.eligibilityLink().should('have.attr', 'href', CONTENT_STRINGS.ACTIONS.ELIGIBILITY.LINK.HREF);
    });
  });
});
