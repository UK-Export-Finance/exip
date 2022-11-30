import { graphQLSchemaExtension } from '@keystone-6/core';
import { NotifyClient } from 'notifications-node-client';
import axios from 'axios';

import { Context } from '.keystone/types'; // eslint-disable-line
import mapCompaniesHouseFields from './helpers/mapCompaniesHouseFields';

const notifyKey: any = process.env.GOV_NOTIFY_API_KEY;
const notifyClient = new NotifyClient(notifyKey);
const username: any = process.env.COMPANIES_HOUSE_API_KEY;
const companiesHouseURL: any = process.env.COMPANIES_HOUSE_API_URL;

export const extendGraphqlSchema = graphQLSchemaExtension<Context>({
  typeDefs: `
    type EmailResponse {
      success: Boolean
    }

    # fields from registered_office_address object
    type CompanyAddress {
      addressLineOne: String
      addressLineTwo: String
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

    type Mutation {
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
      // call for companies house API
      getCompaniesHouseInformation: async (root, variables) => {
        try {
          const { companiesHouseNumber } = variables;
          console.info('Calling Companies House API for ', companiesHouseNumber);
          const sanitisedRegNo: number = companiesHouseNumber.padStart(8, '0');

          const response = await axios({
            method: 'get',
            url: `${companiesHouseURL}/company/${sanitisedRegNo}`,
            auth: { username, password: '' },
            validateStatus(status) {
              return status === 200 || status === 404;
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
          return mappedResponse;
        } catch (error) {
          console.error('Error calling Companies House API', { error });
          return {
            apiError: true,
          };
        }
      },
    },
  },
});
