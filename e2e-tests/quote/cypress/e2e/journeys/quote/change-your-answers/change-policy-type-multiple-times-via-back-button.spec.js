import { submitButton } from '../../../../../../pages/shared';
import {
  policyTypePage,
  tellUsAboutYourPolicyPage,
} from '../../../../../../pages/quote';
import { FIELD_IDS, ROUTES } from '../../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';
import {
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitExporterLocationForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeSingleForm,
} from '../../../../../../commands/quote/forms';

const {
  ELIGIBILITY: { CREDIT_PERIOD },
  POLICY_TYPE,
} = FIELD_IDS;

const {
  QUOTE: { TELL_US_ABOUT_YOUR_POLICY, POLICY_TYPE: POLICY_TYPE_ROUTE },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

const policyTypeUrl = `${baseUrl}${POLICY_TYPE_ROUTE}`;
const tellUsAboutPolicyUrl = `${baseUrl}${TELL_US_ABOUT_YOUR_POLICY}`;

context('Change your answers (policy type) - multiple times via back button - as an exporter, I want to change the details before submitting the proposal', () => {
  const url = `${baseUrl}${TELL_US_ABOUT_YOUR_POLICY}`;

  const completePreviousForms = () => {
    cy.login();

    completeAndSubmitBuyerCountryForm();
    completeAndSubmitBuyerBodyForm();
    completeAndSubmitExporterLocationForm();
    completeAndSubmitUkContentForm();
    completeAndSubmitPolicyTypeSingleForm();

    cy.assertUrl(url);

    cy.clickBackLink();
  };

  beforeEach(() => {
    cy.saveSession();

    completePreviousForms();
  });

  it(`should redirect to ${POLICY_TYPE_ROUTE}`, () => {
    cy.assertUrl(policyTypeUrl);
  });

  it(`redirects to ${TELL_US_ABOUT_YOUR_POLICY} when submitting new answers`, () => {
    policyTypePage[POLICY_TYPE].multiple.input().click();
    submitButton().click();

    cy.assertUrl(tellUsAboutPolicyUrl);
  });

  it('renders credit period field in the `tell us about your policy` page', () => {
    policyTypePage[POLICY_TYPE].multiple.input().click();
    submitButton().click();

    const field = tellUsAboutYourPolicyPage[CREDIT_PERIOD];

    field.hint().should('exist');
    field.input().should('exist');
  });

  context('change for a second time - policy type from multiple to single', () => {
    before(() => {
      completePreviousForms();

      policyTypePage[POLICY_TYPE].multiple.input().click();
      submitButton().click();

      cy.clickBackLink();

      cy.assertUrl(policyTypeUrl);

      policyTypePage[POLICY_TYPE].single.input().click();

      submitButton().click();

      cy.assertUrl(tellUsAboutPolicyUrl);
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

      cy.assertUrl(policyTypeUrl);

      policyTypePage[POLICY_TYPE].single.input().click();

      submitButton().click();

      cy.assertUrl(tellUsAboutPolicyUrl);

      // 3rd time - change from single to multiple
      cy.clickBackLink();
      cy.assertUrl(policyTypeUrl);

      policyTypePage[POLICY_TYPE].multiple.input().click();
      submitButton().click();

      cy.assertUrl(tellUsAboutPolicyUrl);
    });

    it('renders credit period field in the `tell us about your policy` page', () => {
      const field = tellUsAboutYourPolicyPage[CREDIT_PERIOD];

      field.hint().should('exist');
      field.input().should('exist');
    });
  });
});
