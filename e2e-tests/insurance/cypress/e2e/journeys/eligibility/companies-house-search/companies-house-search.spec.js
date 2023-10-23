import {
  field, yesRadio, yesRadioInput, noRadio, submitButton,
} from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { PAGES, ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELDS_ELIGIBILITY as FIELDS } from '../../../../../../content-strings/fields/insurance/eligibility';
import {
  ROUTES,
  FIELD_VALUES,
  COMPANIES_HOUSE_NUMBER as VALID_COMPANIES_HOUSE_NUMBER,
  COMPANIES_HOUSE_NUMBER_EMPTY,
  COMPANIES_HOUSE_NUMBER_TOO_SHORT,
  COMPANIES_HOUSE_NUMBER_WITH_SPECIAL_CHARACTERS,
  COMPANIES_HOUSE_NUMBER_WITH_SPACE,
  COMPANIES_HOUSE_NUMBER_NOT_FOUND,
} from '../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER;

const COMPANY_HOUSE_ERRORS = ERROR_MESSAGES.INSURANCE.ELIGIBILITY;

const {
  ELIGIBILITY: { COMPANIES_HOUSE_NUMBER: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const insuranceStartRoute = ROUTES.INSURANCE.START;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Eligibility - Companies house search page - I want to check if I can use online service to apply for UKEF Export Insurance Policy', () => {
  const url = `${baseUrl}${ROUTES.INSURANCE.ELIGIBILITY.ENTER_COMPANIES_HOUSE_NUMBER}`;
  let companyNumber;

  before(() => {
    cy.navigateToUrl(insuranceStartRoute);

    cy.completeStartForm();
    cy.completeCheckIfEligibleForm();
    cy.completeExporterLocationForm();
    cy.completeCompaniesHouseNumberForm();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.INSURANCE.ELIGIBILITY.ENTER_COMPANIES_HOUSE_NUMBER,
      backLink: ROUTES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER,
      assertAuthenticatedHeader: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should render a ${FIELD_ID} input`, () => {
      field(FIELD_ID).input().should('exist');
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should display the `is empty` error', () => {
        cy.submitAndAssertFieldErrors(field(FIELD_ID), companyNumber, 0, 1, COMPANY_HOUSE_ERRORS[FIELD_ID].IS_EMPTY);
      });
    });

    describe('when the companies house number is blank', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        companyNumber = COMPANIES_HOUSE_NUMBER_EMPTY;
      });

      it('should display the `is empty` error', () => {
        cy.submitAndAssertFieldErrors(field(FIELD_ID), companyNumber, 0, 1, COMPANY_HOUSE_ERRORS[FIELD_ID].IS_EMPTY);
      });
    });

    describe('when the companies house number is too short', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        companyNumber = COMPANIES_HOUSE_NUMBER_TOO_SHORT;

        // cy.interceptCompaniesHousePost({ companyNumber });
      });

      it('should display the `incorrect format` error', () => {
        cy.submitAndAssertFieldErrors(field(FIELD_ID), companyNumber, 0, 1, COMPANY_HOUSE_ERRORS[FIELD_ID].INCORRECT_FORMAT);
      });
    });

    describe('when the companies house number has special characters', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        companyNumber = COMPANIES_HOUSE_NUMBER_WITH_SPECIAL_CHARACTERS;

        cy.interceptCompaniesHousePost({ companyNumber });
      });

      it('should display the `incorrect format` error', () => {
        cy.submitAndAssertFieldErrors(field(FIELD_ID), companyNumber, 0, 1, COMPANY_HOUSE_ERRORS[FIELD_ID].INCORRECT_FORMAT);
      });
    });

    describe('when the companies house number has a space', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        companyNumber = COMPANIES_HOUSE_NUMBER_WITH_SPACE;
      });

      it('should display the `incorrect format` error', () => {
        cy.submitAndAssertFieldErrors(field(FIELD_ID), companyNumber, 0, 1, COMPANY_HOUSE_ERRORS[FIELD_ID].INCORRECT_FORMAT);
      });
    });

    describe('when the companies house number is not found', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        companyNumber = COMPANIES_HOUSE_NUMBER_NOT_FOUND;

        cy.interceptCompaniesHousePost({ companyNumber });
      });

      it('should display the `incorrect format` error', () => {
        cy.submitAndAssertFieldErrors(field(FIELD_ID), companyNumber, 0, 1, COMPANY_HOUSE_ERRORS[FIELD_ID].NOT_FOUND);
      });
    });

    describe('when submitting the answer a valid companies house number', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.interceptCompaniesHousePost({ companyNumber });

        cy.keyboardInput(
          field(FIELD_ID).input(),
          VALID_COMPANIES_HOUSE_NUMBER,
        );

        submitButton().click();
      });

      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.COMPANY_DETAILS}`, () => {
        const expected = `${baseUrl}${ROUTES.INSURANCE.ELIGIBILITY.COMPANY_DETAILS}`;

        cy.assertUrl(expected);
      });

      describe('when going back to the page', () => {
        it('should have the originally submitted answer selected', () => {
          cy.clickBackLink();

          cy.checkValue(
            field(FIELD_ID),
            VALID_COMPANIES_HOUSE_NUMBER,
          );
        });
      });
    });
  });
});
