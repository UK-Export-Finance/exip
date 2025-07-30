import createADeclarationModernSlaveryVersion from '../create-a-declaration-modern-slavery-version';
import { Context } from '../../types';

/**
 * createADeclarationModernSlavery
 * Create a "modern slavery declaration" with declaration and version relationships.
 * @param {Context} context: KeystoneJS context API
 * @param {string} declarationId: Declaration ID
 * @returns {Promise<ApplicationDeclarationModernSlavery>}  Created modern slavery declaration
 */
const createADeclarationModernSlavery = async (context: Context, declarationId: string) => {
  console.info('Creating an application declaration modern slavery for %s', declarationId);

  try {
    const declarationModernSlavery = await context.db.DeclarationModernSlavery.createOne({
      data: {
        declaration: {
          connect: { id: declarationId },
        },
      },
    });

    const declarationModernSlaveryVersion = await createADeclarationModernSlaveryVersion(context, declarationModernSlavery.id);

    return {
      ...declarationModernSlavery,
      declarationModernSlaveryVersion,
    };
  } catch (error) {
    console.error('Error creating an application declaration modern slavery %o', error);

    throw new Error(`Creating an application declaration modern slavery ${error}`);
  }
};

export default createADeclarationModernSlavery;
