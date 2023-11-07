import { Context } from '../../types';

const getCoverPeriodValueByField = async (context: Context, field: string, value: number): Promise<object | boolean> => {
  try {
    console.info('Getting coverPeriod by field/value $s', `${field}, ${value}`);

    /**
     * Get a coverPeriod by a particular field and value.
     * NOTE: Keystone has a limitation where you can't findOne by a field that is NOT the id.
     * Therefore we have to use findMany, which has a performance impact.
     * Because this is low volume service, there is no need to improve this.
     * However if volumes increase dramatically we will need to improve this.
     */
    const coverPeriodsArray = await context.db.CoverPeriod.findMany({
      where: {
        [field]: { equals: value },
      },
      take: 1,
    });

    // ensure that we have found an coverPeriod with the requested field/value
    if (!coverPeriodsArray?.length || !coverPeriodsArray[0]) {
      console.info('Getting coverPeriod by field - no coverPeriod exists with the provided field/value');

      return false;
    }

    const [coverPeriod] = coverPeriodsArray;

    return coverPeriod;
  } catch (err) {
    console.error('Error getting coverPeriod by field/value %O', err);
    throw new Error(`Getting coverPeriod by field/value ${err}`);
  }
};

export default getCoverPeriodValueByField;
