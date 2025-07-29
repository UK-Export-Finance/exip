import { ROUTES } from '../../../../../../constants';
import { COUNTRY_QUOTE_SUPPORT } from '../../../../../../fixtures/countries';

const {
  QUOTE: { YOUR_QUOTE, TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT },
} = ROUTES;

const { HIGH_RISK_COUNTRY_1 } = COUNTRY_QUOTE_SUPPORT;

const baseUrl = Cypress.config('baseUrl');

context('when manually navigating to your quote URL after being redirected to export finance manager page', () => {
  const url = `${baseUrl}${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT}`;

  before(() => {
    cy.navigateToRootUrl();

    cy.completeAndSubmitBuyerCountryForm({ countryName: HIGH_RISK_COUNTRY_1.NAME });
    cy.completeAndSubmitBuyerBodyForm();
    cy.completeAndSubmitExporterLocationForm();
    cy.completeAndSubmitUkContentForm();
    cy.completeAndSubmitPolicyTypeSingleForm();
    cy.completeAndSubmitTellUsAboutYourSinglePolicyFormMaximumCoverPercentage({});

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  describe('when manually navigating to your quote page', () => {
    it(`should redirect to ${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT}`, () => {
      const yourQuoteUrl = `${baseUrl}${YOUR_QUOTE}`;

      cy.navigateToUrl(yourQuoteUrl);

      const expectedUrl = `${baseUrl}${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT}`;

      cy.assertUrl(expectedUrl);
    });
  });
});
