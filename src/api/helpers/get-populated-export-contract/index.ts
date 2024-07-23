import { Context } from '.keystone/types'; // eslint-disable-line
import getExportContractById from '../get-export-contract-by-id';
import getPopulatedAgent from './get-populated-agent';
import getPrivateMarketById from '../get-private-market-by-id';
import getCountryByField from '../get-country-by-field';

/**
 * getPopulatedExportContract
 * Get a populated export contract
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: ExportContract ID
 * @returns {Promise<ApplicationExportContract>}
 */
const getPopulatedExportContract = async (context: Context, id: string) => {
  try {
    console.info(`Getting populated exportContract ${id}`);

    const exportContract = await getExportContractById(context, id);

    const exportContractAgent = await getPopulatedAgent(context, exportContract.agentId);

    const privateMarket = await getPrivateMarketById(context, exportContract.privateMarketId);

    const finalDestinationCountry = await getCountryByField(context, 'isoCode', exportContract.finalDestinationCountryCode);

    const populatedExportContract = {
      ...exportContract,
      agent: exportContractAgent,
      finalDestinationCountry,
      privateMarket,
    };

    return populatedExportContract;
  } catch (err) {
    console.error(`Getting populated exportContract ${id} %O`, err);

    throw new Error(`Error Getting populated exportContract ${id} ${err}`);
  }
};

export default getPopulatedExportContract;
