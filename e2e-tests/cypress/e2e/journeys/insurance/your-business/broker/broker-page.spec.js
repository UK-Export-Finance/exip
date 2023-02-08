import { broker } from '../../../../pages/your-business';
import partials from '../../../../partials';
import { submitButton, saveAndBackButton } from '../../../../pages/shared';
import { PAGES, BUTTONS, LINKS } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/exporter-business';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.BROKER;

const {
  BROKER: {
    USING_BROKER,
  },
} = FIELD_IDS;

const {
  ROOT,
  START,
  EXPORTER_BUSINESS: {
    BROKER,
  },
} = ROUTES.INSURANCE;

const insuranceStart = ROUTES.INSURANCE.START;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.exporterBusiness;

context('Insurance - Your business - Broker Page - As an Exporter I want to confirm if I am using a broker for my export Insurance so that UKEF and I can easily collaborate and manage correspondence regarding my export insurance', () => {
  let referenceNumber;

  before(() => {
    cy.navigateToUrl(START);

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.completeAndSubmitCompanyDetails();
    cy.completeAndSubmitNatureOfYourBusiness();
    cy.completeAndSubmitTurnoverForm();

    cy.getReferenceNumber().then((id) => {
      referenceNumber = id;

      const url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${BROKER}`;

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
    cy.checkText(partials.backLink(), LINKS.BACK);
  });

  it('should display the headings correctly', () => {
    cy.checkText(partials.headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
  });

  it(`should display ${USING_BROKER} section`, () => {
    const fieldId = USING_BROKER;
    const field = broker[fieldId];

    cy.checkText(field.heading(), CONTENT_STRINGS.PAGE_TITLE);

    field.yesRadioInput().should('exist');
    cy.checkAriaLabel(field.yesRadioInput(), `${CONTENT_STRINGS.PAGE_TITLE} yes radio`);

    field.noRadioInput().should('exist');
    cy.checkAriaLabel(field.noRadioInput(), `${CONTENT_STRINGS.PAGE_TITLE} no radio`);
  });

  it('should display the continue and save and go back button', () => {
    cy.checkText(submitButton(), BUTTONS.CONTINUE);

    cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
  });
});
