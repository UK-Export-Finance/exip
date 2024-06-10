import { backLink, autoCompleteField, field, summaryList } from '../../../../../../pages/shared';
import { policyTypePage, tellUsAboutYourPolicyPage } from '../../../../../../pages/quote';
import { ROUTES, FIELD_IDS, FIELD_VALUES } from '../../../../../../constants';
import { LINKS } from '../../../../../../content-strings';

const {
  ELIGIBILITY: { CONTRACT_VALUE, CREDIT_PERIOD, MAX_AMOUNT_OWED, PERCENTAGE_OF_COVER, BUYER_COUNTRY },
  POLICY_TYPE,
  QUOTE,
  POLICY_LENGTH,
} = FIELD_IDS;

const {
  QUOTE: { BUYER_COUNTRY_CHANGE, TELL_US_ABOUT_YOUR_POLICY_CHANGE, YOUR_QUOTE, CHECK_YOUR_ANSWERS },
} = ROUTES;

context('Your quote page - change answers (single policy type to multiple policy type) - as an exporter, I want to get an Credit insurance quote', () => {
  const baseUrl = Cypress.config('baseUrl');
  const url = `${baseUrl}${YOUR_QUOTE}`;

  beforeEach(() => {
    cy.saveSession();

    cy.login();

    cy.submitQuoteAnswersHappyPathSinglePolicy({});
    cy.clickSubmitButton();

    cy.assertUrl(url);
  });

  describe('change `contract value`', () => {
    const row = summaryList.field(CONTRACT_VALUE);

    beforeEach(() => {
      row.changeLink().click();
    });

    it(`clicking 'change' redirects to ${TELL_US_ABOUT_YOUR_POLICY_CHANGE}`, () => {
      const expectedUrl = `${baseUrl}${TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CONTRACT_VALUE}-label`;
      cy.assertUrl(expectedUrl);
    });

    it('has a hash tag and label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expectedUrl = `${baseUrl}${TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CONTRACT_VALUE}-label`;
      cy.assertUrl(expectedUrl);
    });

    it('renders a back link with correct url', () => {
      const expectedHref = `${baseUrl}${YOUR_QUOTE}`;

      cy.checkLink(backLink(), expectedHref, LINKS.BACK);
    });

    it(`redirects to ${CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      cy.keyboardInput(field(CONTRACT_VALUE).input(), '1000');
      cy.clickSubmitButton();

      const expectedUrl = `${baseUrl}${CHECK_YOUR_ANSWERS}#${CONTRACT_VALUE}-label`;
      cy.assertUrl(expectedUrl);
    });

    it('renders the new answer in the quote', () => {
      cy.keyboardInput(field(CONTRACT_VALUE).input(), '1000');

      // go through 2 get a quote forms.
      cy.clickSubmitButtonMultipleTimes({ count: 2 });

      const expected = '£1,000';
      cy.checkText(row.value(), expected);
    });
  });

  describe('change `percentage of cover`', () => {
    const row = summaryList.field(PERCENTAGE_OF_COVER);

    beforeEach(() => {
      row.changeLink().click();
    });

    it(`clicking 'change' redirects to ${TELL_US_ABOUT_YOUR_POLICY_CHANGE}`, () => {
      const expectedUrl = `${baseUrl}${TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`;

      cy.assertUrl(expectedUrl);
    });

    it('has a hash tag and label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expectedUrl = `${baseUrl}${TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`;

      cy.assertUrl(expectedUrl);
    });

    it('renders a back link with correct url', () => {
      const expectedHref = `${baseUrl}${YOUR_QUOTE}`;

      cy.checkLink(backLink(), expectedHref, LINKS.BACK);
    });

    it(`redirects to ${CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      field(PERCENTAGE_OF_COVER).input().select('85');
      cy.clickSubmitButton();

      const expectedUrl = `${baseUrl}${CHECK_YOUR_ANSWERS}#${PERCENTAGE_OF_COVER}-label`;

      cy.assertUrl(expectedUrl);
    });

    it('renders the new answer in the quote', () => {
      field(PERCENTAGE_OF_COVER).input().select('85');

      // go through 2 get a quote forms.
      cy.clickSubmitButtonMultipleTimes({ count: 2 });

      const expected = '85%';
      cy.checkText(row.value(), expected);
    });
  });

  describe('change policy type to multi', () => {
    beforeEach(() => {
      /**
       * Go back to the previous page via browser back button.
       * The quote page does not have a back or change link for policy type.
       */
      cy.go('back');

      const row = summaryList.field(POLICY_TYPE);
      row.changeLink().click();
    });

    it('renders the new answers and `insured for` in the quote after submitting a new answer', () => {
      policyTypePage[POLICY_TYPE].multiple.label().click();

      // go through 2 get a quote forms.
      cy.clickSubmitButtonMultipleTimes({ count: 2 });

      // max amount owed and credit period fields are now required because it's a multiple policy
      cy.keyboardInput(field(MAX_AMOUNT_OWED).input(), '120000');
      tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().select('1');

      // go through 2 get a quote forms.
      cy.clickSubmitButtonMultipleTimes({ count: 2 });

      const expectedUrl = `${baseUrl}${YOUR_QUOTE}#heading`;

      cy.assertUrl(expectedUrl);

      const insuredFor = summaryList.field(QUOTE.INSURED_FOR);

      cy.checkText(insuredFor.value(), '£108,000.00');

      const policyLength = summaryList.field(POLICY_LENGTH);

      cy.checkText(policyLength.value(), `${FIELD_VALUES.POLICY_LENGTH.MULTIPLE} months`);
    });
  });

  describe('change `buyer location`', () => {
    const row = summaryList.field(QUOTE.BUYER_LOCATION);

    beforeEach(() => {
      row.changeLink().click();
    });

    it(`clicking 'change' redirects to ${BUYER_COUNTRY_CHANGE}`, () => {
      const expectedUrl = `${baseUrl}${BUYER_COUNTRY_CHANGE}#heading`;
      cy.assertUrl(expectedUrl);
    });

    it('has a hash tag and heading/label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expectedUrl = `${baseUrl}${BUYER_COUNTRY_CHANGE}#heading`;
      cy.assertUrl(expectedUrl);
    });

    it('renders a back link with correct url', () => {
      const expectedHref = `${baseUrl}${YOUR_QUOTE}`;

      cy.checkLink(backLink(), expectedHref, LINKS.BACK);
    });

    it(`redirects to ${CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      cy.keyboardInput(autoCompleteField(BUYER_COUNTRY).input(), 'Bahrain');
      const results = autoCompleteField(BUYER_COUNTRY).results();
      results.first().click();

      cy.clickSubmitButton();

      const expectedUrl = `${baseUrl}${CHECK_YOUR_ANSWERS}#heading`;

      cy.assertUrl(expectedUrl);
    });

    it('renders the new answer in the quote', () => {
      cy.keyboardInput(autoCompleteField(BUYER_COUNTRY).input(), 'Bahrain');
      const results = autoCompleteField(BUYER_COUNTRY).results();
      results.first().click();

      // go through 2 get a quote forms.
      cy.clickSubmitButtonMultipleTimes({ count: 2 });

      const expected = 'Bahrain';
      cy.checkText(row.value(), expected);
    });
  });
});
