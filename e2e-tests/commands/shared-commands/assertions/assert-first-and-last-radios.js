import { radioInputs } from '../../../pages/shared';

/**
 * assertYesNoRadiosOrder
 * Check that "yes" and "no" radio inputs are in the correct order.
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
