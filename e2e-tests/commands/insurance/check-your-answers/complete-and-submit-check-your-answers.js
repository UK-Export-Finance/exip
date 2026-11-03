import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';

const {
  ALL_SECTIONS,
  CHECK_YOUR_ANSWERS: { YOUR_BUSINESS, YOUR_BUYER, TYPE_OF_POLICY, EXPORT_CONTRACT },
} = INSURANCE_ROUTES;

/**
 * completeAndSubmitCheckYourAnswers
 * Complete and submit all "Application - Check your answers" forms:
 * 1) Your business
 * 2) Your buyer
 * 3) Policy
 * 4) Export contract
 *
 * Wait for each expected route before submitting so consecutive pages with
 * the same submit selector cannot cause the previous page to be submitted again.
 * Use pageLoadTimeout to allow server-side navigation to finish.
 */
const completeAndSubmitCheckYourAnswers = () => {
  cy.clickTaskCheckAnswers();

  [YOUR_BUSINESS, YOUR_BUYER, TYPE_OF_POLICY, EXPORT_CONTRACT].forEach((route) => {
    cy.location('pathname', { timeout: Cypress.config('pageLoadTimeout') }).should('include', route);
    cy.submitCheckYourAnswersForm();
  });

  // The declarations task is only available on all-sections, not the final review page.
  cy.location('pathname', { timeout: Cypress.config('pageLoadTimeout') }).should('include', ALL_SECTIONS);
};

export default completeAndSubmitCheckYourAnswers;
