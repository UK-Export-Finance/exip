import { companyDetails } from '../../../../pages/your-business';
import { saveAndBackButton, yesRadioInput } from '../../../../pages/shared';
import {
  ROUTES, FIELD_IDS, INVALID_PHONE_NUMBERS, WEBSITE_EXAMPLES, COMPANIES_HOUSE_NUMBER, VALID_PHONE_NUMBERS,
} from '../../../../../../constants';
import getReferenceNumber from '../../../../helpers/get-reference-number';

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

describe("Insurance - Your business - Company details page - As an Exporter I want to enter details about my business in 'your business' section - Save and go back", () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;

      cy.navigateToUrl(url);

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it(`should not display validation errors and redirect to task list if only ${TRADING_ADDRESS} and ${TRADING_NAME} fields are completed`, () => {
    yesRadioInput().first().click();
    yesRadioInput().eq(1).click();
    saveAndBackButton().click();

    cy.url().should('eq', `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  });

  it(`should not display validation errors and redirect to task list if required fields are completed and ${INPUT} is entered incorrectly`, () => {
    cy.navigateToUrl(url);

    companyDetails.companiesHouseSearch().clear().type('**/*');
    yesRadioInput().first().click();
    yesRadioInput().eq(1).click();
    saveAndBackButton().click();

    cy.url().should('eq', `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  });

  it(`should not display validation errors and redirect to task list if required fields are completed and ${PHONE_NUMBER} is entered incorrectly`, () => {
    cy.navigateToUrl(url);

    companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
    yesRadioInput().first().click();
    yesRadioInput().eq(1).click();
    companyDetails.phoneNumber().clear().type(INVALID_PHONE_NUMBERS.LANDLINE.SPECIAL_CHAR);
    saveAndBackButton().click();

    cy.url().should('eq', `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  });

  it(`should not display validation errors and redirect to task list if required fields are completed and ${WEBSITE} is entered incorrectly`, () => {
    cy.navigateToUrl(url);

    companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
    yesRadioInput().first().click();
    yesRadioInput().eq(1).click();
    companyDetails.phoneNumber().clear().type(VALID_PHONE_NUMBERS.LANDLINE.NORMAL);
    companyDetails.companyWebsite().clear().type(WEBSITE_EXAMPLES.INVALID);
    saveAndBackButton().click();

    cy.url().should('eq', `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  });

  it('should not display validation errors and redirect to task list if all fields are entered correctly', () => {
    cy.navigateToUrl(url);

    companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
    yesRadioInput().first().click();
    yesRadioInput().eq(1).click();
    companyDetails.phoneNumber().clear().type(VALID_PHONE_NUMBERS.LANDLINE.NORMAL);
    companyDetails.companyWebsite().clear().type(WEBSITE_EXAMPLES.VALID);
    saveAndBackButton().click();

    cy.url().should('eq', `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  });
});
