import { RequestBody } from '../../../../../types';

const mapSubmittedData = (formBody: RequestBody): object => {
  if (!formBody) {
    return {};
  }

  const populatedData = formBody;

  if (!populatedData.exporterCompanyAddress) {
    populatedData.exporterCompanyAddress = {};
  }

  return populatedData;
};

export default mapSubmittedData;
