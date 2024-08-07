import { Context } from '../../types';

/**
 * createADeclaration
 * Create a declaration with an application relationship
 * @param {Context} context: KeystoneJS context API
 * @param {String} applicationId: Application ID
 * @returns {Promise<Object>} Created declaration
 */
const createADeclaration = async (context: Context, applicationId: string) => {
  console.info('Creating a declaration for %s', applicationId);

  try {
    const declaration = await context.db.Declaration.createOne({
      data: {
        application: {
          connect: { id: applicationId },
        },
      },
    });

    return declaration;
  } catch (err) {
    console.error('Error creating a declaration %O', err);

    throw new Error(`Creating a declaration ${err}`);
  }
};

export default createADeclaration;
