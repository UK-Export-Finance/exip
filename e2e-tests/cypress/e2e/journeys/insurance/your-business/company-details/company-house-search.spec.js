import { companyDetails } from '../../../../pages/your-business';
import { ERROR_MESSAGES, DEFAULT } from '../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/exporter-business';
import partials from '../../../../partials';
import { saveAndBackButton } from '../../../../pages/shared';
import {
  ROUTES, FIELD_IDS, COMPANIES_HOUSE_NUMBER, COMPANIES_HOUSE_NUMBER_NO_SIC_CODE,
} from '../../../../../../constants';
import getReferenceNumber from '../../../../helpers/get-reference-number';

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: {
      COMPANY_NAME,
      COMPANY_ADDRESS,
      COMPANY_NUMBER,
      COMPANY_INCORPORATED,
      COMPANY_SIC,
      SUMMARY_LIST,
    },
  },
} = FIELD_IDS.INSURANCE;

const COMPANY_HOUSE_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;
const SUMMARY_LIST_FIELDS = FIELDS[SUMMARY_LIST];

const COMPANIES_HOUSE_INPUT_FIELD_ID = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE.INPUT;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.exporterBusiness;

context('Insurance - Your business - Company details page - company house search - As an Exporter I want to enter my business\'s Companies House Registration Number (CRN)', () => {
  let referenceNumber;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      const url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;

      cy.navigateToUrl(url);

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('when leaving companies house registration blank', () => {
    it('should display an error in the error summary', () => {
      companyDetails.companiesHouseSearchButton().click();

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
    it('should display an error in the error summary', () => {
      companyDetails.companiesHouseSearch().clear().type('1234');
      companyDetails.companiesHouseSearchButton().click();

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
    it('should display an error in the error summary', () => {
      companyDetails.companiesHouseSearch().clear().type('123456!');
      companyDetails.companiesHouseSearchButton().click();

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
    it('should display an error in the error summary', () => {
      companyDetails.companiesHouseSearch().clear().type('123456 ');
      companyDetails.companiesHouseSearchButton().click();

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
    it('should not display errors', () => {
      companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
      companyDetails.companiesHouseSearchButton().click();
      partials.errorSummaryListItems().should('not.exist');
      companyDetails.companiesHouseSearchError().should('not.exist');
    });

    it('should display your business summary list', () => {
      companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
      companyDetails.companiesHouseSearchButton().click();
      partials.errorSummaryListItems().should('not.exist');
      companyDetails.companiesHouseSearchError().should('not.exist');

      cy.checkText(companyDetails.yourBusinessHeading(), SUMMARY_LIST_FIELDS.LABEL);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_NUMBER].key(), SUMMARY_LIST_FIELDS.COMPANY_NUMBER.text);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_NUMBER].value(), COMPANIES_HOUSE_NUMBER);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_NAME].key(), SUMMARY_LIST_FIELDS.COMPANY_NAME.text);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_NAME].value(), 'DHG PROPERTY FINANCE LIMITED');

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_ADDRESS].key(), SUMMARY_LIST_FIELDS.COMPANY_ADDRESS.text);

      partials.yourBusinessSummaryList[COMPANY_ADDRESS].value().contains('Unit 3 Lewis Court');
      partials.yourBusinessSummaryList[COMPANY_ADDRESS].value().contains('Cardiff');
      partials.yourBusinessSummaryList[COMPANY_ADDRESS].value().contains('South Glamorgan');
      partials.yourBusinessSummaryList[COMPANY_ADDRESS].value().contains('CF24 5HQ');

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_INCORPORATED].key(), SUMMARY_LIST_FIELDS.COMPANY_INCORPORATED.text);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_INCORPORATED].value(), '10 April 2014');

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_SIC].key(), SUMMARY_LIST_FIELDS.COMPANY_SIC.text);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_SIC].value(), '64999');
    });
  });

  describe('when the company does not have a sic code', () => {
    it(`should display your business summary list with a ${DEFAULT.EMPTY} for sic code when coming back to the company details page`, () => {
      companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER_NO_SIC_CODE);
      saveAndBackButton().click();

      task.link().click();

      cy.checkText(companyDetails.yourBusinessHeading(), SUMMARY_LIST_FIELDS.LABEL);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_NUMBER].key(), SUMMARY_LIST_FIELDS.COMPANY_NUMBER.text);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_NUMBER].value(), COMPANIES_HOUSE_NUMBER_NO_SIC_CODE);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_SIC].key(), SUMMARY_LIST_FIELDS.COMPANY_SIC.text);

      cy.checkText(partials.yourBusinessSummaryList[COMPANY_SIC].value(), DEFAULT.EMPTY);
    });
  });
});
