import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import CHECK_YOUR_ANSWERS_FIELD_IDS from '../../../../constants/field-ids/insurance/check-your-answers';
import constructPayload from '../../../../helpers/construct-payload';
import stripEmptyFormFields from '../../../../helpers/strip-empty-form-fields';
import save from '../save-data';
import { Request, Response } from '../../../../../types';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

export const FIELD_IDS = Object.values(CHECK_YOUR_ANSWERS_FIELD_IDS);

/**
 * post
 * Save check your answers section review and if successful, redirect to the all sections page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} All sections page or error page
 */
export const post = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;

  try {
    /**
     * Construct a payload and strip any empty form fields
     * Without stripping empty form fields, previously submitted forms could become null.
     * Then save the application
     */
    const payload = stripEmptyFormFields(constructPayload(req.body, FIELD_IDS));

    const saveResponse = await save.sectionReview(application, payload);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  } catch (err) {
    console.error('Error updating check your answers section review %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
