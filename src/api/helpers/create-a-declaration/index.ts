import createADeclarationVersion from '../create-a-declaration-version';
import { Context } from '../../types';

/**
 * createADeclaration
 * Create a declaration with application and declaration version relationships.
 * @param {Context} context: KeystoneJS context API
 * @param {String} applicationId: Application ID
 * @returns {Promise<ApplicationDeclaration>}  Created declaration
 */
const createADeclaration = async (context: Context, applicationId: string) => {
  console.info('Creating a application declaration for ', applicationId);

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
  } catch (err) {
    console.error('Error creating an application declaration %O', err);

    throw new Error(`Creating an application declaration ${err}`);
  }
};

export default createADeclaration;
