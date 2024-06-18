import createACompanyAddress from '../create-a-company-address';
import createCompanySicCodes from '../create-company-sic-codes';
import createACompanyDifferentTradingAddress from '../create-a-company-different-trading-address';
import { Context, ApplicationCompanyCore } from '../../types';

/**
 * createACompany
 * Create a company, address and SIC codes with appropriate relationships.
 * @param {Context} KeystoneJS context API
 * @param {String} Application ID
 * @param {Object} Company data to create
 * @returns {Promise<Object>} Created company, address and SIC codes
 */
const createACompany = async (context: Context, applicationId: string, companyData: ApplicationCompanyCore) => {
  console.info('Creating a company, address and SIC codes for ', applicationId);

  try {
    const { registeredOfficeAddress, sicCodes, industrySectorNames, ...companyFields } = companyData;

    /**
     * Create a company with provided data and application relationship
     */
    const company = await context.db.Company.createOne({
      data: {
        application: {
          connect: { id: applicationId },
        },
        ...companyFields,
      },
    });

    /**
     * Create a company address with company relationship
     */
    const companyAddress = await createACompanyAddress(context, registeredOfficeAddress, company.id);

    /**
     * Create company SIC codes.
     */
    const createdSicCodes = await createCompanySicCodes(context, sicCodes, industrySectorNames, company.id);

    /**
     * Create different trading address with company relationship.
     */
    const createdDifferentTradingAddress = await createACompanyDifferentTradingAddress(context, company.id);

    return {
      ...company,
      registeredOfficeAddress: companyAddress,
      sicCodes: createdSicCodes,
      differentTradingAddress: createdDifferentTradingAddress,
    };
  } catch (err) {
    console.error('Error creating a company, address, SIC codes and company different trading address %O', err);

    throw new Error(`Creating a company, address, SIC codes and company different trading address ${err}`);
  }
};

export default createACompany;
