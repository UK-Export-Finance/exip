import { field as fieldSelector, actions } from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import { GBP } from '../../../../../../fixtures/currencies';
import { COUNTRY_QUOTE_SUPPORT } from '../../../../../../fixtures/countries';

const {
  TALK_TO_AN_EXPORT_FINANCE_MANAGER_HIGH_RISK_HIGH_COVER_EXIT: { INTRO, CONTACT_EFM },
} = PAGES;

const {
  ELIGIBILITY: { CURRENCY, CONTRACT_VALUE, PERCENTAGE_OF_COVER },
  POLICY_LENGTH,
} = FIELD_IDS;

const {
  QUOTE: { TELL_US_ABOUT_YOUR_POLICY, TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT },
} = ROUTES;

const { HIGH_RISK_COUNTRY_1 } = COUNTRY_QUOTE_SUPPORT;

const baseUrl = Cypress.config('baseUrl');

context(
  'Tell us about your single policy page - as an exporter, I want to provide my Credit insurance policy details for a high risk country with 95% cover percentage',
  () => {
    const url = `${baseUrl}${TELL_US_ABOUT_YOUR_POLICY}`;

    before(() => {
      cy.navigateToRootUrl();

      cy.completeAndSubmitBuyerCountryForm({ countryName: HIGH_RISK_COUNTRY_1.NAME });
      cy.completeAndSubmitBuyerBodyForm();
      cy.completeAndSubmitExporterLocationForm();
      cy.completeAndSubmitUkContentForm();
      cy.completeAndSubmitPolicyTypeSingleForm();

      cy.assertUrl(url);
    });

    beforeEach(() => {
      cy.saveSession();
    });

    describe('when form is valid', () => {
      it(`should redirect to ${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT}`, () => {
        cy.navigateToUrl(url);

        cy.keyboardInput(fieldSelector(POLICY_LENGTH).input(), 1);
        cy.keyboardInput(fieldSelector(CONTRACT_VALUE).input(), 100);
        fieldSelector(CURRENCY).input().select(GBP.isoCode);
        fieldSelector(PERCENTAGE_OF_COVER).input().select('95');

        cy.clickSubmitButton();

        const expectedUrl = `${baseUrl}${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT}`;

        cy.assertUrl(expectedUrl);
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render an intro copy', () => {
        cy.checkIntroText(INTRO);
      });

      it('should render the `CONTACT EFM` intro', () => {
        cy.checkText(actions.intro(), CONTACT_EFM.INTRO);
      });

      it('should render the `CONTACT EFM` link and text', () => {
        cy.checkActionTalkToYourNearestEFM({
          expectedText: `${CONTACT_EFM.LINK.TEXT} ${CONTACT_EFM.TEXT}`,
          expectedLinkHref: CONTACT_EFM.LINK.HREF,
          expectedLinkText: CONTACT_EFM.LINK.TEXT,
        });
      });
    });
  },
);
