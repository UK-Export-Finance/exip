import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ELIGIBILITY: { HAVE_AN_ACCOUNT },
  ACCOUNT: { CREATE },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Eligibility - Have an account page - I want to confirm if I am eligible to use UKEF digital service for this Export Insurance Application so that I can be sure of the correct process that I can follow to complete my Export Insurance Application',
  () => {
    before(() => {
      cy.navigateToCheckIfEligibleUrl();

      cy.submitInsuranceEligibilityAnswersHappyPath();

      const expected = `${baseUrl}${HAVE_AN_ACCOUNT}`;

      cy.assertUrl(expected);
    });

    beforeEach(() => {
      cy.saveSession();
    });

    it(`should redirect to ${CREATE.YOUR_DETAILS}`, () => {
      cy.clickNoRadioInput();
      cy.clickSubmitButton();

      const expected = `${baseUrl}${CREATE.YOUR_DETAILS}`;
      cy.assertUrl(expected);
    });
  },
);
