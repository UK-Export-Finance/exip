import type { GraphQLSchema } from 'graphql';
import { mergeSchemas } from '@graphql-tools/schema';
import axios from 'axios';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { ACCOUNT } from './constants';
import { verifyAccountEmailAddress } from './custom-resolvers';
import { mapCompaniesHouseFields } from './helpers/mapCompaniesHouseFields';
import { mapSicCodes } from './helpers/mapSicCodes';
import { SicCodes } from './types';

dotenv.config();

const username: any = process.env.COMPANIES_HOUSE_API_KEY;
const companiesHouseURL: any = process.env.COMPANIES_HOUSE_API_URL;

const { EMAIL, PASSWORD } = ACCOUNT;

const {
  RANDOM_BYTES_SIZE,
  STRING_TYPE,
  PBKDF2: { ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM },
} = PASSWORD;

export const extendGraphqlSchema = (schema: GraphQLSchema) =>
  mergeSchemas({
    schemas: [schema],
    typeDefs: `
      type Account {
        firstName: String
        lastName: String
        email: String
        isVerified: Boolean
      }

      input AccountInput {
        firstName: String
        lastName: String
        email: String
        password: String
      }

      # fields from registered_office_address object
      type CompaniesHouseCompanyAddress {
        addressLine1: String
        addressLine2: String
        careOf: String
        locality: String
        region: String
        postalCode: String
        country: String
        premises: String
      }

      type CompaniesHouseResponse {
        companyName: String
        registeredOfficeAddress: ExporterCompanyAddress
        companyNumber: String
        dateOfCreation: String
        sicCodes: [String]
        financialYearEndDate: DateTime
        success: Boolean
        apiError: Boolean
      }

      type ExporterCompanyAddress {
        addressLine1: String
        addressLine2: String
        careOf: String
        locality: String
        region: String
        postalCode: String
        country: String
        premises: String
      }

      input OldSicCodes {
        id: String
      }

      input ExporterCompanyAddressInput {
        addressLine1: String
        addressLine2: String
        careOf: String
        locality: String
        region: String
        postalCode: String
        country: String
        premises: String
      }

      type ExporterCompanyAndCompanyAddress {
        id: ID
        registeredOfficeAddress: ExporterCompanyAddress
        companyName: String
        companyNumber: String
        dateOfCreation: DateTime
        hasTradingAddress: String
        hasTradingName: String
        companyWebsite: String
        phoneNumber: String
      }

      input ExporterCompanyAndCompanyAddressInput {
        address: ExporterCompanyAddressInput
        sicCodes: [String]
        companyName: String
        companyNumber: String
        dateOfCreation: DateTime
        hasTradingAddress: String
        hasTradingName: String
        companyWebsite: String
        phoneNumber: String
        financialYearEndDate: DateTime
        oldSicCodes: [OldSicCodes]
      }

      type VerifyAccountEmailAddressResponse {
        success: Boolean
      }

      type Mutation {
        """ create an account """
        createAccount(
          data: AccountInput!
        ): Account
        """ verify an an account's email address """
        verifyAccountEmailAddress(
          token: String!
        ): VerifyAccountEmailAddressResponse
        """ update exporter company and company address """
        updateExporterCompanyAndCompanyAddress(
          companyId: ID!
          companyAddressId: ID!
          data: ExporterCompanyAndCompanyAddressInput!
        ): ExporterCompanyAndCompanyAddress
      }

      type Query {
        """ get companies house information """
        getCompaniesHouseInformation(
          companiesHouseNumber: String!
        ): CompaniesHouseResponse
      }
    `,
    resolvers: {
      Mutation: {
        createAccount: async (root, variables, context) => {
          console.info('Creating new exporter account for ', variables.data.email);

          try {
            const { firstName, lastName, email, password } = variables.data;

            const salt = crypto.randomBytes(RANDOM_BYTES_SIZE).toString(STRING_TYPE);

            const passwordHash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);

            const verificationHash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);

            const verificationExpiry = EMAIL.VERIFICATION_EXPIRY();

            const account = {
              firstName,
              lastName,
              email,
              salt,
              hash: passwordHash,
              verificationHash,
              verificationExpiry,
            };

            const response = await context.db.Exporter.createOne({
              data: account,
            });

            return response;
          } catch (err) {
            throw new Error(`Creating new exporter account ${err}`);
          }
        },
        verifyAccountEmailAddress,
        updateExporterCompanyAndCompanyAddress: async (root, variables, context) => {
          try {
            console.info('Updating application exporter company and exporter company address for ', variables.companyId);
            const { address, sicCodes, oldSicCodes, ...exporterCompany } = variables.data;

            const company = await context.db.ExporterCompany.updateOne({
              where: { id: variables.companyId },
              data: exporterCompany,
            });

            await context.db.ExporterCompanyAddress.updateOne({
              where: { id: variables.companyAddressId },
              data: address,
            });

            const mappedSicCodes = mapSicCodes(company, sicCodes);

            // if the update contains exporterCompany and there are oldSicCodes in the db, delete them
            if (exporterCompany && oldSicCodes && oldSicCodes.length) {
              // delete already existing sic codes from oldSicCodes
              await context.db.ExporterCompanySicCode.deleteMany({
                where: oldSicCodes,
              });
            }

            if (mappedSicCodes && mappedSicCodes.length) {
              mappedSicCodes.forEach(async (sicCodeObj: SicCodes) => {
                await context.db.ExporterCompanySicCode.createOne({
                  data: sicCodeObj,
                });
              });
            }

            return {
              id: variables.companyId,
            };
          } catch (err) {
            console.error('Error updating application - exporter company and exporter company address', { err });

            throw new Error(`Updating application - exporter company and exporter company address ${err}`);
          }
        },
      },
      Query: {
        /**
         * Call for companies house API
         * @param variables - companies house number is received as a string within variables
         * @returns either mapped response or success false flag with or without apiError
         */
        getCompaniesHouseInformation: async (root, variables) => {
          try {
            const { companiesHouseNumber } = variables;
            console.info('Calling Companies House API for ', companiesHouseNumber);
            const sanitisedRegNo: number = companiesHouseNumber.toString().padStart(8, '0');

            const response = await axios({
              method: 'get',
              url: `${companiesHouseURL}/company/${sanitisedRegNo}`,
              auth: { username, password: '' },
              validateStatus(status) {
                const acceptableStatus = [200, 404];
                return acceptableStatus.includes(status);
              },
            });

            // if no data in response or status is not 200 then return blank object
            if (!response.data || response.status === 404) {
              return {
                success: false,
              };
            }

            // maps response to camelCase fields
            const mappedResponse = mapCompaniesHouseFields(response.data);

            return {
              ...mappedResponse,
              success: true,
            };
          } catch (error) {
            console.error('Error calling Companies House API', { error });
            return {
              apiError: true,
              success: false,
            };
          }
        },
      },
    },
  });
