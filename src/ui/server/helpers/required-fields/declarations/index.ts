import DECLARATIONS_FIELD_IDS from '../../../constants/field-ids/insurance/declarations';
import { ApplicationDeclaration, ApplicationDeclarationModernSlavery } from '../../../../types';

const {
  AGREE_CONFIDENTIALITY,
  AGREE_ANTI_BRIBERY,
  HAS_ANTI_BRIBERY_CODE_OF_CONDUCT,
  WILL_EXPORT_WITH_CODE_OF_CONDUCT,
  AGREE_CONFIRMATION_ACKNOWLEDGEMENTS,
  MODERN_SLAVERY: {
    WILL_ADHERE_TO_ALL_REQUIREMENTS,
    HAS_NO_OFFENSES_OR_INVESTIGATIONS,
    IS_NOT_AWARE_OF_EXISTING_SLAVERY,
    CONDITIONAL_REASONS: { CANNOT_ADHERE_TO_ALL_REQUIREMENTS, OFFENSES_OR_INVESTIGATIONS, AWARE_OF_EXISTING_SLAVERY },
  },
} = DECLARATIONS_FIELD_IDS;

/**
 * getAntiBriberyCodeOfConductTasks
 * Get "Anti-bribery code of conduct" tasks depending on if "has anti-bribery code of conduct" answer
 * @param {Boolean} hasAntiBriberyCodeOfConduct: "Has anti-bribery code of conduct" flag
 * @returns {Array} Anti-bribery code of conduct tasks
 */
export const getAntiBriberyCodeOfConductTasks = (hasAntiBriberyCodeOfConduct?: boolean | null): Array<string> => {
  // has not been answered yet.
  if (hasAntiBriberyCodeOfConduct === undefined || hasAntiBriberyCodeOfConduct === null) {
    return [HAS_ANTI_BRIBERY_CODE_OF_CONDUCT];
  }

  // has been answered 'yes' - additional fields required.
  if (hasAntiBriberyCodeOfConduct === true) {
    return [HAS_ANTI_BRIBERY_CODE_OF_CONDUCT, WILL_EXPORT_WITH_CODE_OF_CONDUCT];
  }

  // has been answered 'no' - nothing else required.
  if (hasAntiBriberyCodeOfConduct === false) {
    return [];
  }

  // invalid data type.
  return [HAS_ANTI_BRIBERY_CODE_OF_CONDUCT];
};

/**
 * getModernSlaveryTasks
 * Get "modern slavery" tasks depending on the provided answers
 * @param {ApplicationDeclarationModernSlavery} modernSlavery: Application "Modern slavery" answers
 * @returns {Array} Modern slavery tasks
 */
export const getModernSlaveryTasks = (modernSlavery: ApplicationDeclarationModernSlavery) => {
  const tasks = [WILL_ADHERE_TO_ALL_REQUIREMENTS, HAS_NO_OFFENSES_OR_INVESTIGATIONS, IS_NOT_AWARE_OF_EXISTING_SLAVERY];

  if (modernSlavery.willAdhereToAllRequirements === false) {
    tasks.push(CANNOT_ADHERE_TO_ALL_REQUIREMENTS);
  }

  if (modernSlavery.hasNoOffensesOrInvestigations === false) {
    tasks.push(OFFENSES_OR_INVESTIGATIONS);
  }

  if (modernSlavery.isNotAwareOfExistingSlavery === false) {
    tasks.push(AWARE_OF_EXISTING_SLAVERY);
  }

  return tasks;
};

/**
 * Required fields for the insurance - declarations section
 * @param {ApplicationDeclaration} declaration: Application declaration answers
 * @param {Array<string>} Required field IDs
 */
const requiredFields = (declaration: ApplicationDeclaration): Array<string> => {
  const { hasAntiBriberyCodeOfConduct } = declaration;

  const fields = [
    AGREE_CONFIDENTIALITY,
    AGREE_ANTI_BRIBERY,
    AGREE_CONFIRMATION_ACKNOWLEDGEMENTS,
    ...getAntiBriberyCodeOfConductTasks(hasAntiBriberyCodeOfConduct),
    ...getModernSlaveryTasks(declaration.modernSlavery),
  ];

  return fields;
};

export default requiredFields;
