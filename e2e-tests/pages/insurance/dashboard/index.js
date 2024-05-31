const dashboardPage = {
  noApplications: () => cy.get('[data-cy="no-applications"]'),
  startNewApplicationButton: () => cy.get('[data-cy="start-new-application-button"]'),
  getAQuoteButton: () => cy.get('[data-cy="get-a-quote-button"]'),
  table: {
    headers: {
      status: () => cy.get('[data-cy="header-status"]'),
      buyerLocation: () => cy.get('[data-cy="header-buyerLocation"]'),
      buyerName: () => cy.get('[data-cy="header-buyerName"]'),
      insuredFor: () => cy.get('[data-cy="header-insuredFor"]'),
      referenceNumber: () => cy.get('[data-cy="header-referenceNumber"]'),
      submitted: () => cy.get('[data-cy="header-submitted"]'),
    },
    body: {
      rows: () => cy.get('table tbody tr'),
      firstColumn: () => cy.get('table tbody tr td:first'),
      row: (referenceNumber) => ({
        status: () => cy.get(`[data-cy="ref-${referenceNumber}-status"]`),
        buyerLocation: () => cy.get(`[data-cy="ref-${referenceNumber}-buyerLocation"]`),
        buyerName: () => cy.get(`[data-cy="ref-${referenceNumber}-buyerName"]`),
        value: () => cy.get(`[data-cy="ref-${referenceNumber}-value"]`),
        referenceNumber: () => cy.get('[data-cy="ref-referenceNumber"]'),
        submitted: () => cy.get(`[data-cy="ref-${referenceNumber}-submitted"]`),
        submittedLink: () => cy.get(`[data-cy="ref-${referenceNumber}-submitted-link"]`),
      }),
      firstRow: {
        buyerName: () => cy.get('table tbody tr').first().find('td').eq(2),
        referenceNumber: () => cy.get('table tbody tr').first().find('td').eq(4),
        submittedLink: () => cy.get('table tbody tr').last().find('td a'),
      },
      lastRow: {
        referenceNumber: () => cy.get('table tbody tr').last().find('td').eq(4),
        submittedLink: () => cy.get('table tbody tr').last().find('td a'),
      },
    },
  },
};

export default dashboardPage;
