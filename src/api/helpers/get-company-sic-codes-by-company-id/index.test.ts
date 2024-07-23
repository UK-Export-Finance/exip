import getCompanySicCodesByCompanyId from '.';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import company from '../../test-helpers/company';
import { Context, ApplicationCompany, ApplicationCompanySicCode } from '../../types';

describe('helpers/get-company-sic-codes-by-company-id', () => {
  let context: Context;
  let createdCompany;
  let companyId = '';
  let createdSicCodes = [] as Array<ApplicationCompanySicCode>;

  beforeAll(async () => {
    context = getKeystoneContext();

    // delete all SIC codes so that we have a clean slate.
    const existingSicCodes = await context.db.CompanySicCode.findMany();

    const sicCodeIdsArray = existingSicCodes.map((sicCode: ApplicationCompanySicCode) => ({
      id: sicCode.id,
    }));

    await context.db.CompanySicCode.deleteMany({
      where: sicCodeIdsArray,
    });
  });

  beforeEach(async () => {
    createdCompany = (await company.createCompany(context)) as ApplicationCompany;

    companyId = createdCompany.id;

    createdSicCodes = [
      (await company.createCompanySicCode(context, companyId)) as ApplicationCompanySicCode,
      (await company.createCompanySicCode(context, companyId)) as ApplicationCompanySicCode,
    ];
  });

  it('should return all company SIC codes by company ID', async () => {
    const result = await getCompanySicCodesByCompanyId(context, createdSicCodes.id);

    const [sicCode0, sicCode1] = await company.getCompanySicCodes(context, companyId);

    const expected = [
      {
        id: sicCode0.id,
        companyId: createdCompany.id,
        industrySectorName: sicCode0.industrySectorName,
        sicCode: sicCode0.sicCode,
      },
      {
        id: sicCode1.id,
        companyId: createdCompany.id,
        industrySectorName: sicCode0.industrySectorName,
        sicCode: sicCode0.sicCode,
      },
    ];

    expect(result).toEqual(expected);
  });

  describe('when company SIC codes are not found', () => {
    it('should throw an error', async () => {
      try {
        await getCompanySicCodesByCompanyId(context, mockInvalidId);
      } catch (err) {
        const errorMessage = `Getting company SIC codes by company ID ${mockInvalidId}`;

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
