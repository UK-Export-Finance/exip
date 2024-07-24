import { Context } from '../../types';

/**
 * createADeclarationVersion
 * TODO update documentation
 * Create a declaration version with appropriate relationships.
 * @param {Context} context: KeystoneJS context API
 * @param {String} declarationId: Declaration ID
 * @returns {Promise<ApplicationDeclarationVersion>}  Created declaration version
 */
const createADeclarationVersion = async (context: Context, declarationId: string) => {
  console.info('Creating an application declaration version for ', declarationId);

  try {
    const declaration = await context.db.DeclarationVersion.createOne({
      data: {
        declaration: {
          connect: { id: declarationId },
        },
      },
    });

    return declaration;
  } catch (err) {
    console.error('Error creating an application declaration version %O', err);

    throw new Error(`Creating an application declaration version ${err}`);
  }
};

export default createADeclarationVersion;
