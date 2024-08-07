import { Context } from '.keystone/types'; // eslint-disable-line
import createCompanySicCodes from '../../../helpers/create-company-sic-codes';
import { SuccessResponse, UpdateCompanyPostDataMigrationVariables } from '../../../types';

/**
 * updateCompanyPostDataMigration
 * Update a company (post data migration)
 * 1) Update data in the Company table
 * 2) Update data in the CompanyAddress table
 * 3) Create company SIC codes.
 * @param {Object} root: GraphQL root variables
 * @param {ApplicationCompany} GraphQL variables
 * @param {Context} context: KeystoneJS context API
 * @returns {Promise<Object>} Object with success flag
 */
const updateCompanyPostDataMigration = async (root: any, variables: UpdateCompanyPostDataMigrationVariables, context: Context): Promise<SuccessResponse> => {
  try {
    console.info('Updating company (post data migration) %s', variables.id);

    const { id, company } = variables;

    const { registeredOfficeAddress, industrySectorNames, sicCodes, ...otherFields } = company;

    const updatedCompany = await context.db.Company.updateOne({
      where: {
        id,
      },
      data: otherFields,
    });

    const { id: addressId, ...addressFields } = registeredOfficeAddress;

    if (!updatedCompany.registeredOfficeAddressId) {
      console.error('Unable to update company address - does not exist (post data migration) %O', id);
      throw new Error(`Unable to update company address - does not exist (post data migration) ${id}`);
    }

    await context.db.CompanyAddress.updateOne({
      where: {
        id: updatedCompany.registeredOfficeAddressId,
      },
      data: addressFields,
    });

    if (sicCodes) {
      await createCompanySicCodes(context, updatedCompany.id, sicCodes, industrySectorNames);
    }

    return {
      success: true,
    };
  } catch (err) {
    console.error('Error updating company (post data migration) %O', err);
    throw new Error(`Updating company (post data migration) ${err}`);
  }
};

export default updateCompanyPostDataMigration;
