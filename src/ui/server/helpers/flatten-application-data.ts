import { Application, ApplicationFlat } from '../../types';

const flattenApplicationData = (application: Application): ApplicationFlat => {
  const { eligibility, policyAndExport, ...app } = application;

  return {
    ...eligibility,
    buyerCountry: application.eligibility.buyerCountry.isoCode,
    ...policyAndExport,
    ...app,
  };
};

export default flattenApplicationData;
