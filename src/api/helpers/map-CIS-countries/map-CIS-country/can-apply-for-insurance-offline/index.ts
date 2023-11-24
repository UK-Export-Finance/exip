import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const { CIS } = EXTERNAL_API_DEFINITIONS;

/**
 * canApplyForInsuranceOffline
 * Check if a country can apply for insurance offline
 * @param {String} Country original short term cover definition from CIS API.
 * @returns {Boolean}
 */
export const canApplyForInsuranceOffline = (originalShortTermCover: string) => originalShortTermCover === CIS.SHORT_TERM_COVER_AVAILABLE.NO;

export default canApplyForInsuranceOffline;
