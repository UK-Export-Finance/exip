import { yourContactPage } from '../../../../../../pages/your-business';
import partials from '../../../../../../partials';
import { saveAndBackButton } from '../../../../../../pages/shared';
import { PAGES, BUTTONS } from '../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/business';
import { ACCOUNT_FIELDS } from '../../../../../../content-strings/fields/insurance/account';
import { ROUTES } from '../../../../../../constants';
import { EXPORTER_BUSINESS as EXPORTER_BUSINESS_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/business';
import { ACCOUNT as ACCOUNT_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/account';
import application from '../../../../../../fixtures/application';
import account from '../../../../../../fixtures/account';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.CONTACT;

const {
  CONTACT: {
    COMPANY_NAME,
    POSITION,
    BUSINESS_CONTACT_DETAIL,
  },
} = EXPORTER_BUSINESS_FIELD_IDS;

const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT_FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: {
    CONTACT,
    NATURE_OF_BUSINESS,
    COMPANY_DETAILS,
  },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

context('Insurance - Your business - Contact page - As an Exporter I want to enter the details of my export application contact so that UKEF will have clarity on who to contact while processing my Export Insurance Application', () => {
  let referenceNumber;
  let url;
  let natureOfBusinessUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompaniesHouseSearchForm({ referenceNumber });
      cy.completeAndSubmitCompanyDetails();

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${CONTACT}`;
      natureOfBusinessUrl = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${NATURE_OF_BUSINESS}`;

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
      currentHref: `${ROOT}/${referenceNumber}${CONTACT}`,
      backLink: `${ROOT}/${referenceNumber}${COMPANY_DETAILS}`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(partials.headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it(`should display ${COMPANY_NAME} section and populate company name from application`, () => {
      const fieldId = COMPANY_NAME;
      const field = yourContactPage.field(fieldId);

      cy.checkText(field.label(), FIELDS.CONTACT[fieldId].LABEL);

      cy.checkText(field.hint(), FIELDS.CONTACT[fieldId].HINT);

      cy.checkText(field.details(), application.EXPORTER_COMPANY[fieldId]);
    });

    it('should display contact details section legend and hint', () => {
      cy.checkText(yourContactPage.contactDetailsLegend(), CONTENT_STRINGS.CONTACT_DETAILS.LEGEND);

      cy.checkText(yourContactPage.contactDetailsHint(), CONTENT_STRINGS.CONTACT_DETAILS.HINT);
    });

    it(`should display ${FIRST_NAME} field and be prepopulated`, () => {
      const fieldId = FIRST_NAME;
      const field = yourContactPage.field(fieldId);

      field.input().should('exist');

      cy.checkValue(field, account[FIRST_NAME]);

      cy.checkText(field.label(), ACCOUNT_FIELDS[fieldId].LABEL);
    });

    it(`should display ${LAST_NAME} field and be prepopulated`, () => {
      const fieldId = LAST_NAME;
      const field = yourContactPage.field(fieldId);

      field.input().should('exist');

      cy.checkValue(field, account[LAST_NAME]);

      cy.checkText(field.label(), ACCOUNT_FIELDS[fieldId].LABEL);
    });

    it(`should display ${EMAIL} field and be prepopulated`, () => {
      const fieldId = EMAIL;
      const field = yourContactPage.field(fieldId);

      field.input().should('exist');

      cy.checkValue(field, account[EMAIL]);

      cy.checkText(field.label(), ACCOUNT_FIELDS[fieldId].LABEL);
    });

    it(`should display ${POSITION} field and should not be prepopulated`, () => {
      const fieldId = POSITION;
      const field = yourContactPage.field(fieldId);

      field.input().should('exist');

      cy.checkValue(field, '');

      cy.checkText(field.label(), FIELDS.CONTACT[fieldId].LABEL);
    });

    it('should display save and go back button', () => {
      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });
  });

  describe('form submission', () => {
    it(`should redirect to ${NATURE_OF_BUSINESS}`, () => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitYourContact({});

      cy.assertUrl(natureOfBusinessUrl);
    });
  });

  describe('when going back to the page', () => {
    const businessContactDetails = application.EXPORTER_BUSINESS[BUSINESS_CONTACT_DETAIL];

    it('should have the submitted values', () => {
      cy.navigateToUrl(url);

      cy.checkValue(yourContactPage.field(FIRST_NAME), businessContactDetails[FIRST_NAME]);
      cy.checkValue(yourContactPage.field(LAST_NAME), businessContactDetails[LAST_NAME]);
      cy.checkValue(yourContactPage.field(EMAIL), businessContactDetails[EMAIL]);
      cy.checkValue(yourContactPage.field(POSITION), businessContactDetails[POSITION]);
    });
  });
});
