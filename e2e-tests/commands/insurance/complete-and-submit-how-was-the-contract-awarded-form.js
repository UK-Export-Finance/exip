/**
 * completeAndSubmitHowWasTheContractAwardedForm
 * Complete and submit the "How was the contract awarded" form
 * @param {Boolean} openTender: Award method as OPEN_TENDER
 * @param {Boolean} negotiatedContract: Award method as NEGOTIATED_CONTRACT
 * @param {Boolean} directAward: Award method as DIRECT_AWARD
 * @param {Boolean} competitiveBidding: Award method as COMPETITIVE_BIDDING
 * @param {Boolean} otherMethod: Award method as OTHER
 * @param {String} otherMethodText: OTHER award method text
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
