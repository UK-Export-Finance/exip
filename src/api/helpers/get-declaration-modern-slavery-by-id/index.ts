import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getDeclarationModernSlaveryById
 * Get a declaration by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: Declaration modern slavey ID
 * @returns {Promise<ApplicationDeclaration>}
 */
const getDeclarationModernSlaveryById = async (context: Context, id: string) => {
  try {
    console.info('Getting declaration modern slavery by ID %s', id);

    const declarationModernSlavery = await context.db.DeclarationModernSlavery.findOne({
      where: { id },
    });

    return declarationModernSlavery;
  } catch (error) {
    console.error('Getting declaration modern slavery by ID %s %o', id, error);

    throw new Error(`Error Getting declaration modern slavery by ID ${id} ${error}`);
  }
};

export default getDeclarationModernSlaveryById;
