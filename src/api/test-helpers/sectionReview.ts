import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * create sectionReview test helper
 * @param {Context} context: KeystoneJS context API
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
  } catch (err) {
    console.error('Error creating section review (test helpers) %O', err);
    return err;
  }
};

const sectionReview = {
  create,
};

export default sectionReview;
