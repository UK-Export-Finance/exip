context('Insurance - Policy - Complete the entire section as a single contract policy', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeAndSubmitPolicyForms({ stopSubmittingAfter: 'lossPayee' });

      /**
       * Submit the "Policy - check your answers" form,
       * This proceeds to the next part of the flow - "All sections"
       */
      cy.clickSubmitButton();
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should change the `type of policy`` task status to `completed` in the `all sections` page', () => {
    cy.assertAllSectionsUrl(referenceNumber);

    cy.checkTaskPolicyStatusIsComplete();
  });
});
