import { Application, Context } from '.keystone/types'; // eslint-disable-line
import { DeleteApplicationByReferenceNumberVariables, SuccessResponse } from '../../../types';

/**
 * deleteApplicationByReferenceNumber
 * Deletes an application by reference number.
 * 1) Check if the application exists.
 * 2) Delete the application.
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the DeleteApplicationByReferenceNumber mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success flag
 */
const deleteApplicationByReferenceNumber = async (
  root: any,
  variables: DeleteApplicationByReferenceNumberVariables,
  context: Context,
): Promise<SuccessResponse> => {
  try {
    console.info('Deleting application by reference number');

    const { referenceNumber } = variables;

    const application = (await context.db.Application.findMany({
      where: {
        referenceNumber: { equals: referenceNumber },
      },
    })) as Application;

    const [{ id }] = application;

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
