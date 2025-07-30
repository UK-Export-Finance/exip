/**
 * completeAndSubmitExportValueForm
 * Complete and submit the "Export value" form
 * @param {string} totalSalesToBuyer: Total sales to the buyer
 * @param {string} maximumBuyerWillOwe: Maximum buyer will owe
 */
const completeAndSubmitExportValueForm = ({ totalSalesToBuyer, maximumBuyerWillOwe }) => {
  cy.completeExportValueForm({ totalSalesToBuyer, maximumBuyerWillOwe });

  cy.clickSubmitButton();
};

export default completeAndSubmitExportValueForm;
