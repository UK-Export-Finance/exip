import { SicCodeResponse } from '../../../types';

const mapSicCodes = (codes: Array<SicCodeResponse>) => {
  const sicCodes = codes.map((code) => code.sicCode);

  return sicCodes;
};

export default mapSicCodes;
