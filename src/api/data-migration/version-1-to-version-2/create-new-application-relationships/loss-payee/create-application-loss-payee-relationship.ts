import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * createApplicationLossPayeeRelationship
 * Update all applications to have a loss payee relationship/ID.
 * @param {Context} context: KeystoneJS context API
 * @param {Array<object>} lossPayees: Array of loss payees
 * @returns {Promise<Array<Application>>} Updated applications
 */
const createApplicationLossPayeeRelationship = async (context: Context, lossPayees: Array<object>) => {
  const loggingMessage = 'Updating applications to have loss payee relationships';

  console.info(`✅ ${loggingMessage}`);

  try {
    const applicationUpdates = lossPayees.map((lossPayee: object) => ({
      where: { id: lossPayee.applicationId },
      data: {
        nominatedLossPayee: {
          connect: {
            id: lossPayee.id,
          },
        },
      },
    }));

    const updated = await context.db.Application.updateMany({
      data: applicationUpdates,
    });

    return updated;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createApplicationLossPayeeRelationship;
