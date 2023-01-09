import type { GraphQLSchema } from 'graphql';
import { mergeSchemas } from '@graphql-tools/schema';
// @ts-ignore
import { NotifyClient } from 'notifications-node-client';
import axios from 'axios';
import dotenv from 'dotenv';
import { mapCompaniesHouseFields } from './helpers/mapCompaniesHouseFields';

dotenv.config();

const notifyKey = process.env.GOV_NOTIFY_API_KEY;
const notifyClient = new NotifyClient(notifyKey);
const username: any = process.env.COMPANIES_HOUSE_API_KEY;
const companiesHouseURL: any = process.env.COMPANIES_HOUSE_API_URL;

export const extendGraphqlSchema = (schema: GraphQLSchema) =>
  mergeSchemas({
    schemas: [schema],
    typeDefs: `
      type EmailResponse {
        success: Boolean
      }

      # fields from registered_office_address object
      type CompanyAddress {
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
        registeredOfficeAddress: CompanyAddress
        companyNumber: String
        dateOfCreation: String
        sicCodes: [String]
        success: Boolean
        apiError: Boolean
      }

      type ApplicationCompanyAddress {
        addressLine1: String
        addressLine2: String
        careOf: String
        locality: String
        region: String
        postalCode: String
        country: String
        premises: String
      }

      input ApplicationCompanyAddressInput {
        addressLine1: String
        addressLine2: String
        careOf: String
        locality: String
        region: String
        postalCode: String
        country: String
        premises: String
      }

      type ApplicationCompanyAndCompanyAddress {
        id: ID!
        exporterCompanyAddress: ApplicationCompanyAddress
        companyName: String
        companyNumber: String
        dateOfCreation: DateTime
        hasTradingAddress: Boolean
        hasTradingName: Boolean
        companyWebsite: String
        phoneNumber: String
      }

      input ApplicationCompanyAndCompanyAddressInput {
        exporterCompanyAddress: ApplicationCompanyAddressInput
        companyName: String
        companyNumber: String
        dateOfCreation: DateTime
        hasTradingAddress: Boolean
        hasTradingName: Boolean
        companyWebsite: String
        phoneNumber: String
      }

      type Mutation {
        """ update application company and company address """
        updateApplicationCompanyAndCompanyAddress(
          companyId: ID!
          companyAddressId: ID!
          data: ApplicationCompanyAndCompanyAddressInput!
        ): ApplicationCompanyAndCompanyAddress

        """ send an email """
        sendEmail(
          templateId: String!
          sendToEmailAddress: String!
        ): EmailResponse
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
        updateApplicationCompanyAndCompanyAddress: async (root, variables, context) => {
          try {
            console.info('Updating application company and company address for ', variables.companyId);

            const { exporterCompanyAddress, ...exporterCompany } = variables.data;

            await context.db.Company.updateOne({
              where: { id: variables.id },
              data: exporterCompany,
            });

            await context.db.CompanyAddress.updateOne({
              where: { id: variables.companyAddressId },
              data: exporterCompanyAddress,
            });

            return {
              id: variables.id,
            };
          } catch (err) {
            console.error('Error updating application company and company address', { err });

            throw new Error(`Updating application company and company address ${err}`);
          }
        },
        sendEmail: async (root, variables) => {
          try {
            console.info('Calling Notify API. templateId: ', variables.templateId);
            const { templateId, sendToEmailAddress } = variables;

            await notifyClient.sendEmail(templateId, sendToEmailAddress, {
              personalisation: {},
              reference: null,
            });

            return { success: true };
          } catch (err) {
            console.error('Unable to send email', { err });
            return { success: false };
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
