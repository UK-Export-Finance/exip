/**
 * completeAndSubmitAboutGoodsOrServicesForm
 * Complete and submit the "About goods or services" form
 * @param {Boolean} description: description value
 * @param {Boolean} finalDestinationKnown: flag for if the final destination is known.
 * @param {Boolean} includeFinalDestination: flag for if the final destination should be included.
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
