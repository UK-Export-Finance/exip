import { field as fieldSelector } from '../../../../../../../pages/shared';
import { PAGES, ERROR_MESSAGES } from '../../../../../../../content-strings';
import {
  COMPANIES_HOUSE_NUMBER as VALID_COMPANIES_HOUSE_NUMBER,
  COMPANIES_HOUSE_NUMBER_NO_LEADING_ZERO,
  COMPANIES_HOUSE_NUMBER_EMPTY,
  COMPANIES_HOUSE_NUMBER_TOO_SHORT,
  COMPANIES_HOUSE_NUMBER_WITH_SPECIAL_CHARACTERS,
  COMPANIES_HOUSE_NUMBER_WITH_SPACES,
  COMPANIES_HOUSE_NUMBER_NO_FINANCIAL_YEAR_END_DATE,
  COMPANIES_HOUSE_NUMBER_NOT_FOUND,
} from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { ELIGIBILITY_FIELDS } from '../../../../../../../content-strings/fields/insurance/eligibility';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER;

const COMPANIES_HOUSE_ERRORS = ERROR_MESSAGES.INSURANCE.ELIGIBILITY;

const {
  ELIGIBILITY: { COMPANIES_HOUSE_NUMBER, ENTER_COMPANIES_HOUSE_NUMBER, COMPANY_DETAILS },
} = INSURANCE_ROUTES;

