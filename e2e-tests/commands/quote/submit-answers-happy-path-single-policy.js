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
 * @param {number} policyLength: Policy length
 * @param {string} countryName: Name of the country
 */
const submitQuoteAnswersHappyPathSinglePolicy = ({ policyLength, countryName }) => {
  cy.completeAndSubmitBuyerCountryForm({ countryName });
  completeAndSubmitBuyerBodyForm();
  completeAndSubmitExporterLocationForm();
  completeAndSubmitUkContentForm();
  completeAndSubmitPolicyTypeSingleForm();
  completeAndSubmitTellUsAboutYourSinglePolicyForm({ policyLength });
};

export default submitQuoteAnswersHappyPathSinglePolicy;
