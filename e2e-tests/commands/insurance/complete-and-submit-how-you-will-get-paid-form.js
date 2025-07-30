/**
 * completeAndSubmitHowYouWillGetPaidForm
 * Complete and submit the "How you will get paid" form
 * @param {string} paymentTermsDescription: Description value
 */
const completeAndSubmitHowYouWillGetPaidForm = ({ paymentTermsDescription }) => {
  cy.completeHowYouWillGetPaidForm({ paymentTermsDescription });

  cy.clickSubmitButton();
};

export default completeAndSubmitHowYouWillGetPaidForm;
