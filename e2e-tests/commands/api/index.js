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
        alreadyExists
        isVerified
        id
        email
        verificationHash
      }
    }
  `,
  createBuyer: () => gql`
    mutation createBuyer($data: BuyerCreateInput!) {
      createBuyer(data: $data) {
        id
      }
    }
  `,
  createAnApplication: () => gql`
    mutation createAnApplication(
      $accountId: String!
      $eligibilityAnswers: ApplicationEligibility!
      $company: CompanyInput!
      $sectionReview: SectionReviewInput!
    ) {
      createAnApplication(accountId: $accountId, eligibilityAnswers: $eligibilityAnswers, company: $company, sectionReview: $sectionReview) {
        referenceNumber
      }
    }
  `,
  createAnAbandonedApplication: () => gql`
    mutation createAnAbandonedApplication(
      $accountId: String!
      $eligibilityAnswers: ApplicationEligibility!
      $company: CompanyInput!
      $sectionReview: SectionReviewInput!
    ) {
      createAnAbandonedApplication(accountId: $accountId, eligibilityAnswers: $eligibilityAnswers, company: $company, sectionReview: $sectionReview) {
        referenceNumber
      }
    }
  `,
  createApplications: () => gql`
    mutation createManyApplications($accountId: String!, $count: Int!) {
      createManyApplications(accountId: $accountId, count: $count) {
        success
        applications {
          id
          referenceNumber
        }
      }
    }
  `,
  deleteAnAccount: () => gql`
    mutation deleteAnAccount($email: String!) {
      deleteAnAccount(email: $email) {
        success
      }
    }
  `,
  getAccountByEmail: () => gql`
    query accounts {
      accounts {
        id
        verificationHash
        reactivationHash
      }
    }
  `,
  updateAccount: () => gql`
    mutation updateAccount($where: AccountWhereUniqueInput!, $data: AccountUpdateInput!) {
      updateAccount(where: $where, data: $data) {
        id
        verificationExpiry
        verificationHash
        reactivationHash
        passwordResetHash
        status {
          id
        }
      }
    }
  `,
  updateAccountStatus: () => gql`
    mutation updateAccountStatus($where: AccountStatusWhereUniqueInput!, $data: AccountStatusUpdateInput!) {
      updateAccountStatus(where: $where, data: $data) {
        id
        isInactive
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
  getApplicationByReferenceNumber: (referenceNumber) => gql`
    query applications {
      applications (
      orderBy: { updatedAt: desc }
      where: { referenceNumber: { equals: ${referenceNumber} } }
      take: 1
    ) {
      id
      company {
        id
        registeredOfficeAddress {
          id
        }
        sicCodes {
          id
        }
      }
    }
  }`,
  deleteApplicationByReferenceNumber: () => gql`
    mutation deleteApplicationByReferenceNumber($referenceNumber: Int!) {
      deleteApplicationByReferenceNumber(referenceNumber: $referenceNumber) {
        success
      }
    }
  `,
  deleteApplications: () => gql`
    mutation deleteApplications($where: [ApplicationWhereUniqueInput!]!) {
      deleteApplications(where: $where) {
        id
      }
    }
  `,
  getCountries: () => gql`
    query countries {
      countries {
        id
        isoCode
      }
    }
  `,
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
  apollo
    .query({
      query: queryStrings.createAnAccount(),
      variables: {
        urlOrigin,
        firstName,
        lastName,
        email,
        password,
      },
      context: APOLLO_CONTEXT,
    })
    .then((response) => response.data.createAnAccount);

/**
 * createBuyer
 * Create a buyer with a country relationship
 * @param {String} Country ID
 * @returns {Object} Buyer
 */
const createBuyer = (countryId) =>
  apollo
    .query({
      query: queryStrings.createBuyer(),
      variables: {
        data: {
          country: {
            connect: {
              id: countryId,
            },
          },
        },
      },
      context: APOLLO_CONTEXT,
    })
    .then((response) => response.data.createBuyer);

/**
 * createAnApplication
 * Create an application
 * @param {String} Account/application owner ID
 * @param {Object} Eligibility answers
 * @param {Object} Company object (obtained from eligibility companies house call)
 * @param {Object} sectionReview object (with eligibility set to true)
 * @returns {Object} Created application
 */
const createAnApplication = (accountId, eligibilityAnswers, company, sectionReview) =>
  apollo
    .query({
      query: queryStrings.createAnApplication(),
      variables: {
        accountId,
        eligibilityAnswers,
        company,
        sectionReview,
      },
      context: APOLLO_CONTEXT,
    })
    .then((response) => response.data.createAnApplication);

/**
 * createAnApplication
 * Create an application
 * @param {String} Account/application owner ID
 * @param {Object} Eligibility answers
 * @param {Object} Company object (obtained from eligibility companies house call)
 * @param {Object} sectionReview object (with eligibility set to true)
 * @returns {Object} Created application
 */
const createAnAbandonedApplication = (accountId, eligibilityAnswers, company, sectionReview) =>
  apollo
    .query({
      query: queryStrings.createAnAbandonedApplication(),
      variables: {
        accountId,
        eligibilityAnswers,
        company,
        sectionReview,
      },
      context: APOLLO_CONTEXT,
    })
    .then((response) => response.data.createAnAbandonedApplication);

/**
 * createApplications
 * Create multiple applications
 * @param {String} Account id
 * @param {Number} Count of applications to create
 * @returns {Array} Created applications
 */
const createApplications = (accountId, count) => {
  try {
    const responseBody = apollo
      .query({
        query: queryStrings.createApplications(),
        variables: {
          accountId,
          count,
        },
        context: APOLLO_CONTEXT,
      })
      .then((response) => response.data.createManyApplications.applications);

    return responseBody;
  } catch (error) {
    console.error('Creating applications %o', error);

    throw new Error('Creating applications', { error });
  }
};

/**
 * getAccountByEmail
 * Get's an account by email from the API
 * @param {String} Account email address
 * @returns {Object} Account
 */
const getAccountByEmail = async (email) => {
  try {
    const responseBody = await apollo
      .query({
        query: queryStrings.getAccountByEmail(email),
        variables: {
          where: {
            orderBy: { updatedAt: 'desc' },
            email: { equals: email },
            take: 1,
          },
        },
        context: APOLLO_CONTEXT,
      })
      .then((response) => response.data.accounts);

    return responseBody;
  } catch (error) {
    console.error(error);

    throw new Error('Getting account by email', { error });
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
    const responseBody = await apollo
      .query({
        query: queryStrings.updateAccount(),
        variables: {
          where: { id },
          data: updateObj,
        },
        context: APOLLO_CONTEXT,
      })
      .then((response) => response.data.updateAccount);

    return responseBody;
  } catch (error) {
    console.error(error);

    throw new Error('Updating account', { error });
  }
};

/**
 * updateAccountStatus
 * Update an account status
 * @param {String} AccountStatus ID
 * @returns {AccountStatus} AccountStatus
 */
const updateAccountStatus = async (id, updateObj) => {
  try {
    const responseBody = await apollo
      .query({
        query: queryStrings.updateAccountStatus(),
        variables: {
          where: { id },
          data: updateObj,
        },
        context: APOLLO_CONTEXT,
      })
      .then((response) => response.data.updateAccountStatus);

    return responseBody;
  } catch (error) {
    console.error(error);

    throw new Error('Updating account status', { error });
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
    const responseBody = await apollo
      .query({
        query: queryStrings.deleteAnAccount(),
        variables: { email },
        context: APOLLO_CONTEXT,
      })
      .then((response) => response.data.deleteAnAccount);

    return responseBody.success;
  } catch (error) {
    console.error(error);

    throw new Error('Deleting an account', { error });
  }
};

/**
 * addAndGetOTP
 * Create and get an OTP for an account directly from the API,
 * so that we can assert enter a valid access code and continue the journey.
 * This is to ensure that we are testing a real world scenario.
 *
 * The alternative approach is to either intercept the UI requests and fake the access code validation,
 * or have email inbox testing capabilities which can be risky/flaky.
 * This approach practically mimics "get my access code from my email inbox".
 * @param {String} Account email address
 * @returns {Object} access code
 */
const addAndGetOTP = async (emailAddress) => {
  let email = emailAddress;

  if (!email) {
    email = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');
  }

  try {
    const responseBody = await apollo
      .query({
        query: queryStrings.addAndGetOTP(),
        variables: { email },
        context: APOLLO_CONTEXT,
      })
      .then((response) => response.data.addAndGetOTP);

    return responseBody.securityCode;
  } catch (error) {
    console.error(error);

    throw new Error('Adding and getting OTP ', { error });
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
    const responseBody = await apollo
      .query({
        query: queryStrings.getAccountPasswordResetToken(),
        variables: { email: accountEmail },
        context: APOLLO_CONTEXT,
      })
      .then((response) => response.data.getAccountPasswordResetToken);

    return responseBody.token;
  } catch (error) {
    console.error(error);

    throw new Error('Getting account password rest token ', { error });
  }
};

/**
 * getApplicationByReferenceNumber
 * Get's an application by reference number from the API
 * @param {Number} referenceNumber: Application reference number
 * @returns {Object} Application
 */
const getApplicationByReferenceNumber = async (referenceNumber) => {
  try {
    const responseBody = await apollo
      .query({
        query: queryStrings.getApplicationByReferenceNumber(referenceNumber),
        context: APOLLO_CONTEXT,
      })
      .then((response) => response.data.applications[0]);

    return responseBody;
  } catch (error) {
    console.error(error);

    throw new Error(`Getting application by reference number ${referenceNumber}`, { error });
  }
};

/**
 * deleteApplicationByReferenceNumber
 * Delete applications by Application reference number
 * @param {Number} referenceNumber: Application reference number
 * @returns {Object}
 */
const deleteApplicationByReferenceNumber = async (referenceNumber) => {
  try {
    const responseBody = await apollo
      .query({
        query: queryStrings.deleteApplicationByReferenceNumber(),
        variables: { referenceNumber },
        context: APOLLO_CONTEXT,
      })
      .then((response) => response.data);

    return responseBody;
  } catch (error) {
    console.error(error);

    return error;
  }
};

/**
 * deleteApplications
 * Delete applications by ID
 * @param {Array} Application objects with ID
 * @returns {Object}
 */
const deleteApplications = async (applications) => {
  try {
    const responseBody = await apollo
      .query({
        query: queryStrings.deleteApplications(),
        variables: {
          where: applications,
        },
        context: APOLLO_CONTEXT,
      })
      .then((response) => response.data);

    return responseBody;
  } catch (error) {
    console.error(error);

    return error;
  }
};

/**
 * getACountry
 * Get a country
 * @returns {Object} Country
 */
const getACountry = async () => {
  try {
    const responseBody = await apollo
      .query({
        query: queryStrings.getCountries(),
        context: APOLLO_CONTEXT,
      })
      .then((response) => response.data.countries[0]);

    return responseBody;
  } catch (error) {
    console.error(error);

    throw new Error('Getting a country ', { error });
  }
};

const api = {
  createAnAccount,
  createBuyer,
  createAnApplication,
  createAnAbandonedApplication,
  createApplications,
  getAccountByEmail,
  updateAccount,
  updateAccountStatus,
  deleteAnAccount,
  addAndGetOTP,
  getAccountPasswordResetToken,
  getApplicationByReferenceNumber,
  deleteApplicationByReferenceNumber,
  deleteApplications,
  getACountry,
};

export default api;
