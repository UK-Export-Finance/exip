import { EXTERNAL_API_DEFINITIONS } from '../../../../../constants';

const {
  CIS: {
    ESRA_CLASSIFICATION: { STANDARD, HIGH, VERY_HIGH },
  },
} = EXTERNAL_API_DEFINITIONS;

/**
 * hasValidEsraClassification
 * Check if a country's "ESRA classification" can apply for insurance online.
 * @param {String} esraClassification: ESRA classification
 * @returns {Boolean}
 */
const hasValidEsraClassification = (esraClassification: string): boolean => {
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

export default hasValidEsraClassification;
