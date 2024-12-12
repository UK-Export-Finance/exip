import { Context } from '../types';

/**
 * create declaration test helper
 * Create a declaration modern slavery
 * @param {Context} KeystoneJS context API, application data
 * @returns {ApplicationDeclarationModernSlavery} Created declaration
 */
const create = async (context: Context, data = {}) => {
  try {
    console.info('Creating a declaration modern slavery (test helpers)');

    const declaration = await context.query.DeclarationModernSlavery.createOne({
      data,
      query: 'id',
    });

    return declaration;
  } catch (error) {
    console.error(error);

    return error;
  }
};

const declarationsModernSlavery = { create };

export default declarationsModernSlavery;
