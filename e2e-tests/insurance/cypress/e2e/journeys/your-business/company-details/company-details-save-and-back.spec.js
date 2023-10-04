import { companyDetails } from '../../../../../../pages/your-business';
import { field, saveAndBackButton, yesRadioInput } from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import {
  ROUTES, FIELD_IDS, INVALID_PHONE_NUMBERS, WEBSITE_EXAMPLES, COMPANIES_HOUSE_NUMBER, VALID_PHONE_NUMBERS,
} from '../../../../../../constants';
import { TASKS } from '../../../../../../content-strings';

const { ALL_SECTIONS } = ROUTES.INSURANCE;

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

const { taskList } = partials.insurancePartials;
const task = taskList.prepareApplication.tasks.business;

const { IN_PROGRESS } = TASKS.STATUS;

const baseUrl = Cypress.config('baseUrl');

describe('Insurance - Your business - Company details page - Save and go back', () => {
  let referenceNumber;
  let url;

  const companyDetailsFormVariables = {};

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;

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

  describe(`when only ${TRADING_ADDRESS} and ${TRADING_NAME} fields are completed`, () => {
    it('should not display validation errors and redirect to task list with status of "In progress"', () => {
      cy.navigateToUrl(url);

      yesRadioInput().first().click();
      yesRadioInput().eq(1).click();
      saveAndBackButton().click();

      cy.assertUrl(`${baseUrl}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ALL_SECTIONS}`);
      cy.checkTaskStatus(task, IN_PROGRESS);
    });

    it('should render valid submitted values when going back to the page', () => {
      cy.navigateToUrl(url);

      yesRadioInput().first().should('be.checked');
      yesRadioInput().eq(1).should('be.checked');
    });
  });

  describe(`when required fields are completed and ${PHONE_NUMBER} is entered incorrectly`, () => {
    it('should not display validation errors and redirect to task list', () => {
      cy.navigateToUrl(url);

      companyDetailsFormVariables[PHONE_NUMBER] = INVALID_PHONE_NUMBERS.LANDLINE.SPECIAL_CHAR;

      cy.completeCompanyDetailsForm(companyDetailsFormVariables);

      saveAndBackButton().click();

      cy.assertUrl(`${baseUrl}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ALL_SECTIONS}`);
      cy.checkTaskStatus(task, IN_PROGRESS);
    });

    it('should render valid submitted values when going back to the page', () => {
      cy.navigateToUrl(url);

      yesRadioInput().first().should('be.checked');
      yesRadioInput().eq(1).should('be.checked');
      field(PHONE_NUMBER).input().should('be.empty');
    });
  });

  describe(`when required required fields are completed and ${WEBSITE} is entered incorrectly`, () => {
    it('should not display validation errors and redirect to task list', () => {
      cy.navigateToUrl(url);

      companyDetailsFormVariables[PHONE_NUMBER] = VALID_PHONE_NUMBERS.LANDLINE.NORMAL;
      companyDetailsFormVariables[WEBSITE] = WEBSITE_EXAMPLES.INVALID;

      cy.completeCompanyDetailsForm(companyDetailsFormVariables);

      saveAndBackButton().click();

      cy.assertUrl(`${baseUrl}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ALL_SECTIONS}`);
      cy.checkTaskStatus(task, IN_PROGRESS);
    });

    it('should render valid submitted values when going back to the page', () => {
      cy.navigateToUrl(url);

      yesRadioInput().first().should('be.checked');
      yesRadioInput().eq(1).should('be.checked');
      cy.checkValue(companyDetails[PHONE_NUMBER], VALID_PHONE_NUMBERS.LANDLINE.NORMAL);
      field(WEBSITE).input().should('be.empty');
    });
  });

  describe('when all fields are entered correctly', () => {
    it('should not display validation errors and redirect to task list if all fields are entered correctly', () => {
      cy.navigateToUrl(url);

      companyDetailsFormVariables[PHONE_NUMBER] = VALID_PHONE_NUMBERS.LANDLINE.NORMAL;
      companyDetailsFormVariables[WEBSITE] = WEBSITE_EXAMPLES.VALID;

      cy.completeCompanyDetailsForm(companyDetailsFormVariables);

      saveAndBackButton().click();

      cy.assertUrl(`${baseUrl}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ALL_SECTIONS}`);
      cy.checkTaskStatus(task, IN_PROGRESS);
    });

    it('should render valid submitted values when going back to the page', () => {
      cy.navigateToUrl(url);

      yesRadioInput().first().should('be.checked');
      yesRadioInput().eq(1).should('be.checked');
      cy.checkValue(companyDetails[PHONE_NUMBER], VALID_PHONE_NUMBERS.LANDLINE.NORMAL);
      cy.checkValue(companyDetails[WEBSITE], WEBSITE_EXAMPLES.VALID);
    });
  });
});
