import getCompanyById from '.';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import company from '../../test-helpers/company';
import { Context, ApplicationCompany } from '../../types';

describe('helpers/get-company-by-id', () => {
  let context: Context;
  let createdCompany: ApplicationCompany;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdCompany = (await company.createCompany(context)) as ApplicationCompany;
  });

  it('should return a company by ID', async () => {
    const result = await getCompanyById(context, createdCompany.id);

    expect(result.id).toEqual(createdCompany.id);
  });

  describe('when a company is not found', () => {
    it('should throw an error', async () => {
      try {
        await getCompanyById(context, mockInvalidId);
      } catch (err) {
        const errorMessage = `Getting company by ID ${mockInvalidId}`;

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
