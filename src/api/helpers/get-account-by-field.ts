import { Context } from '.keystone/types'; // eslint-disable-line
import { Account } from '../types';

const getAccountByField = async (context: Context, field: string, value: string) => {
  /**
   * Get an account by a particular field and value.
   * NOTE: Keystone has a limitation where you can't findOne by a field that is NOT the id.
   * Therefore we have to use findMany, which has a performance impact.
   * Because this is low volume service, there is no need to improve this.
   * However if volumes increase dramatically we will need to improve this.
   */
  const exportersArray = await context.db.Exporter.findMany({
    where: {
      [field]: { equals: value },
    },
    take: 1,
  });

  // ensure that we have found an acount with the requsted field/value
  if (!exportersArray || !exportersArray.length || !exportersArray[0]) {
    // throw new Error('Getting exporter by field - no exporter exists with the provided field/value');
    console.info('Getting exporter by field - no exporter exists with the provided field/value');
    return false;
  }

  const exporter = exportersArray[0] as Account;

  return exporter;
};

export default getAccountByField;
