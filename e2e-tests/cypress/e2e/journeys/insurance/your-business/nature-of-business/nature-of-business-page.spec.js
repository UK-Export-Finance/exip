import { natureOfBusiness } from '../../../../pages/your-business';
import partials from '../../../../partials';
import { heading, submitButton, saveAndBackButton } from '../../../../pages/shared';
import { PAGES, BUTTONS, LINKS } from '../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/exporter-business';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import getReferenceNumber from '../../../../helpers/get-reference-number';
import checkText from '../../../../helpers/check-text';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS;

const {
  NATURE_OF_YOUR_BUSINESS: {
    GOODS_OR_SERVICES,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const insuranceStart = ROUTES.INSURANCE.START;

context('Insurance - Your business - Nature of your business page - As an Exporter I want to enter the nature of my business So that UKEF can have clarity on the type of business that I do while processing my Export Insurance Application', () => {
  let referenceNumber;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      const url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${referenceNumber}${ROUTES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_BUSINESS}`;

      cy.navigateToUrl(url);

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 75,
      'best-practices': 93,
      seo: 70,
    });
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  it('should render a header with href to insurance start', () => {
    partials.header.serviceName().should('have.attr', 'href', insuranceStart);
  });

  it('renders an analytics cookies consent banner that can be accepted', () => {
    cy.checkAnalyticsCookiesConsentAndAccept();
  });

  it('renders an analytics cookies consent banner that can be rejected', () => {
    cy.rejectAnalyticsCookies();
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');
    checkText(partials.backLink(), LINKS.BACK);
  });

  it('should display the headings correctly', () => {
    checkText(partials.headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);

    checkText(heading(), CONTENT_STRINGS.PAGE_TITLE);
  });

  it(`should display ${GOODS_OR_SERVICES} input box`, () => {
    const fieldId = GOODS_OR_SERVICES;
    const field = natureOfBusiness[fieldId];

    field.input().should('exist');
    checkText(field.label(), FIELDS.NATURE_OF_YOUR_BUSINESS[GOODS_OR_SERVICES].LABEL);

    field.hint().contains(FIELDS.NATURE_OF_YOUR_BUSINESS[GOODS_OR_SERVICES].HINT);
  });

  it('should display the continue and save and go back button', () => {
    checkText(submitButton(), BUTTONS.CONTINUE);

    checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
  });
});
