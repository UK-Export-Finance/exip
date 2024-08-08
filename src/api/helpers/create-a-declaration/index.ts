import createADeclarationVersion from '../create-a-declaration-version';
import { Context } from '../../types';

/**
 * createADeclaration
 * Create a declaration with an application relationship
 * @param {Context} context: KeystoneJS context API
 * @param {String} applicationId: Application ID
 * @returns {Promise<Object>} Created declaration
 */
const createADeclaration = async (context: Context, applicationId: string) => {
  console.info('Creating a application declaration for %s', applicationId);

  try {
    const declaration = await context.db.Declaration.createOne({
      data: {
        application: {
          connect: { id: applicationId },
        },
      },
    });

    const declarationVersion = await createADeclarationVersion(context, declaration.id);

    return {
      ...declaration,
      declarationVersion,
    };
  } catch (error) {
    console.error('Error creating an application declaration %O', error);

    throw new Error(`Creating an application declaration ${error}`);
  }
};

export default createADeclaration;
