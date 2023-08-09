const completeOtherSectionsPage = {
  intro: () => cy.get('[data-cy="intro"]'),
  canAccessOtherSections: () => cy.get('[data-cy="can-access-other-sections"]'),
  taskListLink: () => cy.get('[data-cy="task-list-link"]'),
};

export default completeOtherSectionsPage;
