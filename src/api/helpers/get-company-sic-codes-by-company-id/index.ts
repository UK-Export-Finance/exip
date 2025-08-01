import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getCompanySicCodesByCompanyId
 * Get company SIC codes by company ID
 * @param {Context} context: KeystoneJS context API
 * @param {string} id: Company ID
 * @returns {Promise<ApplicationCompanyAddress>}
 */
const getCompanySicCodesByCompanyId = async (context: Context, id: string) => {
  try {
    console.info('Getting company SIC codes by company ID %s', id);

    const companySicCodes = await context.db.CompanySicCode.findMany({
      where: {
        company: {
          id: { equals: id },
        },
      },
    });

    return companySicCodes;
  } catch (error) {
    console.error('Getting company SIC codes by company ID %s %o', id, error);

    throw new Error(`Error Getting company SIC codes by company ID ${id} ${error}`);
  }
};

export default getCompanySicCodesByCompanyId;
