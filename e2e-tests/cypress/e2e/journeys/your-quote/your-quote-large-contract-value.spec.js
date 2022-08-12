import {
  completeAndSubmitBuyerForm,
  completeAndSubmitCompanyForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeSingleForm,
} from '../../../support/forms';
import {
  yourQuotePage,
  tellUsAboutYourPolicyPage,
  checkYourAnswersPage,
} from '../../pages';
import CONSTANTS from '../../../../constants';

const { ROUTES, FIELD_IDS } = CONSTANTS;

const {
  CONTRACT_VALUE,
  QUOTE,
} = FIELD_IDS;

context('Get a quote/your quote page (large contract value) - as an exporter, I want to get an Export insurance quote', () => {
  before(() => {
    cy.login();

    completeAndSubmitBuyerForm();
    completeAndSubmitCompanyForm();
    completeAndSubmitUkContentForm();
    completeAndSubmitPolicyTypeSingleForm();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
  });

  it('should get a quote with a large contract value and render in the correct format', () => {
    tellUsAboutYourPolicyPage[FIELD_IDS.CONTRACT_VALUE].input().type('12,345,678');
    tellUsAboutYourPolicyPage[FIELD_IDS.CURRENCY].input().select('GBP');
    tellUsAboutYourPolicyPage[FIELD_IDS.PERCENTAGE_OF_COVER].input().select('90');

    tellUsAboutYourPolicyPage.submitButton().click();

    cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);

    // Check contract value formatting in the answers page
    const answersAmount = checkYourAnswersPage.summaryLists.policy[CONTRACT_VALUE].value();

    answersAmount.invoke('text').then((text) => {
      const expected = '£12,345,678';

      expect(text.trim()).equal(expected);
    });

    checkYourAnswersPage.submitButton().click();

    // Check contract value formatting in the quote
    yourQuotePage.panel.summaryList[QUOTE.INSURED_FOR].value().invoke('text').then((text) => {
      const expected = '£11,111,110.20';

      expect(text.trim()).equal(expected);
    });

    // Check estimated cost in the quote
    yourQuotePage.panel.summaryList[QUOTE.ESTIMATED_COST].value().invoke('text').then((text) => {
      const expected = '£145,679.00';

      expect(text.trim()).equal(expected);
    });
  });
});
