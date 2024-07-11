/**
 * completeAndSubmitPreCreditPeriodForm
 * Complete and submit the "pre-credit period" form
 * @param {Boolean} needPreCreditPeriod: If a pre-credit period is required - default false
 * @param {String} description: Custom "credit period with buyer" description value
 */
const completeAndSubmitPreCreditPeriodForm = ({ needPreCreditPeriod, description }) => {
  cy.completePreCreditPeriodForm({
    needPreCreditPeriod,
    description,
  });

  cy.clickSubmitButton();
};

export default completeAndSubmitPreCreditPeriodForm;
