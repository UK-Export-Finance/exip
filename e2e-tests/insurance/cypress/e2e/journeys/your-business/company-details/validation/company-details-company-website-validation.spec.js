import { companyDetails } from '../../../../../../../pages/your-business';
import { submitButton } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import partials from '../../../../../../../partials';
import {
  ROUTES, FIELD_IDS, COMPANIES_HOUSE_NUMBER, WEBSITE_EXAMPLES,
} from '../../../../../../../constants';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: {
      WEBSITE,
    },
  },
} = FIELD_IDS.INSURANCE;

const COMPANY_DETAILS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

const expectedErrors = 1;
const errorIndex = 0;
const errorMessage = COMPANY_DETAILS_ERRORS[WEBSITE].INCORRECT_FORMAT;

let yourContactUrl;
let url;

describe("Insurance - Your business - Company details page - As an Exporter I want to enter details about my business in 'your business' section - company website validation", () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;
      yourContactUrl = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.CONTACT}`;

      task.link().click();

      cy.completeAndSubmitCompaniesHouseSearchForm({ referenceNumber, companiesHouseNumber: COMPANIES_HOUSE_NUMBER });

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`${WEBSITE} error`, () => {
    describe('invalid website format', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.completeCompanyDetailsForm({});
      });

      it('should display validation errors', () => {
        cy.submitAndAssertFieldErrors(
          companyDetails[WEBSITE],
          WEBSITE_EXAMPLES.INVALID,
          errorIndex,
          expectedErrors,
          errorMessage,
        );
      });
    });

    describe('website above 191 characters', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.completeCompanyDetailsForm({});
      });

      it('should display validation errors', () => {
        cy.submitAndAssertFieldErrors(
          companyDetails[WEBSITE],
          WEBSITE_EXAMPLES.ABOVE_MAX_LENGTH,
          errorIndex,
          expectedErrors,
          errorMessage,
        );
      });
    });
  });

  describe(`when ${WEBSITE} is left empty`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeCompanyDetailsForm({});

      companyDetails[WEBSITE].input().clear();
      submitButton().click();
    });

    it('should not display validation errors', () => {
      partials.errorSummaryListItems().should('have.length', 0);
    });

    it(`should redirect to ${yourContactUrl}`, () => {
      cy.assertUrl(yourContactUrl);
    });
  });

  describe(`when ${WEBSITE} is correctly entered`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeCompanyDetailsForm({});

      companyDetails[WEBSITE].input().clear().type(WEBSITE_EXAMPLES.VALID);
      submitButton().click();
    });

    it('should not display validation errors', () => {
      partials.errorSummaryListItems().should('have.length', 0);
    });

    it(`should redirect to ${yourContactUrl}`, () => {
      cy.assertUrl(yourContactUrl);
    });
  });
});
