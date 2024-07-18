import { Context } from '.keystone/types'; // eslint-disable-line
import getExportContractById from '../get-export-contract-by-id';
import getExportContractAgentById from '../get-export-contract-agent-by-id';
import getExportContractAgentServiceById from '../get-export-contract-agent-service-by-id';
import getExportContractAgentServiceChargeById from '../get-export-contract-agent-service-charge-by-id';
import getPrivateMarketById from '../get-private-market-by-id';
import getCountryByField from '../get-country-by-field';

// TODO
// TODO: unit test
// TODO: unit test
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

    const exportContractAgent = await getExportContractAgentById(context, exportContract.agentId);

    const exportContractAgentService = await getExportContractAgentServiceById(context, exportContractAgent.serviceId);

    const exportContractAgentServiceCharge = await getExportContractAgentServiceChargeById(context, exportContractAgentService.chargeId);

    const privateMarket = await getPrivateMarketById(context, exportContract.privateMarketId);

    const finalDestinationCountry = await getCountryByField(context, 'isoCode', exportContract.finalDestinationCountryCode);

    const populatedExportContract = {
      ...exportContract,
      agent: {
        ...exportContractAgent,
        service: {
          ...exportContractAgentService,
          charge: exportContractAgentServiceCharge,
        },
      },
      finalDestinationCountry,
      privateMarket,
    };

    return populatedExportContract;
  } catch (err) {
    console.error(`Getting populated exportContract by ID ${id} %O`, err);

    throw new Error(`Error Getting populated exportContract by ID ${id} ${err}`);
  }
};

export default getPopulatedExportContract;
