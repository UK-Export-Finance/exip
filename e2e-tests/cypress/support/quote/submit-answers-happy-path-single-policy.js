import {
  completeAndSubmitBuyerCountryForm,
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitCompanyForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeSingleForm,
  completeAndSubmitTellUsAboutYourSinglePolicyForm,
} from './forms';

export default () => {
  completeAndSubmitBuyerCountryForm();
  completeAndSubmitBuyerBodyForm();
  completeAndSubmitCompanyForm();
  completeAndSubmitUkContentForm();
  completeAndSubmitPolicyTypeSingleForm();
  completeAndSubmitTellUsAboutYourSinglePolicyForm();
};
