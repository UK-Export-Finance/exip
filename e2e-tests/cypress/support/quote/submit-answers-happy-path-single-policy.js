import {
  completeAndSubmitBuyerForm,
  completeAndSubmitCompanyForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeSingleForm,
  completeAndSubmitTellUsAboutYourSinglePolicyForm,
} from './forms';

export default () => {
  completeAndSubmitBuyerForm();
  completeAndSubmitCompanyForm();
  completeAndSubmitUkContentForm();
  completeAndSubmitPolicyTypeSingleForm();
  completeAndSubmitTellUsAboutYourSinglePolicyForm();
};
