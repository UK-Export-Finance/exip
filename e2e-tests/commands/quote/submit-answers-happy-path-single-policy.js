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
 * @param {Number} policyLength: Policy length
 * @param {String} countryName: Name of the country
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
