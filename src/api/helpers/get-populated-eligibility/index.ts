import { Context } from '.keystone/types'; // eslint-disable-line
import getEligibilityById from '../get-eligibility-by-id';
import getCoverPeriodById from '../get-cover-period-by-id';
import getTotalContractValuedById from '../get-total-contract-value-by-id';
import { Country } from '../../types';

/**
 * getPopulatedEligibility
 * Get a populated eligibility
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: Eligibility ID
 * @param {Country} buyerCountry: Buyer country
 * @returns {Promise<ApplicationEligibility>}
 */
const getPopulatedEligibility = async (context: Context, id: string, buyerCountry: Country) => {
  try {
    console.info('Getting populated eligibility %s', id);

    const eligibility = await getEligibilityById(context, id);

    const coverPeriod = await getCoverPeriodById(context, eligibility.coverPeriodId);

    const totalContractValue = await getTotalContractValuedById(context, eligibility.totalContractValueId);

    const populatedEligibility = {
      ...eligibility,
      buyerCountry,
      coverPeriod,
      totalContractValue,
    };

    return populatedEligibility;
  } catch (error) {
    console.error('Getting populated eligibility %s %o', id, error);

    throw new Error(`Error Getting populated eligibility ${id} ${error}`);
  }
};

export default getPopulatedEligibility;
