import { yesRadio, noRadio, submitButton } from '../../../pages/shared';
import { FIELD_VALUES } from '../../../constants';

/**
 * completeAndSubmitDeclarationAntiBriberyCodeOfConduct
 * @param {String} Yes/no answer
 */
export default (answer) => {
  if (answer === FIELD_VALUES.NO) {
    noRadio().input().click();
  } else {
    yesRadio().input().click();
  }

  submitButton().click();
};
