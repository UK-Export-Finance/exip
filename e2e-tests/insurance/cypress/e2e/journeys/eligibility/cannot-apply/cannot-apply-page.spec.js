import { backLink, autoCompleteField, cannotApplyPage } from '../../../../../../pages/shared';
import { PAGES, LINKS } from '../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { COUNTRY_APPLICATION_SUPPORT } from '../../../../../../fixtures/countries';

const CONTENT_STRINGS = PAGES.CANNOT_APPLY_EXIT;
const { REASON } = CONTENT_STRINGS;

const {
  ELIGIBILITY: { BUYER_COUNTRY, CANNOT_APPLY_EXIT },
} = INSURANCE_ROUTES;

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

const COUNTRY_NAME = COUNTRY_APPLICATION_SUPPORT.UNSUPPORTED_1.NAME;

const baseUrl = Cypress.config('baseUrl');

// TODO: EMS-4065
context.skip(
  'Insurance - Cannot apply page - as an exporter, I want to check if UKEF offer credit insurance policy for where my buyer is based - Unsupported country',
  () => {
    beforeEach(() => {
      cy.saveSession();

      cy.navigateToCheckIfEligibleUrl();

      cy.completeAndSubmitEligibilityForms({ formToStopAt: 'companyDetails' });

      cy.keyboardInput(autoCompleteField(FIELD_ID).input(), COUNTRY_NAME);

      const results = autoCompleteField(FIELD_ID).results();
      results.first().click();

      cy.clickSubmitButton();
    });

    it('redirects to `cannot apply` exit page', () => {
      const expectedUrl = `${baseUrl}${CANNOT_APPLY_EXIT}`;

      cy.assertUrl(expectedUrl);
    });

    it('renders a reason', () => {
      cannotApplyPage.reason().should('exist');

      const expected = `${REASON.INTRO} ${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${COUNTRY_NAME}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;
      cy.checkText(cannotApplyPage.reason(), expected);
    });

    it('renders a back link with correct url', () => {
      const expectedHref = `${baseUrl}${BUYER_COUNTRY}`;

      cy.checkLink(backLink(), expectedHref, LINKS.BACK);
    });

    it('should prepopulate the field when going back to the page via back link', () => {
      cy.clickBackLink();

      const expectedValue = COUNTRY_NAME;

      cy.checkTextAndValue({
        textSelector: autoCompleteField(FIELD_ID).results(),
        expectedText: expectedValue,
        valueSelector: autoCompleteField(FIELD_ID),
        expectedValue,
      });
    });
  },
);
