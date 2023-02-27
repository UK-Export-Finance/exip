const queryStrings = {
  getExporterByEmail: (email) => `
    {
      exporters(
        orderBy: { updatedAt: desc }
        where: { email: { equals: "${email}" } },
        take: 1
      ) {
        id
        verificationHash
      }
    }`,
};

/**
 * getExporterByEmail
 * Get's an exporter by email from the API
 * @param {String} Exporter email address
 * @returns {Object} Exporter
 */
const getExporterByEmail = async (email) => {
  try {
    const baseUrl = Cypress.config('apiUrl');
    const url = `${baseUrl}?query=${queryStrings.getExporterByEmail(email)}`;

    const response = await cy.request({
      headers: {
        'content-type': 'application/json',
      },
      url,
    });

    if (!response.body || !response.body.data) {
      throw new Error('Getting exporter by email', { response });
    }

    return response;
  } catch (err) {
    console.error(err);

    throw new Error('Getting exporter by email', { err });
  }
};

const api = {
  getExporterByEmail,
};

export default api;
