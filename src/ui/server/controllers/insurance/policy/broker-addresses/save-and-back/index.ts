import { ROUTES } from '../../../../../constants';
import constructPayload from '../../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../../shared-validation/yes-no-radios-form';
import getOrdnanceSurveyAddressById from '../../../../../helpers/get-chosen-ordnance-survey-address/by-id';
import mapAndSave from '../../map-and-save/broker';
import { FIELD_ID, ERROR_MESSAGE } from '..';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

/**
 * saves and goes back to all sections from broker addresses page unless there are API errors
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} redirects to all sections page on success
 */
const post = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { broker, referenceNumber } = application;

    const payload = constructPayload(req.body, [FIELD_ID]);

    const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGE);

    if (!validationErrors) {
      const { postcode, buildingNumberOrName } = broker;

      const response = await api.keystone.getOrdnanceSurveyAddresses(String(postcode), String(buildingNumberOrName));

      const { addresses } = response;

      const chosenAddress = getOrdnanceSurveyAddressById(payload, FIELD_ID, addresses);

      const saveResponse = await mapAndSave.broker(chosenAddress, application, validationErrors);

      if (!saveResponse) {
        return res.redirect(PROBLEM_WITH_SERVICE);
      }
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  } catch (error) {
    console.error('Error updating application - policy - broker addresses (save and back) %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

export { post };
