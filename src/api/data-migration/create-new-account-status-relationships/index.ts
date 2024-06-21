import { Context } from '.keystone/types'; // eslint-disable-line
import { Connection } from 'mysql2/promise';
import getAllAccounts from '../get-all-accounts';
import { AccountMvp } from '../../types';

const createNewAccountStatusRelationships = async (connection: Connection, context: Context) => {
  const loggingMessage = 'Creating new status relationships for all accounts';

  console.info(`✅ ${loggingMessage}`);

  try {
    const accounts = await getAllAccounts(connection);

    const mappedAccountStatusData = accounts.map((account: AccountMvp) => {
      const mapped = {
        account: {
          connect: {
            id: account.id,
          },
        },
        /**
         * NOTE: The accounts data we receive is raw database data.
         * In the database, boolean fields are TINYINT/integer values.
         * The KeystoneJS context/GraphQL API expects these fields to be booleans.
         * Therefore, since the TINYINT values will be 0 or 1,
         * we can safely transform these fields to have a boolean value.
         * KeystoneJS will then automatically handle saving in the database as a TINYINT
         */
        isVerified: Boolean(account.isVerified),
        isBlocked: Boolean(account.isBlocked),
      };

      return mapped;
    });

    const created = await context.db.AccountStatus.createMany({
      data: mappedAccountStatusData,
    });

    return created;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createNewAccountStatusRelationships;
