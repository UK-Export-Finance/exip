import { submitButton } from '../../../pages/shared';
import {
  policyTypePage,
  tellUsAboutYourPolicyPage,
} from '../../../pages/quote';
import partials from '../../../partials';
import CONSTANTS from '../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../support/forms';
import {
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitExporterLocationForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeSingleForm,
} from '../../../../support/quote/forms';

const {
  FIELD_IDS,
  ROUTES,
} = CONSTANTS;

const {
  CREDIT_PERIOD,
  POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
} = FIELD_IDS;

context('Change your answers (policy type) - multiple times via back button - as an exporter, I want to change the details before submitting the proposal', () => {
  before(() => {
    cy.login();

    completeAndSubmitBuyerCountryForm();
    completeAndSubmitBuyerBodyForm();
    completeAndSubmitExporterLocationForm();
    completeAndSubmitUkContentForm();
    completeAndSubmitPolicyTypeSingleForm();

    cy.url().should('include', ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it(`clicking the back button redirects to ${ROUTES.QUOTE.POLICY_TYPE}`, () => {
    partials.backLink().click();
    cy.url().should('include', ROUTES.QUOTE.POLICY_TYPE);
  });

  it(`redirects to ${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY} when submitting new answers`, () => {
    policyTypePage[POLICY_TYPE].multi.input().click();
    submitButton().click();

    cy.url().should('include', ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY);
  });

  it('renders credit period field in the `tell us about your policy` page', () => {
    const field = tellUsAboutYourPolicyPage[CREDIT_PERIOD];

    field.label().should('exist');
    field.hint().should('exist');
    field.input().should('exist');
  });

  context('change for a second time - policy type from multi to single', () => {
    before(() => {
      partials.backLink().click();
      cy.url().should('include', ROUTES.QUOTE.POLICY_TYPE);

      policyTypePage[POLICY_TYPE].single.input().click();
      policyTypePage[SINGLE_POLICY_LENGTH].input().clear().type('2');
      submitButton().click();

      cy.url().should('include', ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY);
    });

    it('does NOT render credit period field in the `tell us about your policy` page', () => {
      const field = tellUsAboutYourPolicyPage[CREDIT_PERIOD];

      field.label().should('not.exist');
      field.hint().should('not.exist');
      field.input().should('not.exist');
    });
  });

  context('change for a third time - policy type from single to multi', () => {
    before(() => {
      partials.backLink().click();
      cy.url().should('include', ROUTES.QUOTE.POLICY_TYPE);

      policyTypePage[POLICY_TYPE].multi.input().click();
      submitButton().click();

      cy.url().should('include', ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY);
    });

    it('renders credit period field in the `tell us about your policy` page', () => {
      const field = tellUsAboutYourPolicyPage[CREDIT_PERIOD];

      field.label().should('exist');
      field.hint().should('exist');
      field.input().should('exist');
    });
  });
});
