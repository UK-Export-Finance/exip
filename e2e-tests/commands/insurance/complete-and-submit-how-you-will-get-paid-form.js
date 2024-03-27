/**
 * completeAndSubmitHowYouWillGetPaidForm
 * Complete and submit the "How you will get paid" form
 * @param {String} paymentTermsDescription: Description value
 */
const completeAndSubmitHowYouWillGetPaidForm = ({
  paymentTermsDescription,
}) => {
  cy.completeHowYouWillGetPaidForm({ paymentTermsDescription });

  cy.clickSubmitButton();
};

export default completeAndSubmitHowYouWillGetPaidForm;
