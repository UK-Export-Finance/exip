import { headingCaption, saveAndBackButton, submitButton } from '../../../../pages/shared';
import partials from '../../../../partials';
import { companyOrOrganisationPage } from '../../../../pages/insurance/your-buyer';
import { BUTTONS, PAGES } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import { YOUR_BUYER as YOUR_BUYER_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/your-buyer';
import application from '../../../../../fixtures/application';

const CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION;

const {
  COMPANY_OR_ORGANISATION: {
    NAME,
    ADDRESS,
    COUNTRY,
    REGISTRATION_NUMBER,
    WEBSITE,
    FIRST_NAME,
    LAST_NAME,
    POSITION,
    EMAIL,
    CAN_CONTACT_BUYER,
  },
} = YOUR_BUYER_FIELD_IDS;

const { ELIGIBILITY: { BUYER_COUNTRY } } = FIELD_IDS;

const {
  START,
  YOUR_BUYER: { WORKING_WITH_BUYER, COMPANY_OR_ORGANISATION },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.buyer;

context('Insurance - Your Buyer - Company or organisation page - As an exporter, I want to enter the buyer details', () => {
  let referenceNumber;
  let url;
  let workingWithBuyerUrl;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION}`;

      workingWithBuyerUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${WORKING_WITH_BUYER}`;

      cy.url().should('eq', url);
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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render a header with href to insurance start', () => {
      partials.header.serviceName().should('have.attr', 'href', START);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it('renders a buyer country section', () => {
      const fieldId = COUNTRY;
      const field = companyOrOrganisationPage[fieldId];

      cy.checkText(field.heading(), FIELDS.COMPANY_OR_ORGANISATION[fieldId].LABEL);
      cy.checkText(field.value(), application.ELIGIBILITY[BUYER_COUNTRY]);
    });

    it(`renders an ${NAME} label, and input`, () => {
      const fieldId = NAME;
      const field = companyOrOrganisationPage[fieldId];

      field.label().should('exist');
      cy.checkText(field.label(), FIELDS.COMPANY_OR_ORGANISATION[fieldId].LABEL);
      field.input().should('exist');
    });

    it(`renders an ${ADDRESS} label, and input`, () => {
      const fieldId = ADDRESS;
      const field = companyOrOrganisationPage[fieldId];

      field.label().should('exist');
      cy.checkText(field.label(), FIELDS.COMPANY_OR_ORGANISATION[fieldId].LABEL);
      field.input().should('exist');
    });

    it(`renders ${REGISTRATION_NUMBER} label and input`, () => {
      const fieldId = REGISTRATION_NUMBER;
      const field = companyOrOrganisationPage[fieldId];

      field.label().should('exist');
      cy.checkText(field.label(), FIELDS.COMPANY_OR_ORGANISATION[fieldId].LABEL);

      field.input().should('exist');
    });

    it(`renders ${WEBSITE} label and input`, () => {
      const fieldId = WEBSITE;
      const field = companyOrOrganisationPage[fieldId];

      field.label().should('exist');
      cy.checkText(field.label(), FIELDS.COMPANY_OR_ORGANISATION[fieldId].LABEL);

      field.input().should('exist');
    });

    it('renders the contact details fieldset heading', () => {
      const fieldId = FIRST_NAME;
      const field = companyOrOrganisationPage[fieldId];

      field.heading().should('exist');
      cy.checkText(field.heading(), FIELDS.COMPANY_OR_ORGANISATION[fieldId].HEADING);
    });

    it(`renders ${FIRST_NAME} heading, hint, label and input`, () => {
      const fieldId = FIRST_NAME;
      const field = companyOrOrganisationPage[fieldId];

      field.hint().should('exist');
      cy.checkText(field.hint(), FIELDS.COMPANY_OR_ORGANISATION[fieldId].HINT);

      field.label().should('exist');
      cy.checkText(field.label(), FIELDS.COMPANY_OR_ORGANISATION[fieldId].LABEL);

      field.input().should('exist');
    });

    it(`renders ${LAST_NAME} label and input`, () => {
      const fieldId = LAST_NAME;
      const field = companyOrOrganisationPage[fieldId];

      field.label().should('exist');
      cy.checkText(field.label(), FIELDS.COMPANY_OR_ORGANISATION[fieldId].LABEL);

      field.input().should('exist');
    });

    it(`renders ${POSITION} label and input`, () => {
      const fieldId = POSITION;
      const field = companyOrOrganisationPage[fieldId];

      field.label().should('exist');
      cy.checkText(field.label(), FIELDS.COMPANY_OR_ORGANISATION[fieldId].LABEL);

      field.input().should('exist');
    });

    it(`renders ${CAN_CONTACT_BUYER} label and input`, () => {
      const fieldId = CAN_CONTACT_BUYER;
      const field = companyOrOrganisationPage[fieldId];

      field.label().should('exist');
      cy.checkText(field.label(), FIELDS.COMPANY_OR_ORGANISATION[fieldId].LABEL);

      field.hint().should('exist');
      cy.checkText(field.hint(), FIELDS.COMPANY_OR_ORGANISATION[fieldId].HINT);

      field.yesRadioInput().should('exist');
      field.noRadioInput().should('exist');
    });

    it(`renders ${EMAIL} label and input`, () => {
      const fieldId = EMAIL;
      const field = companyOrOrganisationPage[fieldId];

      field.label().should('exist');
      cy.checkText(field.label(), FIELDS.COMPANY_OR_ORGANISATION[fieldId].LABEL);

      field.input().should('exist');
    });

    it('renders a `submit` button', () => {
      submitButton().should('exist');

      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });

    it('renders a `save and back` button', () => {
      saveAndBackButton().should('exist');

      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });
  });

  describe('form submission', () => {
    const { BUYER } = application;

    describe('when submitting a fully filled form', () => {
      it(`should redirect to ${WORKING_WITH_BUYER} page`, () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitCompanyOrOrganisationForm({});

        cy.url().should('eq', workingWithBuyerUrl);
      });
    });

    describe('when going back to the page', () => {
      it('should have the submitted values', () => {
        cy.navigateToUrl(url);

        companyOrOrganisationPage[CAN_CONTACT_BUYER].yesRadioInput().should('be.checked');
        cy.checkValue(companyOrOrganisationPage[ADDRESS], BUYER[ADDRESS]);
        cy.checkValue(companyOrOrganisationPage[REGISTRATION_NUMBER], BUYER[REGISTRATION_NUMBER]);
        cy.checkValue(companyOrOrganisationPage[WEBSITE], BUYER[WEBSITE]);
        cy.checkValue(companyOrOrganisationPage[FIRST_NAME], BUYER[FIRST_NAME]);
        cy.checkValue(companyOrOrganisationPage[LAST_NAME], BUYER[LAST_NAME]);
        cy.checkValue(companyOrOrganisationPage[POSITION], BUYER[POSITION]);
      });
    });
  });
});
