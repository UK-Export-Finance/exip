const brokerZeroAddresses = {
  outro: {
    couldNotFind: () => cy.get('[data-cy="outro-could-not-find"'),
    postcode: () => cy.get('[data-cy="outro-postcode"'),
    youCan: () => cy.get('[data-cy="outro-you-can"'),
    searchAgainLink: () => cy.get('[data-cy="outro-search-again-link"'),
    or: () => cy.get('[data-cy="outro-or"'),
    enterManuallyLink: () => cy.get('[data-cy="outro-enter-manually-link"'),
  },
};

export default brokerZeroAddresses;
