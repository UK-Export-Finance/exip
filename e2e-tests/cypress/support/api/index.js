import gql from 'graphql-tag';
import apollo from './apollo';

const queryStrings = {
  createExporterAccount: () => gql`
    mutation CreateAccount($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
      createAccount(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
        success
        id
        firstName
        lastName
        email
        verificationHash
      }
    }
  `,
  getExporterByEmail: (email) => `
    {
      exporters(
        orderBy: { updatedAt: desc }
        where: { email: { equals: "${email}" } }
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
  getApplicationByReferenceNumber: (referenceNumber) => `
    {
      applications(
        orderBy: { updatedAt: desc }
        where: { referenceNumber: { equals: ${referenceNumber} } }
        take: 1
      ) {
        id
      }
    }`,
  deleteApplicationsById: () => gql`
    mutation DeleteApplications($where: [ApplicationWhereUniqueInput!]!)  {
      deleteApplications(where: $where) {
        id
      }
    }
  `,
  declarations: {
    getLatestConfidentiality: () => gql`
      query DeclarationConfidentialities {
        declarationConfidentialities(orderBy: { version: desc }, take: 1) {
          id
          version
          content {
            document
          }
        }
      }
    `,
  },
};

/**
 * createExporterAccount
 * Create an exporter account
 * @param {String} First name
 * @param {String} Last name
 * @param {String} Email address
 * @param {String} Password
 * @returns {Object} Exporter account
 */
const createExporterAccount = (firstName, lastName, email, password) =>
  apollo.query({
    query: queryStrings.createExporterAccount(),
    variables: {
      firstName,
      lastName,
      email,
      password,
    },
  }).then((response) => response.data.createAccount);

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
      throw new Error('Getting exporter by email ', { response });
    }

    return response;
  } catch (err) {
    console.error(err);

    throw new Error('Getting exporter by email ', { err });
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
 * Delete exporters by ID
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

    throw new Error('Deleting exporters by ID ', { err });
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

    throw new Error('Adding and getting OTP ', { err });
  }
};

/**
 * getApplicationByReferenceNumber
 * Get's an application by reference number from the API
 * @param {Number} Application reference number
 * @returns {Object} Application
 */
const getApplicationByReferenceNumber = async (referenceNumber) => {
  try {
    const baseUrl = Cypress.config('apiUrl');
    const url = `${baseUrl}?query=${queryStrings.getApplicationByReferenceNumber(referenceNumber)}`;

    const response = await cy.request({
      headers: {
        'content-type': 'application/json',
      },
      url,
    });

    if (!response.body || !response.body.data) {
      throw new Error(`Getting application by reference number ${referenceNumber}`, { response });
    }

    return response;
  } catch (err) {
    console.error(err);

    throw new Error(`Getting application by reference number ${referenceNumber}`, { err });
  }
};

/**
 * deleteApplicationsById
 * Delete applications by ID
 * @param {String} Application ID
 * @returns {Object}
 */
const deleteApplicationsById = async (id) => {
  try {
    const responseBody = await apollo.query({
      query: queryStrings.deleteApplicationsById(),
      variables: { where: { id } },
    }).then((response) => response.data.deleteApplications);

    return responseBody.id;
  } catch (err) {
    console.error(err);

    throw new Error('Deleting applications by ID ', { err });
  }
};

const declarations = {
  /**
   * getLatestConfidentiality
   * Get the latest confidentiality declaration content
   * @returns {Object} Confidentiality declaration
   */
  getLatestConfidentiality: async () => {
    try {
      const responseBody = await apollo.query({
        query: queryStrings.declarations.getLatestConfidentiality(),
      }).then((response) => response.data.declarationConfidentialities[0]);

      return responseBody;
    } catch (err) {
      console.error(err);

      throw new Error('Getting latest declaration - confidentiality ', { err });
    }
  },
};

const api = {
  createExporterAccount,
  getExporterByEmail,
  updateExporter,
  deleteExportersById,
  addAndGetOTP,
  getApplicationByReferenceNumber,
  deleteApplicationsById,
  declarations,
};

export default api;
