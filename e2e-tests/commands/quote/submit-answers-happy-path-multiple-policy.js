import { completeAndSubmitBuyerCountryForm } from '../forms';
import {
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitExporterLocationForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeMultiForm,
  completeAndSubmitTellUsAboutYourMultiPolicyForm,
} from './forms';

const submitAnswersHappyPathMultiplePolicy = () => {
  completeAndSubmitBuyerCountryForm();
  completeAndSubmitBuyerBodyForm();
  completeAndSubmitExporterLocationForm();
  completeAndSubmitUkContentForm();
  completeAndSubmitPolicyTypeMultiForm();
  completeAndSubmitTellUsAboutYourMultiPolicyForm();
};

export default submitAnswersHappyPathMultiplePolicy;
