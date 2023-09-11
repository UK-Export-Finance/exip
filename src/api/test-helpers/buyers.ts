import { Application, TestHelperBuyerCreate } from '../types';

/**
 * create buyer test helper
 * Create an buyer with mock buyer data and any provied custom buyer data.
 * @param {Object} KeystoneJS context API, buyer data
 * @returns {Object} Created buyer
 */
const create = async ({ context, data }: TestHelperBuyerCreate) => {
  try {
    console.info('Creating a buyer (test helpers)');

    const application = (await context.query.Buyer.createOne({
      data,
    })) as Application;

    return application;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const buyers = {
  create,
};

export default buyers;
