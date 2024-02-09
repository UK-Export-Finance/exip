import { companyDetails } from '../../../../../../pages/your-business';
import { field as fieldSelector } from '../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import {
  INVALID_PHONE_NUMBERS, WEBSITE_EXAMPLES, VALID_PHONE_NUMBERS,
} from '../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: {
      HAS_DIFFERENT_TRADING_NAME,
      TRADING_ADDRESS,
      WEBSITE,
      PHONE_NUMBER,
    },
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: {
    COMPANY_DETAILS,
    NATURE_OF_BUSINESS_ROOT,
  },
} = INSURANCE_ROUTES;

const COMPANY_DETAILS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const INVALID_PHONE_NUMBER = INVALID_PHONE_NUMBERS.LANDLINE.LONG;

const expectedErrors = 4;

const baseUrl = Cypress.config('baseUrl');

describe("Insurance - Your business - Company details page - As an Exporter I want to enter details about my business in 'your business' section", () => {
  let referenceNumber;
  let url;
  let natureOfBusinessUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROOT}/${referenceNumber}${COMPANY_DETAILS}`;
      natureOfBusinessUrl = `${baseUrl}${ROOT}/${referenceNumber}${NATURE_OF_BUSINESS_ROOT}`;

      cy.startYourBusinessSection({});

      cy.completeCompanyDetailsForm({});

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    cy.keyboardInput(fieldSelector(WEBSITE).input(), WEBSITE_EXAMPLES.INVALID);
    cy.keyboardInput(fieldSelector(PHONE_NUMBER).input(), INVALID_PHONE_NUMBERS.LANDLINE.LONG);

    cy.clickSubmitButton();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('all page errors', () => {
    it('should display the validation error for trading name in radio error summary', () => {
      const field = companyDetails[HAS_DIFFERENT_TRADING_NAME];

      const radioField = {
        ...field,
        input: field.noRadioInput,
      };

      cy.submitAndAssertRadioErrors(radioField, 0, expectedErrors, COMPANY_DETAILS_ERRORS[HAS_DIFFERENT_TRADING_NAME].IS_EMPTY);
    });

    it('should display the validation error for trading address in radio error summary', () => {
      const field = companyDetails[TRADING_ADDRESS];

      const radioField = {
        ...field,
        input: field.noRadioInput,
      };

      cy.submitAndAssertRadioErrors(radioField, 1, expectedErrors, COMPANY_DETAILS_ERRORS[TRADING_ADDRESS].IS_EMPTY);
    });

    it('should display the validation error for company website in company website section', () => {
      cy.submitAndAssertFieldErrors(fieldSelector(WEBSITE), WEBSITE_EXAMPLES.INVALID, 2, expectedErrors, COMPANY_DETAILS_ERRORS[WEBSITE].INCORRECT_FORMAT);
    });

    it('should display the validation error for phone number in phone number section', () => {
      cy.submitAndAssertFieldErrors(
        fieldSelector(PHONE_NUMBER),
        INVALID_PHONE_NUMBER,
        3,
        expectedErrors,
        COMPANY_DETAILS_ERRORS[PHONE_NUMBER].INCORRECT_FORMAT,
      );
    });
  });

  describe('continue to next page', () => {
    const companyDetailsFormVariables = {
      [PHONE_NUMBER]: VALID_PHONE_NUMBERS.LANDLINE.NORMAL,
      [WEBSITE]: WEBSITE_EXAMPLES.VALID,
    };

    describe('when required fields entered correctly', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.completeCompanyDetailsForm({});

        cy.clickSubmitButton();
      });

      it(`should redirect to ${NATURE_OF_BUSINESS_ROOT}`, () => {
        cy.assertUrl(natureOfBusinessUrl);
      });
    });

    describe('when required and optional fields are entered correctly', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.completeCompanyDetailsForm(companyDetailsFormVariables);

        cy.clickSubmitButton();
      });

      it(`should redirect to ${NATURE_OF_BUSINESS_ROOT}`, () => {
        cy.assertUrl(natureOfBusinessUrl);
      });
    });
  });
});
