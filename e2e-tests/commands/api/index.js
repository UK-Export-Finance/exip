import gql from 'graphql-tag';
import apollo from './apollo';

const APOLLO_CONTEXT = {
  headers: {
    'x-api-key': Cypress.env('API_KEY'),
  },
};

const queryStrings = {
  createAnAccount: () => gql`
    mutation createAnAccount($urlOrigin: String!, $firstName: String!, $lastName: String!, $email: String!, $password: String!) {
      createAnAccount(urlOrigin: $urlOrigin, firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
        success
        id
        firstName
        lastName
        email
        verificationHash
      }
    }
  `,
  deleteAnAccount: () => gql`
    mutation deleteAnAccount($email: String!)  {
      deleteAnAccount(email: $email) {
        success
      }
    }
  `,
  getAccountByEmail: (email) => `
    {
      accounts (
        orderBy: { updatedAt: desc }
        where: { email: { equals: "${email}" } }
        take: 1
      ) {
        id
        verificationHash
        reactivationHash
      }
    }`,
  updateAccount: () => gql`
    mutation updateAccount($where: AccountWhereUniqueInput!, $data: AccountUpdateInput!)  {
      updateAccount(where: $where, data: $data) {
        id
        verificationHash
        reactivationHash
        passwordResetHash
      }
    }
  `,
  addAndGetOTP: () => gql`
    mutation addAndGetOTP($email: String!) {
      addAndGetOTP(email: $email) {
        success
        securityCode
      }
    }
  `,
  getAccountPasswordResetToken: () => gql`
    query getAccountPasswordResetToken($email: String!) {
      getAccountPasswordResetToken(email: $email) {
        success
        token
      }
    }
  `,
  getApplicationByReferenceNumber: (referenceNumber) => `
    {
      applications (
      orderBy: { updatedAt: desc }
      where: { referenceNumber: { equals: ${referenceNumber} } }
      take: 1
    ) {
      id
    }
  }`,
  deleteApplicationByReferenceNumber: () => gql`
    mutation deleteApplicationByReferenceNumber($referenceNumber: Int!)  {
      deleteApplicationByReferenceNumber(referenceNumber: $referenceNumber) {
        success
      }
    }
  `,
  declarations: {
    getLatestConfidentiality: () => gql`
      query declarationConfidentialities {
        declarationConfidentialities(orderBy: { version: desc }, take: 1) {
          id
          version
          content {
            document
          }
        }
      }
    `,
    getLatestAntiBribery: () => gql`
      query declarationAntiBriberies {
        declarationAntiBriberies(orderBy: { version: desc }, take: 1) {
          id
          version
          content {
            document
          }
        }
      }
    `,
    getLatestConfirmationAndAcknowledgements: () => gql`
      query declarationConfirmationAndAcknowledgements {
        declarationConfirmationAndAcknowledgements(orderBy: { version: desc }, take: 1) {
          id
          version
          content {
            document
          }
        }
      }
    `,
    getLatestHowDataWillBeUsed: () => gql`
      query declarationHowDataWillBeUsed {
        declarationHowDataWillBeUseds(orderBy: { version: desc }, take: 1) {
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
 * createAnAccount
 * Create an account
 * @param {String} Name
 * @param {String} Last name
 * @param {String} Email address
 * @param {String} Password
 * @returns {Object} Account
 */
const createAnAccount = (urlOrigin, firstName, lastName, email, password) =>
  apollo.query({
    query: queryStrings.createAnAccount(),
    variables: {
      urlOrigin,
      firstName,
      lastName,
      email,
      password,
    },
    context: APOLLO_CONTEXT,
  }).then((response) => response.data.createAnAccount);

/**
 * getAccountByEmail
 * Get's an account by email from the API
 * @param {String} Account email address
 * @returns {Object} Account
 */
const getAccountByEmail = async (email) => {
  try {
    const baseUrl = Cypress.config('apiUrl');
    const url = `${baseUrl}?query=${queryStrings.getAccountByEmail(email)}`;

    const response = await cy.request({
      headers: {
        'content-type': 'application/json',
        'x-api-key': Cypress.env('API_KEY'),
      },
      url,
    });

    if (!response?.body?.data) {
      throw new Error('Getting account by email ', { response });
    }

    return response;
  } catch (err) {
    console.error(err);

    throw new Error('Getting account by email ', { err });
  }
};

/**
 * updateAccount
 * Update an account
 * @param {String} Account ID
 * @returns {String} Account ID
 */
const updateAccount = async (id, updateObj) => {
  try {
    const responseBody = await apollo.query({
      query: queryStrings.updateAccount(),
      variables: {
        where: { id },
        data: updateObj,
      },
      context: APOLLO_CONTEXT,
    }).then((response) => response.data.updateAccount);

    return responseBody;
  } catch (err) {
    console.error(err);

    throw new Error('Updating account', { err });
  }
};

/**
 * deleteAnAccount
 * Delete an account by email address
 * @param {String} Account email address
 * @returns {Boolean} Success flag
 */
const deleteAnAccount = async (email) => {
  try {
    const responseBody = await apollo.query({
      query: queryStrings.deleteAnAccount(),
      variables: { email },
      context: APOLLO_CONTEXT,
    }).then((response) => response.data.deleteAnAccount);

    return responseBody.success;
  } catch (err) {
    console.error(err);

    return err;
  }
};

/**
 * addAndGetOTP
 * Create and get an OTP for an account directly from the API,
 * so that we can assert enter a valid security code and continue the journey.
 * This is to ensure that we are testing a real world scenario.
 *
 * The alternative approach is to either intercept the UI requests and fake the security code validation,
 * or have email inbox testing capabilities which can be risky/flaky.
 * This approach practically mimics "get my security code from my email inbox".
 * @param {String} Account email address
 * @returns {Object} security code
 */
const addAndGetOTP = async (emailAddress) => {
  let email = emailAddress;

  if (!email) {
    email = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');
  }

  try {
    const responseBody = await apollo.query({
      query: queryStrings.addAndGetOTP(),
      variables: { email },
      context: APOLLO_CONTEXT,
    }).then((response) => response.data.addAndGetOTP);

    return responseBody.securityCode;
  } catch (err) {
    console.error(err);

    throw new Error('Adding and getting OTP ', { err });
  }
};

/**
 * getAccountPasswordResetToken
 * Get an account's password reset token directly from the API,
 * so that we can visit the `new password` page and continue the journey.
 * This is to ensure that we are testing a real world scenario.
 *
 * The alternative approach is to either intercept the UI requests and fake the password reset token generation,
 * or have email inbox testing capabilities which can be risky/flaky.
 * This approach practically mimics "get my password reset link from my email inbox".
 * @returns {String} Account password reset token
 */
const getAccountPasswordResetToken = async () => {
  const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

  try {
    const responseBody = await apollo.query({
      query: queryStrings.getAccountPasswordResetToken(),
      variables: { email: accountEmail },
      context: APOLLO_CONTEXT,
    }).then((response) => response.data.getAccountPasswordResetToken);

    return responseBody.token;
  } catch (err) {
    console.error(err);

    throw new Error('Getting account password rest token ', { err });
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
        'x-api-key': Cypress.env('API_KEY'),
      },
      url,
    });

    if (!response?.body?.data) {
      throw new Error(`Getting application by reference number ${referenceNumber}`, { response });
    }

    return response;
  } catch (err) {
    console.error(err);

    throw new Error(`Getting application by reference number ${referenceNumber}`, { err });
  }
};

/**
 * deleteApplicationByReferenceNumber
 * Delete applications by Application reference number
 * @param {Number} Application reference number
 * @returns {Object}
 */
const deleteApplicationByReferenceNumber = async (referenceNumber) => {
  try {
    const responseBody = await apollo.query({
      query: queryStrings.deleteApplicationByReferenceNumber(),
      variables: { referenceNumber },
      context: APOLLO_CONTEXT,
    }).then((response) => response.data);

    return responseBody;
  } catch (err) {
    console.error(err);

    return err;
  }
};

const declarations = {
  /**
   * getLatestConfidentiality
   * Get the latest Confidentiality declaration content
   * @returns {Object} Confidentiality declaration
   */
  getLatestConfidentiality: async () => {
    try {
      const responseBody = await apollo.query({
        query: queryStrings.declarations.getLatestConfidentiality(),
        context: APOLLO_CONTEXT,
      }).then((response) => response.data.declarationConfidentialities[0]);

      return responseBody;
    } catch (err) {
      console.error(err);

      throw new Error('Getting latest declaration - confidentiality ', { err });
    }
  },
  /**
   * getLatestAntiBribery
   * Get the latest Anti-bribery declaration content
   * @returns {Object} Anti-bribery declaration
   */
  getLatestAntiBribery: async () => {
    try {
      const responseBody = await apollo.query({
        query: queryStrings.declarations.getLatestAntiBribery(),
        context: APOLLO_CONTEXT,
      }).then((response) => response.data.declarationAntiBriberies[0]);

      return responseBody;
    } catch (err) {
      console.error(err);

      throw new Error('Getting latest declaration - anti-bribery ', { err });
    }
  },
  /**
   * getLatestConfirmationAndAcknowledgements
   * Get the latest Confirmation and acknowledgements declaration content
   * @returns {Object} Confirmation and acknowledgements declaration
   */
  getLatestConfirmationAndAcknowledgements: async () => {
    try {
      const responseBody = await apollo.query({
        query: queryStrings.declarations.getLatestConfirmationAndAcknowledgements(),
        context: APOLLO_CONTEXT,
      }).then((response) => response.data.declarationConfirmationAndAcknowledgements[0]);

      return responseBody;
    } catch (err) {
      console.error(err);

      throw new Error('Getting latest declaration - confirmation and acknowledgements ', { err });
    }
  },
  /**
   * getLatestHowDataWillBeUsed
   * Get the latest How data will be used declaration content
   * @returns {Object} Confirmation and acknowledgements declaration
   */
  getLatestHowDataWillBeUsed: async () => {
    try {
      const responseBody = await apollo.query({
        query: queryStrings.declarations.getLatestHowDataWillBeUsed(),
        context: APOLLO_CONTEXT,
      }).then((response) => response.data.declarationHowDataWillBeUseds[0]);

      return responseBody;
    } catch (err) {
      console.error(err);

      throw new Error('Getting latest declaration - how data will be usd ', { err });
    }
  },
};

const api = {
  createAnAccount,
  getAccountByEmail,
  updateAccount,
  deleteAnAccount,
  addAndGetOTP,
  getAccountPasswordResetToken,
  getApplicationByReferenceNumber,
  deleteApplicationByReferenceNumber,
  declarations,
};

export default api;
