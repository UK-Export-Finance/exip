import { yesRadioInput, noRadioInput } from '../e2e/pages/shared';

/**
 * assertUncheckedYesNoRadios
 * Check that both "yes" and "no" inputs are unchecked
 */
const assertUncheckedYesNoRadios = () => {
  yesRadioInput().should('not.be.checked');
  noRadioInput().should('not.be.checked');
};

export default assertUncheckedYesNoRadios;
