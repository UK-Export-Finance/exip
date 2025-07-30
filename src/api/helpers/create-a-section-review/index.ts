import { Context, SectionReview } from '../../types';

/**
 * createASectionReview
 * Create a section review with an application relationship
 * @param {Context} context: KeystoneJS context API
 * @param {string} applicationId: Application ID
 * @param {object} sectionReviewData: data to create
 * @returns {Promise<object>}  Created section review
 */
const createASectionReview = async (context: Context, applicationId: string, sectionReviewData: SectionReview) => {
  console.info('Creating a section review for %s', applicationId);

  try {
    /**
     * Create a sectionReview with provided data and application relationship
     */
    const sectionReview = await context.db.SectionReview.createOne({
      data: {
        application: {
          connect: { id: applicationId },
        },
        ...sectionReviewData,
      },
    });

    return sectionReview;
  } catch (error) {
    console.error('Error creating a section review %o', error);

    throw new Error(`Creating a section review ${error}`);
  }
};

export default createASectionReview;
