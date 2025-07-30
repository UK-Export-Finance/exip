import { Context } from '.keystone/types'; // eslint-disable-line
import getDeclarationById from '../get-declaration-by-id';
import getDeclarationModernSlaveryById from '../get-declaration-modern-slavery-by-id';

/**
 * getPopulatedDeclaration
 * Get a populated declaration
 * @param {Context} context: KeystoneJS context API
 * @param {string} declarationId: Declaration ID
 * @returns {Promise<ApplicationDeclaration>}
 */
const getPopulatedDeclaration = async (context: Context, declarationId: string) => {
  try {
    console.info('Getting populated declaration %s', declarationId);

    const declaration = await getDeclarationById(context, declarationId);

    if (!declaration) {
      throw new Error(`Error Getting populated declaration ${declarationId}`);
    }

    const declarationModernSlavery = await getDeclarationModernSlaveryById(context, String(declaration.modernSlaveryId));

    if (!declarationModernSlavery) {
      throw new Error(`Error Getting populated declaration (modern slavery) ${declarationId}`);
    }

    return {
      ...declaration,
      modernSlavery: declarationModernSlavery,
    };
  } catch (error) {
    console.error('Getting populated declaration %s %o', declarationId, error);

    throw new Error(`Error Getting populated declaration ${declarationId} ${error}`);
  }
};

export default getPopulatedDeclaration;
