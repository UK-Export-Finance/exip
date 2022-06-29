import submitAnswersHappyPath from './submit-answers-happy-path';
import {
  checkYourAnswersPage,
} from '../integration/pages';

export default () => {
  submitAnswersHappyPath();

  checkYourAnswersPage.submitButton().click();
};
