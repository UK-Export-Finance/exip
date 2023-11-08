import { companyDetails } from '../../../../../../../pages/your-business';
import { submitButton, yesRadioInput } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import partials from '../../../../../../../partials';
import { ROUTES, FIELD_IDS } from '../../../../../../../constants';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: {
      TRADING_NAME,
    },
  },
} = FIELD_IDS.INSURANCE;

const COMPANY_DETAILS_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const { taskList } = partials.insurancePartials;
const task = taskList.prepareApplication.tasks.business;

describe("Insurance - Your business - Company details page- As an Exporter I want to enter details about my business in 'your business' section - trading name validation", () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;

      task.link().click();

      cy.completeCompanyDetailsForm({});

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    yesRadioInput().eq(1).click();

    submitButton().click();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should display validation errors if trading name question is not answered', () => {
    const field = companyDetails[TRADING_NAME];

    const radioField = {
      ...field,
      input: field.yesRadioInput,
    };

    cy.submitAndAssertRadioErrors(radioField, 0, 1, COMPANY_DETAILS_ERRORS[TRADING_NAME].IS_EMPTY);
  });
});
