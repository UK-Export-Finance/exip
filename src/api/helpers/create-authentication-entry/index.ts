import { Context } from '.keystone/types'; // eslint-disable-line

const createAuthenticationEntry = async (context: Context, entry: object) => {
  console.info('Creating authentication entry');

  try {
    const result = await context.db.Authentication.createOne({
      data: entry,
    });

    return result;
  } catch (err) {
    console.error(err);

    throw new Error(`Creating authentication entry ${err}`);
  }
};

export default createAuthenticationEntry;
