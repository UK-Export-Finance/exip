import { Context } from '.keystone/types'; // eslint-disable-line
import { ApplicationDeclaration } from '../types';

/**
 * Create an declaration test helper
 * Create an declaration
 * @param {Context} context: KeystoneJS context API
 * @returns {ApplicationDeclaration} Created declaration
 */
const create = async (context: Context) => {
  try {
    console.info('Creating a declaration (test helpers)');

    const declaration = (await context.query.Declaration.createOne({ data: {} })) as ApplicationDeclaration;

    return declaration;
  } catch (error) {
    console.error('Error creating a declaration (test helpers)');

    return error;
  }
};

/**
 * Get declaration test helper
 * Get an declaration by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} declarationId: Declaration ID
 * @returns {Promise<ApplicationDeclaration>} Declaration
 */
const get = async (context: Context, declarationId: string) => {
  try {
    console.info('Getting a declaration by ID (test helpers)');

    const declaration = await context.db.Declaration.findOne({
      where: { id: declarationId },
    });

    return declaration;
  } catch (error) {
    console.error('Error getting a declaration by ID (test helpers)');

    throw new Error(`Getting a declaration by ID (test helpers) ${error}`);
  }
};

const declaration = {
  create,
  get,
};

export default declaration;
