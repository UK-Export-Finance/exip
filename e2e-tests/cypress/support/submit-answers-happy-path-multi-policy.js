import {
  completeAndSubmitBuyerForm,
  completeAndSubmitCompanyForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeMultiForm,
  completeAndSubmitTellUsAboutYourMultiPolicyForm,
} from './forms';

export default () => {
  completeAndSubmitBuyerForm();
  completeAndSubmitCompanyForm();
  completeAndSubmitUkContentForm();
  completeAndSubmitPolicyTypeMultiForm();
  completeAndSubmitTellUsAboutYourMultiPolicyForm();
};
