import { beforeYouStartPage } from '../integration/pages';
import {
  completeAndSubmitBuyerForm,
  completeAndSubmitCompanyForm,
  completeAndSubmitTriedToObtainCoverForm,
  completeAndSubmitUkContentForm,
  compmleteAndSubmitTellUsAboutYourPolicyForm,
} from './forms';

export default () => {
  beforeYouStartPage.submitButton().click();

  completeAndSubmitBuyerForm();
  completeAndSubmitCompanyForm();
  completeAndSubmitTriedToObtainCoverForm();
  completeAndSubmitUkContentForm();
  compmleteAndSubmitTellUsAboutYourPolicyForm();
};
