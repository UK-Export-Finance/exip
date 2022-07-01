import {
  buyerBasedPage,
  triedToObtainCoverPage,
  ukContentPercentagePage,
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
  TRIED_PRIVATE_COVER,
  UK_CONTENT_PERCENTAGE,
} = FIELD_IDS;

const submissionData = {
  [BUYER_COUNTRY]: 'France',
  [UK_CONTENT_PERCENTAGE]: '50',
};

context('Change your answers after checking answers - Export fields', () => {
  before(() => {
    cy.login();
    cy.submitAnswersHappyPath();
    cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('change `Buyer based`', () => {
    let row = checkYourAnswersPage.summaryLists.export[BUYER_COUNTRY];

    it(`clicking 'change' redirects to ${ROUTES.BUYER_BASED_CHANGE}`, () => {
      row.changeLink().click();

      const expectedUrl = `${ROUTES.BUYER_BASED_CHANGE}#${BUYER_COUNTRY}`;
      cy.url().should('include', expectedUrl);
    });

    it('renders a back button with correct link', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.CHECK_YOUR_ANSWERS}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it('has originally submitted answer selected', () => {
      const expectedValue = submissionData[BUYER_COUNTRY];

      buyerBasedPage.hiddenInput().should('have.attr', 'value', expectedValue);
    });

    it('auto focuses the input', () => {
      // autocomplete component does not have a focused attribute, instead it has a class.
      // this is added with client side JS.
      // we have to wait to ensure that client side js has been executed.
      cy.wait(1500); // eslint-disable-line cypress/no-unnecessary-waiting

      buyerBasedPage.searchInput().should('have.class', 'autocomplete__input--focused');
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when resubmitting a new answer`, () => {
      buyerBasedPage.searchInput().type('Belg');
      const results = buyerBasedPage.results();
      results.first().click();
      buyerBasedPage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answer in `Check your answers` page', () => {
      row = checkYourAnswersPage.summaryLists.export[BUYER_COUNTRY];

      row.value().invoke('text').then((text) => {
        const expected = 'Belgium';

        expect(text.trim()).equal(expected);
      });
    });
  });

  describe('change `Private insurance`', () => {
    const row = checkYourAnswersPage.summaryLists.export[TRIED_PRIVATE_COVER];

    it(`clicking 'change' redirects to ${ROUTES.TRIED_TO_OBTAIN_COVER_CHANGE}`, () => {
      row.changeLink().click();

      const expectedUrl = `${ROUTES.TRIED_TO_OBTAIN_COVER_CHANGE}#${TRIED_PRIVATE_COVER}`;
      cy.url().should('include', expectedUrl);
    });

    it('renders a back button with correct link', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.CHECK_YOUR_ANSWERS}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it('has originally submitted answer selected', () => {
      triedToObtainCoverPage[TRIED_PRIVATE_COVER].yesInput().should('be.checked');
    });

    it('auto focuses the input', () => {
      triedToObtainCoverPage[TRIED_PRIVATE_COVER].yesInput().should('have.focus');
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when resubmitting`, () => {
      triedToObtainCoverPage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });
  });

  describe('change `UK goods`', () => {
    const row = checkYourAnswersPage.summaryLists.export[UK_CONTENT_PERCENTAGE];

    it(`clicking 'change' redirects to ${ROUTES.UK_CONTENT_PERCENTAGE_CHANGE}`, () => {
      row.changeLink().click();

      const expectedUrl = `${ROUTES.UK_CONTENT_PERCENTAGE_CHANGE}#${UK_CONTENT_PERCENTAGE}`;
      cy.url().should('include', expectedUrl);
    });

    it('renders a back button with correct link', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.CHECK_YOUR_ANSWERS}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it('has originally submitted answer', () => {
      ukContentPercentagePage.yesInput().should('be.checked');
    });

    it('auto focuses the input', () => {
      ukContentPercentagePage.yesInput().should('have.focus');
    });

    it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when resubmitting`, () => {
      ukContentPercentagePage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });
  });
});
