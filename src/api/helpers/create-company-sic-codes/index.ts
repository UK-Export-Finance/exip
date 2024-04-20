import mapSicCodes from '../map-sic-codes';
import { Context } from '../../types';

/**
 * createCompanySicCodes
 * Map and create company SIC codes with industry sector names and company ID.
 * @param {Object} KeystoneJS context API
 * @param {Array} SIC codes
 * @param {Array} Industry sector names
 * @param {String} Company ID
 * @returns {Promise<Object>} Created company SIC codes
 */
const createCompanySicCodes = async (context: Context, sicCodes: Array<string>, industrySectorNames: Array<string>, companyId: string) => {
  console.info('Creating company SIC codes for ', companyId);

  try {
    const mappedSicCodes = mapSicCodes(sicCodes, industrySectorNames, companyId);

    let createdSicCodes = [];

    if (sicCodes.length) {
      createdSicCodes = await context.db.CompanySicCode.createMany({
        data: mappedSicCodes,
      });
    }

    return createdSicCodes;
  } catch (err) {
    console.error('Error creating company SIC codes %O', err);

    throw new Error(`Creating company SIC codes ${err}`);
  }
};

export default createCompanySicCodes;
