import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getDeclarationById
 * Get a declaration by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: Declaration ID
 * @returns {Promise<ApplicationDeclaration>}
 */
const getDeclarationById = async (context: Context, id: string) => {
  try {
    console.info('Getting declaration by ID %s', id);

    const declaration = await context.db.Declaration.findOne({
      where: { id },
    });

    return declaration;
  } catch (error) {
    console.error('Getting declaration by ID %s %O', id, error);

    throw new Error(`Error Getting declaration by ID ${id} ${error}`);
  }
};

export default getDeclarationById;
