import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import hasFormData from '../../../../../helpers/has-form-data';
import { FIELD_IDS } from '..';
import constructPayload from '../../../../../helpers/construct-payload';
import generateValidationErrors from '../validation';
import { objectHasProperty } from '../../../../../helpers/object';
import api from '../../../../../api';
import mapAndSave from '../../map-and-save/export-contract';
import { Request, ResponseInsurance } from '../../../../../../types';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

const {
  ABOUT_GOODS_OR_SERVICES: { FINAL_DESTINATION },
} = EXPORT_CONTRACT_FIELD_IDS;

/**
 * post
 * Save any valid "About goods or services" form fields and if successful, redirect to the all sections page
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.redirect} All sections page or error page
 */
export const post = async (req: Request, res: ResponseInsurance) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = req.params;

    /**
     * If form data is populated:
     * 1) generate a payload.
     * 2) generate validation errors.
     * 3) if FINAL_DESTINATION is provided, fetch countries.
     * 4) call mapAndSave
     * 5) redirect
     */
    if (hasFormData(req.body)) {
      const payload = constructPayload(req.body, FIELD_IDS);

      const validationErrors = generateValidationErrors(payload);

      let countries = [];

      if (objectHasProperty(req.body, FINAL_DESTINATION)) {
        countries = await api.keystone.countries.getAll();
      }

      const saveResponse = await mapAndSave.exportContract(payload, application, validationErrors, countries);

      if (!saveResponse) {
        return res.redirect(PROBLEM_WITH_SERVICE);
      }
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  } catch (error) {
    console.error('Error updating application - export contract - about goods or services (save and back) %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
