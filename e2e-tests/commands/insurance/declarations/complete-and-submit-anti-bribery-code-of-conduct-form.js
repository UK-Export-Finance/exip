import { yesRadio, noRadio, submitButton } from '../../../pages/shared';
import { FIELD_VALUES } from '../../../constants';

/**
 * completeAndSubmitDeclarationAntiBriberyCodeOfConduct
 * @param {String} Yes/no answer
 */
export default (answer) => {
  if (answer === FIELD_VALUES.NO) {
    noRadio().label().click();
  } else {
    yesRadio().label().click();
  }

  submitButton().click();
};
