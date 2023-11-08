import { submitButton } from '../../pages/shared';

/**
 * completeAndSubmitCompanyDetails
 * Runs through and submits the "company details" form in the "your business" section
 * @param {Object} Object with flags on how to complete specific parts of the application
 * - differentTradingAddress: Should submit "yes" to "trade from a different address" in the "your business - company details" form. Defaults to false.
 */
const completeAndSubmitCompanyDetails = ({ differentTradingAddress = false }) => {
  cy.completeCompanyDetailsForm({ differentTradingAddress });

  submitButton().click();
};
export default completeAndSubmitCompanyDetails;
