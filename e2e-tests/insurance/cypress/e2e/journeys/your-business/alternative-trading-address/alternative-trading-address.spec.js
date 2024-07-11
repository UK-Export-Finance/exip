import partials from '../../../../../../partials';
import { field as fieldSelector } from '../../../../../../pages/shared';
import { PAGES, ERROR_MESSAGES } from '../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS as FIELD_STRINGS } from '../../../../../../content-strings/fields/insurance/business';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { MAXIMUM_CHARACTERS } from '../../../../../../constants/validation';
import application from '../../../../../../fixtures/application';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS;

const ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;

const {
  EXPORTER_BUSINESS: {
    ALTERNATIVE_TRADING_ADDRESS: {
      FULL_ADDRESS,
    },
  },
  COMPANIES_HOUSE: {
    COMPANY_ADDRESS,
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: {
    ALTERNATIVE_TRADING_ADDRESS_ROOT,
    COMPANY_DETAILS,
    NATURE_OF_BUSINESS_ROOT,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const fieldId = FULL_ADDRESS;
const field = fieldSelector(fieldId);
const textareaField = { ...field, input: field.textarea };

const {
  REGISTERED_OFFICE_ADDRESS_HINT, REGISTERED_OFFICE_ADDRESS_HEADING,
} = FIELD_STRINGS[FULL_ADDRESS];

const address = application.COMPANY[COMPANY_ADDRESS];
const { DIFFERENT_TRADING_ADDRESS } = application;

context('Insurance - Your business - Alternative trading address page - I want to input information on an alternative business trading address So that I can provide necessary business information to support my application for Export Insurance', () => {
  let referenceNumber;
  let alternativeAddressUrl;
  let natureOfBusinessUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection({});

      cy.completeAndSubmitCompanyDetails({
        differentTradingAddress: true,
      });

      alternativeAddressUrl = `${baseUrl}${ROOT}/${referenceNumber}${ALTERNATIVE_TRADING_ADDRESS_ROOT}`;

      natureOfBusinessUrl = `${baseUrl}${ROOT}/${referenceNumber}${NATURE_OF_BUSINESS_ROOT}`;

      cy.assertUrl(alternativeAddressUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: `${ROOT}/${referenceNumber}${ALTERNATIVE_TRADING_ADDRESS_ROOT}`,
      backLink: `${ROOT}/${referenceNumber}${COMPANY_DETAILS}`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(alternativeAddressUrl);
    });

    it('renders a heading caption', () => {
      cy.checkText(partials.headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it('renders a registered office address heading', () => {
      cy.checkText(fieldSelector(COMPANY_ADDRESS).heading(), REGISTERED_OFFICE_ADDRESS_HEADING);
    });

    it('renders a registered office address heading', () => {
      cy.checkText(fieldSelector(COMPANY_ADDRESS).hint(), REGISTERED_OFFICE_ADDRESS_HINT);
    });

    it('renders a registered office address', () => {
      const addressText = `${address.addressLine1}${address.locality}${address.region}${address.postalCode}`;
      cy.checkText(partials.html(COMPANY_ADDRESS), addressText);
    });

    it(`should display ${FULL_ADDRESS} textarea`, () => {
      const fieldStrings = FIELD_STRINGS[fieldId];

      cy.assertTextareaRendering({
        fieldId,
        expectedLabel: fieldStrings.LABEL,
        maximumCharacters: fieldStrings.MAXIMUM,
      });
    });

    it('renders a `save and back` button', () => {
      cy.assertSaveAndBackButton();
    });
  });

  describe('form validation', () => {
    beforeEach(() => {
      cy.navigateToUrl(alternativeAddressUrl);
    });

    it(`should display validation errors if ${FULL_ADDRESS} is left empty`, () => {
      cy.submitAndAssertFieldErrors({
        field: textareaField,
        expectedErrorMessage: ERRORS[FULL_ADDRESS].IS_EMPTY,
      });
    });

    it(`should display validation errors if ${FULL_ADDRESS} is over ${MAXIMUM_CHARACTERS.FULL_ADDRESS} characters`, () => {
      cy.submitAndAssertFieldErrors({
        field: textareaField,
        value: 'a'.repeat(MAXIMUM_CHARACTERS.FULL_ADDRESS + 1),
        expectedErrorMessage: ERRORS[FULL_ADDRESS].ABOVE_MAXIMUM,
      });
    });
  });

  describe('form submission', () => {
    it(`should redirect to ${NATURE_OF_BUSINESS_ROOT}`, () => {
      cy.navigateToUrl(alternativeAddressUrl);

      cy.completeAndSubmitAlternativeTradingAddressForm({});

      cy.assertUrl(natureOfBusinessUrl);
    });
  });

  describe('when going back to the page', () => {
    it('should have the submitted value', () => {
      cy.navigateToUrl(alternativeAddressUrl);

      cy.checkText(fieldSelector(FULL_ADDRESS).textarea(), DIFFERENT_TRADING_ADDRESS[FULL_ADDRESS]);
    });
  });
});
