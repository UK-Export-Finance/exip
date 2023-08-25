import { submitButton, summaryList } from '../../../../../../pages/shared';
import { checkYourAnswersPage } from '../../../../../../pages/quote';
import {
  FIELDS,
  LINKS,
  PAGES,
  SUMMARY_ANSWERS,
} from '../../../../../../content-strings';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../constants';

const CONTENT_STRINGS = PAGES.QUOTE.CHECK_YOUR_ANSWERS;

const {
  ELIGIBILITY: {
    BUYER_COUNTRY,
    CREDIT_PERIOD,
    HAS_MINIMUM_UK_GOODS_OR_SERVICES,
    PERCENTAGE_OF_COVER,
    VALID_EXPORTER_LOCATION,
    MAX_AMOUNT_OWED,
  },
  POLICY_LENGTH,
  POLICY_TYPE,
} = FIELD_IDS;

const {
  QUOTE: {
    CHECK_YOUR_ANSWERS,
    BUYER_COUNTRY_CHANGE,
    EXPORTER_LOCATION_CHANGE,
    POLICY_TYPE_CHANGE,
    TELL_US_ABOUT_YOUR_POLICY_CHANGE,
    UK_GOODS_OR_SERVICES_CHANGE,
    YOUR_QUOTE,
  },
} = ROUTES;

