import { saveAndBackButton } from '../../../pages/shared';
import partials from '../../../partials';
import { companyOrOrganisationPage } from '../../../pages/insurance/your-buyer';
import { BUTTONS, PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROOT } from '../../../../../constants/routes/insurance';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance/your-buyer';

const CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION;

const {
  COMPANY_OR_ORGANISATION: {
    NAME,
    ADDRESS,
    COUNTRY,
  },
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.buyer;

context('Insurance - Your Buyer - Company or organisation page - As an exporter, I want to enter the buyer details', () => {
  let referenceNumber;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.getReferenceNumber().then((id) => {
      referenceNumber = id;

      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION}`;
      cy.url().should('eq', expected);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION}`,
      expectedBackLink: `${INSURANCE_ROOT}/${referenceNumber}${ROUTES.INSURANCE.ALL_SECTIONS}`,
      assertSubmitButton: true,
    });
  });

  it('renders an `organisation or company name` label, and input', () => {
    const fieldId = NAME;
    const field = companyOrOrganisationPage[fieldId];

    field.label().should('exist');
    cy.checkText(field.label(), FIELDS.COMPANY_OR_ORGANISATION[fieldId].LABEL);
    field.input().should('exist');
  });

  it('renders an `address` label, and input', () => {
    const fieldId = ADDRESS;
    const field = companyOrOrganisationPage[fieldId];

    field.label().should('exist');
    cy.checkText(field.label(), FIELDS.COMPANY_OR_ORGANISATION[fieldId].LABEL);
    field.input().should('exist');
  });

  it('renders `countries` label and input', () => {
    const fieldId = COUNTRY;
    const field = companyOrOrganisationPage[fieldId];

    field.label().should('exist');
    cy.checkText(field.label(), FIELDS.COMPANY_OR_ORGANISATION[fieldId].LABEL);

    field.input().should('exist');
  });

  it('renders a `save and back` button', () => {
    saveAndBackButton().should('exist');

    cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
  });
});
