import {
  checkBuyerCountryInputHint,
  checkBuyerCountryValidationErrors,
  checkBuyerCountryFocusAfterSummaryErrorClick,
} from './check-buyer-country-form';

Cypress.Commands.add('checkBuyerCountryInputHint', checkBuyerCountryInputHint);
Cypress.Commands.add('checkBuyerCountryValidationErrors', checkBuyerCountryValidationErrors);
Cypress.Commands.add('checkBuyerCountryFocusAfterSummaryErrorClick', checkBuyerCountryFocusAfterSummaryErrorClick);