const submissionData = {
  [BUYER_COUNTRY]: 'Algeria',
  [CREDIT_PERIOD]: '1',
  [PERCENTAGE_OF_COVER]: '90',
  [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
  [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: true,
};

const baseUrl = Cypress.config('baseUrl');

context('Check your answers page (multiple policy) - as an exporter, I want to review the details before submitting the proposal', () => {
  const url = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

  before(() => {
    cy.login();
    cy.submitQuoteAnswersHappyPathMultiplePolicy();
    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  context('export summary list', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    const list = checkYourAnswersPage.summaryLists.export;

    it('renders a heading', () => {
      cy.checkText(list.heading(), CONTENT_STRINGS.GROUP_HEADING_EXPORT);
    });

    it('renders `Buyer based` key, value and change link', () => {
      const row = summaryList.field(BUYER_COUNTRY);
      const expectedKeyText = FIELDS[BUYER_COUNTRY].SUMMARY.TITLE;

      cy.checkText(row.key(), expectedKeyText);

      const expectedValue = submissionData[BUYER_COUNTRY];
      cy.checkText(row.value(), expectedValue);

      const expectedHref = `${BUYER_COUNTRY_CHANGE}#heading`;
      const expectedText = `${LINKS.CHANGE} ${expectedKeyText}`;

      cy.checkLink(
        row.changeLink(),
        expectedHref,
        expectedText,
      );
    });

    it('renders `Company` key, value and change link', () => {
      const row = summaryList.field(VALID_EXPORTER_LOCATION);
      const expectedKeyText = FIELDS[VALID_EXPORTER_LOCATION].SUMMARY.TITLE;

      cy.checkText(row.key(), expectedKeyText);

      cy.checkText(row.value(), SUMMARY_ANSWERS[VALID_EXPORTER_LOCATION]);

      const expectedHref = `${EXPORTER_LOCATION_CHANGE}#heading`;
      const expectedText = `${LINKS.CHANGE} ${expectedKeyText}`;

      cy.checkLink(
        row.changeLink(),
        expectedHref,
        expectedText,
      );
    });

    it('renders `UK goods` key, value and change link', () => {
      const row = summaryList.field(HAS_MINIMUM_UK_GOODS_OR_SERVICES);
      const expectedKeyText = FIELDS[HAS_MINIMUM_UK_GOODS_OR_SERVICES].SUMMARY.TITLE;

      cy.checkText(row.key(), expectedKeyText);

      cy.checkText(row.value(), SUMMARY_ANSWERS[HAS_MINIMUM_UK_GOODS_OR_SERVICES]);

      const expectedHref = `${UK_GOODS_OR_SERVICES_CHANGE}#heading`;
      const expectedText = `${LINKS.CHANGE} ${expectedKeyText}`;

      cy.checkLink(
        row.changeLink(),
        expectedHref,
        expectedText,
      );
    });
  });

  context('policy summary list', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    const list = checkYourAnswersPage.summaryLists.policy;

    it('renders a heading', () => {
      cy.checkText(list.heading(), CONTENT_STRINGS.GROUP_HEADING_POLICY);
    });

    it('renders `Policy type` key, value and change link', () => {
      const row = summaryList.field(POLICY_TYPE);
      const expectedKeyText = FIELDS[POLICY_TYPE].SUMMARY.TITLE;

      cy.checkText(row.key(), expectedKeyText);

      cy.checkText(row.value(), submissionData[POLICY_TYPE]);

      const expectedChangeHref = `${POLICY_TYPE_CHANGE}#heading`;
      const expectedChangeText = `${LINKS.CHANGE} ${expectedKeyText}`;

      cy.checkLink(
        row.changeLink(),
        expectedChangeHref,
        expectedChangeText,
      );
    });

    it('renders `Policy length` key and value (no change link)', () => {
      const row = summaryList.field(POLICY_LENGTH);
      const expectedKeyText = FIELDS[POLICY_LENGTH].SUMMARY.TITLE;

      cy.checkText(row.key(), expectedKeyText);

      const expected = `${FIELD_VALUES.POLICY_LENGTH.MULTIPLE} months`;
      cy.checkText(row.value(), expected);

      row.changeLink().should('not.exist');
    });

    it('renders `Max amount owed` key, value with no decimal points and change link', () => {
      const row = summaryList.field(MAX_AMOUNT_OWED);
      const expectedKeyText = FIELDS[MAX_AMOUNT_OWED].SUMMARY.TITLE;

      cy.checkText(row.key(), expectedKeyText);

      const expectedValue = '£150,000';
      cy.checkText(row.value(), expectedValue);

      const expectedChangeHref = `${TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${MAX_AMOUNT_OWED}-label`;
      const expectedChangeText = `${LINKS.CHANGE} ${expectedKeyText}`;

      cy.checkLink(
        row.changeLink(),
        expectedChangeHref,
        expectedChangeText,
      );
    });

    it('renders `Credit period` key, value and change link', () => {
      const row = summaryList.field(CREDIT_PERIOD);
      const expectedKeyText = FIELDS[CREDIT_PERIOD].SUMMARY.TITLE;

      cy.checkText(row.key(), expectedKeyText);

      const expectedValue = `${submissionData[CREDIT_PERIOD]} month`;
      cy.checkText(row.value(), expectedValue);

      const expectedChangeHref = `${TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CREDIT_PERIOD}-label`;
      const expectedChangeText = `${LINKS.CHANGE} ${expectedKeyText}`;

      cy.checkLink(
        row.changeLink(),
        expectedChangeHref,
        expectedChangeText,
      );
    });

    it('renders `Percentage of cover` key, value and change link', () => {
      const row = summaryList.field(PERCENTAGE_OF_COVER);
      const expectedKeyText = FIELDS[PERCENTAGE_OF_COVER].SUMMARY.TITLE;

      cy.checkText(row.key(), expectedKeyText);

      const expectedValue = `${submissionData[PERCENTAGE_OF_COVER]}%`;
      cy.checkText(row.value(), expectedValue);

      const expectedChangeHref = `${TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`;
      const expectedChangeText = `${LINKS.CHANGE} ${expectedKeyText}`;

      cy.checkLink(
        row.changeLink(),
        expectedChangeHref,
        expectedChangeText,
      );
    });
  });

  context('form submission', () => {
    it(`should redirect to ${YOUR_QUOTE}`, () => {
      cy.navigateToUrl(url);

      submitButton().click();

      const expectedUrl = `${baseUrl}${YOUR_QUOTE}`;

      cy.assertUrl(expectedUrl);
    });
  });
});
