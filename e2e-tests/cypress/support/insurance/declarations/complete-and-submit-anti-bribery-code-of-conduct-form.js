import { yesRadio, submitButton } from '../../../e2e/pages/shared';

export default () => {
  yesRadio().click();

  submitButton().click();
};
