import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * create sectionReview test helper
 * @param {Context} KeystoneJS context API
 * @returns {Object} Created sectionReview
 */
const create = async (context: Context) => {
  try {
    console.info('Creating a section review (test helpers)');

    const sectionReview = await context.query.SectionReview.createOne({
      data: {},
      query: 'id',
    });

    return sectionReview;
  } catch (error) {
    console.error('Error creating section review (test helpers) %O', error);

    return error;
  }
};

const sectionReview = {
  create,
};

export default sectionReview;
