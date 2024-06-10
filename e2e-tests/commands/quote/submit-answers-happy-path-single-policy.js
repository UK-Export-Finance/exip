import { completeAndSubmitBuyerCountryForm } from '../forms';
import {
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitExporterLocationForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeSingleForm,
  completeAndSubmitTellUsAboutYourSinglePolicyForm,
} from './forms';

/**
 * submitQuoteAnswersHappyPathSinglePolicy
 * Submit all quote answers - happy path - single policy
 * @param {Integer} policyLength: Policy length
 */
const submitQuoteAnswersHappyPathSinglePolicy = ({ policyLength }) => {
  completeAndSubmitBuyerCountryForm({});
  completeAndSubmitBuyerBodyForm();
  completeAndSubmitExporterLocationForm();
  completeAndSubmitUkContentForm();
  completeAndSubmitPolicyTypeSingleForm();
  completeAndSubmitTellUsAboutYourSinglePolicyForm({ policyLength });
};

export default submitQuoteAnswersHappyPathSinglePolicy;
