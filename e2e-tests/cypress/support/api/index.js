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
  updateExporter: () => gql`
    mutation UpdateExporter($where: ExporterWhereUniqueInput!, $data: ExporterUpdateInput!)  {
      updateExporter(where: $where, data: $data) {
        id
        verificationHash
      }
    }
  `,
  deleteExportersById: () => gql`
    mutation DeleteExporters($where: [ExporterWhereUniqueInput!]!)  {
      deleteExporters(where: $where) {
        id
      }
    }
  `,
  addAndGetOTP: () => gql`
    mutation AddAndGetOTP($email: String!) {
      addAndGetOTP(email: $email) {
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

/**
 * updateExporter
 * Update an exporter
 * @param {String} Account ID
 * @returns {String} Account ID
 */
const updateExporter = async (id, updateObj) => {
  try {
    const responseBody = await apollo.query({
      query: queryStrings.updateExporter(),
      variables: {
        where: { id },
        data: updateObj,
      },
    }).then((response) => response.data.updateExporter);

    return responseBody;
  } catch (err) {
    console.error(err);

    throw new Error('Updating exporter', { err });
  }
};

/**
 * deleteExportersById
 * Delte exporters by ID
 * @param {String} Account ID
 * @returns {String} Account ID
 */
const deleteExportersById = async (id) => {
  try {
    const responseBody = await apollo.query({
      query: queryStrings.deleteExportersById(),
      variables: { where: { id } },
    }).then((response) => response.data.deleteExporters);

    return responseBody.id;
  } catch (err) {
    console.error(err);

    throw new Error('Deleting exporters by ID', { err });
  }
};

/**
 * addAndGetOTP
 * Add a OTP to an exporter account and return the security code
 * @param {String} Exporter email address
 * @returns {Object} security code
 */
const addAndGetOTP = async (email) => {
  try {
    const responseBody = await apollo.query({
      query: queryStrings.addAndGetOTP(),
      variables: { email },
    }).then((response) => response.data.addAndGetOTP);

    return responseBody.securityCode;
  } catch (err) {
    console.error(err);

    throw new Error('Adding and getting OTP', { err });
  }
};

const api = {
  getExporterByEmail,
  updateExporter,
  deleteExportersById,
  addAndGetOTP,
};

export default api;
