import { companyDetails } from '../../../../pages/your-business';
import { submitButton } from '../../../../pages/shared';
import partials from '../../../../partials';
import {
  ROUTES, VALID_PHONE_NUMBERS, WEBSITE_EXAMPLES, COMPANIES_HOUSE_NUMBER, FIELD_IDS,
} from '../../../../../../constants';
import application from '../../../../../fixtures/application';

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: {
      COMPANY_SIC,
      INDUSTRY_SECTOR_NAME,
    },
  },
} = FIELD_IDS.INSURANCE;

const { EXPORTER_COMPANY } = application;

describe("Insurance - Your business - Company details page - As an Exporter I want to enter details about my business in 'your business' section", () => {
  let referenceNumber;
  let url;
  let contactUrl;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;

      contactUrl = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.CONTACT}`;

      cy.navigateToUrl(url);

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  describe('continue to next page', () => {
    describe('when required fields entered correctly', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.keyboardInput(companyDetails.companiesHouseSearch(), COMPANIES_HOUSE_NUMBER);

        companyDetails.tradingNameYesRadioInput().click();
        companyDetails.tradingAddressYesRadioInput().click();

        submitButton().click();
      });

      it(`should redirect to ${contactUrl}`, () => {
        cy.url().should('eq', contactUrl);
      });
    });

    describe('when required and optional fields are entered correctly', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.keyboardInput(companyDetails.companiesHouseSearch(), COMPANIES_HOUSE_NUMBER);

        companyDetails.tradingNameYesRadioInput().click();
        companyDetails.tradingAddressYesRadioInput().click();

        cy.keyboardInput(companyDetails.phoneNumber(), VALID_PHONE_NUMBERS.LANDLINE.NORMAL);
        cy.keyboardInput(companyDetails.companyWebsite(), WEBSITE_EXAMPLES.VALID);

        submitButton().click();
      });

      it(`should redirect to ${contactUrl}`, () => {
        cy.url().should('eq', contactUrl);
      });
    });
  });

  describe('when resubmitting company number on company details page', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      // navigate back to company details page from nature of business
      cy.clickBackLink();

      // resubmit form
      cy.keyboardInput(companyDetails.companiesHouseSearch(), COMPANIES_HOUSE_NUMBER);

      companyDetails.tradingNameYesRadioInput().click();
      companyDetails.tradingAddressYesRadioInput().click();

      cy.keyboardInput(companyDetails.phoneNumber(), VALID_PHONE_NUMBERS.LANDLINE.NORMAL);
      cy.keyboardInput(companyDetails.companyWebsite(), WEBSITE_EXAMPLES.VALID);

      submitButton().click();
      // return to company details page after redirect to nature of business
      cy.clickBackLink();
    });

    it('should remove old sic codes from company summary list', () => {
      cy.checkText(partials.yourBusinessSummaryList[COMPANY_SIC].value(), `${EXPORTER_COMPANY[COMPANY_SIC][0]} - ${EXPORTER_COMPANY[INDUSTRY_SECTOR_NAME][0]}`);
    });
  });
});
