import { BUTTONS } from '../../../content-strings';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';

const {
  ALL_SECTIONS,
  CHECK_YOUR_ANSWERS: { YOUR_BUSINESS, YOUR_BUYER, TYPE_OF_POLICY, EXPORT_CONTRACT },
} = INSURANCE_ROUTES;

const routes = [YOUR_BUSINESS, YOUR_BUYER, TYPE_OF_POLICY, EXPORT_CONTRACT, ALL_SECTIONS];

/**
 * completeAndSubmitMultipleCheckYourAnswers
 * Complete and submit multiple "Application - Check your answers" forms.
 * @param {number} count: Number of pages to submit, starting at "Your business".
 */
const completeAndSubmitMultipleCheckYourAnswers = ({ count }) => {
  const arr = new Array(count).fill();

  arr.forEach((_, index) => {
    const expectedText = index === count - 1 ? BUTTONS.SAVE_AND_BACK : BUTTONS.CONFIRM_AND_CONTINUE;

    cy.assertPathnameContains(routes[index]);
    cy.submitCheckYourAnswersForm({ expectedText });
    cy.assertPathnameContains(routes[index + 1]);
  });
};

export default completeAndSubmitMultipleCheckYourAnswers;
