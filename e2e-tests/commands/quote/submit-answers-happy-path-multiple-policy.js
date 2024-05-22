import { completeAndSubmitBuyerCountryForm } from '../forms';
import {
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitExporterLocationForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeMultiForm,
  completeAndSubmitTellUsAboutYourMultiPolicyForm,
} from './forms';

/**
 * submitQuoteAnswersHappyPathMultiplePolicy
 * Submit all quote answers - happy path - multiple policy
 */
const submitQuoteAnswersHappyPathMultiplePolicy = () => {
  completeAndSubmitBuyerCountryForm();
  completeAndSubmitBuyerBodyForm();
  completeAndSubmitExporterLocationForm();
  completeAndSubmitUkContentForm();
  completeAndSubmitPolicyTypeMultiForm();
  completeAndSubmitTellUsAboutYourMultiPolicyForm();
};

export default submitQuoteAnswersHappyPathMultiplePolicy;
