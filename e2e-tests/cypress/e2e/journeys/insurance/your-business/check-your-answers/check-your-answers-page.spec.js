import {
  headingCaption,
  saveAndBackButton,
} from '../../../../pages/shared';
import partials from '../../../../partials';
import {
  BUTTONS,
  PAGES,
} from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';

const {
  ROOT,
  START,
  EXPORTER_BUSINESS: {
    BROKER,
    CHECK_YOUR_ANSWERS,
  },
} = ROUTES.INSURANCE;

const insuranceStartRoute = START;

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.CHECK_YOUR_ANSWERS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.exporterBusiness;

context('Insurance - Your Business - Check your answers - As an exporter, I want to check my answers to the your business section', () => {
  let referenceNumber;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.completeAndSubmitCompanyDetails();
    cy.completeAndSubmitNatureOfYourBusiness();
    cy.completeAndSubmitTurnoverForm();
    cy.completeAndSubmitBrokerForm();

    cy.getReferenceNumber().then((id) => {
      referenceNumber = id;

      const url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${BROKER}`,
      submitButtonCopy: BUTTONS.CONTINUE_NEXT_SECTION,
    });
  });

  it('should render a header with href to insurance start', () => {
    partials.header.serviceName().should('have.attr', 'href', insuranceStartRoute);
  });

  it('renders a heading caption', () => {
    cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
  });

  it('renders a `save and back` button', () => {
    saveAndBackButton().should('exist');

    cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
  });
});