const {
  ELIGIBILITY: { COMPANIES_HOUSE_NUMBER: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const FIELD_STRINGS = ELIGIBILITY_FIELDS[FIELD_ID];

const field = fieldSelector(FIELD_ID);

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Eligibility - Companies house search page - I want to check if I can use online service to apply for UKEF Export Insurance Policy', () => {
  const url = `${baseUrl}${ENTER_COMPANIES_HOUSE_NUMBER}`;
  let companyNumber;

  before(() => {
    cy.completeAndSubmitEligibilityForms({ formToStopAt: 'companiesHouseNumber' });

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ENTER_COMPANIES_HOUSE_NUMBER,
      backLink: COMPANIES_HOUSE_NUMBER,
      assertAuthenticatedHeader: false,
      assertSaveAndBackButtonDoesNotExist: true,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should render a ${FIELD_ID} hint and input`, () => {
      field.input().should('exist');

      cy.checkText(field.hintIntro(), FIELD_STRINGS.HINT.INTRO);

      cy.checkLink(field.hintLink(), FIELD_STRINGS.HINT.LINK.HREF, FIELD_STRINGS.HINT.LINK.TEXT);
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render the `is empty` error', () => {
        cy.submitAndAssertFieldErrors({
          field,
          value: companyNumber,
          expectedErrorMessage: COMPANIES_HOUSE_ERRORS[FIELD_ID].IS_EMPTY,
        });
      });
    });

    describe('when the companies house number is empty', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        companyNumber = COMPANIES_HOUSE_NUMBER_EMPTY;
      });

      it('should render the `is empty` error', () => {
        cy.submitAndAssertFieldErrors({
          field,
          value: companyNumber,
          expectedErrorMessage: COMPANIES_HOUSE_ERRORS[FIELD_ID].IS_EMPTY,
        });
      });
    });

    describe('when the companies house number is too short', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        companyNumber = COMPANIES_HOUSE_NUMBER_TOO_SHORT;
      });

      it('should render the `incorrect format` error', () => {
        cy.submitAndAssertFieldErrors({
          field,
          value: companyNumber,
          expectedErrorMessage: COMPANIES_HOUSE_ERRORS[FIELD_ID].INCORRECT_FORMAT,
        });
      });
    });

    describe('when the companies house number has special characters', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        companyNumber = COMPANIES_HOUSE_NUMBER_WITH_SPECIAL_CHARACTERS;

        cy.interceptCompaniesHousePost({ companyNumber });
      });

      it('should render the `incorrect format` error', () => {
        cy.submitAndAssertFieldErrors({
          field,
          value: companyNumber,
          expectedErrorMessage: COMPANIES_HOUSE_ERRORS[FIELD_ID].INCORRECT_FORMAT,
        });
      });
    });

    describe('when the companies house number is not found', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        companyNumber = COMPANIES_HOUSE_NUMBER_NOT_FOUND;

        cy.interceptCompaniesHousePost({ companyNumber });
      });

      it('should render the `not found` error', () => {
        cy.submitAndAssertFieldErrors({
          field,
          value: companyNumber,
          expectedErrorMessage: COMPANIES_HOUSE_ERRORS[FIELD_ID].NOT_FOUND,
        });
      });
    });

    describe('when submitting the answer as a valid companies house number', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.interceptCompaniesHousePost({ companyNumber });

        cy.keyboardInput(field.input(), VALID_COMPANIES_HOUSE_NUMBER);

        cy.clickSubmitButton();
      });

      it(`should redirect to ${COMPANY_DETAILS}`, () => {
        const expected = `${baseUrl}${COMPANY_DETAILS}`;

        cy.assertUrl(expected);
      });

      describe('when going back to the page', () => {
        it('should have the originally submitted answer selected', () => {
          cy.clickBackLink();

          cy.checkValue(field, VALID_COMPANIES_HOUSE_NUMBER);
        });
      });
    });

    describe('when submitting the answer as a valid companies house number, with no leading zero', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.interceptCompaniesHousePost({ companyNumber: COMPANIES_HOUSE_NUMBER_NO_LEADING_ZERO });

        cy.keyboardInput(field.input(), COMPANIES_HOUSE_NUMBER_NO_LEADING_ZERO);

        cy.clickSubmitButton();
      });

      it(`should redirect to ${COMPANY_DETAILS}`, () => {
        const expected = `${baseUrl}${COMPANY_DETAILS}`;

        cy.assertUrl(expected);
      });

      describe('when going back to the page', () => {
        it('should have the originally submitted answer selected, with a leading zero', () => {
          cy.clickBackLink();

          const expected = `0${COMPANIES_HOUSE_NUMBER_NO_LEADING_ZERO}`;

          cy.checkValue(field, expected);
        });
      });
    });

    describe('when submitting the answer as a valid companies house number, with white spaces', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.interceptCompaniesHousePost({ companyNumber: COMPANIES_HOUSE_NUMBER_WITH_SPACES });

        cy.keyboardInput(field.input(), COMPANIES_HOUSE_NUMBER_WITH_SPACES);

        cy.clickSubmitButton();
      });

      it(`should redirect to ${COMPANY_DETAILS}`, () => {
        const expected = `${baseUrl}${COMPANY_DETAILS}`;

        cy.assertUrl(expected);
      });

      describe('when going back to the page', () => {
        it('should have the originally submitted answer selected, without white spaces', () => {
          cy.clickBackLink();

          const expected = `${COMPANIES_HOUSE_NUMBER_WITH_SPACES}`.replaceAll(' ', '');

          cy.checkValue(field, expected);
        });
      });
    });

    describe('when submitting the answer as a valid companies house number, in lowercase', () => {
      const lowerCaseCompaniesHouseNumber = COMPANIES_HOUSE_NUMBER_NO_FINANCIAL_YEAR_END_DATE.toLowerCase();

      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.interceptCompaniesHousePost({ companyNumber: lowerCaseCompaniesHouseNumber });

        cy.keyboardInput(field.input(), lowerCaseCompaniesHouseNumber);

        cy.clickSubmitButton();
      });

      it(`should redirect to ${COMPANY_DETAILS}`, () => {
        const expected = `${baseUrl}${COMPANY_DETAILS}`;

        cy.assertUrl(expected);
      });

      describe('when going back to the page', () => {
        it('should have the originally submitted answer selected, in uppercase', () => {
          cy.clickBackLink();

          const expected = lowerCaseCompaniesHouseNumber.toUpperCase();

          cy.checkValue(field, expected);
        });
      });
    });
  });
});
