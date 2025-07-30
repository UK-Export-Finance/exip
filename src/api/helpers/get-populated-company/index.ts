import { Context } from '.keystone/types'; // eslint-disable-line
import getCompanyById from '../get-company-by-id';
import getCompanyAddressById from '../get-company-address-by-id';
import getCompanySicCodesByCompanyId from '../get-company-sic-codes-by-company-id';
import getCompanyDifferentTradingAddressById from '../get-company-different-trading-address-by-id';

/**
 * getPopulatedCompany
 * Get a populated company
 * @param {Context} context: KeystoneJS context API
 * @param {string} id: Company ID
 * @returns {Promise<ApplicationCompany>}
 */
const getPopulatedCompany = async (context: Context, id: string) => {
  try {
    console.info('Getting populated company %s', id);

    const company = await getCompanyById(context, id);

    const companyAddress = await getCompanyAddressById(context, company.registeredOfficeAddressId);

    const companySicCodes = await getCompanySicCodesByCompanyId(context, company.id);

    const differentTradingAddress = await getCompanyDifferentTradingAddressById(context, company.differentTradingAddressId);

    const populatedCompany = {
      ...company,
      companySicCodes,
      registeredOfficeAddress: companyAddress,
      differentTradingAddress,
    };

    return populatedCompany;
  } catch (error) {
    console.error('Getting populated company %s %o', id, error);

    throw new Error(`Error getting populated company ${id} ${error}`);
  }
};

export default getPopulatedCompany;
