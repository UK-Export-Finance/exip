import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getDeclarationById
 * Get a declaration by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} declarationId: Declaration ID
 * @returns {Promise<ApplicationDeclaration>}
 */
const getDeclarationById = async (context: Context, declarationId: string) => {
  try {
    console.info('Getting declaration by ID %s', declarationId);

    // TODO: unit test.
    // TODO: new helper.
    const declaration = await context.db.Declaration.findOne({
      where: { id: declarationId },
    });

    const declarationModernSlavery = await context.db.DeclarationModernSlavery.findOne({
      where: { id: declaration?.modernSlaveryId },
    });

    return {
      ...declaration,
      modernSlavery: declarationModernSlavery,
    };
  } catch (error) {
    console.error('Getting declaration by ID %s %o', declarationId, error);

    throw new Error(`Error Getting declaration by ID ${declarationId} ${error}`);
  }
};

export default getDeclarationById;
