import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INVALID_PHONE_NUMBERS, WEBSITE_EXAMPLES } from '../../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { PHONE_NUMBER, WEBSITE },
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: { COMPANY_DETAILS },
} = INSURANCE_ROUTES;

const COMPANY_DETAILS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const companyDetailsFormVariables = {
  [WEBSITE]: WEBSITE_EXAMPLES.VALID,
};

const completeAllFields = () => {
  cy.completeCompanyDetailsForm(companyDetailsFormVariables);
};

const assertions = {
  field: fieldSelector(PHONE_NUMBER),
  expectedErrorMessage: COMPANY_DETAILS_ERRORS[PHONE_NUMBER].INCORRECT_FORMAT,
};

const baseUrl = Cypress.config('baseUrl');

describe("Insurance - Your business - Company details page - As an Exporter I want to enter details about my business in 'your business' section - phone number validation - invalid phone number", () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection({});

      cy.completeCompanyDetailsForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${COMPANY_DETAILS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`when ${PHONE_NUMBER} is incorrectly entered`, () => {
    describe('invalid long landline phone number', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields();
      });

      it('should render validation errors', () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          value: INVALID_PHONE_NUMBERS.LANDLINE.LONG,
        });
      });
    });

    describe('international phone number', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields();
      });

      it('should render validation errors', () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          value: INVALID_PHONE_NUMBERS.INTERNATIONAL,
        });
      });
    });

    describe('international phone number with full code', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields();
      });

      it('should render validation errors', () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          value: INVALID_PHONE_NUMBERS.INTERNATIONAL_PLUS,
        });
      });
    });

    describe('mobile number with too many numbers', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields();
      });

      it('should render validation errors', () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          value: INVALID_PHONE_NUMBERS.MOBILE.LONG,
        });
      });
    });

    describe('landline number with too few numbers', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields();
      });

      it('should render validation errors', () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          value: INVALID_PHONE_NUMBERS.LANDLINE.SHORT,
        });
      });
    });

    describe('special characters in phone number', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields();
      });

      it('should render validation errors', () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          value: INVALID_PHONE_NUMBERS.LANDLINE.SPECIAL_CHAR,
        });
      });
    });

    describe('letters in phone number', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields();
      });

      it('should render validation errors', () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          value: INVALID_PHONE_NUMBERS.LANDLINE.LETTER,
        });
      });
    });

    describe('special characters in mobile number', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields();
      });

      it('should render validation errors', () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          value: INVALID_PHONE_NUMBERS.MOBILE.SPECIAL_CHAR,
        });
      });
    });

    describe('too short a number with special chars', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields();
      });

      it('should render validation errors', () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          value: INVALID_PHONE_NUMBERS.TOO_SHORT,
        });
      });
    });

    describe('should render validation errors for a number above the maximum allowed characters', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        completeAllFields();
      });

      it('should render validation errors', () => {
        cy.submitAndAssertFieldErrors({
          ...assertions,
          value: INVALID_PHONE_NUMBERS.ABOVE_MAX_CHARS,
        });
      });
    });
  });
});
