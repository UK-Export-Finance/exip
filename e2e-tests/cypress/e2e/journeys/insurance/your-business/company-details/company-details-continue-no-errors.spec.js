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
    },
  },
} = FIELD_IDS.INSURANCE;

const { EXPORTER_COMPANY } = application;

describe("Insurance - Your business - Company details page - As an Exporter I want to enter details about my business in 'your business' section", () => {
  let referenceNumber;
  let url;
  let natureOfBusinessUrl;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    cy.getReferenceNumber().then((id) => {
      referenceNumber = id;

      url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.COMPANY_DETAILS}`;
      natureOfBusinessUrl = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS}`;

      cy.navigateToUrl(url);

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('continue to next page', () => {
    it('should not display any validation errors required fields entered correctly', () => {
      companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
      companyDetails.tradingNameYesRadioInput().click();
      companyDetails.tradingAddressYesRadioInput().click();
      submitButton().click();
    });

    it(`should redirect to ${natureOfBusinessUrl}`, () => {
      cy.url().should('eq', natureOfBusinessUrl);
    });

    it('should not display any validation errors if required and optional fields entered correctly', () => {
      cy.navigateToUrl(url);

      companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
      companyDetails.tradingNameYesRadioInput().click();
      companyDetails.tradingAddressYesRadioInput().click();
      companyDetails.phoneNumber().clear().type(VALID_PHONE_NUMBERS.LANDLINE.NORMAL);
      companyDetails.companyWebsite().clear().type(WEBSITE_EXAMPLES.VALID);
      submitButton().click();
    });

    it(`should redirect to ${natureOfBusinessUrl}`, () => {
      cy.url().should('eq', natureOfBusinessUrl);
    });
  });

  describe('when resubmitting company number on company details page', () => {
    before(() => {
      // navigate back to company details page from nature of business
      partials.backLink().click();
      // resubmit form
      submitButton().click();
      // return to company details page after redirect to nature of business
      partials.backLink().click();
    });

    it('should remove old sic codes from company summary list', () => {
      cy.checkText(partials.yourBusinessSummaryList[COMPANY_SIC].value(), EXPORTER_COMPANY[COMPANY_SIC][0]);
    });
  });
});
