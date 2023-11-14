import partials from '../../../../../../partials';
import { field as fieldSelector, saveAndBackButton } from '../../../../../../pages/shared';
import { PAGES, BUTTONS } from '../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/business';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/business';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.CREDIT_CONTROL;

const { CREDIT_CONTROL: FIELD_ID } = FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: {
    BROKER_ROOT,
    CREDIT_CONTROL,
    TURNOVER,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your business - Credit control page', () => {
  let referenceNumber;
  let url;
  let brokerUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection();

      cy.completeAndSubmitCompanyDetails({});
      cy.completeAndSubmitNatureOfYourBusiness();
      cy.completeAndSubmitTurnoverForm();

      url = `${baseUrl}${ROOT}/${referenceNumber}${CREDIT_CONTROL}`;
      brokerUrl = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_ROOT}`;

      cy.assertUrl(url);
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
      currentHref: `${ROOT}/${referenceNumber}${CREDIT_CONTROL}`,
      backLink: `${ROOT}/${referenceNumber}${TURNOVER}`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(partials.headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it(`should display ${FIELD_ID} label and input`, () => {
      const fieldId = FIELD_ID;
      const field = fieldSelector(fieldId);

      field.textarea().should('exist');
      cy.checkText(field.label(), FIELDS[fieldId].LABEL);
    });

    it('should display save and go back button', () => {
      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });
  });

  describe('form submission', () => {
    it(`should redirect to ${BROKER_ROOT}`, () => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitCreditControlForm();

      cy.assertUrl(brokerUrl);
    });
  });

  // describe('when going back to the page', () => {
  //   it('should have the submitted values', () => {
  //     cy.navigateToUrl(url);
  //     yesRadioInput().should('be.checked');
  //   });
  // });
});
