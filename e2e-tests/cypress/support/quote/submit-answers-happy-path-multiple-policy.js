import { completeAndSubmitBuyerCountryForm } from '../forms';
import {
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitExporterLocationForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeMultiForm,
  completeAndSubmitTellUsAboutYourMultiPolicyForm,
} from './forms';

export default () => {
  completeAndSubmitBuyerCountryForm();
  completeAndSubmitBuyerBodyForm();
  completeAndSubmitExporterLocationForm();
  completeAndSubmitUkContentForm();
  completeAndSubmitPolicyTypeMultiForm();
  completeAndSubmitTellUsAboutYourMultiPolicyForm();
};
