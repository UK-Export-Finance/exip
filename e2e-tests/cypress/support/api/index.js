import gql from 'graphql-tag';
import apollo from './apollo';

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
  addAndGetOtp: () => gql`
    mutation AddAndGetOtp($email: String!) {
      addAndGetOtp(email: $email) {
        success
        securityCode
      }
    }
  `,
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

    const response = await cy.request(url);

    if (!response.body || !response.body.data) {
      throw new Error('Getting exporter by email', { response });
    }

    return response;
  } catch (err) {
    console.error(err);

    throw new Error('Getting exporter by email', { err });
  }
};

/**
 * addAndGetOtp
 * Add a OTP to an exporter account and return the security code
 * @param {String} Exporter email address
 * @returns {Object} security code
 */
const addAndGetOtp = async (email) => {
  try {
    const responseBody = await apollo.query({
      query: queryStrings.addAndGetOtp(),
      variables: { email },
    }).then((response) => response.data.addAndGetOtp);

    return responseBody.securityCode;
  } catch (err) {
    console.error(err);

    throw new Error('Adding and getting OTP', { err });
  }
};

const api = {
  getExporterByEmail,
  addAndGetOtp,
};

export default api;
