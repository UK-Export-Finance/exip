import { autoCompleteField } from '../../../pages/shared';
import { errorSummaryListItemLinks } from '../../../partials';
import { ERROR_MESSAGES, FIELDS } from '../../../content-strings';
import { FIELD_IDS } from '../../../constants';

const {
  ELIGIBILITY: { BUYER_COUNTRY: FIELD_ID },
} = FIELD_IDS;

export const checkBuyerCountryInputHint = () => {
  cy.checkText(autoCompleteField(FIELD_ID).hint(), FIELDS[FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY].HINT);
};

export const checkBuyerCountryValidationErrors = () => {
  cy.submitAndAssertFieldErrors({
    field: autoCompleteField(FIELD_ID),
    value: null,
    expectedErrorsCount: 1,
    expectedErrorMessage: ERROR_MESSAGES.ELIGIBILITY[FIELD_ID],
  });
};

export const checkBuyerCountryFocusAfterSummaryErrorClick = () => {
  // autocomplete component does not have a focused attribute, instead it has a class.
  // this is added with client side JS.
  // we have to wait to ensure that client side js has been executed.
  cy.wait(8000); // eslint-disable-line cypress/no-unnecessary-waiting

  errorSummaryListItemLinks().eq(0).click();

  const expectedClass = 'autocomplete__input autocomplete__input--default autocomplete__input--focused';

  cy.checkClassName(autoCompleteField(FIELD_ID).input(), expectedClass);
};
