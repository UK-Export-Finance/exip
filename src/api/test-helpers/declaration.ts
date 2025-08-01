import { Context } from '.keystone/types'; // eslint-disable-line
import { ApplicationDeclaration } from '../types';

/**
 * Create an declaration test helper
 * Create an declaration
 * @param {Context} context: KeystoneJS context API
 * * @param {ApplicationDeclaration} data
 * @returns {ApplicationDeclaration} Created declaration
 */
const create = async (context: Context, data = {}) => {
  try {
    console.info('Creating a declaration (test helpers)');

    const declaration = (await context.db.Declaration.createOne({ data })) as ApplicationDeclaration;

    return declaration;
  } catch (error) {
    console.error('Error creating a declaration (test helpers) %o', error);

    return error;
  }
};

/**
 * Get declaration test helper
 * Get an declaration by ID
 * @param {Context} context: KeystoneJS context API
 * @param {string} declarationId: Declaration ID
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
    console.error('Error getting a declaration by ID (test helpers) %o', error);

    throw new Error(`Getting a declaration by ID (test helpers) ${error}`);
  }
};

/**
 * Update declaration test helper
 * Update a declaration by ID
 * @param {Context} context: KeystoneJS context API
 * @param {string} declarationId: Declaration ID
 * @param {ApplicationDeclaration} data: Declaration data
 * @returns {Promise<ApplicationDeclaration>} Declaration
 */
const update = async (context: Context, declarationId: string, data = {}) => {
  try {
    console.info('Updating a declaration by ID (test helpers)');

    const declaration = await context.db.Declaration.updateOne({
      where: { id: declarationId },
      data,
    });

    return declaration;
  } catch (error) {
    console.error('Error updating a declaration by ID (test helpers) %o', error);

    throw new Error(`Updating a declaration by ID (test helpers) ${error}`);
  }
};

const declaration = {
  create,
  get,
  update,
};

export default declaration;
