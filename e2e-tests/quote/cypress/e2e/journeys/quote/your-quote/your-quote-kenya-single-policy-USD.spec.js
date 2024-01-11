import {
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitExporterLocationForm,
  completeAndSubmitUkContentForm,
} from '../../../../../../commands/quote/forms';
import { countryInput, field, summaryList } from '../../../../../../pages/shared';
import { policyTypePage } from '../../../../../../pages/quote';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import { USD_CURRENCY_CODE } from '../../../../../../fixtures/currencies';

const {
  ELIGIBILITY: {
    CONTRACT_VALUE,
    CURRENCY,
    PERCENTAGE_OF_COVER,
    BUYER_COUNTRY,
  },
  POLICY_TYPE,
  QUOTE,
  POLICY_LENGTH,
} = FIELD_IDS;

const {
  QUOTE: { CHECK_YOUR_ANSWERS },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Get a quote/your quote page (single policy, Kenya, USD) - as an exporter, I want to get an Credit insurance quote', () => {
  before(() => {
    cy.login();

    cy.keyboardInput(countryInput.field(BUYER_COUNTRY).input(), 'Kenya');
    const results = countryInput.field(BUYER_COUNTRY).results();
    results.first().click();
    cy.clickSubmitButton();

    completeAndSubmitBuyerBodyForm();
    completeAndSubmitExporterLocationForm();
    completeAndSubmitUkContentForm();

    policyTypePage[POLICY_TYPE].single.input().click();

    cy.clickSubmitButton();
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('should get a quote with a large contract value and render in the correct format', () => {
    cy.keyboardInput(field(POLICY_LENGTH).input(), '18');
    cy.keyboardInput(field(CONTRACT_VALUE).input(), '100,000');

    field(CURRENCY).input().select(USD_CURRENCY_CODE);
    field(PERCENTAGE_OF_COVER).input().select('80');

    cy.clickSubmitButton();

    const expectedUrl = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

    cy.assertUrl(expectedUrl);

    // Check contract value formatting in the answers page
    const answersAmount = summaryList.field(CONTRACT_VALUE).value();

    const expectedAmount = '$100,000';
    cy.checkText(answersAmount, expectedAmount);

    cy.clickSubmitButton();

    // Check contract value formatting in the quote
    const expectedValue = '$80,000.00';
    cy.checkText(summaryList.field(QUOTE.INSURED_FOR).value(), expectedValue);

    // Check estimated cost in the quote
    const expectedCost = '$5,090.00';
    cy.checkText(summaryList.field(QUOTE.ESTIMATED_COST).value(), expectedCost);
  });
});
