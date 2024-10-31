/**
 * completeAndDeclarationsForms
 * completes declarations forms up to the specified form to stop at
 * eg, when 'antiBribery' is passed, it will complete all forms up to and including 'antiBribery'
 * @param {String} formToStopAt: the form to stop at
 * @param {String} referenceNumber: application reference number
 */
const completeAndSubmitDeclarationsForms = ({ formToStopAt, referenceNumber }) => {
  cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

  cy.completeAndSubmitCheckYourAnswers();

  // go to the page we want to test.
  cy.clickTaskDeclarationsAndSubmit();

  const steps = [
    { name: 'confidentiality', action: () => cy.completeAndSubmitDeclarationConfidentiality() },
    { name: 'antiBribery', action: () => cy.completeAndSubmitDeclarationAntiBribery() },
    { name: 'codeOfConduct', action: () => cy.completeAndSubmitDeclarationAntiBriberyCodeOfConduct() },
    { name: 'exportingWithCodeOfConduct', action: () => cy.completeAndSubmitDeclarationAntiBriberyExportingWithCodeOfConduct() },
  ];

  /**
   * carries out steps in steps array
   * if the step name matches the form to stop at, it breaks out of the loop
   */
  for (const step of steps) {
    step.action();

    if (step.name === formToStopAt) {
      break;
    }
  }
};

export default completeAndSubmitDeclarationsForms;
