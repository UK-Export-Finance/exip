export const accessibilityStatementPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  usingOurService: {
    heading: () => cy.get('[data-cy="using-our-service-heading"]'),
    intro: () => cy.get('[data-cy="using-our-service-intro"]'),
    listItem1: () => cy.get('[data-cy="using-our-service-list-item-1"]'),
    listItem2: () => cy.get('[data-cy="using-our-service-list-item-2"]'),
    listItem3: () => cy.get('[data-cy="using-our-service-list-item-3"]'),
    listItem4: () => cy.get('[data-cy="using-our-service-list-item-4"]'),
    listItem5: () => cy.get('[data-cy="using-our-service-list-item-5"]'),
    website: () => cy.get('[data-cy="using-our-service-website"]'),
    abilityNet: {
      link: () => cy.get('[data-cy="using-our-service-outro-abilityNet-link"]'),
      outro: () => cy.get('[data-cy="using-our-service-outro-abilityNet-description"]'),
    },
  },
  feedbackAndContact: {
    heading: () => cy.get('[data-cy="feedback-and-contact-heading"]'),
    intro: () => cy.get('[data-cy="feedback-and-contact-intro"]'),
    listItem1: () => cy.get('[data-cy="feedback-and-contact-list-item-1"]'),
    listItem2: () => cy.get('[data-cy="feedback-and-contact-list-item-2"]'),
    outro: () => cy.get('[data-cy="feedback-and-contact-outro"]'),
  },
  reportingProblems: {
    heading: () => cy.get('[data-cy="reporting-problems-heading"]'),
    description: () => cy.get('[data-cy="reporting-problems-description"]'),
  },
  enforcementProcedure: {
    heading: () => cy.get('[data-cy="enforcement-procedure-heading"]'),
    description: () => cy.get('[data-cy="enforcement-procedure-description"]'),
    link: () => cy.get('[data-cy="enforcement-procedure-link"]'),
  },
  technicalInfo: {
    heading: () => cy.get('[data-cy="technical-info-heading"]'),
    description: () => cy.get('[data-cy="technical-info-description"]'),
  },
  complianceStatus: {
    heading: () => cy.get('[data-cy="compliance-status-heading"]'),
    intro: () => cy.get('[data-cy="compliance-status-intro"]'),
    link: () => cy.get('[data-cy="compliance-status-link"]'),
    outro: () => cy.get('[data-cy="compliance-status-outro"]'),
    listItem1: () => cy.get('[data-cy="compliance-status-list-item-1"]'),
    listItem2: () => cy.get('[data-cy="compliance-status-list-item-2"]'),
  },
  improvingAccessibility: {
    heading: () => cy.get('[data-cy="improving-accessibility-heading"]'),
    description: () => cy.get('[data-cy="improving-accessibility-description"]'),
  },
  preperationOfStatement: {
    heading: () => cy.get('[data-cy="preperation-of-statement-heading"]'),
    listItem1: () => cy.get('[data-cy="preperation-of-statement-list-item-1"]'),
    listItem2: () => cy.get('[data-cy="preperation-of-statement-list-item-2"]'),
  },
};
