import { Application, Context } from '.keystone/types'; // eslint-disable-line
import { DeleteApplicationByReferenceNumberVariables, DeleteApplicationByReferenceNumberResponse } from '../../types';

const deleteApplicationByReferenceNumber = async (
  root: any,
  variables: DeleteApplicationByReferenceNumberVariables,
  context: Context,
): Promise<DeleteApplicationByReferenceNumberResponse> => {
  try {
    console.info('Deleting application by reference number');

    const { referenceNumber } = variables;

    const application = (await context.db.Application.findMany({
      where: {
        referenceNumber: { equals: referenceNumber },
      },
    })) as Application;

    const { id } = application[0];

    const deleteResponse = await context.db.Application.deleteOne({
      where: {
        id,
      },
    });

    if (deleteResponse.id) {
      return {
        success: true,
      };
    }

    return {
      success: false,
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Deleting application by reference number (DeleteApplicationByReferenceNumber mutation) ${err}`);
  }
};

export default deleteApplicationByReferenceNumber;
