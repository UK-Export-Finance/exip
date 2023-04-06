import { Context } from '.keystone/types'; // eslint-disable-line
import { mapSicCodes } from '../../helpers/mapSicCodes';
import { UpdateExporterCompanyAndCompanyAddressVariables, ApplicationRelationship, SicCodes } from '../../types';

/**
 * updateExporterCompanyAndCompanyAddress
 * Update an exporter's company and company address
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the UpdateExporterCompanyAndCompanyAddress mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with company ID
 */
const updateExporterCompanyAndCompanyAddress = async (
  root: any,
  variables: UpdateExporterCompanyAndCompanyAddressVariables,
  context: Context,
): Promise<ApplicationRelationship> => {
  try {
    console.info('Updating application exporter company and exporter company address for ', variables.companyId);
    const { address, sicCodes, oldSicCodes, ...exporterCompany } = variables.data;

    const company = await context.db.ExporterCompany.updateOne({
      where: { id: variables.companyId },
      data: exporterCompany,
    });

    await context.db.ExporterCompanyAddress.updateOne({
      where: { id: variables.companyAddressId },
      data: address,
    });

    const mappedSicCodes = mapSicCodes(company, sicCodes);

    // if the update contains exporterCompany and there are oldSicCodes in the db, delete them
    if (exporterCompany && oldSicCodes && oldSicCodes.length) {
      // delete already existing sic codes from oldSicCodes
      await context.db.ExporterCompanySicCode.deleteMany({
        where: oldSicCodes,
      });
    }

    if (mappedSicCodes && mappedSicCodes.length) {
      mappedSicCodes.forEach(async (sicCodeObj: SicCodes) => {
        await context.db.ExporterCompanySicCode.createOne({
          data: sicCodeObj,
        });
      });
    }

    return {
      id: variables.companyId,
    };
  } catch (err) {
    console.error('Error updating application - exporter company and exporter company address', { err });

    throw new Error(`Updating application - exporter company and exporter company address ${err}`);
  }
};

export default updateExporterCompanyAndCompanyAddress;
