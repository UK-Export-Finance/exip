import { Context, ApplicationCompanyAddressCore } from '../../types';

/**
 * createACompanyAddress
 * Create a company address with company relationships.
 * @param {Context} context: KeystoneJS context API
 * @param {object} Company address data
 * @param {string} Company ID
 * @returns {Promise<object>} Created company address
 */
const createACompanyAddress = async (context: Context, addressData: ApplicationCompanyAddressCore, companyId: string) => {
  console.info('Creating a company address for %s', companyId);

  try {
    const companyAddress = await context.db.CompanyAddress.createOne({
      data: {
        company: {
          connect: {
            id: companyId,
          },
        },
        ...addressData,
      },
    });

    return companyAddress;
  } catch (error) {
    console.error('Error creating a company address %o', error);

    throw new Error(`Creating a company address ${error}`);
  }
};

export default createACompanyAddress;
