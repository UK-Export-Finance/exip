import createACompanyAddress from '../create-a-company-address';
import createCompanySicCodes from '../create-company-sic-codes';
import createACompanyDifferentTradingAddress from '../create-a-company-different-trading-address';
import { Context, ApplicationCompanyCore } from '../../types';

/**
 * createACompany
 * Create a company, address and SIC codes with appropriate relationships.
 * @param {Context} context: KeystoneJS context API
 * @param {string} applicationId: Application ID
 * @param {object} companyData: Company data to create
 * @returns {Promise<object>} Created company, address and SIC codes
 */
const createACompany = async (context: Context, applicationId: string, companyData: ApplicationCompanyCore) => {
  console.info('Creating a company, address and SIC codes for %s', applicationId);

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
    const createdSicCodes = await createCompanySicCodes(context, company.id, sicCodes, industrySectorNames);

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
  } catch (error) {
    console.error('Error creating a company, address, SIC codes and company different trading address %o', error);

    throw new Error(`Creating a company, address, SIC codes and company different trading address ${error}`);
  }
};

export default createACompany;
