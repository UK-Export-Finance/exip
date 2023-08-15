const allSectionsPage = {
  submissionDeadlineHeading: () => cy.get('[data-cy="submission-deadline-heading"]'),
  submissionDeadline: () => cy.get('[data-cy="submission-deadline"]'),
  yourReferenceNumberHeading: () => cy.get('[data-cy="your-reference-number-heading"]'),
  yourReferenceNumber: () => cy.get('[data-cy="your-reference-number"]'),
};

export default allSectionsPage;
