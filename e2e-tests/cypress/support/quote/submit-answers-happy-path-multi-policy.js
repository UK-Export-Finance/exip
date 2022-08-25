import {
  completeAndSubmitBuyerCountryForm,
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitCompanyForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeMultiForm,
  completeAndSubmitTellUsAboutYourMultiPolicyForm,
} from './forms';

export default () => {
  completeAndSubmitBuyerCountryForm();
  completeAndSubmitBuyerBodyForm();
  completeAndSubmitCompanyForm();
  completeAndSubmitUkContentForm();
  completeAndSubmitPolicyTypeMultiForm();
  completeAndSubmitTellUsAboutYourMultiPolicyForm();
};
