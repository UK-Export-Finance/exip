import { companyDetails } from '../../../../pages/your-business';
import { ERROR_MESSAGES, DEFAULT } from '../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/business';
import partials from '../../../../partials';
import { saveAndBackButton, submitButton, backLink } from '../../../../pages/shared';
import {
  ROUTES, FIELD_IDS, COMPANIES_HOUSE_NUMBER, COMPANIES_HOUSE_NUMBER_NO_SIC_CODE, COMPANIES_HOUSE_NUMBER_MULTIPLE_SIC_CODES,
} from '../../../../../../constants';
import application from '../../../../../fixtures/application';

const { ROOT } = ROUTES.INSURANCE;

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: {
      COMPANY_NAME,
      COMPANY_ADDRESS,
      COMPANY_NUMBER,
      COMPANY_INCORPORATED,
      COMPANY_SIC,
      INDUSTRY_SECTOR_NAME,
      SUMMARY_LIST,
    },
  },
} = FIELD_IDS.INSURANCE;

const COMPANY_HOUSE_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;
const SUMMARY_LIST_FIELDS = FIELDS[SUMMARY_LIST];

const COMPANIES_HOUSE_INPUT_FIELD_ID = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.INPUT;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

context('Insurance - Your business - Company details page - company house search - As an Exporter I want to enter my business\'s Companies House Registration Number (CRN)', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;

      cy.navigateToUrl(url);

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when leaving companies house registration blank', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      companyDetails.companiesHouseSearchButton().click();
    });

    it('should display an error in the error summary', () => {
      cy.checkText(partials.errorSummaryListItems().first(), COMPANY_HOUSE_ERRORS[COMPANIES_HOUSE_INPUT_FIELD_ID].INCORRECT_FORMAT);
    });

    it('should focus to the input box when clicking the error', () => {
      partials.errorSummaryListItemLinks().eq(0).click();
      companyDetails.companiesHouseSearch().should('have.focus');
    });

    it('should display the error in the input error summary', () => {
      cy.checkText(companyDetails.companiesHouseSearchError(), `Error: ${COMPANY_HOUSE_ERRORS[COMPANIES_HOUSE_INPUT_FIELD_ID].INCORRECT_FORMAT}`);
    });
  });

  describe('when the companies house number is too short', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(companyDetails.companiesHouseSearch(), '1234');

      companyDetails.companiesHouseSearchButton().click();
    });

    it('should display an error in the error summary', () => {
      cy.checkText(partials.errorSummaryListItems().first(), COMPANY_HOUSE_ERRORS[COMPANIES_HOUSE_INPUT_FIELD_ID].INCORRECT_FORMAT);
    });

    it('should focus to the input box when clicking the error', () => {
      partials.errorSummaryListItemLinks().eq(0).click();
      companyDetails.companiesHouseSearch().should('have.focus');
    });

    it('should display the error in the input error summary', () => {
      cy.checkText(companyDetails.companiesHouseSearchError(), `Error: ${COMPANY_HOUSE_ERRORS[COMPANIES_HOUSE_INPUT_FIELD_ID].INCORRECT_FORMAT}`);
    });
  });

  describe('when the companies house number has special characters', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(companyDetails.companiesHouseSearch(), '123456!');

      companyDetails.companiesHouseSearchButton().click();
    });

    it('should display an error in the error summary', () => {
      cy.checkText(partials.errorSummaryListItems().first(), COMPANY_HOUSE_ERRORS[COMPANIES_HOUSE_INPUT_FIELD_ID].INCORRECT_FORMAT);
    });

    it('should focus to the input box when clicking the error', () => {
      partials.errorSummaryListItemLinks().eq(0).click();
      companyDetails.companiesHouseSearch().should('have.focus');
    });

    it('should display the error in the input error summary', () => {
      cy.checkText(companyDetails.companiesHouseSearchError(), `Error: ${COMPANY_HOUSE_ERRORS[COMPANIES_HOUSE_INPUT_FIELD_ID].INCORRECT_FORMAT}`);
    });
  });

  describe('when the companies house number has a space', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(companyDetails.companiesHouseSearch(), '123456 ');

      companyDetails.companiesHouseSearchButton().click();
    });

    it('should display an error in the error summary', () => {
      cy.checkText(partials.errorSummaryListItems().first(), COMPANY_HOUSE_ERRORS[COMPANIES_HOUSE_INPUT_FIELD_ID].INCORRECT_FORMAT);
    });

    it('should focus to the input box when clicking the error', () => {
      partials.errorSummaryListItemLinks().eq(0).click();
      companyDetails.companiesHouseSearch().should('have.focus');
    });

    it('should display the error in the input error summary', () => {
      cy.checkText(companyDetails.companiesHouseSearchError(), `Error: ${COMPANY_HOUSE_ERRORS[COMPANIES_HOUSE_INPUT_FIELD_ID].INCORRECT_FORMAT}`);
    });
  });

  describe('when the companies house number is correctly entered', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should not display errors', () => {
      cy.keyboardInput(companyDetails.companiesHouseSearch(), COMPANIES_HOUSE_NUMBER);
      companyDetails.companiesHouseSearchButton().click();
      partials.errorSummaryListItems().should('not.exist');
      companyDetails.companiesHouseSearchError().should('not.exist');
    });

    it('should display your business summary list', () => {
      cy.keyboardInput(companyDetails.companiesHouseSearch(), COMPANIES_HOUSE_NUMBER);
      companyDetails.companiesHouseSearchButton().click();
      partials.errorSummaryListItems().should('not.exist');
      companyDetails.companiesHouseSearchError().should('not.exist');

      cy.checkText(companyDetails.yourBusinessHeading(), SUMMARY_LIST_FIELDS.LABEL);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_NUMBER].key(), SUMMARY_LIST_FIELDS.COMPANY_NUMBER.text);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_NUMBER].value(), COMPANIES_HOUSE_NUMBER);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_NAME].key(), SUMMARY_LIST_FIELDS.COMPANY_NAME.text);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_NAME].value(), application.EXPORTER_COMPANY[COMPANY_NAME]);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_ADDRESS].key(), SUMMARY_LIST_FIELDS.COMPANY_ADDRESS.text);

      partials.yourBusinessSummaryList[COMPANY_ADDRESS].value().contains(application.EXPORTER_COMPANY[COMPANY_ADDRESS].addressLine1);
      partials.yourBusinessSummaryList[COMPANY_ADDRESS].value().contains(application.EXPORTER_COMPANY[COMPANY_ADDRESS].locality);
      partials.yourBusinessSummaryList[COMPANY_ADDRESS].value().contains(application.EXPORTER_COMPANY[COMPANY_ADDRESS].region);
      partials.yourBusinessSummaryList[COMPANY_ADDRESS].value().contains(application.EXPORTER_COMPANY[COMPANY_ADDRESS].postalCode);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_INCORPORATED].key(), SUMMARY_LIST_FIELDS.COMPANY_INCORPORATED.text);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_INCORPORATED].value(), application.EXPORTER_COMPANY[COMPANY_INCORPORATED]);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_SIC].key(), SUMMARY_LIST_FIELDS.COMPANY_SIC.text);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_SIC].value(), `${application.EXPORTER_COMPANY[COMPANY_SIC][0]} - ${application.EXPORTER_COMPANY[INDUSTRY_SECTOR_NAME][0]}`);
    });
  });

  describe('when the company has multiple sic codes', () => {
    it('should display all the sic codes in the summary list', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(companyDetails.companiesHouseSearch(), COMPANIES_HOUSE_NUMBER_MULTIPLE_SIC_CODES);
      saveAndBackButton().click();

      task.link().click();

      partials.yourBusinessSummaryList[COMPANY_SIC].value().contains('01440 - Raising of camels and camelids');
      partials.yourBusinessSummaryList[COMPANY_SIC].value().contains('13100 - Preparation and spinning of textile fibres');
      partials.yourBusinessSummaryList[COMPANY_SIC].value().contains('55209 - Other holiday and other collective accommodation');
      partials.yourBusinessSummaryList[COMPANY_SIC].value().contains('56102 - Unlicensed restaurants and cafes');
    });
  });

  describe('when the company does not have a sic code', () => {
    it(`should display your business summary list with a ${DEFAULT.EMPTY} for sic code when coming back to the company details page`, () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(companyDetails.companiesHouseSearch(), COMPANIES_HOUSE_NUMBER_NO_SIC_CODE);
      saveAndBackButton().click();

      task.link().click();

      cy.checkText(companyDetails.yourBusinessHeading(), SUMMARY_LIST_FIELDS.LABEL);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_NUMBER].key(), SUMMARY_LIST_FIELDS.COMPANY_NUMBER.text);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_NUMBER].value(), COMPANIES_HOUSE_NUMBER_NO_SIC_CODE);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_SIC].key(), SUMMARY_LIST_FIELDS.COMPANY_SIC.text);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_SIC].value(), DEFAULT.EMPTY);
    });
  });

  describe('when going back to company details page after searching for company house and pressing continue', () => {
    it('should take ytou back to company details page', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(companyDetails.companiesHouseSearch(), COMPANIES_HOUSE_NUMBER);
      companyDetails.companiesHouseSearchButton().click();

      submitButton().click();

      backLink().click();

      cy.assertUrl(`${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE_SEARCH}`);
    });
  });
});
