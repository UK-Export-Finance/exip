import { broker } from '../../../../pages/your-business';
import partials from '../../../../partials';
import { submitButton, saveAndBackButton } from '../../../../pages/shared';
import {
  PAGES, BUTTONS, LINKS, ERROR_MESSAGES,
} from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/exporter-business';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/exporter-business';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.BROKER;

const {
  BROKER: {
    USING_BROKER,
    HEADING,
    NAME,
    ADDRESS_LINE_1,
    ADDRESS_LINE_2,
    TOWN,
    COUNTY,
    POSTCODE,
    EMAIL,
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

const BROKER_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;
const ERROR_MESSAGE_BROKER = BROKER_ERRORS[USING_BROKER];

const ERROR_ASSERTIONS = {
  field: broker[USING_BROKER],
  numberOfExpectedErrors: 1,
  errorIndex: 0,
};

context('Insurance - Your business - Broker Page - As an Exporter I want to confirm if I am using a broker for my export Insurance so that UKEF and I can easily collaborate and manage correspondence regarding my export insurance', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.navigateToUrl(START);

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.completeAndSubmitCompanyDetails();
    cy.completeAndSubmitNatureOfYourBusiness();
    cy.completeAndSubmitTurnoverForm();

    cy.getReferenceNumber().then((id) => {
      referenceNumber = id;

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${BROKER}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('passes the audits', () => {
    cy.lighthouse({
      // accessibility threshold is reduced here because
      // the radio component from design system has an invalid aria attribute.
      // this is out of our control
      accessibility: 90,
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

  it('should display additional broker section when yes radio is selected', () => {
    const fieldId = USING_BROKER;
    const field = broker[fieldId];
    field.yesRadioInput().click();

    cy.checkText(broker[HEADING].heading(), FIELDS.BROKER[HEADING].HEADING);

    cy.checkText(broker[NAME].label(), FIELDS.BROKER[NAME].LABEL);
    broker[NAME].input().should('exist');

    cy.checkText(broker[ADDRESS_LINE_1].label(), FIELDS.BROKER[ADDRESS_LINE_1].LABEL);
    broker[ADDRESS_LINE_1].input().should('exist');

    cy.checkText(broker[ADDRESS_LINE_2].label(), FIELDS.BROKER[ADDRESS_LINE_2].LABEL);
    broker[ADDRESS_LINE_2].input().should('exist');

    cy.checkText(broker[TOWN].label(), FIELDS.BROKER[TOWN].LABEL);
    broker[TOWN].input().should('exist');

    cy.checkText(broker[COUNTY].label(), FIELDS.BROKER[COUNTY].LABEL);
    broker[COUNTY].input().should('exist');

    cy.checkText(broker[POSTCODE].label(), FIELDS.BROKER[POSTCODE].LABEL);
    broker[POSTCODE].input().should('exist');

    cy.checkText(broker[EMAIL].label(), FIELDS.BROKER[EMAIL].LABEL);
    broker[EMAIL].input().should('exist');
  });

  it('should display the continue and save and go back button', () => {
    cy.checkText(submitButton(), BUTTONS.CONTINUE);

    cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
  });

  describe('when submitting an empty form', () => {
    const errorMessage = ERROR_MESSAGE_BROKER.IS_EMPTY;

    it(`should display validation errors if ${USING_BROKER} radio not selected`, () => {
      // visit url to refresh form and radios
      cy.navigateToUrl(url);

      const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;

      cy.submitAndAssertRadioErrors(field, errorIndex, numberOfExpectedErrors, errorMessage);
    });
  });
});
