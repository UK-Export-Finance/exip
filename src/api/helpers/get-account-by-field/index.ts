import { Account, Context } from '../../types';

const getAccountByField = async (context: Context, field: string, value: string): Promise<Account | boolean> => {
  try {
    console.info('Getting account by field/value $s', `${field}, ${value}`);

    /**
     * Get an account by a particular field and value.
     * NOTE: Keystone has a limitation where you can't findOne by a field that is NOT the id.
     * Therefore we have to use findMany, which has a performance impact.
     * Because this is low volume service, there is no need to improve this.
     * However if volumes increase dramatically we will need to improve this.
     */
    const accountsArray = await context.db.Account.findMany({
      where: {
        [field]: { equals: value },
      },
      take: 1,
    });

    // ensure that we have found an account with the requested field/value
    if (!accountsArray?.length || !accountsArray[0]) {
      console.info('Getting account by field - no account exists with the provided field/value');

      return false;
    }

    const account = accountsArray[0] as Account;

    return account;
  } catch (err) {
    console.error('Error getting account by field/value %O', err);
    throw new Error(`Getting account by field/value ${err}`);
  }
};

export default getAccountByField;
