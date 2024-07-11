import apollo from '../../../../graphql/apollo';
import updateApplicationSectionReviewMutation from '../../../../graphql/mutations/update-application/section-review';
import { ApolloResponse } from '../../../../../types';

/**
 * updateSectionReview
 * Update an application's "section review" (confirming answers have been reviewed)
 * @param {String} Section review ID
 * @param {Object} Section review update
 * @returns {Promise<Object>} Updated section review
 */
const updateSectionReview = async (id: string, update: object) => {
  try {
    console.info('Updating application section review');

    const variables = {
      where: { id },
      data: update,
    };

    const response = (await apollo('POST', updateApplicationSectionReviewMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error updating application section review %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application section review %O', response.networkError.result.errors);
    }

    if (response?.data?.updateSectionReview) {
      return response.data.updateSectionReview;
    }

    console.error('Error with GraphQL updateApplicationSectionReviewMutation %O', response);
    throw new Error('Updating application section review');
  } catch (err) {
    console.error('Error updating application section review %O', err);
    throw new Error('Updating application section review');
  }
};

export default updateSectionReview;
