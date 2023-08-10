import { submitButton } from '../../../pages/shared';
import { checkYourAnswersPage } from '../../../pages/quote';
import {
  FIELDS,
  LINKS,
  PAGES,
  SUMMARY_ANSWERS,
} from '../../../../../content-strings';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../constants';

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
  MULTIPLE_POLICY_LENGTH,
  MULTIPLE_POLICY_TYPE,
} = FIELD_IDS;

const submissionData = {
  [BUYER_COUNTRY]: 'Algeria',
  [CREDIT_PERIOD]: '1',
  [PERCENTAGE_OF_COVER]: '90',
  [MULTIPLE_POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
  [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: true,
};

context('Check your answers page (multiple policy) - as an exporter, I want to review the details before submitting the proposal', () => {
  const url = ROUTES.QUOTE.CHECK_YOUR_ANSWERS;

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
      const row = list[BUYER_COUNTRY];
      const expectedKeyText = FIELDS[BUYER_COUNTRY].SUMMARY.TITLE;

      cy.checkText(row.key(), expectedKeyText);

      const expectedValue = submissionData[BUYER_COUNTRY];
      cy.checkText(row.value(), expectedValue);

      const expectedHref = `${ROUTES.QUOTE.BUYER_COUNTRY_CHANGE}#heading`;
      const expectedText = `${LINKS.CHANGE} ${expectedKeyText}`;

      cy.checkLink(
        row.changeLink(),
        expectedHref,
        expectedText,
      );
    });

    it('renders `Company` key, value and change link', () => {
      const row = list[VALID_EXPORTER_LOCATION];
      const expectedKeyText = FIELDS[VALID_EXPORTER_LOCATION].SUMMARY.TITLE;

      cy.checkText(row.key(), expectedKeyText);

      cy.checkText(row.value(), SUMMARY_ANSWERS[VALID_EXPORTER_LOCATION]);

      const expectedHref = `${ROUTES.QUOTE.EXPORTER_LOCATION_CHANGE}#heading`;
      const expectedText = `${LINKS.CHANGE} ${expectedKeyText}`;

      cy.checkLink(
        row.changeLink(),
        expectedHref,
        expectedText,
      );
    });

    it('renders `UK goods` key, value and change link', () => {
      const row = list[HAS_MINIMUM_UK_GOODS_OR_SERVICES];
      const expectedKeyText = FIELDS[HAS_MINIMUM_UK_GOODS_OR_SERVICES].SUMMARY.TITLE;

      cy.checkText(row.key(), expectedKeyText);

      cy.checkText(row.value(), SUMMARY_ANSWERS[HAS_MINIMUM_UK_GOODS_OR_SERVICES]);

      const expectedHref = `${ROUTES.QUOTE.UK_GOODS_OR_SERVICES_CHANGE}#heading`;
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
      const row = list[MULTIPLE_POLICY_TYPE];
      const expectedKeyText = FIELDS[MULTIPLE_POLICY_TYPE].SUMMARY.TITLE;

      cy.checkText(row.key(), expectedKeyText);

      cy.checkText(row.value(), submissionData[MULTIPLE_POLICY_TYPE]);

      const expectedChangeHref = `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#heading`;
      const expectedChangeText = `${LINKS.CHANGE} ${expectedKeyText}`;

      cy.checkLink(
        row.changeLink(),
        expectedChangeHref,
        expectedChangeText,
      );
    });

    it('renders `Policy length` key and value (no change link)', () => {
      const row = list[MULTIPLE_POLICY_LENGTH];
      const expectedKeyText = FIELDS[MULTIPLE_POLICY_LENGTH].SUMMARY.TITLE;

      cy.checkText(row.key(), expectedKeyText);

      const expected = `${FIELD_VALUES.POLICY_LENGTH.MULTIPLE} months`;
      cy.checkText(row.value(), expected);

      row.changeLink().should('not.exist');
    });

    it('renders `Max amount owed` key, value with no decimal points and change link', () => {
      const row = list[MAX_AMOUNT_OWED];
      const expectedKeyText = FIELDS[MAX_AMOUNT_OWED].SUMMARY.TITLE;

      cy.checkText(row.key(), expectedKeyText);

      const expectedValue = '£150,000';
      cy.checkText(row.value(), expectedValue);

      const expectedChangeHref = `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${MAX_AMOUNT_OWED}-label`;
      const expectedChangeText = `${LINKS.CHANGE} ${expectedKeyText}`;

      cy.checkLink(
        row.changeLink(),
        expectedChangeHref,
        expectedChangeText,
      );
    });

    it('renders `Credit period` key, value and change link', () => {
      const row = list[CREDIT_PERIOD];
      const expectedKeyText = FIELDS[CREDIT_PERIOD].SUMMARY.TITLE;

      cy.checkText(row.key(), expectedKeyText);

      const expectedValue = `${submissionData[CREDIT_PERIOD]} month`;
      cy.checkText(row.value(), expectedValue);

      const expectedChangeHref = `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CREDIT_PERIOD}-label`;
      const expectedChangeText = `${LINKS.CHANGE} ${expectedKeyText}`;

      cy.checkLink(
        row.changeLink(),
        expectedChangeHref,
        expectedChangeText,
      );
    });

    it('renders `Percentage of cover` key, value and change link', () => {
      const row = list[PERCENTAGE_OF_COVER];
      const expectedKeyText = FIELDS[PERCENTAGE_OF_COVER].SUMMARY.TITLE;

      cy.checkText(row.key(), expectedKeyText);

      const expectedValue = `${submissionData[PERCENTAGE_OF_COVER]}%`;
      cy.checkText(row.value(), expectedValue);

      const expectedChangeHref = `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`;
      const expectedChangeText = `${LINKS.CHANGE} ${expectedKeyText}`;

      cy.checkLink(
        row.changeLink(),
        expectedChangeHref,
        expectedChangeText,
      );
    });
  });

  context('form submission', () => {
    it(`should redirect to ${ROUTES.QUOTE.YOUR_QUOTE}`, () => {
      cy.navigateToUrl(url);

      submitButton().click();

      cy.assertUrl(ROUTES.QUOTE.YOUR_QUOTE);
    });
  });
});
