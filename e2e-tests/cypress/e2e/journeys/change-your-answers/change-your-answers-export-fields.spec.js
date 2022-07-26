import {
  buyerCountryPage,
  companyBasedPage,
  canGetPrivateInsurancePage,
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
  CAN_GET_PRIVATE_INSURANCE,
  CAN_GET_PRIVATE_INSURANCE_NO,
  UK_GOODS_OR_SERVICES,
} = FIELD_IDS;

const submissionData = {
  [BUYER_COUNTRY]: 'Algeria',
  [UK_GOODS_OR_SERVICES]: '50',
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

      const expectedUrl = `${ROUTES.BUYER_COUNTRY_CHANGE}#${BUYER_COUNTRY}`;
      cy.url().should('include', expectedUrl);
    });

    it('renders a back button with correct link', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.CHECK_YOUR_ANSWERS}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it('has originally submitted answer selected', () => {
      const expectedValue = submissionData[BUYER_COUNTRY];

      buyerCountryPage.hiddenInput().should('have.attr', 'value', expectedValue);
    });

    it('auto focuses the input', () => {
      // autocomplete component does not have a focused attribute, instead it has a class.
      // this is added with client side JS.
      // we have to wait to ensure that client side js has been executed.
      cy.wait(8000); // eslint-disable-line cypress/no-unnecessary-waiting

      buyerCountryPage.searchInput().should('have.class', 'autocomplete__input--focused');
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

      const expectedUrl = `${ROUTES.COMPANY_BASED_CHANGE}#${VALID_COMPANY_BASE}`;
      cy.url().should('include', expectedUrl);
    });

    it('renders a back button with correct link', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.CHECK_YOUR_ANSWERS}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it('has originally submitted answer selected', () => {
      companyBasedPage[VALID_COMPANY_BASE].yesInput().should('be.checked');
    });

    it('auto focuses the input', () => {
      companyBasedPage[VALID_COMPANY_BASE].yesInput().should('have.focus');
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when resubmitting`, () => {
      companyBasedPage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });
  });

  describe('change `Private insurance`', () => {
    const row = checkYourAnswersPage.summaryLists.export[CAN_GET_PRIVATE_INSURANCE_NO];

    it(`clicking 'change' redirects to ${ROUTES.CAN_GET_PRIVATE_INSURANCE_CHANGE}`, () => {
      row.changeLink().click();

      const expectedUrl = `${ROUTES.CAN_GET_PRIVATE_INSURANCE_CHANGE}#${CAN_GET_PRIVATE_INSURANCE_NO}`;
      cy.url().should('include', expectedUrl);
    });

    it('renders a back button with correct link', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.CHECK_YOUR_ANSWERS}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it('has originally submitted answer selected', () => {
      canGetPrivateInsurancePage[CAN_GET_PRIVATE_INSURANCE].noInput().should('be.checked');
    });

    it('auto focuses the input', () => {
      canGetPrivateInsurancePage[CAN_GET_PRIVATE_INSURANCE].noInput().should('have.focus');
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when resubmitting`, () => {
      canGetPrivateInsurancePage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });
  });

  describe('change `UK goods`', () => {
    const row = checkYourAnswersPage.summaryLists.export[UK_GOODS_OR_SERVICES];

    it(`clicking 'change' redirects to ${ROUTES.UK_GOODS_OR_SERVICES_CHANGE}`, () => {
      row.changeLink().click();

      const expectedUrl = `${ROUTES.UK_GOODS_OR_SERVICES_CHANGE}#${UK_GOODS_OR_SERVICES}`;
      cy.url().should('include', expectedUrl);
    });

    it('renders a back button with correct link', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.CHECK_YOUR_ANSWERS}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it('has originally submitted answer', () => {
      ukGoodsOrServicesPage.yesInput().should('be.checked');
    });

    it('auto focuses the input', () => {
      ukGoodsOrServicesPage.yesInput().should('have.focus');
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when resubmitting`, () => {
      ukGoodsOrServicesPage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });
  });
});
