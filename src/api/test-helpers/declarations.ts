import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * create declaration test helper
 * Create a declaration
 * @param {Context} KeystoneJS context API, application data
 * @returns {ApplicationDeclaration} Created declaration
 */
const create = async (context: Context, data = {}) => {
  try {
    console.info('Creating a declaration (test helpers)');

    const declaration = await context.query.Declaration.createOne({
      data,
      query: 'id',
    });

    return declaration;
  } catch (error) {
    console.error('Error creating a declaration (test helpers) %o', error);

    return error;
  }
};

const declarations = { create };

export default declarations;
