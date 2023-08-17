import { companyDetails } from '../../../../../../../pages/your-business';
import { submitButton } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import partials from '../../../../../../../partials';
import { ROUTES, FIELD_IDS, COMPANIES_HOUSE_NUMBER } from '../../../../../../../constants';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: {
      TRADING_ADDRESS,
      TRADING_NAME,
    },
  },
} = FIELD_IDS.INSURANCE;

const COMPANY_DETAILS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const { taskList } = partials.insurancePartials;
const task = taskList.prepareApplication.tasks.business;

describe("Insurance - Your business - Company details page - As an Exporter I want to enter details about my business in 'your business' section - trading address validation", () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;

      task.link().click();

      cy.completeCompaniesHouseNumberForm({ companiesHouseNumber: COMPANIES_HOUSE_NUMBER });

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    companyDetails[TRADING_NAME].yesRadioInput().click();

    submitButton().click();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should display validation errors if trading address question is not answered', () => {
    cy.checkErrorSummaryListHeading();

    cy.submitAndAssertRadioErrors(companyDetails[TRADING_ADDRESS], 0, 1, COMPANY_DETAILS_ERRORS[TRADING_ADDRESS].IS_EMPTY);
  });
});
