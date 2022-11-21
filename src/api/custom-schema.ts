import { graphQLSchemaExtension } from '@keystone-6/core';
import { NotifyClient } from 'notifications-node-client';

import { Context } from '.keystone/types'; // eslint-disable-line import/no-extraneous-dependencies

const notifyKey: any = process.env.GOV_NOTIFY_API_KEY;
const notifyClient = new NotifyClient(notifyKey);

export const extendGraphqlSchema = graphQLSchemaExtension<Context>({
  typeDefs: `
    type EmailResponse {
      success: Boolean
    }

    type Mutation {
      """ send an email """
      sendEmail(
        templateId: String!
        sendToEmailAddress: String!
      ): EmailResponse
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
  },
});
