import {
  buyerCountryPage,
  companyBasedPage,
  ukGoodsOrServicesPage,
  checkYourAnswersPage,
} from '../../pages';
import partials from '../../partials';
import CONSTANTS from '../../../../constants';

const {
  FIELD_IDS,
  ROUTES,
} = CONSTANTS;

const {
  BUYER_COUNTRY,
  VALID_COMPANY_BASE,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
} = FIELD_IDS;

const submissionData = {
  [BUYER_COUNTRY]: 'Algeria',
  [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: true,
};

context('Change your answers after checking answers - Export fields', () => {
  before(() => {
    cy.login();
    cy.submitAnswersHappyPathSinglePolicy();
    cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('change `Buyer based`', () => {
    let row = checkYourAnswersPage.summaryLists.export[BUYER_COUNTRY];

    it(`clicking 'change' redirects to ${ROUTES.BUYER_COUNTRY_CHANGE}`, () => {
      row.changeLink().click();

      const expectedUrl = ROUTES.BUYER_COUNTRY_CHANGE;
      cy.url().should('include', expectedUrl);
    });

    it('renders a back link with correct url', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.CHECK_YOUR_ANSWERS}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it('has originally submitted answer selected', () => {
      const expectedValue = submissionData[BUYER_COUNTRY];

      buyerCountryPage.hiddenInput().should('have.attr', 'value', expectedValue);
    });

    it('has a hash tag and heading/label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.BUYER_COUNTRY_CHANGE}#heading`;
      cy.url().should('include', expected);
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when resubmitting a new answer`, () => {
      buyerCountryPage.searchInput().type('Brazil');
      const results = buyerCountryPage.results();
      results.first().click();
      buyerCountryPage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answer in `Check your answers` page', () => {
      row = checkYourAnswersPage.summaryLists.export[BUYER_COUNTRY];

      row.value().invoke('text').then((text) => {
        const expected = 'Brazil';

        expect(text.trim()).equal(expected);
      });
    });
  });

  describe('change `Company`', () => {
    const row = checkYourAnswersPage.summaryLists.export[VALID_COMPANY_BASE];

    it(`clicking 'change' redirects to ${ROUTES.COMPANY_BASED_CHANGE}`, () => {
      row.changeLink().click();

      const expectedUrl = ROUTES.COMPANY_BASED_CHANGE;
      cy.url().should('include', expectedUrl);
    });

    it('has a hash tag and heading/label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.COMPANY_BASED_CHANGE}#heading`;
      cy.url().should('include', expected);
    });

    it('renders a back link with correct url', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.CHECK_YOUR_ANSWERS}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it('has originally submitted answer selected', () => {
      companyBasedPage[VALID_COMPANY_BASE].yesInput().should('be.checked');
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when resubmitting`, () => {
      companyBasedPage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });
  });

  describe('change `UK goods`', () => {
    const row = checkYourAnswersPage.summaryLists.export[HAS_MINIMUM_UK_GOODS_OR_SERVICES];

    it(`clicking 'change' redirects to ${ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES_CHANGE}`, () => {
      row.changeLink().click();

      const expectedUrl = ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES_CHANGE;
      cy.url().should('include', expectedUrl);
    });

    it('has a hash tag and heading/label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES_CHANGE}#heading`;
      cy.url().should('include', expected);
    });

    it('renders a back link with correct url', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.CHECK_YOUR_ANSWERS}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it('has originally submitted answer', () => {
      ukGoodsOrServicesPage.yesInput().should('be.checked');
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when resubmitting`, () => {
      ukGoodsOrServicesPage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });
  });
});
