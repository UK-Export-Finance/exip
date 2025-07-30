import { intro } from '../../../pages/shared';

/**
 * checkIntroText
 * Check intro text element.
 * @param {string} expected: Expected text
 */
const checkIntroText = (expected) => {
  cy.checkText(intro(), expected);
};

export default checkIntroText;
