import { beforeYouStartPage } from '../e2e/pages';
import {
  completeAndSubmitBuyerForm,
  completeAndSubmitCompanyForm,
  completeAndSubmitTriedToObtainCoverForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeMultiForm,
  completeAndSubmitTellUsAboutYourMultiPolicyForm,
} from './forms';

export default () => {
  beforeYouStartPage.submitButton().click();

  completeAndSubmitBuyerForm();
  completeAndSubmitCompanyForm();
  completeAndSubmitTriedToObtainCoverForm();
  completeAndSubmitUkContentForm();
  completeAndSubmitPolicyTypeMultiForm();
  completeAndSubmitTellUsAboutYourMultiPolicyForm();
};
