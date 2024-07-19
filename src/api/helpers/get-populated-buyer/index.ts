import { Context } from '.keystone/types'; // eslint-disable-line
import getBuyerById from '../get-buyer-by-id';
import getCountryById from '../get-country-by-id';
import getBuyerRelationshipById from '../get-buyer-relationship-by-id';
import getBuyerTradingHistoryById from '../get-buyer-trading-history-by-id';

/**
 * getPopulatedBuyer
 * Get a populated eligibility
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: Buyer ID
 * @returns {Promise<ApplicationBuyer>}
 */
const getPopulatedBuyer = async (context: Context, id: string) => {
  try {
    console.info(`Getting populated buyer ${id}`);

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
  } catch (err) {
    console.error(`Getting populated buyer ${id} %O`, err);

    throw new Error(`Error Getting populated buyer ${id} ${err}`);
  }
};

export default getPopulatedBuyer;
