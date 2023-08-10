import { submitButton } from '../../../pages/shared';
import { checkYourAnswersPage } from '../../../pages/quote';
import {
  FIELDS,
  LINKS,
  PAGES,
  SUMMARY_ANSWERS,
} from '../../../../../content-strings';
import { ROUTES, FIELD_VALUES } from '../../../../../constants';
import { FIELD_IDS } from '../../../../../constants/field-ids';

const CONTENT_STRINGS = PAGES.QUOTE.CHECK_YOUR_ANSWERS;

const {
  ELIGIBILITY: {
    BUYER_COUNTRY,
    CONTRACT_VALUE,
    CREDIT_PERIOD,
    PERCENTAGE_OF_COVER,
    VALID_EXPORTER_LOCATION,
    HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  },
  SINGLE_POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
} = FIELD_IDS;

const submissionData = {
  [BUYER_COUNTRY]: 'Algeria',
  [CREDIT_PERIOD]: '1',
  [PERCENTAGE_OF_COVER]: '90',
  [SINGLE_POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
  [SINGLE_POLICY_LENGTH]: '3',
  [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: true,
};

context('Check your answers page (single policy) - as an exporter, I want to review the details before submitting the proposal', () => {
  const url = ROUTES.QUOTE.CHECK_YOUR_ANSWERS;

  before(() => {
    cy.login();
    cy.submitQuoteAnswersHappyPathSinglePolicy();
    cy.url().should('include', url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: url,
      backLink: ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY,
      submitButtonCopy: CONTENT_STRINGS.SUBMIT_BUTTON,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
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

        const expectedChangeHref = `${ROUTES.QUOTE.BUYER_COUNTRY_CHANGE}#heading`;
        const expectedChangeText = `${LINKS.CHANGE} ${expectedKeyText}`;

        cy.checkLink(
          row.changeLink(),
          expectedChangeHref,
          expectedChangeText,
        );
      });

      it('renders `Company` key, value and change link', () => {
        const row = list[VALID_EXPORTER_LOCATION];
        const expectedKeyText = FIELDS[VALID_EXPORTER_LOCATION].SUMMARY.TITLE;

        cy.checkText(row.key(), expectedKeyText);

        cy.checkText(row.value(), SUMMARY_ANSWERS[VALID_EXPORTER_LOCATION]);

        const expectedChangeHref = `${ROUTES.QUOTE.EXPORTER_LOCATION_CHANGE}#heading`;
        const expectedChangeText = `${LINKS.CHANGE} ${expectedKeyText}`;

        cy.checkLink(
          row.changeLink(),
          expectedChangeHref,
          expectedChangeText,
        );
      });

      it('renders `UK goods` key, value and change link', () => {
        const row = list[HAS_MINIMUM_UK_GOODS_OR_SERVICES];
        const expectedKeyText = FIELDS[HAS_MINIMUM_UK_GOODS_OR_SERVICES].SUMMARY.TITLE;

        cy.checkText(row.key(), expectedKeyText);

        cy.checkText(row.value(), SUMMARY_ANSWERS[HAS_MINIMUM_UK_GOODS_OR_SERVICES]);

        const expectedChangeHref = `${ROUTES.QUOTE.UK_GOODS_OR_SERVICES_CHANGE}#heading`;
        const expectedChangeText = `${LINKS.CHANGE} ${expectedKeyText}`;

        cy.checkLink(
          row.changeLink(),
          expectedChangeHref,
          expectedChangeText,
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
        const row = list[SINGLE_POLICY_TYPE];
        const expectedKeyText = FIELDS[SINGLE_POLICY_TYPE].SUMMARY.TITLE;

        cy.checkText(row.key(), expectedKeyText);

        cy.checkText(row.value(), submissionData[SINGLE_POLICY_TYPE]);

        const expectedChangeHref = `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#heading`;
        const expectedChangeText = `${LINKS.CHANGE} ${expectedKeyText}`;

        cy.checkLink(
          row.changeLink(),
          expectedChangeHref,
          expectedChangeText,
        );
      });

      it('renders `Policy length` key, value and change link', () => {
        const row = list[SINGLE_POLICY_LENGTH];
        const expectedKeyText = FIELDS[SINGLE_POLICY_LENGTH].SUMMARY.TITLE;

        cy.checkText(row.key(), expectedKeyText);

        const expectedValue = `${submissionData[SINGLE_POLICY_LENGTH]} months`;
        cy.checkText(row.value(), expectedValue);

        const expectedChangeHref = `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#${SINGLE_POLICY_LENGTH}-label`;
        const expectedChangeText = `${LINKS.CHANGE} ${expectedKeyText}`;

        cy.checkLink(
          row.changeLink(),
          expectedChangeHref,
          expectedChangeText,
        );
      });

      it('renders `Contract value` key, value with no decimal points and change link', () => {
        const row = list[CONTRACT_VALUE];
        const expectedKeyText = FIELDS[CONTRACT_VALUE].SUMMARY.TITLE;

        cy.checkText(row.key(), expectedKeyText);

        const expectedValue = '£150,000';
        cy.checkText(row.value(), expectedValue);

        const expectedChangeHref = `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CONTRACT_VALUE}-label`;
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

      it('does NOT render `Credit period` key, value or change link', () => {
        const row = list[CREDIT_PERIOD];

        row.key().should('not.exist');
        row.value().should('not.exist');
        row.changeLink().should('not.exist');
      });
    });
  });

  context('form submission', () => {
    it(`should redirect to ${ROUTES.QUOTE.YOUR_QUOTE}`, () => {
      cy.navigateToUrl(url);

      submitButton().click();

      cy.url().should('include', ROUTES.QUOTE.YOUR_QUOTE);
    });
  });
});
