import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import getExporterById from '.';
import baseConfig from '../../keystone';
import { mockAccount } from '../../test-mocks';
import { Account } from '../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('helpers/get-exporter-by-id', () => {
  let account: Account;

  beforeEach(async () => {
    // create a new exporter
    account = (await context.query.Exporter.createOne({
      data: mockAccount,
      query: 'id firstName lastName',
    })) as Account;
  });

  it('should return an exporter/account by ID', async () => {
    const result = await getExporterById(context, account.id);

    expect(result.id).toEqual(account.id);
    expect(result.firstName).toEqual(account.firstName);
    expect(result.lastName).toEqual(account.lastName);
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
        await getExporterById(context, account.id);
      } catch (err) {
        const expected = new Error('Getting exporter by ID');
        expect(err).toEqual(expected);
      }
    });
  });
});
