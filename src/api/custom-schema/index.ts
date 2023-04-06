import type { GraphQLSchema } from 'graphql';
import { mergeSchemas } from '@graphql-tools/schema';
import typeDefs from './type-defs';
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
} from '../custom-resolvers';
import { getCompaniesHouseInformation } from '../custom-queries';

export const extendGraphqlSchema = (schema: GraphQLSchema) =>
  mergeSchemas({
    schemas: [schema],
    typeDefs,
    resolvers: {
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
    },
  });
