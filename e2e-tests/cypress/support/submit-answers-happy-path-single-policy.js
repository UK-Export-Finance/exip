import { beforeYouStartPage } from '../e2e/pages';
import {
  completeAndSubmitBuyerForm,
  completeAndSubmitCompanyForm,
  completeAndSubmitTriedToObtainCoverForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeSingleForm,
  completeAndSubmitTellUsAboutYourSinglePolicyForm,
} from './forms';

export default () => {
  beforeYouStartPage.submitButton().click();

  completeAndSubmitBuyerForm();
  completeAndSubmitCompanyForm();
  completeAndSubmitTriedToObtainCoverForm();
  completeAndSubmitUkContentForm();
  completeAndSubmitPolicyTypeSingleForm();
  completeAndSubmitTellUsAboutYourSinglePolicyForm();
};
