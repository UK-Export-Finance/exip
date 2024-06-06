import { ApplicationBuyer, TestHelperBuyerCreate } from '../types';

/**
 * create buyer test helper
 * Create an buyer with mock buyer data and any provied custom buyer data.
 * @param {Context} KeystoneJS context API, buyer data
 * @returns {Object} Created buyer
 */
const create = async ({ context, data }: TestHelperBuyerCreate) => {
  try {
    console.info('Creating a buyer (test helpers)');

    const buyer = (await context.query.Buyer.createOne({
      data,
    })) as ApplicationBuyer;

    return buyer;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const buyers = {
  create,
};

export default buyers;
