import { Context } from '../../types';

const getTotalContractValueByField = async (context: Context, field: string, value: number): Promise<object | boolean> => {
  try {
    console.info('Getting totalContractValue by field/value $s', `${field}, ${value}`);

    /**
     * Get a totalContractValue by a particular field and value.
     * NOTE: Keystone has a limitation where you can't findOne by a field that is NOT the id.
     * Therefore we have to use findMany, which has a performance impact.
     * Because this is low volume service, there is no need to improve this.
     * However if volumes increase dramatically we will need to improve this.
     */
    const totalContractValuesArray = await context.db.TotalContractValue.findMany({
      where: {
        [field]: { equals: value },
      },
      take: 1,
    });

    // ensure that we have found an totalContractValue with the requested field/value
    if (!totalContractValuesArray?.length || !totalContractValuesArray[0]) {
      console.info('Getting totalContractValue by field - no totalContractValue exists with the provided field/value');

      return false;
    }

    const [totalContractValue] = totalContractValuesArray;

    return totalContractValue;
  } catch (err) {
    console.error('Error getting totalContractValue by field/value %O', err);
    throw new Error(`Getting totalContractValue by field/value ${err}`);
  }
};

export default getTotalContractValueByField;
