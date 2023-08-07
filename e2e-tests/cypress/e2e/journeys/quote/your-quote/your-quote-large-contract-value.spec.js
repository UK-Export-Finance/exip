import { completeAndSubmitBuyerCountryForm } from '../../../../support/forms';
import {
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitExporterLocationForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeSingleForm,
} from '../../../../support/quote/forms';
import { submitButton } from '../../../pages/shared';
import {
  yourQuotePage,
  tellUsAboutYourPolicyPage,
  checkYourAnswersPage,
} from '../../../pages/quote';
import { ROUTES, FIELD_IDS } from '../../../../../constants';
import { GBP_CURRENCY_CODE } from '../../../../fixtures/currencies';

const {
  ELIGIBILITY: {
    CONTRACT_VALUE,
    CURRENCY,
    PERCENTAGE_OF_COVER,
  },
  QUOTE,
} = FIELD_IDS;

context('Get a quote/your quote page (large contract value) - as an exporter, I want to get an Export insurance quote', () => {
  before(() => {
    cy.login();

    completeAndSubmitBuyerCountryForm();
    completeAndSubmitBuyerBodyForm();
    completeAndSubmitExporterLocationForm();
    completeAndSubmitUkContentForm();
    completeAndSubmitPolicyTypeSingleForm();
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('should get a quote with a large contract value and render in the correct format', () => {
    cy.keyboardInput(tellUsAboutYourPolicyPage[CONTRACT_VALUE].input(), '12,345,678');
    tellUsAboutYourPolicyPage[CURRENCY].input().select(GBP_CURRENCY_CODE);
    tellUsAboutYourPolicyPage[PERCENTAGE_OF_COVER].input().select('90');

    submitButton().click();

    cy.assertUrl(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);

    // Check contract value formatting in the answers page
    const answersAmount = checkYourAnswersPage.summaryLists.policy[CONTRACT_VALUE].value();

    const expectedAmount = '£12,345,678';
    cy.checkText(answersAmount, expectedAmount);

    submitButton().click();

    // Check contract value formatting in the quote
    const expectedValue = '£11,111,110.20';
    cy.checkText(yourQuotePage.panel.summaryList[QUOTE.INSURED_FOR].value(), expectedValue);

    // Check estimated cost in the quote
    const expectedCost = '£145,679.00';
    cy.checkText(yourQuotePage.panel.summaryList[QUOTE.ESTIMATED_COST].value(), expectedCost);
  });
});
