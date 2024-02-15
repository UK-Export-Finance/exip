import { companyDetails } from '../../../../../../../pages/your-business';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../../constants';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: {
      TRADING_ADDRESS,
    },
  },
} = FIELD_IDS.INSURANCE;

const COMPANY_DETAILS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const baseUrl = Cypress.config('baseUrl');

describe("Insurance - Your business - Company details page - As an Exporter I want to enter details about my business in 'your business' section - trading address validation", () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;

      cy.startYourBusinessSection({});

      cy.completeCompanyDetailsForm({});

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    cy.clickNoRadioInput();

    cy.clickSubmitButton();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should display validation errors if trading address question is not answered', () => {
    const field = companyDetails[TRADING_ADDRESS];

    const radioField = {
      ...field,
      input: field.noRadioInput,
    };

    cy.submitAndAssertRadioErrors(radioField, 0, 1, COMPANY_DETAILS_ERRORS[TRADING_ADDRESS].IS_EMPTY);
  });
});
