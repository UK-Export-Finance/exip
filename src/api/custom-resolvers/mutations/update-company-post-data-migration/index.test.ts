import updateCompanyPostDataMigration from '.';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';
import companyHelpers from '../../../test-helpers/company';
import { Context } from '../../../types';
import { mockCompany } from '../../../test-mocks/mock-application';

describe('custom-resolvers/update-company-post-data-migration', () => {
  let context: Context;

  let company;
  let companyAddress;
  let result;

  const {
    registeredOfficeAddress: { __typename, ...addressFields },
  } = mockCompany;

  const mockCompanyData = {
    companyName: mockCompany.companyName,
    companyNumber: mockCompany.companyNumber,
    registeredOfficeAddress: addressFields,
    industrySectorNames: ['mock sector name'],
    sicCodes: [mockCompany.sicCodes[0].sicCode],
    dateOfCreation: new Date(),
    financialYearEndDate: new Date(),
  };

  let variables;

  beforeAll(async () => {
    context = getKeystoneContext();

    company = await companyHelpers.createCompany(context);

    companyAddress = await context.db.CompanyAddress.createOne({
      data: {
        company: {
          connect: { id: company.id },
        },
      },
    });

    await context.db.Company.updateOne({
      where: {
        id: company.id,
      },
      data: {
        registeredOfficeAddress: {
          connect: { id: companyAddress.id },
        },
      },
    });

    variables = {
      id: company.id,
      company: mockCompanyData,
    };

    result = await updateCompanyPostDataMigration({}, variables, context);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should successfully update company data', async () => {
    const updatedCompany = await companyHelpers.getCompany(context, company.id);

    expect(updatedCompany.companyName).toEqual(mockCompany.companyName);
    expect(updatedCompany.companyNumber).toEqual(mockCompany.companyNumber);
    expect(updatedCompany.dateOfCreation).toBeDefined();
    expect(updatedCompany.financialYearEndDate).toBeDefined();
  });

  it('should successfully update company address', async () => {
    const updatedCompanyAddress = await context.db.CompanyAddress.findOne({
      where: {
        id: companyAddress.id,
      },
    });

    const expected = {
      ...addressFields,
      id: companyAddress.id,
    };

    expect(updatedCompanyAddress).toEqual(expected);
  });

  it('should successfully create company SIC codes', async () => {
    const sicCodes = await context.db.CompanySicCode.findMany();

    const latestSicCode = sicCodes[sicCodes.length - 1];

    expect(typeof latestSicCode.id).toEqual('string');
    expect(latestSicCode.id.length).toBeGreaterThan(0);
    expect(latestSicCode.companyId).toEqual(company.id);

    expect(latestSicCode.sicCode).toEqual(mockCompanyData.sicCodes[0]);
    expect(typeof latestSicCode.id).toEqual('string');
    expect(latestSicCode.id.length).toBeGreaterThan(0);

    expect(latestSicCode.industrySectorName).toEqual(mockCompanyData.industrySectorNames[0]);
  });

  it('should return success=true', () => {
    expect(result).toEqual({ success: true });
  });

  describe('when an error occurs whilst updating company data', () => {
    it('should throw an error', async () => {
      const mockVariables = {
        ...variables,
        id: '1',
      };

      const expectedMessage = 'Updating company (post data migration) Access denied: You cannot update that Company - it may not exist';

      await expect(updateCompanyPostDataMigration({}, mockVariables, context)).rejects.toThrow(expectedMessage);
    });
  });

  describe('when an error occurs whilst updating company SIC codes', () => {
    it('should throw an error', async () => {
      const mockVariables = {
        ...variables,
        company: {
          ...variables.company,
          sicCodes: 'a, b, c',
        },
      };

      const expectedMessage = `Updating company (post data migration) Error: Creating company SIC codes for ${company.id} TypeError: sicCodes.forEach is not a function`;

      await expect(updateCompanyPostDataMigration({}, mockVariables, context)).rejects.toThrow(expectedMessage);
    });
  });

  describe('when an error occurs whilst updating company address data', () => {
    it('should throw an error', async () => {
      /**
       * delete all company address entires
       * so that the company does not have an address relationship.
       */

      const companyAddresses = await context.query.CompanyAddress.findMany();

      await context.query.CompanyAddress.deleteMany({
        where: companyAddresses,
      });

      const expectedMessage = 'Updating company (post data migration) Error: Unable to update company address - does not exist (post data migration)';

      await expect(updateCompanyPostDataMigration({}, variables, context)).rejects.toThrow(expectedMessage);
    });
  });
});
