/**
 * completeAndSubmitAboutGoodsOrServicesForm
 * Complete and submit the "About goods or services" form
 * @param {boolean} description: description value
 * @param {boolean} finalDestinationKnown: flag for if the final destination is known.
 * @param {boolean} includeFinalDestination: flag for if the final destination should be included.
 */
const completeAndSubmitAboutGoodsOrServicesForm = ({ description, finalDestinationKnown, includeFinalDestination }) => {
  cy.completeAboutGoodsOrServicesForm({
    description,
    finalDestinationKnown,
    includeFinalDestination,
  });

  cy.clickSubmitButton();
};

export default completeAndSubmitAboutGoodsOrServicesForm;
