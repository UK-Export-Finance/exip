const howYourDataWillBeUsedPage = {
  paragraph: (itemNumber) => cy.get(`[data-cy='paragraph-${itemNumber}']`),
  link: (itemNumber) => cy.get(`[data-cy='paragraph-${itemNumber}-link']`),
};

export default howYourDataWillBeUsedPage;
