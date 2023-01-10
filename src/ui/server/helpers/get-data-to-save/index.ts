import getValidFields from '../get-valid-fields';

const getDataToSave = (formBody: object, errorList?: object) => {
  const { ...formData } = formBody;

  let dataToSave;

  if (errorList) {
    // strip out any invalid fields.
    dataToSave = getValidFields(formData, errorList);
  } else {
    // all fields are assumed valid.
    dataToSave = formBody;
  }

  return dataToSave;
};

export default getDataToSave;
