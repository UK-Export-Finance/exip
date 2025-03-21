import { PAGES } from '../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { checkIfEligiblePage } from '../../../../../pages/insurance/eligibility';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE;

const {
  ELIGIBILITY: { CHECK_IF_ELIGIBLE, EXPORTER_LOCATION },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance Eligibility - check if eligible page', () => {
  const url = `${baseUrl}${CHECK_IF_ELIGIBLE}`;

  before(() => {
    cy.navigateToCheckIfEligibleUrl();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: CHECK_IF_ELIGIBLE,
      backLink: `${CHECK_IF_ELIGIBLE}#`,
      assertAuthenticatedHeader: false,
      assertSaveAndBackButtonDoesNotExist: true,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render intro text', () => {
      cy.checkIntroText(CONTENT_STRINGS.INTRO);
    });

    it('should render `we will ask questions` list items', () => {
      cy.checkText(checkIfEligiblePage.willAskQuestions.listItem(1), CONTENT_STRINGS.WILL_ASK_QUESTIONS[0]);
      cy.checkText(checkIfEligiblePage.willAskQuestions.listItem(2), CONTENT_STRINGS.WILL_ASK_QUESTIONS[1]);
      cy.checkText(checkIfEligiblePage.willAskQuestions.listItem(3), CONTENT_STRINGS.WILL_ASK_QUESTIONS[2]);
      cy.checkText(checkIfEligiblePage.willAskQuestions.listItem(4), CONTENT_STRINGS.WILL_ASK_QUESTIONS[3]);
      cy.checkText(checkIfEligiblePage.willAskQuestions.listItem(5), CONTENT_STRINGS.WILL_ASK_QUESTIONS[4]);
    });

    it('should render `will need companies house number` text', () => {
      cy.checkText(checkIfEligiblePage.willNeedCompaniesHouseNumber(), CONTENT_STRINGS.WILL_NEED_COMPANIES_HOUSE_NUMBER);
    });

    it('should render `if eligible` text', () => {
      cy.checkText(checkIfEligiblePage.ifEligible(), CONTENT_STRINGS.IF_ELIGIBLE);
    });

    it('should render `get immediate answer` text', () => {
      cy.checkText(checkIfEligiblePage.getImmediateAnswer(), CONTENT_STRINGS.GET_IMMEDIATE_ANSWER);
    });

    context('form submission', () => {
      it(`should redirect to ${EXPORTER_LOCATION}`, () => {
        cy.clickSubmitButton();

        const expectedUrl = `${baseUrl}${EXPORTER_LOCATION}`;

        cy.assertUrl(expectedUrl);
      });
    });
  });
});
