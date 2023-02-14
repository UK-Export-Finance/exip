import { companyDetails } from '../../../../pages/your-business';
import { saveAndBackButton } from '../../../../pages/shared';
import partials from '../../../../partials';
import {
  ROUTES, FIELD_IDS, INVALID_PHONE_NUMBERS, WEBSITE_EXAMPLES, COMPANIES_HOUSE_NUMBER, VALID_PHONE_NUMBERS,
} from '../../../../../../constants';
import { TASKS } from '../../../../../../content-strings';

const { ALL_SECTIONS } = ROUTES.INSURANCE;

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: {
      INPUT,
    },
    YOUR_COMPANY: {
      TRADING_NAME,
      TRADING_ADDRESS,
      WEBSITE,
      PHONE_NUMBER,
    },
  },
} = FIELD_IDS.INSURANCE;

const { taskList } = partials.insurancePartials;
const task = taskList.prepareApplication.tasks.exporterBusiness;

const { IN_PROGRESS } = TASKS.STATUS;

describe('Insurance - Your business - Company details page - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    cy.getReferenceNumber().then((id) => {
      referenceNumber = id;

      url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;

      cy.navigateToUrl(url);

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  describe(`when only ${TRADING_ADDRESS} and ${TRADING_NAME} fields are completed`, () => {
    it('should not display validation errors and redirect to task list with status of "In progress"', () => {
      cy.navigateToUrl(url);

      companyDetails.tradingNameYesRadioInput().click();
      companyDetails.tradingAddressYesRadioInput().click();
      saveAndBackButton().click();

      cy.url().should('eq', `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ALL_SECTIONS}`);
      cy.checkTaskStatus(task, IN_PROGRESS);
    });

    it('should render valid submitted values when going back to the page', () => {
      cy.navigateToUrl(url);

      companyDetails.tradingNameYesRadioInput().should('be.checked');
      companyDetails.tradingAddressYesRadioInput().should('be.checked');
    });
  });

  describe(`when required fields are completed and ${INPUT} is entered incorrectly`, () => {
    it('should not display validation errors and redirect to task list', () => {
      cy.navigateToUrl(url);

      companyDetails.companiesHouseSearch().clear().type('**/*');
      companyDetails.tradingNameYesRadioInput().click();
      companyDetails.tradingAddressYesRadioInput().click();
      saveAndBackButton().click();

      cy.url().should('eq', `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ALL_SECTIONS}`);
      cy.checkTaskStatus(task, IN_PROGRESS);
    });

    it('should render valid submitted values when going back to the page', () => {
      cy.navigateToUrl(url);

      companyDetails.companiesHouseSearch().should('be.empty');
      companyDetails.tradingNameYesRadioInput().should('be.checked');
      companyDetails.tradingAddressYesRadioInput().should('be.checked');
    });
  });

  describe(`when required fields are completed and ${PHONE_NUMBER} is entered incorrectly`, () => {
    it('should not display validation errors and redirect to task list', () => {
      cy.navigateToUrl(url);

      companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
      companyDetails.tradingNameYesRadioInput().click();
      companyDetails.tradingAddressYesRadioInput().click();
      companyDetails.phoneNumber().clear().type(INVALID_PHONE_NUMBERS.LANDLINE.SPECIAL_CHAR);
      saveAndBackButton().click();

      cy.url().should('eq', `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ALL_SECTIONS}`);
      cy.checkTaskStatus(task, IN_PROGRESS);
    });

    it('should render valid submitted values when going back to the page', () => {
      cy.navigateToUrl(url);

      companyDetails.companiesHouseSearch().should('have.value', COMPANIES_HOUSE_NUMBER);
      companyDetails.tradingNameYesRadioInput().should('be.checked');
      companyDetails.tradingAddressYesRadioInput().should('be.checked');
      companyDetails.phoneNumber().should('be.empty');
    });
  });

  describe(`when required required fields are completed and ${WEBSITE} is entered incorrectly`, () => {
    it('should not display validation errors and redirect to task list', () => {
      cy.navigateToUrl(url);

      companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
      companyDetails.tradingNameYesRadioInput().click();
      companyDetails.tradingAddressYesRadioInput().click();
      companyDetails.phoneNumber().clear().type(VALID_PHONE_NUMBERS.LANDLINE.NORMAL);
      companyDetails.companyWebsite().clear().type(WEBSITE_EXAMPLES.INVALID);
      saveAndBackButton().click();

      cy.url().should('eq', `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ALL_SECTIONS}`);
      cy.checkTaskStatus(task, IN_PROGRESS);
    });

    it('should render valid submitted values when going back to the page', () => {
      cy.navigateToUrl(url);

      companyDetails.companiesHouseSearch().should('have.value', COMPANIES_HOUSE_NUMBER);
      companyDetails.tradingNameYesRadioInput().should('be.checked');
      companyDetails.tradingAddressYesRadioInput().should('be.checked');
      companyDetails.phoneNumber().should('have.value', VALID_PHONE_NUMBERS.LANDLINE.NORMAL);
      companyDetails.companyWebsite().should('be.empty');
    });
  });

  describe('when all fields are entered correctly', () => {
    it('should not display validation errors and redirect to task list if all fields are entered correctly', () => {
      cy.navigateToUrl(url);

      companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
      companyDetails.tradingNameYesRadioInput().click();
      companyDetails.tradingAddressYesRadioInput().click();
      companyDetails.phoneNumber().clear().type(VALID_PHONE_NUMBERS.LANDLINE.NORMAL);
      companyDetails.companyWebsite().clear().type(WEBSITE_EXAMPLES.VALID);
      saveAndBackButton().click();

      cy.url().should('eq', `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ALL_SECTIONS}`);
      cy.checkTaskStatus(task, IN_PROGRESS);
    });

    it('should render valid submitted values when going back to the page', () => {
      cy.navigateToUrl(url);

      companyDetails.companiesHouseSearch().should('have.value', COMPANIES_HOUSE_NUMBER);
      companyDetails.tradingNameYesRadioInput().should('be.checked');
      companyDetails.tradingAddressYesRadioInput().should('be.checked');
      companyDetails.phoneNumber().should('have.value', VALID_PHONE_NUMBERS.LANDLINE.NORMAL);
      companyDetails.companyWebsite().should('have.value', WEBSITE_EXAMPLES.VALID);
    });
  });
});
