import { autoCompleteField } from '../../../../../../pages/shared';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import { COUNTRY_QUOTE_SUPPORT } from '../../../../../../fixtures/countries';
import { PAGES } from '../../../../../../content-strings';

const {
  QUOTE: { BUYER_COUNTRY, TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT },
} = ROUTES;

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

const COUNTRY_NAME_1 = COUNTRY_QUOTE_SUPPORT.ILC_OFFLINE_SUPPORT_ONLY_1.NAME;

const baseUrl = Cypress.config('baseUrl');

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT;

const { ILC_EXIT } = CONTENT_STRINGS;

context(
  'Buyer country page - as an exporter, I want to check if UKEF issue credit insurance cover for where my buyer is based - submit countries that are "ILC" - offline EFM support',
  () => {
    const buyerCountryUrl = `${baseUrl}${BUYER_COUNTRY}`;
    const talkToEfmUrl = `${baseUrl}${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT}`;

    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(buyerCountryUrl);
    });

    describe(COUNTRY_NAME_1, () => {
      beforeEach(() => {
        cy.keyboardInput(autoCompleteField(FIELD_ID).input(), COUNTRY_NAME_1);

        const results = autoCompleteField(FIELD_ID).results();
        results.first().click();
        cy.clickSubmitButton();
      });

      it(`should redirect to ${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT} exit page`, () => {
        cy.assertUrl(talkToEfmUrl);
      });

      it('should render the intro copy for ILC only countries', () => {
        cy.checkIntroText(ILC_EXIT.REASON);
      });
    });
  },
);
