import {
  createAccount,
  verifyAccountEmailAddress,
  sendEmailConfirmEmailAddress,
  accountSignIn,
  accountSignInSendNewCode,
  verifyAccountSignInCode,
  addAndGetOTP,
  deleteApplicationByReferenceNumber,
  updateExporterCompanyAndCompanyAddress,
  submitApplication,
} from './mutations';
import { getCompaniesHouseInformation } from './queries';

/**
 * customResolvers
 * Custom resolvers to add to the keystone generated GraphQL API
 * @returns {Object} Object with custom queries and mutations
 */
const customResolvers = {
  Mutation: {
    createAccount,
    accountSignIn,
    accountSignInSendNewCode,
    verifyAccountEmailAddress,
    sendEmailConfirmEmailAddress,
    verifyAccountSignInCode,
    addAndGetOTP,
    deleteApplicationByReferenceNumber,
    updateExporterCompanyAndCompanyAddress,
    submitApplication,
  },
  Query: {
    getCompaniesHouseInformation,
  },
};

export default customResolvers;
