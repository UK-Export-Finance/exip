import {
  submitButton,
  saveAndBackButton,
} from '../../../pages/shared';
import { companyOrOrganisationPage } from '../../../pages/insurance/your-buyer';
import { BUTTONS } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROOT } from '../../../../../constants/routes/insurance';
import getReferenceNumber from '../../../helpers/get-reference-number';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance/your-buyer';

const {
  COMPANY_OR_ORGANISATION: {
    NAME,
    ADDRESS,
    COUNTRY,
  },
} = FIELD_IDS;

const goToPageDirectly = (referenceNumber) => {
  cy.navigateToUrl(`${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION}`);
};

context('Insurance - Your Buyer - Company or organisation page - As an exporter, I want to enter the buyer details', () => {
  let referenceNumber;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION}`;
      goToPageDirectly(referenceNumber);
      cy.url().should('eq', expected);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('renders an analytics cookies consent banner that can be accepted', () => {
    cy.checkAnalyticsCookiesConsentAndAccept();
  });

  it('renders an analytics cookies consent banner that can be rejected', () => {
    cy.rejectAnalyticsCookies();
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  it('renders an `organisation or company name` label, and input', () => {
    const fieldId = NAME;
    const field = companyOrOrganisationPage[fieldId];

    field.label().should('exist');
    field.label().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS.COMPANY_OR_ORGANISATION[fieldId].LABEL);
    });
    field.input().should('exist');
  });

  it('renders an `address` label, and input', () => {
    const fieldId = ADDRESS;
    const field = companyOrOrganisationPage[fieldId];

    field.label().should('exist');
    field.label().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS.COMPANY_OR_ORGANISATION[fieldId].LABEL);
    });
    field.input().should('exist');
  });

  it('renders `countries` label and input', () => {
    const fieldId = COUNTRY;
    const field = companyOrOrganisationPage[fieldId];

    field.label().should('exist');
    field.label().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS.COMPANY_OR_ORGANISATION[fieldId].LABEL);
    });

    field.input().should('exist');
  });

  it('renders a submit button', () => {
    submitButton().should('exist');

    submitButton().invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.CONTINUE);
    });
  });

  it('renders a `save and back` button', () => {
    saveAndBackButton().should('exist');

    saveAndBackButton().invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.SAVE_AND_BACK);
    });
  });
});
