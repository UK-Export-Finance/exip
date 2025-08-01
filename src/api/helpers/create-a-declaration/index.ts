import createADeclarationVersion from '../create-a-declaration-version';
import createADeclarationModernSlavery from '../create-a-declaration-modern-slavery';
import { Context } from '../../types';

/**
 * createADeclaration
 * Create a declaration with application and declaration version relationships.
 * @param {Context} context: KeystoneJS context API
 * @param {string} applicationId: Application ID
 * @returns {Promise<ApplicationDeclaration>}  Created declaration
 */
const createADeclaration = async (context: Context, applicationId: string) => {
  console.info('Creating an application declaration for %s', applicationId);

  try {
    const declaration = await context.db.Declaration.createOne({
      data: {
        application: {
          connect: { id: applicationId },
        },
      },
    });

    const declarationVersion = await createADeclarationVersion(context, declaration.id);

    const declarationModernSlavery = await createADeclarationModernSlavery(context, declaration.id);

    return {
      ...declaration,
      declarationVersion,
      declarationModernSlavery,
    };
  } catch (error) {
    console.error('Error creating an application declaration %o', error);

    throw new Error(`Creating an application declaration ${error}`);
  }
};

export default createADeclaration;
