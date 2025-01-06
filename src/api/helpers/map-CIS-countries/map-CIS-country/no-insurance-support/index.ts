import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const { NO_COVER } = EXTERNAL_API_DEFINITIONS.CIS;

/**
 * noInsuranceSupportAvailable
 * Check if a country cannot apply for insurance
 * @param {String} marketRiskAppetitePublicDesc market risk appetite definition from CIS API.
 * @returns {Boolean}
 */
export const noInsuranceSupportAvailable = (marketRiskAppetitePublicDesc: string) => marketRiskAppetitePublicDesc === NO_COVER;

export default noInsuranceSupportAvailable;
