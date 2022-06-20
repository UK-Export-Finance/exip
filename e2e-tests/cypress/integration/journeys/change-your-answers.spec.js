import {
  companyBasedPage,
  buyerBasedPage,
  triedToObtainCoverPage,
  ukContentPercentagePage,
  tellUsAboutYourDealPage,
  checkYourAnswersPage,
} from '../pages';
import CONSTANTS from '../../../constants';

const {
  FIELD_IDS,
  FIELD_VALUES,
  ROUTES,
} = CONSTANTS;

context('Change your answers after checking answers', () => {
  const {
    VALID_COMPANY_BASE,
    BUYER_COUNTRY,
    TRIED_PRIVATE_COVER,
    UK_CONTENT_PERCENTAGE,
    CURRENCY,
    AMOUNT,
    PRE_CREDIT_PERIOD,
    CREDIT_PERIOD,
    POLICY_TYPE,
    POLICY_LENGTH,
    SINGLE_POLICY_LENGTH,
    MULTI_POLICY_LENGTH,
  } = FIELD_IDS;

  const submissionData = {
    [BUYER_COUNTRY]: 'France',
    [UK_CONTENT_PERCENTAGE]: '50',
    [CURRENCY]: 'GBP',
    [AMOUNT]: '100',
    [PRE_CREDIT_PERIOD]: '1',
    [CREDIT_PERIOD]: '2',
    [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
    [POLICY_LENGTH]: '13',
  };

  before(() => {
    cy.login();
    cy.submitAnswersHappyPath();
    cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  context('Company fields', () => {
    describe('change `Company`', () => {
      const row = checkYourAnswersPage.summaryLists.company[VALID_COMPANY_BASE];

      it(`clicking 'change' redirects to ${ROUTES.COMPANY_BASED_CHANGE}`, () => {
        row.changeLink().click();
        cy.url().should('include', ROUTES.COMPANY_BASED_CHANGE);
      });

      it('has originally submitted answer selected', () => {
        companyBasedPage[VALID_COMPANY_BASE].yesInput().should('be.checked');
      });

      it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when resubmitting`, () => {
        companyBasedPage.submitButton().click();

        cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
      });
    });
  });

  context('Export fields', () => {
    describe('change `Buyer based`', () => {
      let row = checkYourAnswersPage.summaryLists.export[BUYER_COUNTRY];

      it(`clicking 'change' redirects to ${ROUTES.BUYER_BASED_CHANGE}`, () => {
        row.changeLink().click();
        cy.url().should('include', ROUTES.BUYER_BASED_CHANGE);
      });

      it('has originally submitted answer selected', () => {
        const expectedValue = submissionData[BUYER_COUNTRY];

        buyerBasedPage.hiddenInput().should('have.attr', 'value', expectedValue);
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
        cy.url().should('include', ROUTES.TRIED_TO_OBTAIN_COVER_CHANGE);
      });

      it('has originally submitted answer selected', () => {
        triedToObtainCoverPage[TRIED_PRIVATE_COVER].yesInput().should('be.checked');
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
        cy.url().should('include', ROUTES.UK_CONTENT_PERCENTAGE_CHANGE);
      });

      it('has originally submitted answer', () => {
        ukContentPercentagePage.yesInput().should('be.checked');
      });

      it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when resubmitting`, () => {
        ukContentPercentagePage.submitButton().click();

        cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
      });
    });
  });

  context('Deal fields', () => {
    describe('change `Amount`', () => {
      let row = checkYourAnswersPage.summaryLists.deal[AMOUNT];

      it(`clicking 'change' redirects to ${ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE}`, () => {
        row.changeLink().click();
        cy.url().should('include', ROUTES.TELL_US_ABOUT_YOUR_DEAL);
      });

      it('has originally submitted answer', () => {
        const expectedValue = submissionData[AMOUNT];
        tellUsAboutYourDealPage[AMOUNT].input().should('have.attr', 'value', expectedValue);
      });

      it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
        tellUsAboutYourDealPage[AMOUNT].input().clear().type('200');
        tellUsAboutYourDealPage.submitButton().click();

        cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
      });

      it('renders the new answer in `Check your answers` page', () => {
        row = checkYourAnswersPage.summaryLists.deal[AMOUNT];

        row.value().invoke('text').then((text) => {
          const expected = '£200.00';

          expect(text.trim()).equal(expected);
        });
      });
    });

    describe('change `Currency`', () => {
      let row = checkYourAnswersPage.summaryLists.deal[CURRENCY];

      it(`clicking 'change' redirects to ${ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE}`, () => {
        row.changeLink().click();
        cy.url().should('include', ROUTES.TELL_US_ABOUT_YOUR_DEAL);
      });

      it('has originally submitted answer', () => {
        const expectedValue = submissionData[CURRENCY];
        tellUsAboutYourDealPage[CURRENCY].inputOptionSelected().contains(expectedValue);
      });

      it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
        tellUsAboutYourDealPage[CURRENCY].input().select('EUR');
        tellUsAboutYourDealPage.submitButton().click();

        cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
      });

      it('renders the new answer in `Check your answers` page', () => {
        row = checkYourAnswersPage.summaryLists.deal[CURRENCY];

        row.value().invoke('text').then((text) => {
          const expected = 'Euros (EUR)';
          expect(text.trim()).equal(expected);
        });
      });
    });

    describe('change `Pre-credit period`', () => {
      let row = checkYourAnswersPage.summaryLists.deal[PRE_CREDIT_PERIOD];

      it(`clicking 'change' redirects to ${ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE}`, () => {
        row.changeLink().click();
        cy.url().should('include', ROUTES.TELL_US_ABOUT_YOUR_DEAL);
      });

      it('has originally submitted answer', () => {
        const expectedValue = submissionData[PRE_CREDIT_PERIOD];
        tellUsAboutYourDealPage[PRE_CREDIT_PERIOD].input().should('have.attr', 'value', expectedValue);
      });

      it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
        tellUsAboutYourDealPage[PRE_CREDIT_PERIOD].input().clear().type('2');
        tellUsAboutYourDealPage.submitButton().click();

        cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
      });

      it('renders the new answer in `Check your answers` page', () => {
        row = checkYourAnswersPage.summaryLists.deal[PRE_CREDIT_PERIOD];

        row.value().invoke('text').then((text) => {
          const expected = '2 days';

          expect(text.trim()).equal(expected);
        });
      });
    });

    describe('change `Credit period`', () => {
      let row = checkYourAnswersPage.summaryLists.deal[CREDIT_PERIOD];

      it(`clicking 'change' redirects to ${ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE}`, () => {
        row.changeLink().click();
        cy.url().should('include', ROUTES.TELL_US_ABOUT_YOUR_DEAL);
      });

      it('has originally submitted answer', () => {
        const expectedValue = submissionData[CREDIT_PERIOD];
        tellUsAboutYourDealPage[CREDIT_PERIOD].input().should('have.attr', 'value', expectedValue);
      });

      it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
        tellUsAboutYourDealPage[CREDIT_PERIOD].input().clear().type('3');
        tellUsAboutYourDealPage.submitButton().click();

        cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
      });

      it('renders the new answer in `Check your answers` page', () => {
        row = checkYourAnswersPage.summaryLists.deal[CREDIT_PERIOD];

        row.value().invoke('text').then((text) => {
          const expected = '3 days';

          expect(text.trim()).equal(expected);
        });
      });
    });

    describe('change `Policy type` and `Policy length`', () => {
      let row = checkYourAnswersPage.summaryLists.deal[POLICY_LENGTH];

      it(`clicking 'change' redirects to ${ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE}`, () => {
        row.changeLink().click();
        cy.url().should('include', ROUTES.TELL_US_ABOUT_YOUR_DEAL);
      });

      it('has originally submitted `policy type` (single)', () => {
        tellUsAboutYourDealPage[POLICY_TYPE].single.input().should('be.checked');
      });

      it(`has originally submitted 'policy length' (${submissionData[POLICY_LENGTH]})`, () => {
        tellUsAboutYourDealPage[SINGLE_POLICY_LENGTH].input().should('have.attr', 'value', submissionData[POLICY_LENGTH]);
      });

      it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting new answers`, () => {
        tellUsAboutYourDealPage[POLICY_TYPE].multi.input().click();
        tellUsAboutYourDealPage[MULTI_POLICY_LENGTH].input().type('10');
        tellUsAboutYourDealPage.submitButton().click();

        cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
      });

      it('renders the new answers in `Check your answers` page (multi policy, 10 months)', () => {
        row = checkYourAnswersPage.summaryLists.deal[POLICY_TYPE];

        row.value().invoke('text').then((text) => {
          const expected = FIELD_VALUES.POLICY_TYPE.MULTI;

          expect(text.trim()).equal(expected);
        });

        row = checkYourAnswersPage.summaryLists.deal[POLICY_LENGTH];

        row.value().invoke('text').then((text) => {
          const expected = '10 months';

          expect(text.trim()).equal(expected);
        });
      });

      describe('change `Policy type` and `Policy length` for a second time', () => {
        before(() => {
          row.changeLink().click();
          cy.url().should('include', ROUTES.TELL_US_ABOUT_YOUR_DEAL);
        });

        it('has previously submitted `policy type` (multi)', () => {
          tellUsAboutYourDealPage[POLICY_TYPE].multi.input().should('be.checked');
        });

        it('has previously submitted `policy length` (10 months)', () => {
          tellUsAboutYourDealPage[SINGLE_POLICY_LENGTH].input().should('have.attr', 'value', submissionData[POLICY_LENGTH]);
        });

        it(`redirects to ${ROUTES.CHECK_YOUR_ANSWERS} when submitting new answers`, () => {
          tellUsAboutYourDealPage[POLICY_TYPE].single.input().click();
          tellUsAboutYourDealPage[SINGLE_POLICY_LENGTH].input().clear().type('15');
          tellUsAboutYourDealPage.submitButton().click();

          cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
        });

        it('renders the new answers in `Check your answers` page (single policy, 15 months)', () => {
          row = checkYourAnswersPage.summaryLists.deal[POLICY_TYPE];

          row.value().invoke('text').then((text) => {
            const expected = FIELD_VALUES.POLICY_TYPE.SINGLE;

            expect(text.trim()).equal(expected);
          });

          row = checkYourAnswersPage.summaryLists.deal[POLICY_LENGTH];

          row.value().invoke('text').then((text) => {
            const expected = '15 months';

            expect(text.trim()).equal(expected);
          });
        });
      });
    });
  });
});
