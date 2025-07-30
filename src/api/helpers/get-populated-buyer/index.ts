import { Context } from '.keystone/types'; // eslint-disable-line
import getBuyerById from '../get-buyer-by-id';
import getCountryById from '../get-country-by-id';
import getBuyerRelationshipById from '../get-buyer-relationship-by-id';
import getBuyerTradingHistoryById from '../get-buyer-trading-history-by-id';

/**
 * getPopulatedBuyer
 * Get a populated buyer
 * @param {Context} context: KeystoneJS context API
 * @param {string} id: Buyer ID
 * @returns {Promise<ApplicationBuyer>}
 */
const getPopulatedBuyer = async (context: Context, id: string) => {
  try {
    console.info('Getting populated buyer %s', id);

    const buyer = await getBuyerById(context, id);

    const buyerCountry = await getCountryById(context, buyer.countryId);

    const buyerRelationship = await getBuyerRelationshipById(context, buyer.relationshipId);

    const buyerTradingHistory = await getBuyerTradingHistoryById(context, buyer.buyerTradingHistoryId);

    const populatedBuyer = {
      ...buyer,
      country: buyerCountry,
      relationship: buyerRelationship,
      buyerTradingHistory,
    };

    return populatedBuyer;
  } catch (error) {
    console.error('Getting populated buyer %s %o', id, error);

    throw new Error(`Error getting populated buyer ${id} ${error}`);
  }
};

export default getPopulatedBuyer;
