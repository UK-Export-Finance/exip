/**
 * assertPathnameContains
 * Assert that the current pathname contains a route.
 * @param {string} route: Expected route.
 */
const assertPathnameContains = (route) => {
  cy.location('pathname').should('contain', route);
};

export default assertPathnameContains;
