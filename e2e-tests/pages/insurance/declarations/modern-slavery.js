const modernSlaveryPage = {
  intro: {
    answerTheQuestions: () => cy.get('[data-cy="intro-answer-the-questions"]'),
    guidingPrinciplesLink: () => cy.get('[data-cy="intro-guiding-principles-link"]'),
    ifYouSayNo: () => cy.get('[data-cy="intro-if-you-say-no"]'),
  },
};

export default modernSlaveryPage;
