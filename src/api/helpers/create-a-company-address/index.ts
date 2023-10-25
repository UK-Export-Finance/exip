import { Context, ApplicationCompanyAddressCore } from '../../types';

/**
 * createACompanyAddress
 * Create a company address with company relationships.
 * @param {Object} KeystoneJS context API
 * @param {Object} Company address data
 * @param {String} Company ID
 * @returns {Object} Created company address
 */
const createACompanyAddress = async (context: Context, addressData: ApplicationCompanyAddressCore, companyId: string) => {
  console.info('Creating a company address for ', companyId);

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
  } catch (err) {
    console.error('Error creating a company address %O', err);

    throw new Error(`Creating a company address ${err}`);
  }
};

export default createACompanyAddress;
