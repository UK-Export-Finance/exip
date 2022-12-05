const container = () => cy.get('[data-cy="header"]');

const header = {
  govHomeLink: () => container().find('a').eq(0),
  serviceName: () => container().find('a').eq(1),
};

export default header;
