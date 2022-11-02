const header = {
  govHomeLink: () => cy.get('[data-cy="gov-home-link"]'),
  govCrownSvg: () => cy.get('[data-cy="gov-crown-svg"]'),
  govCrownText: () => cy.get('[data-cy="gov-crown-text"]'),
  serviceName: () => cy.get('[data-cy="service-name"]'),
};

export default header;
