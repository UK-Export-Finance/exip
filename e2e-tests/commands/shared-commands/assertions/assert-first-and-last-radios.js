import { radioInputs } from '../../../pages/shared';

/**
 * assertYesNoRadiosOrder
 * Check that "yes" and "no" radio inputs are in the correct order.
 * Note: other cypress approaches for this test assertion have been explored.
 * All explored options involve adding 2/3 more commands, purely for this command.
 * Such commands would make this assertion harder to read.
 * Mostly due to being unable to assign cy.wrap to a variable.
 * It is simpler and easier to follow to have as below.
 * @param {Boolean} noRadioFirst: No radio should be the first radio. Defaults to false.
 */
const assertYesNoRadiosOrder = ({ noRadioFirst = false }) => {
  cy.get(radioInputs).each((element, index) => {
    if (noRadioFirst) {
      if (index === 0) {
        cy.wrap(element).should('have.attr', 'data-cy', 'no-input');
      }

      if (index === 1) {
        cy.wrap(element).should('have.attr', 'data-cy', 'yes-input');
      }
    } else {
      if (index === 0) {
        cy.wrap(element).should('have.attr', 'data-cy', 'yes-input');
      }

      if (index === 1) {
        cy.wrap(element).should('have.attr', 'data-cy', 'no-input');
      }
    }
  });
};

export default assertYesNoRadiosOrder;
