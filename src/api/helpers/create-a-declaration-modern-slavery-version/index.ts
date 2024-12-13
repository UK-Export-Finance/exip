import { Context } from '../../types';
import DECLARATIONS from '../../constants/declarations';

const { WILL_ADHERE_TO_ALL_REQUIREMENTS, HAS_NO_OFFENSES_OR_INVESTIGATIONS, IS_NOT_AWARE_OF_EXISTING_SLAVERY } =
  DECLARATIONS.LATEST_MODERN_SLAVERY_DECLARATIONS;

/**
 * createADeclarationModernSlaveryVersion
 * Create an application "modern slavery declaration" version with a relationship and the latest version numbers.
 * @param {Context} context: KeystoneJS context API
 * @param {String} declarationModernSlaveryId: Declaration modern slavery ID
 * @returns {Promise<ApplicationDeclarationModernSlaveryVersions>}  Created modern slavery declaration version
 */
const createADeclarationModernSlaveryVersion = async (context: Context, declarationModernSlaveryId: string) => {
  console.info('Creating an application declaration modern slavery version for %s', declarationModernSlaveryId);

  try {
    const version = await context.db.DeclarationModernSlaveryVersion.createOne({
      data: {
        declarationModernSlavery: {
          connect: { id: declarationModernSlaveryId },
        },
        willAdhereToAllRequirements: WILL_ADHERE_TO_ALL_REQUIREMENTS,
        hasNoOffensesOrInvestigations: HAS_NO_OFFENSES_OR_INVESTIGATIONS,
        isNotAwareOfExistingSlavery: IS_NOT_AWARE_OF_EXISTING_SLAVERY,
      },
    });

    return version;
  } catch (error) {
    console.error('Error creating an application declaration modern slavery version %o', error);

    throw new Error(`Creating an application declaration modern slavery version ${error}`);
  }
};

export default createADeclarationModernSlaveryVersion;
