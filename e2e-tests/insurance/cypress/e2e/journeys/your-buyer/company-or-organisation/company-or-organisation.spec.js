import {
  countryInput,
  field as fieldSelector,
  headingCaption,
  intro,
} from '../../../../../../pages/shared';
import { companyOrOrganisationPage } from '../../../../../../pages/insurance/your-buyer';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER as YOUR_BUYER_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/your-buyer';
import application, { country } from '../../../../../../fixtures/application';

const CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION;

const {
  COMPANY_OR_ORGANISATION: {
    NAME,
    ADDRESS,
    COUNTRY,
    REGISTRATION_NUMBER,
    WEBSITE,
  },
} = YOUR_BUYER_FIELD_IDS;

const {
  ROOT,
  YOUR_BUYER: { CONNECTION_WITH_BUYER, COMPANY_OR_ORGANISATION },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your Buyer - Company or organisation page - As an exporter, I want to enter the buyer details', () => {
  let referenceNumber;
  let url;
  let connectionToTheBuyerUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION}`;

      connectionToTheBuyerUrl = `${baseUrl}${ROOT}/${referenceNumber}${CONNECTION_WITH_BUYER}`;

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
      currentHref: `${ROOT}/${referenceNumber}${INSURANCE_ROUTES.YOUR_BUYER.COMPANY_OR_ORGANISATION}`,
      backLink: `${ROOT}/${referenceNumber}${INSURANCE_ROUTES.YOUR_BUYER.ROOT}`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it('renders an into heading', () => {
      cy.checkText(intro(), CONTENT_STRINGS.INTRO);
    });

    it('renders a buyer country section', () => {
      const fieldId = COUNTRY;
      const field = countryInput.field(fieldId);

      cy.checkText(field.heading(), FIELDS.COMPANY_OR_ORGANISATION[fieldId].LABEL);
      cy.checkText(companyOrOrganisationPage[fieldId](), country.NAME);
    });

    it(`renders an ${NAME} label, and input`, () => {
      const fieldId = NAME;
      const field = fieldSelector(fieldId);

      cy.checkText(field.label(), FIELDS.COMPANY_OR_ORGANISATION[fieldId].LABEL);
      field.input().should('exist');
    });

    it(`renders an ${ADDRESS} label, and input`, () => {
      const fieldId = ADDRESS;
      const field = fieldSelector(fieldId);

      cy.checkText(field.label(), FIELDS.COMPANY_OR_ORGANISATION[fieldId].LABEL);
      field.input().should('exist');
    });

    it(`renders ${REGISTRATION_NUMBER} label and input`, () => {
      const fieldId = REGISTRATION_NUMBER;
      const field = fieldSelector(fieldId);

      cy.checkText(field.label(), FIELDS.COMPANY_OR_ORGANISATION[fieldId].LABEL);

      field.input().should('exist');
    });

    it(`renders ${WEBSITE} label and input`, () => {
      const fieldId = WEBSITE;
      const field = fieldSelector(fieldId);

      cy.checkText(field.label(), FIELDS.COMPANY_OR_ORGANISATION[fieldId].LABEL);

      field.input().should('exist');
    });

    it('renders a `save and back` button', () => {
      cy.assertSaveAndBackButton();
    });
  });

  describe('form submission', () => {
    const { BUYER } = application;

    describe('when submitting a fully filled form', () => {
      it(`should redirect to ${CONNECTION_WITH_BUYER} page`, () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitCompanyOrOrganisationForm({});

        cy.assertUrl(connectionToTheBuyerUrl);
      });
    });

    describe('when going back to the page', () => {
      it('should have the submitted values', () => {
        cy.navigateToUrl(url);

        cy.checkValue(fieldSelector(ADDRESS), BUYER[ADDRESS]);
        cy.checkValue(fieldSelector(REGISTRATION_NUMBER), BUYER[REGISTRATION_NUMBER]);
        cy.checkValue(fieldSelector(WEBSITE), BUYER[WEBSITE]);
      });
    });
  });
});
