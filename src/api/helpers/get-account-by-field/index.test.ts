import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import getAccountByField from '.';
import baseConfig from '../../keystone';
import { mockAccount } from '../../test-mocks';
import { Account } from '../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('helpers/get-account-by-field', () => {
  let account: Account;

  const field = 'firstName';
  const value = mockAccount.firstName;

  beforeEach(async () => {
    // wipe the table so we have a clean slate.
    const exporters = await context.query.Exporter.findMany();

    await context.query.Exporter.deleteMany({
      where: exporters,
    });

    // create a new exporter
    account = (await context.query.Exporter.createOne({
      data: mockAccount,
      query: 'id firstName lastName',
    })) as Account;
  });

  it('should return an exporter/account by ID', async () => {
    const result = (await getAccountByField(context, field, value)) as Account;

    expect(result.id).toEqual(account.id);
    expect(result.firstName).toEqual(account.firstName);
  });

  describe('when an exporter/account is not found', () => {
    beforeEach(async () => {
      // delete the exporter so it will not be found
      await context.query.Exporter.deleteOne({
        where: { id: account.id },
      });
    });

    it('should throw an error', async () => {
      try {
        await getAccountByField(context, field, value);
      } catch (err) {
        const errorMessage = 'Getting exporter account by field/value';

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
