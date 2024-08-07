import { Context } from '../../types';
import DECLARATIONS from '../../constants/declarations';

const { ANTI_BRIBERY, ANTI_BRIBERY_CODE_OF_CONDUCT, ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT, CONFIDENTIALITY, CONFIRMATION_AND_ACKNOWLEDGEMENTS } =
  DECLARATIONS.LATEST_DECLARATIONS;

/**
 * createADeclarationVersion
 * Create an application declaration version with a declaration relationship and the latest version numbers.
 * @param {Context} context: KeystoneJS context API
 * @param {String} declarationId: Declaration ID
 * @returns {Promise<ApplicationDeclarationVersions>}  Created declaration version
 */
const createADeclarationVersion = async (context: Context, declarationId: string) => {
  console.info('Creating an application declaration version for ', declarationId);

  try {
    const declaration = await context.db.DeclarationVersion.createOne({
      data: {
        declaration: {
          connect: { id: declarationId },
        },
        agreeToAntiBribery: ANTI_BRIBERY,
        agreeToConfidentiality: CONFIDENTIALITY,
        agreeToConfirmationAndAcknowledgements: CONFIRMATION_AND_ACKNOWLEDGEMENTS,
        hasAntiBriberyCodeOfConduct: ANTI_BRIBERY_CODE_OF_CONDUCT,
        willExportWithAntiBriberyCodeOfConduct: ANTI_BRIBERY_EXPORTING_WITH_CODE_OF_CONDUCT,
      },
    });

    return declaration;
  } catch (err) {
    console.error('Error creating an application declaration version %O', err);

    throw new Error(`Creating an application declaration version ${err}`);
  }
};

export default createADeclarationVersion;
