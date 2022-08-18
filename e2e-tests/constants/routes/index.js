const QUOTE_ROUTES = require('./quote');

const ROUTES = {
  ROOT: '/',
  COOKIES: '/cookies',
  PROBLEM_WITH_SERVICE: '/problem-with-service',
  QUOTE: QUOTE_ROUTES,
};

export default ROUTES;
