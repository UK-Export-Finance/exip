import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getSectionReviewById
 * Get a section review by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: SectionReview ID
 * @returns {Promise<SectionReview>}
 */
const getSectionReviewById = async (context: Context, id: string) => {
  try {
    console.info(`Getting sectionReview by ID ${id}`);

    const sectionReview = await context.db.SectionReview.findOne({
      where: { id },
    });

    return sectionReview;
  } catch (err) {
    console.error(`Getting sectionReview by ID ${id} %O`, err);

    throw new Error(`Error Getting sectionReview by ID ${id} ${err}`);
  }
};

export default getSectionReviewById;