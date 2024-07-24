import { Context } from '../types';

/**
 * create declaration test helper
 * Create a declaration
 * @param {Context} KeystoneJS context API, application data
 * @returns {ApplicationDeclaration} Created declaration
 */
const create = async (context: Context) => {
  try {
    console.info('Creating a declaration (test helpers)');

    const declaration = await context.query.Declaration.createOne({
      data: {},
      query: 'id',
    });

    return declaration;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const declarations = { create };

export default declarations;
