import type { GraphQLSchema } from 'graphql';
import { mergeSchemas } from '@graphql-tools/schema';
import { NotifyClient } from 'notifications-node-client';
import dotenv from 'dotenv';

dotenv.config();

const notifyKey = process.env.GOV_NOTIFY_API_KEY;
const notifyClient = new NotifyClient(notifyKey);

export const extendGraphqlSchema = (schema: GraphQLSchema) =>
  mergeSchemas({
    schemas: [schema],
    typeDefs: `
      type EmailResponse {
        success: Boolean
      }

      type Mutation {
        sendEmail: EmailResponse
      }
      `,
    resolvers: {
      Mutation: {
        sendEmail: (root, variables) => {
          try {
            console.info('Calling Notify API. templateId: ', variables.templateId);
            const { templateId, sendToEmailAddress } = variables;

            notifyClient.sendEmail(templateId, sendToEmailAddress, {
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
