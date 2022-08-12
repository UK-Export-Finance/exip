import {
  completeAndSubmitBuyerForm,
  completeAndSubmitCompanyForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeSingleForm,
} from '../../../support/forms';
import {
  buyerCountryPage,
  checkYourAnswersPage,
  policyTypePage,
  tellUsAboutYourPolicyPage,
  yourQuotePage,
} from '../../pages';
import CONSTANTS from '../../../../constants';

const { ROUTES, FIELD_IDS } = CONSTANTS;

const {
  CONTRACT_VALUE,
  POLICY_TYPE,
  QUOTE,
  SINGLE_POLICY_LENGTH,
} = FIELD_IDS;

context('Get a quote - Kenya, single policy, USD', () => {
  before(() => {
    cy.login();

    buyerCountryPage.searchInput().type('Kenya');
    const results = buyerCountryPage.results();
    results.first().click();
    buyerCountryPage.submitButton().click();

    completeAndSubmitCompanyForm();
    completeAndSubmitUkContentForm();
    // completeAndSubmitPolicyTypeSingleForm();

    policyTypePage[POLICY_TYPE].single.input().click();
    policyTypePage[SINGLE_POLICY_LENGTH].input().type('18');

    policyTypePage.submitButton().click();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
  });

  it('should get a quote with a large contract value and render in the correct format', () => {
    tellUsAboutYourPolicyPage[FIELD_IDS.CONTRACT_VALUE].input().type('100,000');
    tellUsAboutYourPolicyPage[FIELD_IDS.CURRENCY].input().select('USD');
    tellUsAboutYourPolicyPage[FIELD_IDS.PERCENTAGE_OF_COVER].input().select('80');

    tellUsAboutYourPolicyPage.submitButton().click();

    cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);

    // Check contract value formatting in the answers page
    const answersAmount = checkYourAnswersPage.summaryLists.policy[CONTRACT_VALUE].value();

    answersAmount.invoke('text').then((text) => {
      const expected = '$100,000';

      expect(text.trim()).equal(expected);
    });

    checkYourAnswersPage.submitButton().click();

    // Check contract value formatting in the quote
    yourQuotePage.panel.summaryList[QUOTE.INSURED_FOR].value().invoke('text').then((text) => {
      const expected = '$80,000.00';

      expect(text.trim()).equal(expected);
    });

    // Check estimated cost in the quote
    yourQuotePage.panel.summaryList[QUOTE.ESTIMATED_COST].value().invoke('text').then((text) => {
      const expected = '$5,330.00';

      expect(text.trim()).equal(expected);
    });
  });
});
