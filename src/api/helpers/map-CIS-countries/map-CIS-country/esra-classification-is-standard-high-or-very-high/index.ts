import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const {
  CIS: {
    ESRA_CLASSIFICATION: { STANDARD, HIGH, VERY_HIGH },
  },
} = EXTERNAL_API_DEFINITIONS;

/**
 * esraClassificationIsStandardHighOrVeryHigh
 * Check if a country's "ESRA classification" is STANDARD, HIGH or VERY_HIGH
 * @param {string} esraClassification: ESRA classification
 * @returns {boolean}
 */
const esraClassificationIsStandardHighOrVeryHigh = (esraClassification: string): boolean => {
  switch (esraClassification) {
    case STANDARD:
      return true;

    case HIGH:
      return true;

    case VERY_HIGH:
      return true;

    default:
      return false;
  }
};

export default esraClassificationIsStandardHighOrVeryHigh;
