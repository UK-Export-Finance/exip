import { Context } from '.keystone/types'; // eslint-disable-line
import { ApplicationCompany, ApplicationCompanyAddress, ApplicationCompanySicCode } from '../types';

/**
 * create company test helper
 * Creates a empty company.
 * @param {Context} context: KeystoneJS context API
 * @param {ApplicationCompany} data
 * @returns {ApplicationCompany} Created company
 */
const createCompany = async (context: Context, data = {}) => {
  try {
    console.info('Creating a company (test helpers)');
    const company = (await context.query.Company.createOne({
      data,
      query: 'id',
    })) as ApplicationCompany;

    return company;
  } catch (error) {
    console.error(error);

    return error;
  }
};

/**
 * delete company test helper
 * deletes a company by companyId.
 * @param {Context} KeystoneJS context API
 * @returns {Object} Delete response
 */
const deleteCompany = async (context: Context, companyId: string) => {
  try {
    console.info('Deleting company (test helpers)');

    const response = await context.query.Company.deleteMany({
      where: {
        id: companyId,
      },
    });

    return response;
  } catch (error) {
    console.error(error);

    throw new Error(`Deleting company (test helpers) ${error}`);
  }
};

/**
 * delete company address test helper
 * deletes a company address by companyAddressId.
 * @param {Context} KeystoneJS context API
 * @returns {Object} Delete response
 */
const deleteCompanyAddress = async (context: Context, companyAddressId: string) => {
  try {
    console.info('Deleting company address (test helpers)');

    const response = await context.query.CompanyAddress.deleteMany({
      where: {
        id: companyAddressId,
      },
    });

    return response;
  } catch (error) {
    console.error(error);

    throw new Error(`Deleting company address (test helpers) ${error}`);
  }
};

/**
 * delete company SIC code test helper
 * deletes a company SIC code by companyId.
 * @param {Context} KeystoneJS context API
 * @returns {Array} Delete response
 */
const deleteCompanySicCode = async (context: Context, companySicId: string) => {
  try {
    console.info('Deleting company SIC code (test helpers)', companySicId);

    const response = await context.query.CompanySicCode.deleteMany({
      where: [{ id: companySicId }],
    });

    return response;
  } catch (error) {
    console.error(error);

    throw new Error(`Deleting company SIC code (test helpers) ${error}`);
  }
};

/**
 * create company address test helper
 * Creates a empty company address.
 * @param {Context} context: KeystoneJS context API
 * @param {ApplicationCompanyAddress} data
 * @returns {Object} Created company address id
 */
const createCompanyAddress = async (context: Context, data = {}) => {
  try {
    console.info('Creating a company address (test helpers)');

    const company = (await context.query.CompanyAddress.createOne({
      data,
      query: 'id',
    })) as ApplicationCompanyAddress;

    return company;
  } catch (error) {
    console.error(error);

    return error;
  }
};

/**
 * create company SIC code test helper
 * Creates an empty company SIC code.
 * @param {Context} KeystoneJS context API
 * @param {String} companyId
 * @returns {Object} Created SIC code id
 */
const createCompanySicCode = async (context: Context, companyId: string) => {
  try {
    console.info('Creating a company SIC code (test helpers)');

    const companySicCode = (await context.query.CompanySicCode.createOne({
      data: {
        company: {
          connect: {
            id: companyId,
          },
        },
      },
    })) as ApplicationCompanySicCode;

    return companySicCode;
  } catch (error) {
    console.error(error);

    return error;
  }
};

/**
 * create company different trading address test helper
 * Creates an empty company different trading address.
 * @param {Context} KeystoneJS context API
 * @param {String} companyId
 * @returns {Promise<ApplicationCompanyDifferentTradingAddress>} Created SIC code id
 */
const createCompanyDifferentTradingAddress = async (context: Context, companyId: string) => {
  try {
    console.info('Creating a company different trading address (test helpers)');

    const differentTradingAddress = await context.query.CompanyDifferentTradingAddress.createOne({
      query: 'id',
      data: {
        company: {
          connect: {
            id: companyId,
          },
        },
      },
    });

    return differentTradingAddress;
  } catch (error) {
    console.error(error);

    throw new Error(`Creating a company different trading address (test helpers) ${error}`);
  }
};

/**
 * get company test helper
 * Get a company by ID
 * @param {Context} KeystoneJS context API
 * @param {String} companyId
 * @returns {Object} company
 */
const getCompany = async (context: Context, companyId: string) => {
  try {
    console.info('Getting a company by ID (test helpers)');

    const company = (await context.query.Company.findOne({
      where: { id: companyId },
      query: 'id companyName companyNumber dateOfCreation financialYearEndDate hasDifferentTradingAddress hasDifferentTradingName',
    })) as ApplicationCompany;

    return company;
  } catch (error) {
    console.error(error);

    throw new Error(`Getting a company by ID (test helpers) ${error}`);
  }
};

/**
 * get company address test helper
 * Get a company address by ID
 * @param {Context} KeystoneJS context API
 * @param {String} companyAddressId
 * @returns {Object} company address
 */
const getCompanyAddress = async (context: Context, companyAddressId: string) => {
  try {
    console.info('Getting a company address by ID (test helpers)');

    const companyAddress = (await context.query.CompanyAddress.findOne({
      where: { id: companyAddressId },
      query: 'id addressLine1 addressLine2 careOf locality region postalCode country premises',
    })) as ApplicationCompanyAddress;

    return companyAddress;
  } catch (error) {
    console.error(error);

    throw new Error(`Getting a company address by ID (test helpers) ${error}`);
  }
};

/**
 * get company SIC code test helper
 * Get a company SIC codes by companyId
 * @param {Context} KeystoneJS context API
 * @param {String} companyId
 * @returns {Array} company SIC codes
 */
const getCompanySicCodes = async (context: Context, companyId: string) => {
  try {
    console.info('Getting company SIC codes by company ID (test helpers)');

    const companySic = await context.query.CompanySicCode.findMany({
      where: {
        company: {
          id: { equals: companyId },
        },
      },
      query: 'id company { id } sicCode industrySectorName',
    });

    return companySic;
  } catch (error) {
    console.error(error);

    throw new Error(`Getting company SIC code by company ID (test helpers) ${error}`);
  }
};

const accounts = {
  createCompany,
  createCompanyAddress,
  createCompanySicCode,
  createCompanyDifferentTradingAddress,
  deleteCompany,
  deleteCompanyAddress,
  deleteCompanySicCode,
  getCompany,
  getCompanyAddress,
  getCompanySicCodes,
};

export default accounts;
