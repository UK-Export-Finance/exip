import {
  headingCaption,
  submitButton,
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
  ALL_SECTIONS,
  EXPORTER_BUSINESS: {
    BROKER,
    CHECK_YOUR_ANSWERS,
  },
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION,
  },
} = ROUTES.INSURANCE;

const insuranceStartRoute = START;

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.CHECK_YOUR_ANSWERS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.exporterBusiness;

context('Insurance - Your Business - Check your answers - As an exporter, I want to check my answers to the your business section', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompanyDetails();
      cy.completeAndSubmitNatureOfYourBusiness();
      cy.completeAndSubmitTurnoverForm();
      cy.completeAndSubmitBrokerForm();

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

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
    submitButton().should('exist');
    cy.checkText(submitButton(), BUTTONS.CONTINUE_NEXT_SECTION);

    saveAndBackButton().should('exist');
    cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
  });

  describe('form submission', () => {
    describe('continue', () => {
      it(`should redirect to ${COMPANY_OR_ORGANISATION}`, () => {
        submitButton().click();

        const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION}`;
        cy.url().should('eq', expectedUrl);
      });
    });

    describe('save and back', () => {
      it(`should redirect to ${ALL_SECTIONS}`, () => {
        cy.navigateToUrl(url);

        saveAndBackButton().click();

        const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;
        cy.url().should('eq', expectedUrl);
      });
    });
  });
});
