import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';
import { HasILCOnlyParams } from '../../../../types';

const {
  CIS: {
    SHORT_TERM_COVER: { ILC },
  },
} = EXTERNAL_API_DEFINITIONS;

/**
 * hasILCOnly
 * Check if a country has ILC (Irrevocable Letter of Credit) only - can only apply offline through an EFM
 * @param {string} shortTermCover: Short term cover
 * @returns {boolean} True if country has ILC only, false otherwise
 */
const hasILCOnly = ({ shortTermCover }: HasILCOnlyParams): boolean => shortTermCover === ILC;

export default hasILCOnly;
