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
