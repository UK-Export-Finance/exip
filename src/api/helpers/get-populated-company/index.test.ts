import getPopulatedCompany from '.';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import company from '../../test-helpers/company';
import { Context, ApplicationCompany, ApplicationCompanyAddress, ApplicationCompanySicCode, ApplicationCompanyDifferentTradingAddress } from '../../types';

describe('helpers/get-populated-company', () => {
  let context: Context;
  let createdCompany: ApplicationCompany;
  let createdAddress: ApplicationCompanyAddress;
  let createdSicCode: ApplicationCompanySicCode;
  let createdDifferentTradingAddress: ApplicationCompanyDifferentTradingAddress;

  let companyAddressConnectObject = {};
  let differentTradingAddressConnectObject = {};

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdCompany = (await company.createCompany(context)) as ApplicationCompany;

    createdSicCode = (await company.createCompanySicCode(context, createdCompany.id)) as ApplicationCompanySicCode;

    companyAddressConnectObject = {
      company: {
        connect: {
          id: createdCompany.id,
        },
      },
    };

    createdAddress = (await company.createCompanyAddress(context, companyAddressConnectObject)) as ApplicationCompanyAddress;

    createdDifferentTradingAddress = (await company.createCompanyDifferentTradingAddress(
      context,
      createdCompany.id,
    )) as ApplicationCompanyDifferentTradingAddress;

    differentTradingAddressConnectObject = {
      connect: {
        id: createdDifferentTradingAddress.id,
      },
    };
  });

  it('should return a populated company', async () => {
    const result = await getPopulatedCompany(context, createdCompany.id);

    expect(result.id).toEqual(createdCompany.id);

    expect(result.companySicCodes[0].id).toEqual(createdSicCode.id);

    expect(result.registeredOfficeAddress.id).toEqual(createdAddress.id);

    expect(result.differentTradingAddress.id).toEqual(createdDifferentTradingAddress.id);
  });

  describe('when a company is not found', () => {
    it('should throw an error', async () => {
      try {
        await getPopulatedCompany(context, mockInvalidId);
      } catch (error) {
        const expected = `Getting populated company ${mockInvalidId}`;

        expect(String(error).includes(expected)).toEqual(true);
      }
    });
  });

  describe('when an address not found', () => {
    it('should throw an error', async () => {
      const companyObject = {
        registeredOfficeAddress: {
          connect: {
            id: mockInvalidId,
          },
        },
        differentTradingAddress: differentTradingAddressConnectObject,
      };

      const companyNoAddress = (await company.createCompany(context, companyObject)) as ApplicationCompany;

      try {
        await getPopulatedCompany(context, companyNoAddress.id);
      } catch (error) {
        const expected = `Getting populated company ${companyNoAddress.id}`;

        expect(String(error).includes(expected)).toEqual(true);
      }
    });
  });

  describe('when a different trading address not found', () => {
    it('should throw an error', async () => {
      const companyObject = {
        registeredOfficeAddress: companyAddressConnectObject,
        differentTradingAddress: {
          connect: {
            id: mockInvalidId,
          },
        },
      };

      const companyNoDifferentTradingAddress = (await company.createCompany(context, companyObject)) as ApplicationCompany;

      try {
        await getPopulatedCompany(context, companyNoDifferentTradingAddress.id);
      } catch (error) {
        const expected = `Getting populated company ${companyNoDifferentTradingAddress.id}`;

        expect(String(error).includes(expected)).toEqual(true);
      }
    });
  });
});
