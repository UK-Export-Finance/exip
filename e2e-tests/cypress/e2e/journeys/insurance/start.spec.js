import { heading, submitButton } from '../../pages/shared';
import { insurance } from '../../pages';
import partials from '../../partials';
import {
  BUTTONS, LINKS, ORGANISATION, PAGES,
} from '../../../../content-strings';
import { ROUTES } from '../../../../constants';

const CONTENT_STRINGS = PAGES.INSURANCE.START;

const insuranceStartRoute = ROUTES.INSURANCE.START;

context('Insurance Eligibility - start page', () => {
  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 70,
      'best-practices': 100,
      seo: 70,
    });
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  it('should render a header with href to insurance start', () => {
    partials.header.serviceName().should('have.attr', 'href', insuranceStartRoute);
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');
    cy.checkText(partials.backLink(), LINKS.BACK);

    partials.backLink().should('have.attr', 'href', '#');
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    cy.checkText(heading(), CONTENT_STRINGS.PAGE_TITLE);
  });

  it('renders an intro', () => {
    cy.checkText(insurance.startPage.intro(), CONTENT_STRINGS.INTRO);
  });

  describe('`you will need` list', () => {
    it('renders an intro', () => {
      cy.checkText(insurance.startPage.list.intro(), CONTENT_STRINGS.LIST.INTRO);
    });

    it('renders list items', () => {
      cy.checkText(insurance.startPage.list.item1(), CONTENT_STRINGS.LIST.ITEMS[0]);

      cy.checkText(insurance.startPage.list.item2(), CONTENT_STRINGS.LIST.ITEMS[1]);

      cy.checkText(insurance.startPage.list.item3(), CONTENT_STRINGS.LIST.ITEMS[2]);

      cy.checkText(insurance.startPage.list.item4(), CONTENT_STRINGS.LIST.ITEMS[3]);
    });
  });

  it('renders a body text', () => {
    cy.checkText(insurance.startPage.body1(), CONTENT_STRINGS.BODY_1);

    cy.checkText(insurance.startPage.body2(), CONTENT_STRINGS.BODY_2);

    cy.checkText(insurance.startPage.body3(), CONTENT_STRINGS.BODY_3);

    cy.checkText(insurance.startPage.body4(), CONTENT_STRINGS.BODY_4);
  });

  it('renders a start now button', () => {
    submitButton().should('exist');

    cy.checkText(submitButton(), BUTTONS.START_NOW);
  });

  context('form submission', () => {
    it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE}`, () => {
      submitButton().click();

      const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE}`;

      cy.url().should('eq', expected);
    });
  });
});
