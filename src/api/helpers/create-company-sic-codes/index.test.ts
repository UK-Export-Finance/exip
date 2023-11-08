import createCompanySicCodes from '.';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import companyHelpers from '../../test-helpers/company';
import { Context } from '../../types';

const mockSicCodes = ['1', '2'];
const mocIndustrySectorNames = ['Mock sector name'];

const invalidId = 'invalid-id';

const assertError = (err) => {
  const errorString = String(err);

  expect(errorString.includes('Creating company SIC codes')).toEqual(true);
};

describe('helpers/create-company-sic-codes', () => {
  let context: Context;
  let company: object;

  beforeAll(async () => {
    context = getKeystoneContext();

    company = (await companyHelpers.createCompany({ context })) as object;
  });

  test('it should return mapped SIC codes with company ID', async () => {
    const result = await createCompanySicCodes(context, mockSicCodes, mocIndustrySectorNames, company.id);

    const [firstEntry, secondEntry] = result;

    expect(typeof firstEntry.id).toEqual('string');
    expect(firstEntry.id.length).toBeGreaterThan(0);
    expect(firstEntry.companyId).toEqual(company.id);
    expect(firstEntry.sicCode).toEqual(mockSicCodes[0]);
    expect(firstEntry.industrySectorName).toEqual(mocIndustrySectorNames[0]);

    expect(typeof secondEntry.id).toEqual('string');
    expect(secondEntry.id.length).toBeGreaterThan(0);
    expect(secondEntry.id).not.toEqual(firstEntry.id);

    expect(secondEntry.companyId).toEqual(company.id);
    expect(secondEntry.sicCode).toEqual(mockSicCodes[1]);
    expect(secondEntry.industrySectorName).toEqual('');
  });

  describe('when an invalid company ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createCompanySicCodes(context, mockSicCodes, mocIndustrySectorNames, invalidId);
      } catch (err) {
        assertError(err);
      }
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createCompanySicCodes({}, mockSicCodes, mocIndustrySectorNames, invalidId);
      } catch (err) {
        assertError(err);
      }
    });
  });
});
