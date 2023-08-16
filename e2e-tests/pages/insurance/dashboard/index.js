const dashboardPage = {
  noApplications: () => cy.get('[data-cy="no-applications"]'),
  startNewApplicationButton: () => cy.get('[data-cy="start-new-application-button"]'),
  getAQuoteButton: () => cy.get('[data-cy="get-a-quote-button"]'),
  table: {
    headers: {
      status: () => cy.get('[data-cy="header-status"]'),
      lastUpdated: () => cy.get('[data-cy="header-lastUpdated"]'),
      referenceNumber: () => cy.get('[data-cy="header-referenceNumebr"]'),
      buyerLocation: () => cy.get('[data-cy="header-buyerLocation"]'),
      buyerName: () => cy.get('[data-cy="header-buyerName"]'),
      insuredFor: () => cy.get('[data-cy="header-insuredFor"]'),
    },
    body: {
      rows: () => cy.get('table tbody tr'),
      row: (referenceNumber) => ({
        status: () => cy.get(`[data-cy="ref-${referenceNumber}-status"]`),
        lastUpdated: () => cy.get(`[data-cy="ref-${referenceNumber}-lastUpdated"]`),
        referenceNumberLink: () => cy.get(`[data-cy="ref-${referenceNumber}-referenceNumber-link"]`),
        referenceNumberText: () => cy.get(`[data-cy="ref-${referenceNumber}-referenceNumber"]`),
        buyerLocation: () => cy.get(`[data-cy="ref-${referenceNumber}-buyerLocation"]`),
        buyerName: () => cy.get(`[data-cy="ref-${referenceNumber}-buyerName"]`),
        insuredFor: () => cy.get(`[data-cy="ref-${referenceNumber}-insuredFor"]`),
      }),
      firstRow: {
        referenceNumberLink: () => cy.get('table tbody tr').first().find('td a'),
        buyerName: () => cy.get('table tbody tr').first().find('td').eq(4),
      },
      lastRow: {
        referenceNumberLink: () => cy.get('table tbody tr').last().find('td a'),
      },
    },
  },
};

export default dashboardPage;
