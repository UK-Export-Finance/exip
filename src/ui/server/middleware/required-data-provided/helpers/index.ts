/**
 * getRoutesAsArray
 * transform all routes into an array of strings
 * @returns {Array}
 */
export const getRoutesAsArray = (routes: object): Array<string> => Object.values(routes);

/**
 * routeIsKnown
 * check if a route is a known route. If not, it's a 404 page.
 * @returns {Boolean}
 */
export const routeIsKnown = (knownRoutes: Array<string>, route: string): boolean => {
  if (knownRoutes.includes(route)) {
    return true;
  }

  return false;
};
