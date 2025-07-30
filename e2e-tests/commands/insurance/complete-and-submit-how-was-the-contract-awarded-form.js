/**
 * completeAndSubmitHowWasTheContractAwardedForm
 * Complete and submit the "How was the contract awarded" form
 * @param {boolean} openTender: Award method as OPEN_TENDER
 * @param {boolean} negotiatedContract: Award method as NEGOTIATED_CONTRACT
 * @param {boolean} directAward: Award method as DIRECT_AWARD
 * @param {boolean} competitiveBidding: Award method as COMPETITIVE_BIDDING
 * @param {boolean} otherMethod: Award method as OTHER
 * @param {string} otherMethodText: OTHER award method text
 */
const completeAndSubmitHowWasTheContractAwardedForm = ({ openTender, negotiatedContract, directAward, competitiveBidding, otherMethod, otherMethodText }) => {
  cy.completeHowWasTheContractAwardedForm({
    openTender,
    negotiatedContract,
    directAward,
    competitiveBidding,
    otherMethod,
    otherMethodText,
  });

  cy.clickSubmitButton();
};

export default completeAndSubmitHowWasTheContractAwardedForm;
