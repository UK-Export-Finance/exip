import { field as fieldSelector } from '../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import {
  COMPANIES_HOUSE_NUMBER as VALID_COMPANIES_HOUSE_NUMBER,
  COMPANIES_HOUSE_NUMBER_NO_LEADING_ZERO,
  COMPANIES_HOUSE_NUMBER_EMPTY,
  COMPANIES_HOUSE_NUMBER_TOO_SHORT,
  COMPANIES_HOUSE_NUMBER_WITH_SPECIAL_CHARACTERS,
  COMPANIES_HOUSE_NUMBER_WITH_SPACES,
  COMPANIES_HOUSE_NUMBER_NO_FINANCIAL_YEAR_END_DATE,
  COMPANIES_HOUSE_NUMBER_NOT_FOUND,
} from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';

const {
  ROOT,
  EXPORTER_BUSINESS: { ENTER_COMPANIES_HOUSE_NUMBER, COMPANY_DETAILS },
} = INSURANCE_ROUTES;

const COMPANIES_HOUSE_ERRORS = ERROR_MESSAGES.INSURANCE.ELIGIBILITY;

const {
  ELIGIBILITY: { COMPANIES_HOUSE_NUMBER: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const field = fieldSelector(FIELD_ID);

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Your business - Enter Companies House number - As an Exporter, I want to enter my Companies House number, So that I can apply for credit insurance with UKEF',
  () => {
    let referenceNumber;
    let url;
    let companyNumber;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.startYourBusinessSection({});

        url = `${baseUrl}${ROOT}/${referenceNumber}${ENTER_COMPANIES_HOUSE_NUMBER}`;

        cy.navigateToUrl(url);
        cy.assertUrl(url);
      });
    });

    beforeEach(() => {
      cy.saveSession();
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    describe('form submission', () => {
      describe('when submitting an empty form', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
        });

        it('should display the `is empty` error', () => {
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

        it('should display the `is empty` error', () => {
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

        it('should display the `incorrect format` error', () => {
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

        it('should display the `incorrect format` error', () => {
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

        it('should display the `not found` error', () => {
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
          const expected = `${baseUrl}${ROOT}/${referenceNumber}${COMPANY_DETAILS}`;

          cy.assertUrl(expected);
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
          const expected = `${baseUrl}${ROOT}/${referenceNumber}${COMPANY_DETAILS}`;

          cy.assertUrl(expected);
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
          const expected = `${baseUrl}${ROOT}/${referenceNumber}${COMPANY_DETAILS}`;

          cy.assertUrl(expected);
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
          const expected = `${baseUrl}${ROOT}/${referenceNumber}${COMPANY_DETAILS}`;

          cy.assertUrl(expected);
        });
      });
    });
  },
);
