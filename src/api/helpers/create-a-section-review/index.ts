import { Context, SectionReview } from '../../types';

/**
 * createASectionReview
 * Create a section review with appropriate relationships.
 * @param {Object} KeystoneJS context API
 * @param {String} Application ID
 * @param {Object} sectionReviewData data to create
 * @returns {Object}  Created section review
 */
const createASectionReview = async (context: Context, applicationId: string, sectionReviewData: SectionReview) => {
  console.info('Creating a section review for ', applicationId);
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', sectionReviewData);
  try {
    /**
     * Create a company with provided data and application relationship
     */
    const sectionReview = await context.db.SectionReview.createOne({
      data: {
        application: {
          connect: { id: applicationId },
        },
        ...sectionReviewData,
      },
    });
    console.log('assdfsdfsdfdsf', sectionReview)
    return sectionReview;
  } catch (err) {
    console.error('Error creating a section review %O', err);

    throw new Error(`Creating a section review ${err}`);
  }
};

export default createASectionReview;
