/**
 * converts response to boolean or returns an empty string if does not exist
 * @param response from body which is string
 * @returns boolean or empty string
 */
const convertRadioButtonResponse = (response: string) => {
  if (response) {
    return response === 'true' ? true : false;
  }

  return '';
};

export default convertRadioButtonResponse;
