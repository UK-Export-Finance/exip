const guidancePage = {
  whatItCosts: {
    getAQuote: () => cy.get('[data-cy="what-it-costs-get-a-quote-online"]'),
  },
  eligibility: {
    getAQuote: () => cy.get('[data-cy="eligibility-get-a-quote-online"]'),
  },
  buyerCountries: {
    getAQuote: () => cy.get('[data-cy="buyer-countries-get-a-quote-online"]'),
  },
};

export default guidancePage;
