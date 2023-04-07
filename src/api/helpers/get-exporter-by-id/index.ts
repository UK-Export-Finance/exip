import { Context } from '.keystone/types'; // eslint-disable-line
import { Account } from '../../types';

/**
 * getExporterById
 * Get the account the ID is associated with.
 * @param {Object} KeystoneJS context API
 * @param {String} Exporter ID
 * @returns {Object} Exporter
 */
const getExporterById = async (context: Context, exporterId: string) => {
  try {
    console.info('Getting exporter by ID');

    const exporter = (await context.db.Exporter.findOne({
      where: {
        id: exporterId,
      },
    })) as Account;

    return exporter;
  } catch (err) {
    console.error(err);
    throw new Error(`Getting exporter by ID ${err}`);
  }
};

export default getExporterById;
