import { submitButton } from '../../../pages/shared';
import {
  policyTypePage,
  tellUsAboutYourPolicyPage,
} from '../../../pages/quote';
import { FIELD_IDS, ROUTES } from '../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../support/forms';
import {
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitExporterLocationForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeSingleForm,
} from '../../../../support/quote/forms';

const {
  ELIGIBILITY: { CREDIT_PERIOD },
  POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
} = FIELD_IDS;

context('Change your answers (policy type) - multiple times via back button - as an exporter, I want to change the details before submitting the proposal', () => {
  const url = ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY;

  const completePreviousForms = () => {
    cy.login();

    completeAndSubmitBuyerCountryForm();
    completeAndSubmitBuyerBodyForm();
    completeAndSubmitExporterLocationForm();
    completeAndSubmitUkContentForm();
    completeAndSubmitPolicyTypeSingleForm();

    cy.url().should('include', url);

    cy.clickBackLink();
  };

  beforeEach(() => {
    cy.saveSession();

    completePreviousForms();
  });

  it(`should redirect to ${ROUTES.QUOTE.POLICY_TYPE}`, () => {
    cy.url().should('include', ROUTES.QUOTE.POLICY_TYPE);
  });

  it(`redirects to ${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY} when submitting new answers`, () => {
    policyTypePage[POLICY_TYPE].multiple.input().click();
    submitButton().click();

    cy.url().should('include', ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY);
  });

  it('renders credit period field in the `tell us about your policy` page', () => {
    policyTypePage[POLICY_TYPE].multiple.input().click();
    submitButton().click();

    const field = tellUsAboutYourPolicyPage[CREDIT_PERIOD];

    field.label().should('exist');
    field.hint().should('exist');
    field.input().should('exist');
  });

  context('change for a second time - policy type from multiple to single', () => {
    before(() => {
      completePreviousForms();

      policyTypePage[POLICY_TYPE].multiple.input().click();
      submitButton().click();

      cy.clickBackLink();
      cy.url().should('include', ROUTES.QUOTE.POLICY_TYPE);

      policyTypePage[POLICY_TYPE].single.input().click();
      cy.keyboardInput(policyTypePage[SINGLE_POLICY_LENGTH].input(), '2');

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
    beforeEach(() => {
      completePreviousForms();

      // 1st time - change from single to multiple
      policyTypePage[POLICY_TYPE].multiple.input().click();
      submitButton().click();

      // 2nd time - change from multiple to single
      cy.clickBackLink();
      cy.url().should('include', ROUTES.QUOTE.POLICY_TYPE);

      policyTypePage[POLICY_TYPE].single.input().click();
      cy.keyboardInput(policyTypePage[SINGLE_POLICY_LENGTH].input(), '2');

      submitButton().click();

      cy.url().should('include', ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY);

      // 3rd time - change from single to multiple
      cy.clickBackLink();
      cy.url().should('include', ROUTES.QUOTE.POLICY_TYPE);

      policyTypePage[POLICY_TYPE].multiple.input().click();
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
