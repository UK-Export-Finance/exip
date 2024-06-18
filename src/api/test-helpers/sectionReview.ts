import { SectionReview, TestHelperCreate } from '../types';

/**
 * create sectionReview test helper
 * @param {Context} KeystoneJS context API
 * @returns {Object} Created sectionReview
 */
const create = async ({ context }: TestHelperCreate) => {
  try {
    console.info('Creating a section review (test helpers)');

    const sectionReview = (await context.query.SectionReview.createOne({
      data: {},
      query: 'id',
    })) as SectionReview;

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
