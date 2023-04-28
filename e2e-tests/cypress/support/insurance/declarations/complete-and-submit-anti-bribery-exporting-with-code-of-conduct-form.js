import { yesRadio, noRadio, submitButton } from '../../../e2e/pages/shared';
import { FIELD_VALUES } from '../../../../constants';

export default (answer) => {
  if (answer === FIELD_VALUES.NO) {
    noRadio().click();
  } else {
    yesRadio().click();
  }

  submitButton().click();
};
