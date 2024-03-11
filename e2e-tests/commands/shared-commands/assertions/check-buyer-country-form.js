import { autoCompleteField } from '../../../pages/shared';
import partials from '../../../partials';
import { ERROR_MESSAGES, FIELDS } from '../../../content-strings';
import { FIELD_IDS } from '../../../constants';

const {
  ELIGIBILITY: { BUYER_COUNTRY: FIELD_ID },
} = FIELD_IDS;

export const checkBuyerCountryInputHint = () => {
  cy.checkText(autoCompleteField(FIELD_ID).hint(), FIELDS[FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY].HINT);
};

export const checkBuyerCountryValidationErrors = () => {
  const expectedErrorsCount = 1;

  cy.submitAndAssertFieldErrors(
    autoCompleteField(FIELD_ID),
    null,
    0,
    expectedErrorsCount,
    ERROR_MESSAGES.ELIGIBILITY[FIELD_ID],
  );
};

export const checkBuyerCountryFocusAfterSummaryErrorClick = () => {
  // autocomplete component does not have a focused attribute, instead it has a class.
  // this is added with client side JS.
  // we have to wait to ensure that client side js has been executed.
  cy.wait(8000); // eslint-disable-line cypress/no-unnecessary-waiting

  partials.errorSummaryListItemLinks().eq(0).click();

  autoCompleteField(FIELD_ID).input().should('have.class', 'autocomplete__input--focused');
};
