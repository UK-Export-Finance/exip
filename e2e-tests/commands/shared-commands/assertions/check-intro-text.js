import { intro } from '../../../pages/shared';

/**
 * checkIntroText
 * Check intro text element.
 * @param {String} expected: Expected text
 */
const checkIntroText = (expected) => {
  cy.checkText(intro(), expected);
};

export default checkIntroText;
