import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';
import {
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitExporterLocationForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeSingleForm,
} from '../../../../../../commands/quote/forms';
import { field, summaryList } from '../../../../../../pages/shared';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import { GBP_CURRENCY_CODE } from '../../../../../../fixtures/currencies';

const {
  ELIGIBILITY: { CONTRACT_VALUE, CURRENCY, PERCENTAGE_OF_COVER },
  POLICY_LENGTH,
  QUOTE,
} = FIELD_IDS;

const {
  QUOTE: { CHECK_YOUR_ANSWERS },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Get a quote/your quote page (large contract value) - as an exporter, I want to get an Credit insurance quote', () => {
  before(() => {
    cy.login();

    completeAndSubmitBuyerCountryForm({});
    completeAndSubmitBuyerBodyForm();
    completeAndSubmitExporterLocationForm();
    completeAndSubmitUkContentForm();
    completeAndSubmitPolicyTypeSingleForm();
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('should get a quote with a large contract value and render in the correct format', () => {
    cy.keyboardInput(field(POLICY_LENGTH).input(), '3');
    cy.keyboardInput(field(CONTRACT_VALUE).input(), '12,345,678');

    field(CURRENCY).input().select(GBP_CURRENCY_CODE);
    field(PERCENTAGE_OF_COVER).input().select('90');

    cy.clickSubmitButton();

    const expectedUrl = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

    cy.assertUrl(expectedUrl);

    // Check contract value formatting in the answers page
    const answersAmount = summaryList.field(CONTRACT_VALUE).value();

    const expectedAmount = '£12,345,678';
    cy.checkText(answersAmount, expectedAmount);

    cy.clickSubmitButton();

    // Check contract value formatting in the quote
    const expectedValue = '£11,111,110.20';
    cy.checkText(summaryList.field(QUOTE.INSURED_FOR).value(), expectedValue);

    // Check estimated cost in the quote
    const expectedCost = '£140,740.73';
    cy.checkText(summaryList.field(QUOTE.ESTIMATED_COST).value(), expectedCost);
  });
});
