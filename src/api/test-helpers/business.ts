import { Context } from '.keystone/types'; // eslint-disable-line
import { ApplicationBusiness } from '../types';

/**
 * Create an business test helper
 * Create an business
 * @param {Context} context: KeystoneJS context API
 * @returns {ApplicationBusiness} Created business
 */
const create = async (context: Context) => {
  try {
    console.info('Creating a business (test helpers)');

    const business = (await context.query.Business.createOne({ data: {} })) as ApplicationBusiness;

    return business;
  } catch (err) {
    console.error(err);
    return err;
  }
};

/**
 * Get business test helper
 * Get an business by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} businessId: Business ID
 * @returns {Promise<ApplicationExportContract>} Business
 */
const get = async (context: Context, businessId: string) => {
  try {
    console.info('Getting a business by ID (test helpers)');

    const business = await context.db.Business.findOne({
      where: { id: businessId },
    });

    return business;
  } catch (err) {
    console.error(err);
    throw new Error(`Getting an business by ID (test helpers) ${err}`);
  }
};

const business = {
  create,
  get,
};

export default business;