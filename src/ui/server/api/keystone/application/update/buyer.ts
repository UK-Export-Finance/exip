import apollo from '../../../../graphql/apollo';
import countries from '../../countries';
import updateBuyerMutation from '../../../../graphql/mutations/update-application/buyer';
import { ApplicationBuyerApiInput, ApplicationBuyerUiInput, ApolloResponse } from '../../../../../types';

/**
 * updateBuyer
 * Update an application's "buyer"
 * @param {String} Buyer ID
 * @param {Object} Buyer update
 * @returns {Object} Updated buyer
 */
const updateBuyer = async (id: string, update: ApplicationBuyerUiInput) => {
  try {
    console.info('Updating application buyer');

    const { country: buyerCountryCode, ...fields } = update;

    const data = fields as ApplicationBuyerApiInput;

    if (buyerCountryCode) {
      const buyerCountry = await countries.get(buyerCountryCode);

      data.country = {
        connect: { id: buyerCountry.id },
      };
    }

    const variables = {
      where: { id },
      data,
    };

    const response = (await apollo('POST', updateBuyerMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error updating application buyer %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application buyer %O', response.networkError.result.errors);
    }

    if (response?.data?.updateBuyer) {
      return response.data.updateBuyer;
    }

    console.error('Error with GraphQL updateBuyerMutation %O', response);
    throw new Error('Updating application buyer');
  } catch (err) {
    console.error('Error updating application buyer %O', err);
    throw new Error('Updating application buyer');
  }
};

export default updateBuyer;
