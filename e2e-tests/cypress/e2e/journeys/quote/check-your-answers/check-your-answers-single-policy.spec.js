import { submitButton } from '../../../pages/shared';
import { checkYourAnswersPage } from '../../../pages/quote';
import partials from '../../../partials';
import {
  FIELDS,
  LINKS,
  PAGES,
  SUMMARY_ANSWERS,
} from '../../../../../content-strings';
import { ROUTES, FIELD_VALUES } from '../../../../../constants';
import { FIELD_IDS } from '../../../../../constants/field-ids';

const CONTENT_STRINGS = PAGES.QUOTE.CHECK_YOUR_ANSWERS;

const startRoute = ROUTES.QUOTE.START;

context('Check your answers page (single policy) - as an exporter, I want to review the details before submitting the proposal', () => {
  const {
    BUYER_COUNTRY,
    CONTRACT_VALUE,
    CREDIT_PERIOD,
    PERCENTAGE_OF_COVER,
    SINGLE_POLICY_TYPE,
    SINGLE_POLICY_LENGTH,
    HAS_MINIMUM_UK_GOODS_OR_SERVICES,
    VALID_EXPORTER_LOCATION,
  } = FIELD_IDS;

  const submissionData = {
    [BUYER_COUNTRY]: 'Algeria',
    [CREDIT_PERIOD]: '1',
    [PERCENTAGE_OF_COVER]: '90',
    [SINGLE_POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
    [SINGLE_POLICY_LENGTH]: '3',
    [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: true,
  };

  before(() => {
    cy.login();
    cy.submitAnswersHappyPathSinglePolicy();
    cy.url().should('include', ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.QUOTE.CHECK_YOUR_ANSWERS,
      expectedBackLink: ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY,
      assertSubmitButton: true,
      submitButtonCopy: CONTENT_STRINGS.SUBMIT_BUTTON,
    });
  });

  it('should render a header with href to quote start', () => {
    partials.header.serviceName().should('have.attr', 'href', startRoute);
  });

  context('export summary list', () => {
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

      const expectedChangeLink = `${LINKS.CHANGE} ${expectedKeyText}`;
      cy.checkText(row.changeLink(), expectedChangeLink);

      const expectedHref = `${ROUTES.QUOTE.BUYER_COUNTRY_CHANGE}#heading`;
      row.changeLink().should('have.attr', 'href', expectedHref);
    });

    it('renders `Company` key, value and change link', () => {
      const row = list[VALID_EXPORTER_LOCATION];
      const expectedKeyText = FIELDS[VALID_EXPORTER_LOCATION].SUMMARY.TITLE;

      cy.checkText(row.key(), expectedKeyText);

      cy.checkText(row.value(), SUMMARY_ANSWERS[VALID_EXPORTER_LOCATION]);

      const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
      cy.checkText(row.changeLink(), expected);

      const expectedHref = `${ROUTES.QUOTE.EXPORTER_LOCATION_CHANGE}#heading`;
      row.changeLink().should('have.attr', 'href', expectedHref);
    });

    it('renders `UK goods` key, value and change link', () => {
      const row = list[HAS_MINIMUM_UK_GOODS_OR_SERVICES];
      const expectedKeyText = FIELDS[HAS_MINIMUM_UK_GOODS_OR_SERVICES].SUMMARY.TITLE;

      cy.checkText(row.key(), expectedKeyText);

      cy.checkText(row.value(), SUMMARY_ANSWERS[HAS_MINIMUM_UK_GOODS_OR_SERVICES]);

      const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
      cy.checkText(row.changeLink(), expected);

      const expectedHref = `${ROUTES.QUOTE.UK_GOODS_OR_SERVICES_CHANGE}#heading`;
      row.changeLink().should('have.attr', 'href', expectedHref);
    });
  });

  context('policy summary list', () => {
    const list = checkYourAnswersPage.summaryLists.policy;

    it('renders a heading', () => {
      cy.checkText(list.heading(), CONTENT_STRINGS.GROUP_HEADING_POLICY);
    });

    it('renders `Policy type` key, value and change link', () => {
      const row = list[SINGLE_POLICY_TYPE];
      const expectedKeyText = FIELDS[SINGLE_POLICY_TYPE].SUMMARY.TITLE;

      cy.checkText(row.key(), expectedKeyText);

      cy.checkText(row.value(), submissionData[SINGLE_POLICY_TYPE]);

      const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
      cy.checkText(row.changeLink(), expected);

      const expectedHref = `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#heading`;
      row.changeLink().should('have.attr', 'href', expectedHref);
    });

    it('renders `Policy length` key, value and change link', () => {
      const row = list[SINGLE_POLICY_LENGTH];
      const expectedKeyText = FIELDS[SINGLE_POLICY_LENGTH].SUMMARY.TITLE;

      cy.checkText(row.key(), expectedKeyText);

      const expectedValue = `${submissionData[SINGLE_POLICY_LENGTH]} months`;
      cy.checkText(row.value(), expectedValue);

      const expectedChangeLink = `${LINKS.CHANGE} ${expectedKeyText}`;
      cy.checkText(row.changeLink(), expectedChangeLink);

      const expectedHref = `${ROUTES.QUOTE.POLICY_TYPE_CHANGE}#${SINGLE_POLICY_LENGTH}-label`;
      row.changeLink().should('have.attr', 'href', expectedHref);
    });

    it('renders `Contract value` key, value with no decimal points and change link', () => {
      const row = list[CONTRACT_VALUE];
      const expectedKeyText = FIELDS[CONTRACT_VALUE].SUMMARY.TITLE;

      cy.checkText(row.key(), expectedKeyText);

      const expectedValue = '£150,000';
      cy.checkText(row.value(), expectedValue);

      const expectedChangeLink = `${LINKS.CHANGE} ${expectedKeyText}`;
      cy.checkText(row.changeLink(), expectedChangeLink);

      const expectedHref = `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CONTRACT_VALUE}-label`;
      row.changeLink().should('have.attr', 'href', expectedHref);
    });

    it('renders `Percentage of cover` key, value and change link', () => {
      const row = list[PERCENTAGE_OF_COVER];
      const expectedKeyText = FIELDS[PERCENTAGE_OF_COVER].SUMMARY.TITLE;

      cy.checkText(row.key(), expectedKeyText);

      const expectedValue = `${submissionData[PERCENTAGE_OF_COVER]}%`;
      cy.checkText(row.value(), expectedValue);

      const expectedChangeLink = `${LINKS.CHANGE} ${expectedKeyText}`;
      cy.checkText(row.changeLink(), expectedChangeLink);

      const expectedHref = `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${PERCENTAGE_OF_COVER}-label`;
      row.changeLink().should('have.attr', 'href', expectedHref);
    });

    it('does NOT render `Credit period` key, value or change link', () => {
      const row = list[CREDIT_PERIOD];

      row.key().should('not.exist');
      row.value().should('not.exist');
      row.changeLink().should('not.exist');
    });
  });

  context('form submission', () => {
    it(`should redirect to ${ROUTES.QUOTE.YOUR_QUOTE}`, () => {
      submitButton().click();

      cy.url().should('include', ROUTES.QUOTE.YOUR_QUOTE);
    });
  });
});
