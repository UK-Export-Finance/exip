import api from '../../../../api';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import { Application, RequestBody } from '../../../../../types';

/**
 * sectionReview
 * Update an application's section review
 * This is used for any save functionality in the Check your answers section of an application
 * @param {Application}
 * @param {Express.Request.body} Form data
 * @returns {Object} Saved data
 */
const sectionReview = async (application: Application, formBody: RequestBody) => {
  const sanitisedData = sanitiseData(formBody);

  // send the form data to the API for database update.
  const sectionReviewId = application.sectionReview?.id;

  try {
    const saveResponse = await api.keystone.application.update.sectionReview(sectionReviewId, sanitisedData);

    return saveResponse;
  } catch (err) {
    console.error("Error updating application's section review %O", err);
    throw new Error("Updating application's section review");
  }
};

export default {
  sectionReview,
};
