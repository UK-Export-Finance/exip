import { backLink, field, summaryList } from '../../../../../../pages/shared';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import { LINKS } from '../../../../../../content-strings';
import { COUNTRY_QUOTE_SUPPORT } from '../../../../../../fixtures/countries';

const {
  ELIGIBILITY: { PERCENTAGE_OF_COVER },
} = FIELD_IDS;

const {
  QUOTE: { TELL_US_ABOUT_YOUR_POLICY_CHANGE, YOUR_QUOTE, TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT },
} = ROUTES;

const { HIGH_RISK_COUNTRY_1 } = COUNTRY_QUOTE_SUPPORT;

context('Your quote page - change answer (90% to 95% cover percentage) - redirect to talk to an export finance manager page', () => {
  const baseUrl = Cypress.config('baseUrl');
  const url = `${baseUrl}${YOUR_QUOTE}`;

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToRootUrl();

    cy.submitQuoteAnswersHappyPathSinglePolicy({ countryName: HIGH_RISK_COUNTRY_1.NAME });
    cy.clickSubmitButton();

    cy.assertUrl(url);
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

    it(`redirects to ${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT} when submitting a higher cover percentage for a high risk country`, () => {
      field(PERCENTAGE_OF_COVER).input().select('95');
      cy.clickSubmitButton();

      const expectedUrl = `${baseUrl}${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT}#${PERCENTAGE_OF_COVER}-label`;

      cy.assertUrl(expectedUrl);
    });
  });
});
