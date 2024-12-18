import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * create declaration test helper
 * Create a declaration modern slavery
 * @param {Context} KeystoneJS context API, application data
 * @param {ApplicationDeclarationModernSlavery} data
 * @returns {ApplicationDeclarationModernSlavery} Created declaration
 */
const create = async (context: Context, data = {}) => {
  try {
    console.info('Creating a declaration modern slavery (test helpers)');

    const declarationModernSlavery = await context.db.DeclarationModernSlavery.createOne({
      data,
    });

    return declarationModernSlavery;
  } catch (error) {
    console.error(error);

    return error;
  }
};

const declarationsModernSlavery = { create };

export default declarationsModernSlavery;
