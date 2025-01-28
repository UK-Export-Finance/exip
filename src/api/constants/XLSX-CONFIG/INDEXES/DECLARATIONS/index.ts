import DECLARATIONS_FIELD_IDS from '../../../field-ids/insurance/declarations';
import { ApplicationDeclarationModernSlavery } from '../../../../types';

const {
  MODERN_SLAVERY: {
    CONDITIONAL_REASONS: { CANNOT_ADHERE_TO_ALL_REQUIREMENTS, OFFENSES_OR_INVESTIGATIONS, AWARE_OF_EXISTING_SLAVERY },
  },
} = DECLARATIONS_FIELD_IDS;

/**
 * DEFAULT_INDEXES
 * Default indexes for the "Declarations" XLSX worksheet.
 */
export const DEFAULT_INDEXES = () => ({
  CANNOT_ADHERE_TO_ALL_REQUIREMENTS: 0,
  OFFENSES_OR_INVESTIGATIONS: 0,
  AWARE_OF_EXISTING_SLAVERY: 0,
});

/**
 * DECLARATIONS_INDEXES
 * Generate row indexes for the XLSX's "Declarations contract" worksheet.
 * - If a CANNOT_ADHERE_TO_ALL_REQUIREMENTS answer is provided, the XLSX has 1 additional row.
 * - If an OFFENSES_OR_INVESTIGATIONS answer is provided, the XLSX has 1 additional row.
 * - If an AWARE_OF_EXISTING_SLAVERY answer is provided, the XLSX has 1 additional row.
 * @param {ApplicationDeclarationModernSlavery} modernSlavery
 * @return {Object}
 */
const DECLARATIONS_INDEXES = (modernSlavery: ApplicationDeclarationModernSlavery) => {
  const INDEXES = DEFAULT_INDEXES();

  const cannotAdhereAnswer = modernSlavery[CANNOT_ADHERE_TO_ALL_REQUIREMENTS];
  const offensesInvestigationsAnswer = modernSlavery[OFFENSES_OR_INVESTIGATIONS];
  const awareOfAnswer = modernSlavery[AWARE_OF_EXISTING_SLAVERY];

  if (cannotAdhereAnswer) {
    INDEXES.CANNOT_ADHERE_TO_ALL_REQUIREMENTS = 7;
  }

  if (offensesInvestigationsAnswer) {
    INDEXES.OFFENSES_OR_INVESTIGATIONS = 8;

    if (cannotAdhereAnswer) {
      INDEXES.OFFENSES_OR_INVESTIGATIONS += 1;
    }

    if (awareOfAnswer) {
      INDEXES.OFFENSES_OR_INVESTIGATIONS += 1;
    }
  }

  if (awareOfAnswer) {
    INDEXES.AWARE_OF_EXISTING_SLAVERY = 9;

    if (cannotAdhereAnswer) {
      INDEXES.AWARE_OF_EXISTING_SLAVERY += 1;
    }

    if (offensesInvestigationsAnswer) {
      INDEXES.AWARE_OF_EXISTING_SLAVERY += 1;
    }
  }

  return INDEXES;
};

export default DECLARATIONS_INDEXES;
