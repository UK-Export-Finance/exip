import { ApplicationCompany, ApplicationCompanyAddress, Context, TestHelperCreate } from '../types';

/**
 * create company test helper
 * Creates a blank company.
 * @param {Object} KeystoneJS context API
 * @returns {Object} Created company id
 */
const createCompany = async ({ context }: TestHelperCreate) => {
  try {
    console.info('Creating a company (test helpers)');
    const company = (await context.query.Company.createOne({
      data: {},
      query: 'id',
    })) as ApplicationCompany;

    return company;
  } catch (err) {
    console.error(err);
    return err;
  }
};

/**
 * delete company test helper
 * deletes a company by companyId.
 * @param {Object} KeystoneJS context API
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
  } catch (err) {
    console.error(err);
    throw new Error(`Deleting company (test helpers) ${err}`);
  }
};

/**
 * delete company address test helper
 * deletes a company address by companyAddressId.
 * @param {Object} KeystoneJS context API
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
  } catch (err) {
    console.error(err);
    throw new Error(`Deleting company address (test helpers) ${err}`);
  }
};

/**
 * delete company sic code test helper
 * deletes a company sic code by companyId.
 * @param {Object} KeystoneJS context API
 * @returns {Array} Delete response
 */
const deleteCompanySicCode = async (context: Context, companySicId: string) => {
  try {
    console.info('Deleting company sic code (test helpers)', companySicId);

    const response = await context.query.CompanySicCode.deleteMany({
      where: [{ id: companySicId }],
    });

    return response;
  } catch (err) {
    console.error(err);
    throw new Error(`Deleting company sicCode(test helpers) ${err}`);
  }
};

/**
 * create company address test helper
 * Creates a blank company address.
 * @param {Object} KeystoneJS context API
 * @returns {Object} Created company address id
 */
const createCompanyAddress = async ({ context }: TestHelperCreate) => {
  try {
    console.info('Creating a company address (test helpers)');

    const companyInput = {};

    const company = (await context.query.CompanyAddress.createOne({
      data: companyInput,
      query: 'id',
    })) as ApplicationCompanyAddress;

    return company;
  } catch (err) {
    console.error(err);
    return err;
  }
};

/**
 * get company test helper
 * Get a company by ID
 * @param {Object} KeystoneJS context API
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
  } catch (err) {
    console.error(err);
    throw new Error(`Getting a company by ID (test helpers) ${err}`);
  }
};

/**
 * get company address test helper
 * Get a company address by ID
 * @param {Object} KeystoneJS context API
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
  } catch (err) {
    console.error(err);
    throw new Error(`Getting a company address by ID (test helpers) ${err}`);
  }
};

/**
 * get company sic code test helper
 * Get a company sic code address by companyId
 * @param {Object} KeystoneJS context API
 * @param {String} companyId
 * @returns {Array} company sic codes
 */
const getCompanySicCode = async (context: Context, companyId: string) => {
  try {
    console.info('Getting a company sic codes by ID (test helpers)');

    const companySic = await context.query.CompanySicCode.findMany({
      where: {
        company: {
          id: { equals: companyId },
        },
      },
      query: 'id company { id } sicCode industrySectorName',
    });

    return companySic;
  } catch (err) {
    console.error(err);
    throw new Error(`Getting a company sic code by ID (test helpers) ${err}`);
  }
};

const accounts = {
  createCompany,
  createCompanyAddress,
  deleteCompany,
  deleteCompanyAddress,
  deleteCompanySicCode,
  getCompany,
  getCompanyAddress,
  getCompanySicCode,
};

export default accounts;
