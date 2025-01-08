import { Context } from '.keystone/types'; // eslint-disable-line
import getDeclarationById from '../get-declaration-by-id';
import getDeclarationModernSlaveryById from '../get-declaration-modern-slavery-by-id';

/**
 * getPopulatedDeclaration
 * Get a populated declaration
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: Declaration ID
 * @returns {Promise<ApplicationDeclaration>}
 */
const getPopulatedDeclaration = async (context: Context, id: string) => {
  try {
    console.info('Getting populated declaration %s', id);

    const declaration = await getDeclarationById(context, id);

    const modernSlavery = await getDeclarationModernSlaveryById(context, declaration.modernSlaveryId);

    const populatedDeclaration = {
      ...declaration,
      modernSlavery,
    };

    return populatedDeclaration;
  } catch (error) {
    console.error('Getting populated declaration %s %o', id, error);

    throw new Error(`Error getting populated declaration ${id} ${error}`);
  }
};

export default getPopulatedDeclaration;
