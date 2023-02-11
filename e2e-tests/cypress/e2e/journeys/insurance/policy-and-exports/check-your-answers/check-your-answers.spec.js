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
import { FIELD_VALUES, ROUTES } from '../../../../../../constants';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';

const {
  POLICY_AND_EXPORTS,
  START,
  EXPORTER_BUSINESS: {
    COMPANY_DETAILS,
  },
} = ROUTES.INSURANCE;

const insuranceStartRoute = START;

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY_AND_EXPORTS.CHECK_YOUR_ANSWERS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

context('Insurance - Policy and exports - Check your answers - As an exporter, I want to check my answers to the type of policy and exports section', () => {
  let referenceNumber;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
    cy.completeAndSubmitSingleContractPolicyForm();
    cy.completeAndSubmitAboutGoodsOrServicesForm();

    cy.getReferenceNumber().then((id) => {
      referenceNumber = id;

      const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${POLICY_AND_EXPORTS.CHECK_YOUR_ANSWERS}`;
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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${POLICY_AND_EXPORTS.CHECK_YOUR_ANSWERS}`,
      expectedBackLink: `${INSURANCE_ROOT}/${referenceNumber}${POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES}`,
      assertSubmitButton: true,
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

  describe('form submission', () => {
    it(`should redirect to ${COMPANY_DETAILS}`, () => {
      submitButton().click();

      const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${COMPANY_DETAILS}`;
      cy.url().should('eq', expectedUrl);
    });
  });
});
