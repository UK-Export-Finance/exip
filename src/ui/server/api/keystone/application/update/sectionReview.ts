import apollo from '../../../../graphql/apollo';
import updateApplicationSectionReviewMutation from '../../../../graphql/mutations/update-application/section-review';
import { ApolloResponse } from '../../../../../types';

/**
 * updateSectionReview
 * Update an application's "section review" (confirming answers have been reviewed)
 * @param {string} Section review ID
 * @param {object} Section review update
 * @returns {Promise<object>} Updated section review
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
      console.error('GraphQL error updating application section review %o', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application section review %o', response.networkError.result.errors);
    }

    if (response?.data?.updateSectionReview) {
      return response.data.updateSectionReview;
    }

    console.error('Error with GraphQL updateApplicationSectionReviewMutation %o', response);

    throw new Error('Updating application section review');
  } catch (error) {
    console.error('Error updating application section review %o', error);

    throw new Error('Updating application section review');
  }
};

export default updateSectionReview;
