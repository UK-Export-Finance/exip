const brokerZeroAddresses = {
  outro: {
    couldNotFind: () => cy.get('[data-cy="outro-could-not-find"]'),
    postcode: () => cy.get('[data-cy="outro-postcode"]'),
    and: () => cy.get('[data-cy="outro-and"]'),
    buildingNumberOrName: () => cy.get('[data-cy="outro-building"]'),
    youCan: () => cy.get('[data-cy="outro-you-can"]'),
    searchAgainLink: () => cy.get('[data-cy="outro-search-again-link"]'),
    or: () => cy.get('[data-cy="outro-or"]'),
  },
};

export default brokerZeroAddresses;
