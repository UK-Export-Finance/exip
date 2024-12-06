const brokerConfirmAddressPage = {
  useDifferentAddressLink: () => cy.get('[data-cy="use-different-address-link"]'),
  enterAddressManuallyLink: () => cy.get('[data-cy="enter-address-manually-link"]'),
};

export default brokerConfirmAddressPage;
