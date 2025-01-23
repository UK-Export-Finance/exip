import { autoCompleteField } from '../../../../../../pages/shared';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import { COUNTRY_QUOTE_SUPPORT } from '../../../../../../fixtures/countries';

const {
  QUOTE: { BUYER_COUNTRY, TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT },
} = ROUTES;

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

const COUNTRY_NAME_1 = COUNTRY_QUOTE_SUPPORT.NO_ONLINE_SUPPORT_1.NAME;
const COUNTRY_NAME_2 = COUNTRY_QUOTE_SUPPORT.NO_ONLINE_SUPPORT_2.NAME;
const COUNTRY_NAME_3 = COUNTRY_QUOTE_SUPPORT.NO_ONLINE_SUPPORT_3.NAME;
const COUNTRY_NAME_4 = COUNTRY_QUOTE_SUPPORT.NO_ONLINE_SUPPORT_4.NAME;
const COUNTRY_NAME_5 = COUNTRY_QUOTE_SUPPORT.NO_ONLINE_SUPPORT_5.NAME;
const COUNTRY_NAME_6 = COUNTRY_QUOTE_SUPPORT.NO_ONLINE_SUPPORT_6.NAME;

const baseUrl = Cypress.config('baseUrl');

context(
  'Buyer country page - as an exporter, I want to check if UKEF issue credit insurance cover for where my buyer is based - submit countries that have no online insurance support',
  () => {
    const buyerCountryUrl = `${baseUrl}${BUYER_COUNTRY}`;
    const talkToEfmUrl = `${baseUrl}${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT}`;

    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(buyerCountryUrl);
    });

    describe(COUNTRY_NAME_1, () => {
      it(`should redirect to ${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT} exit page`, () => {
        cy.keyboardInput(autoCompleteField(FIELD_ID).input(), COUNTRY_NAME_1);

        const results = autoCompleteField(FIELD_ID).results();
        results.first().click();
        cy.clickSubmitButton();

        cy.assertUrl(talkToEfmUrl);
      });
    });

    describe(COUNTRY_NAME_2, () => {
      it(`should redirect to ${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT} exit page`, () => {
        cy.keyboardInput(autoCompleteField(FIELD_ID).input(), COUNTRY_NAME_2);

        const results = autoCompleteField(FIELD_ID).results();
        results.first().click();
        cy.clickSubmitButton();

        cy.assertUrl(talkToEfmUrl);
      });
    });

    describe(COUNTRY_NAME_3, () => {
      it(`should redirect to ${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT} exit page`, () => {
        cy.keyboardInput(autoCompleteField(FIELD_ID).input(), COUNTRY_NAME_3);

        const results = autoCompleteField(FIELD_ID).results();
        results.first().click();
        cy.clickSubmitButton();

        cy.assertUrl(talkToEfmUrl);
      });
    });

    describe(COUNTRY_NAME_4, () => {
      it(`should redirect to ${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT} exit page`, () => {
        cy.keyboardInput(autoCompleteField(FIELD_ID).input(), COUNTRY_NAME_4);

        const results = autoCompleteField(FIELD_ID).results();
        results.first().click();
        cy.clickSubmitButton();

        cy.assertUrl(talkToEfmUrl);
      });
    });

    describe(COUNTRY_NAME_5, () => {
      it(`should redirect to ${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT} exit page`, () => {
        cy.keyboardInput(autoCompleteField(FIELD_ID).input(), COUNTRY_NAME_5);

        const results = autoCompleteField(FIELD_ID).results();
        results.first().click();
        cy.clickSubmitButton();

        cy.assertUrl(talkToEfmUrl);
      });
    });

    describe(COUNTRY_NAME_6, () => {
      beforeEach(() => {
        cy.keyboardInput(autoCompleteField(FIELD_ID).input(), COUNTRY_NAME_6);

        const results = autoCompleteField(FIELD_ID).results();
        results.first().click();
        cy.clickSubmitButton();
      });

      it(`should redirect to ${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT} exit page`, () => {
        cy.assertUrl(talkToEfmUrl);
      });

      it('should prepopulate the field when going back to the page', () => {
        cy.clickBackLink();

        const expectedValue = COUNTRY_NAME_6;

        cy.checkTextAndValue({
          textSelector: autoCompleteField(FIELD_ID).results(),
          expectedText: expectedValue,
          valueSelector: autoCompleteField(FIELD_ID),
          expectedValue,
        });
      });
    });
  },
);
