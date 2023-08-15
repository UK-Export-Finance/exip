const container = () => cy.get('[data-cy="header"]');

const header = {
  govHomeLink: () => container().find('a').eq(0),
  serviceName: () => container().find('a').eq(1),
  navigation: {
    manageAccount: () => cy.get('[data-cy="header-navigation-link-manage-account"]'),
    applications: () => cy.get('[data-cy="header-navigation-link-applications"]'),
    signOut: () => cy.get('[data-cy="header-navigation-link-sign-out"]'),
  },
};

export default header;
