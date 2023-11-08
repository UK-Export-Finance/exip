import partials from '../../../../../../partials';
import { field as fieldSelector, saveAndBackButton } from '../../../../../../pages/shared';
import { PAGES, BUTTONS } from '../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/business';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS;

const {
  EXPORTER_BUSINESS: {
    ALTERNATIVE_TRADING_ADDRESS,
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: {
    ALTERNATIVE_TRADING_ADDRESS_ROOT,
    COMPANY_DETAILS,
    NATURE_OF_BUSINESS,
  },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your business - Alternative trading address page - I want to input information on an alternative business trading address So that I can provide necessary business information to support my application for Export Insurance', () => {
  let referenceNumber;
  let natureOfBusinessUrl;
  let alternativeAddressUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompanyDetails({
        differentTradingAddress: true,
      });

      alternativeAddressUrl = `${baseUrl}${ROOT}/${referenceNumber}${ALTERNATIVE_TRADING_ADDRESS_ROOT}`;

      natureOfBusinessUrl = `${baseUrl}${ROOT}/${referenceNumber}${NATURE_OF_BUSINESS}`;

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

    it(`should display ${ALTERNATIVE_TRADING_ADDRESS} label and input`, () => {
      const fieldId = ALTERNATIVE_TRADING_ADDRESS;
      const field = fieldSelector(fieldId);

      field.textarea().should('exist');
      cy.checkText(field.label(), FIELDS[fieldId].LABEL);
    });

    it('should display save and go back button', () => {
      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });
  });

  describe('form submission', () => {
    it(`should redirect to ${NATURE_OF_BUSINESS}`, () => {
      cy.navigateToUrl(alternativeAddressUrl);

      cy.completeAndSubmitAlternativeTradingAddressForm();

      cy.assertUrl(natureOfBusinessUrl);
    });
  });

  // describe('when going back to the page', () => {
  //   it('should have the submitted values', () => {
  //   });
  // });
});
