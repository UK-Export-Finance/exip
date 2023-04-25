import { ApolloResponse } from '../../../../types';
import apollo from '../../../graphql/apollo';
import { isPopulatedArray } from '../../../helpers/array';
import getDeclarationAntiBriberyQuery from '../../../graphql/queries/declarations/anti-bribery';
import getDeclarationConfirmationAndAcknowledgementQuery from '../../../graphql/queries/declarations/confirmation-and-acknowledgement';
import getDeclarationHowDataWillBeUsedQuery from '../../../graphql/queries/declarations/how-data-will-be-used';
import updateApplicationDeclarationMutation from '../../../graphql/mutations/update-application/declaration';

const declarations = {
  getLatestAntiBribery: async () => {
    try {
      console.info('Getting latest declaration - anti-bribery');

      const response = (await apollo('POST', getDeclarationAntiBriberyQuery, {})) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error getting latest declaration - anti-bribery ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error getting latest declaration - anti-bribery ', response.networkError.result.errors);
      }

      if (response?.data?.declarationAntiBriberies && isPopulatedArray(response.data.declarationAntiBriberies)) {
        return response.data.declarationAntiBriberies[0];
      }

      console.error(response);
      throw new Error('Getting latest declaration - anti-bribery');
    } catch (err) {
      console.error(err);
      throw new Error('Getting latest declaration - anti-bribery');
    }
  },
  getLatestConfirmationAndAcknowledgement: async () => {
    try {
      console.info('Getting latest declaration - confirmation and acknowledgement');

      const response = (await apollo('POST', getDeclarationConfirmationAndAcknowledgementQuery, {})) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error getting latest declaration - confirmation and acknowledgement ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error getting latest declaration - confirmation and acknowledgement ', response.networkError.result.errors);
      }

      if (response?.data?.declarationConfirmationAndAcknowledgements && isPopulatedArray(response.data.declarationConfirmationAndAcknowledgements)) {
        return response.data.declarationConfirmationAndAcknowledgements[0];
      }

      console.error(response);
      throw new Error('Getting latest declaration - confirmation and acknowledgement');
    } catch (err) {
      console.error(err);
      throw new Error('Getting latest declaration - confirmation and acknowledgement');
    }
  },
  getLatestHowDataWillBeUsed: async () => {
    try {
      console.info('Getting latest declaration - how data will be used');

      const response = (await apollo('POST', getDeclarationHowDataWillBeUsedQuery, {})) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error getting latest declaration - how data will be used ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error getting latest declaration - how data will be used ', response.networkError.result.errors);
      }

      if (response?.data?.declarationHowDataWillBeUseds && isPopulatedArray(response.data.declarationHowDataWillBeUseds)) {
        return response.data.declarationHowDataWillBeUseds[0];
      }

      console.error(response);
      throw new Error('Getting latest declaration - how data will be used');
    } catch (err) {
      console.error(err);
      throw new Error('Getting latest declaration - how data will be used');
    }
  },
  update: async (id: string, update: object) => {
    try {
      console.info('Updating application declaration');

      const variables = {
        where: { id },
        data: update,
      };

      const response = (await apollo('POST', updateApplicationDeclarationMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error updating application declaration ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error updating application declaration ', response.networkError.result.errors);
      }

      if (response?.data?.updateDeclaration) {
        return response.data.updateDeclaration;
      }

      console.error(response);
      throw new Error('Updating application declaration');
    } catch (err) {
      console.error(err);
      throw new Error('Updating application declaration');
    }
  },
};

export default declarations;
