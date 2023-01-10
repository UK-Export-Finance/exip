import { RequestBody } from '../../../../../types';
import { FIELD_IDS } from '../../../../constants';
import { objectHasProperty } from '../../../../helpers/object';

const {
  COMPANY_HOUSE: { INPUT },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const mapSubmittedData = (formBody: RequestBody): object => {
  if (!formBody) {
    return {};
  }

  const populatedData = formBody;

  if (objectHasProperty(formBody, INPUT)) {
    delete populatedData[INPUT];
  }

  if (objectHasProperty(formBody, '__typename')) {
    // eslint-disable-next-line no-underscore-dangle
    delete populatedData.__typename;
  }

  if (objectHasProperty(formBody, 'success')) {
    delete populatedData.success;
  }

  if (formBody?.registeredOfficeAddress && objectHasProperty(formBody.registeredOfficeAddress, '__typename')) {
    // eslint-disable-next-line no-underscore-dangle
    delete populatedData.registeredOfficeAddress.__typename;
  }

  return populatedData;
};

export default mapSubmittedData;
