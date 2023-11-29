import { submitButton } from '../../pages/shared';

/**
 * completeAndSubmitCompanyDetails
 * Runs through and submits the "company details" form in the "your business" section
 * @param {Object} Object with flags on how to complete specific parts of the application
 * - differentTradingAddress: Should submit "yes" to "trade from a different address" in the "your business - company details" form. Defaults to false.
 * - differentTradingName: Should submit "yes" to "different trading name" in the "your business - company details" form. Defaults to false.
 * - completeDifferentTradingName: Should complete the alternative trading name input in the "your business - company details" form. Defaults to true.
 */
const completeAndSubmitCompanyDetails = ({ differentTradingAddress = false, differentTradingName = false, completeDifferentTradingName = true }) => {
  cy.completeCompanyDetailsForm({ differentTradingAddress, differentTradingName, completeDifferentTradingName });

  submitButton().click();
};
export default completeAndSubmitCompanyDetails;
