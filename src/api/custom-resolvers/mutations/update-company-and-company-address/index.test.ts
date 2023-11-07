import updateCompanyAndCompanyAddress from '.';
import mockCompany from '../../../test-mocks/mock-company';
import companyHelpers from '../../../test-helpers/company';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';
import { Context } from '../../../types';

describe('custom-resolvers/update-company-and-company-address', () => {
  let context: Context;
  let company;
  let companySicCode;
  let companyAddress;

  const { companyName, companyNumber, sicCodes } = mockCompany;

  beforeAll(() => {
    context = getKeystoneContext();
  });

  describe('Company house number update', () => {
    const industrySectorNames = ['test'];
    const dateOfCreation = new Date('11 23 2022');
    const financialYearEndDate = new Date('11 23 2022');

    const variables = (providedCompany, providedCompanyAddress) => ({
      companyId: providedCompany.id,
      companyAddressId: providedCompanyAddress.id,
      data: {
        address: {
          ...mockCompany.registeredOfficeAddress,
        },
        companyName,
        companyNumber,
        sicCodes,
        industrySectorNames,
        dateOfCreation,
        financialYearEndDate,
      },
    });

    beforeEach(async () => {
      company = await companyHelpers.createCompany({ context });
      companyAddress = await companyHelpers.createCompanyAddress({ context });

      await updateCompanyAndCompanyAddress({}, variables(company, companyAddress), context);
    });

    afterEach(async () => {
      await companyHelpers.deleteCompany(context, company.id);
      await companyHelpers.deleteCompanyAddress(context, companyAddress.id);

      companySicCode.forEach(async (code) => {
        await companyHelpers.deleteCompanySicCode(context, code.id);
      });
    });

    it('should create company and companyAddress and companySicCodes when a company is passed', async () => {
      const companyResponse = await companyHelpers.getCompany(context, company.id);
      const companyAddressResponse = await companyHelpers.getCompanyAddress(context, companyAddress.id);
      companySicCode = await companyHelpers.getCompanySicCode(context, company.id);

      expect(companyResponse.companyName).toEqual(companyName);
      expect(companyResponse.companyNumber).toEqual(companyNumber);
      expect(new Date(companyResponse.dateOfCreation)).toEqual(dateOfCreation);
      expect(new Date(companyResponse.financialYearEndDate)).toEqual(financialYearEndDate);
      expect(companyResponse.hasDifferentTradingName).toBeNull();
      expect(companyResponse.hasDifferentTradingAddress).toBeNull();

      expect(companyAddressResponse.addressLine1).toEqual(mockCompany.registeredOfficeAddress.addressLine1);
      expect(companyAddressResponse.postalCode).toEqual(mockCompany.registeredOfficeAddress.postalCode);
      expect(companyAddressResponse.locality).toEqual(mockCompany.registeredOfficeAddress.locality);

      expect(companySicCode[0].sicCode).toEqual(mockCompany.sicCodes[0]);
      expect(companySicCode[0].industrySectorName).toEqual(industrySectorNames[0]);
    });

    it('should remove old sic codes when oldSicCodes is populated', async () => {
      companySicCode = await companyHelpers.getCompanySicCode(context, company.id);

      const sicCode = '000000';
      const industrySector = 'new name';

      const newVariables = {
        ...variables(company, companyAddress),
        data: {
          ...variables(company, companyAddress).data,
          oldSicCodes: [{ id: companySicCode[0].id }],
          sicCodes: [sicCode],
          industrySectorNames: [industrySector],
        },
      };

      await updateCompanyAndCompanyAddress({}, newVariables, context);

      companySicCode = await companyHelpers.getCompanySicCode(context, company.id);

      expect(companySicCode[0].sicCode).toEqual(sicCode);
      expect(companySicCode[0].industrySectorName).toEqual(industrySector);
    });

    it('should remove old financial year end date when new one is not provided', async () => {
      const newVariables = {
        ...variables(company, companyAddress),
        data: {
          ...variables(company, companyAddress).data,
          financialYearEndDate: undefined,
        },
      };

      await updateCompanyAndCompanyAddress({}, newVariables, context);

      const companyResponse = await companyHelpers.getCompany(context, company.id);

      expect(companyResponse.financialYearEndDate).toBeNull();

      companySicCode = await companyHelpers.getCompanySicCode(context, company.id);
    });
  });

  describe('Company details update', () => {
    const industrySectorNames = ['test'];
    const dateOfCreation = new Date('11 23 2022');
    const financialYearEndDate = new Date('11 23 2022');

    const variables = (providedCompany, providedCompanyAddress) => ({
      companyId: providedCompany.id,
      companyAddressId: providedCompanyAddress.id,
      data: {
        address: {
          ...mockCompany.registeredOfficeAddress,
        },
        companyName,
        companyNumber,
        sicCodes,
        industrySectorNames,
        dateOfCreation,
        financialYearEndDate,
      },
    });

    beforeEach(async () => {
      company = await companyHelpers.createCompany({ context });
      companyAddress = await companyHelpers.createCompanyAddress({ context });

      await updateCompanyAndCompanyAddress({}, variables(company, companyAddress), context);
    });

    afterEach(async () => {
      companySicCode = await companyHelpers.getCompanySicCode(context, company.id);

      companySicCode.forEach(async (code) => {
        await companyHelpers.deleteCompanySicCode(context, code.id);
      });

      await companyHelpers.deleteCompany(context, company.id);
      await companyHelpers.deleteCompanyAddress(context, companyAddress.id);
    });

    it('should update hasDifferentTradingAddress and hasDifferentTradingName to true', async () => {
      const companyDetailsVariables = {
        companyId: company.id,
        companyAddressId: companyAddress.id,
        data: {
          address: {},
          hasDifferentTradingAddress: true,
          hasDifferentTradingName: true,
        },
      };

      await updateCompanyAndCompanyAddress({}, companyDetailsVariables, context);

      const companyResponse = await companyHelpers.getCompany(context, company.id);

      expect(companyResponse.hasDifferentTradingAddress).toEqual(true);
      expect(companyResponse.hasDifferentTradingName).toEqual(true);
    });

    it('should update hasDifferentTradingAddress and hasDifferentTradingName to false', async () => {
      const companyDetailsVariables = {
        companyId: company.id,
        companyAddressId: companyAddress.id,
        data: {
          address: {},
          hasDifferentTradingAddress: false,
          hasDifferentTradingName: false,
        },
      };

      await updateCompanyAndCompanyAddress({}, companyDetailsVariables, context);

      const companyResponse = await companyHelpers.getCompany(context, company.id);

      expect(companyResponse.hasDifferentTradingAddress).toEqual(false);
      expect(companyResponse.hasDifferentTradingName).toEqual(false);
    });

    it('should not remove financial year end date', async () => {
      const companyDetailsVariables = {
        companyId: company.id,
        companyAddressId: companyAddress.id,
        data: {
          address: {},
          hasDifferentTradingAddress: false,
          hasDifferentTradingName: false,
        },
      };

      await updateCompanyAndCompanyAddress({}, companyDetailsVariables, context);

      const companyResponse = await companyHelpers.getCompany(context, company.id);

      expect(new Date(companyResponse.financialYearEndDate)).toEqual(financialYearEndDate);
    });
  });
});
