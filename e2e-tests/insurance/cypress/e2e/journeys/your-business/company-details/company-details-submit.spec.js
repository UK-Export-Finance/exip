import { companyDetails } from '../../../../../../pages/your-business';
import { submitButton } from '../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import partials from '../../../../../../partials';
import {
  ROUTES, FIELD_IDS, INVALID_PHONE_NUMBERS, WEBSITE_EXAMPLES, COMPANIES_HOUSE_NUMBER, VALID_PHONE_NUMBERS,
} from '../../../../../../constants';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: {
      TRADING_NAME,
      TRADING_ADDRESS,
      WEBSITE,
      PHONE_NUMBER,
    },
  },
} = FIELD_IDS.INSURANCE;

const COMPANY_DETAILS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

const INVALID_PHONE_NUMBER = INVALID_PHONE_NUMBERS.LANDLINE.LONG;

const expectedErrors = 4;

describe("Insurance - Your business - Company details page - As an Exporter I want to enter details about my business in 'your business' section", () => {
  let referenceNumber;
  let url;
  let contactUrl;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;
      contactUrl = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.CONTACT}`;

      task.link().click();

      cy.completeCompaniesHouseNumberForm({ companiesHouseNumber: COMPANIES_HOUSE_NUMBER });

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    cy.keyboardInput(companyDetails[WEBSITE].input(), WEBSITE_EXAMPLES.INVALID);
    cy.keyboardInput(companyDetails[PHONE_NUMBER].input(), INVALID_PHONE_NUMBERS.LANDLINE.LONG);

    submitButton().click();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('all page errors', () => {
    it('should display the validation error for trading name in radio error summary', () => {
      cy.submitAndAssertRadioErrors(companyDetails[TRADING_NAME], 0, expectedErrors, COMPANY_DETAILS_ERRORS[TRADING_NAME].IS_EMPTY);
    });

    it('should display the validation error for trading address in radio error summary', () => {
      cy.submitAndAssertRadioErrors(companyDetails[TRADING_ADDRESS], 1, expectedErrors, COMPANY_DETAILS_ERRORS[TRADING_ADDRESS].IS_EMPTY, 1);
    });

    it('should display the validation error for company website in company website section', () => {
      cy.submitAndAssertFieldErrors(companyDetails[WEBSITE], WEBSITE_EXAMPLES.INVALID, 2, expectedErrors, COMPANY_DETAILS_ERRORS[WEBSITE].INCORRECT_FORMAT);
    });

    it('should display the validation error for phone number in phone number section', () => {
      cy.submitAndAssertFieldErrors(
        companyDetails[PHONE_NUMBER],
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

        submitButton().click();
      });

      it(`should redirect to ${contactUrl}`, () => {
        cy.assertUrl(contactUrl);
      });
    });

    describe('when required and optional fields are entered correctly', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.completeCompanyDetailsForm(companyDetailsFormVariables);

        submitButton().click();
      });

      it(`should redirect to ${contactUrl}`, () => {
        cy.assertUrl(contactUrl);
      });
    });
  });
});
