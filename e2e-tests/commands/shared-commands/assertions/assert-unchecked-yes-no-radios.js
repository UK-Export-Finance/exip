/**
 * assertUncheckedYesNoRadios
 * Check that both "yes" and "no" inputs are unchecked
 */
const assertUncheckedYesNoRadios = () => {
  cy.assertYesRadioOptionIsNotChecked();
  cy.assertNoRadioOptionIsNotChecked();
};

export default assertUncheckedYesNoRadios;
